from PyPDF2 import PdfWriter
import os
import shutil
import tempfile
import textwrap

def merge_pdfs(input_paths: list[str], output_path: str):
    """Merge multiple PDF files into one."""
    merger = PdfWriter()
    
    for pdf_path in input_paths:
        try:
            merger.append(pdf_path)
        except Exception as e:
            raise Exception(f"Error merging PDF {pdf_path}: {str(e)}")
    
    with open(output_path, 'wb') as f:
        merger.write(f)
    merger.close()


import pikepdf

def compress_pdf(input_path: str, output_path: str, quality: str = "medium"):
    """Compress a PDF file with specified quality level."""
    input_size = os.path.getsize(input_path)
    tmp_primary = create_temp_path(".pdf")
    tmp_fallback = create_temp_path(".pdf")

    try:
        with pikepdf.open(input_path) as pdf:
            pdf.save(
                tmp_primary,
                compress_streams=True,
                recompress_flate=True,
            )
    except Exception:
        pass

    # Fallback/secondary strategy using PyPDF2 stream compression
    try:
        from PyPDF2 import PdfReader, PdfWriter
        reader = PdfReader(input_path)
        writer = PdfWriter()

        for page in reader.pages:
            try:
                page.compress_content_streams()
            except Exception:
                pass
            writer.add_page(page)

        with open(tmp_fallback, 'wb') as f:
            writer.write(f)
    except Exception:
        pass

    candidates = []
    for candidate_path in [tmp_primary, tmp_fallback]:
        if os.path.exists(candidate_path):
            candidate_size = os.path.getsize(candidate_path)
            if candidate_size > 0:
                candidates.append((candidate_size, candidate_path))

    if not candidates:
        raise Exception("Error compressing PDF: no valid compressed output produced")

    best_size, best_path = min(candidates, key=lambda item: item[0])

    # Never return a bigger file than the original.
    if best_size >= input_size:
        shutil.copy2(input_path, output_path)
    else:
        shutil.move(best_path, output_path)

    for candidate_path in [tmp_primary, tmp_fallback]:
        if os.path.exists(candidate_path) and candidate_path != output_path:
            try:
                os.remove(candidate_path)
            except Exception:
                pass


from pdf2image import convert_from_path
from PIL import Image

def pdf_to_jpg(input_path: str, output_dir: str, dpi: int = 150):
    """Convert PDF pages to JPG images."""
    dpi_map = {"72": 72, "150": 150, "300": 300}
    actual_dpi = dpi_map.get(str(dpi), 150)
    
    try:
        pages = convert_from_path(input_path, dpi=actual_dpi)
        image_paths = []
        
        for i, page in enumerate(pages):
            jpg_path = os.path.join(output_dir, f"page_{i + 1}.jpg")
            page.save(jpg_path, "JPEG", quality=95)
            image_paths.append(jpg_path)
        
        return image_paths
    except Exception as e:
        # Fallback for systems without Poppler: use PyMuPDF (installed via pdf2docx deps)
        try:
            import fitz

            doc = fitz.open(input_path)
            image_paths = []

            for i, page in enumerate(doc):
                pix = page.get_pixmap(dpi=actual_dpi, alpha=False)
                jpg_path = os.path.join(output_dir, f"page_{i + 1}.jpg")
                pix.save(jpg_path)
                image_paths.append(jpg_path)

            doc.close()

            if not image_paths:
                raise Exception("No pages were rendered from the PDF")

            return image_paths
        except Exception as fallback_error:
            raise Exception(
                f"Error converting PDF to JPG: {str(e)} | Fallback failed: {str(fallback_error)}"
            )


def create_temp_path(suffix: str) -> str:
    fd, path = tempfile.mkstemp(suffix=suffix)
    os.close(fd)
    return path


def jpg_to_pdf(image_paths: list[str], output_path: str):
    """Convert JPG images to a single PDF file."""
    try:
        images = []
        for img_path in image_paths:
            img = Image.open(img_path).convert("RGB")
            images.append(img)
        
        if images:
            images[0].save(output_path, save_all=True, append_images=images[1:])
    except Exception as e:
        raise Exception(f"Error converting JPG to PDF: {str(e)}")


def protect_pdf(input_path: str, output_path: str, password: str):
    """Add password protection to a PDF file."""
    try:
        with pikepdf.open(input_path) as pdf:
            pdf.save(
                output_path,
                encryption=pikepdf.Encryption(user=password, owner=password)
            )
    except Exception as e:
        raise Exception(f"Error protecting PDF: {str(e)}")


def unlock_pdf(input_path: str, output_path: str, password: str = None):
    """Remove password protection from a PDF file."""
    try:
        if password:
            pdf = pikepdf.open(input_path, password=password)
        else:
            pdf = pikepdf.open(input_path)
        
        pdf.save(output_path)
        pdf.close()
    except pikepdf.PasswordError:
        raise Exception("Incorrect password or PDF is not password-protected")
    except Exception as e:
        raise Exception(f"Error unlocking PDF: {str(e)}")


def word_to_pdf(input_path: str, output_path: str):
    """Convert a Word document (DOCX) to PDF with images and formatting preserved."""
    try:
        import subprocess
        import platform
        
        try:
            if platform.system() == "Windows":
                subprocess.run([
                    "soffice",
                    "--headless",
                    "--convert-to", "pdf",
                    "--outdir", os.path.dirname(output_path) or ".",
                    input_path
                ], check=True, capture_output=True, timeout=60)
                
                # LibreOffice creates PDF with same name, rename if needed
                temp_pdf = os.path.join(os.path.dirname(output_path) or ".", 
                                       os.path.splitext(os.path.basename(input_path))[0] + ".pdf")
                if temp_pdf != output_path and os.path.exists(temp_pdf):
                    os.rename(temp_pdf, output_path)
                return
            else:
                subprocess.run([
                    "libreoffice",
                    "--headless",
                    "--convert-to", "pdf",
                    "--outdir", os.path.dirname(output_path) or ".",
                    input_path
                ], check=True, capture_output=True, timeout=60)
                
                temp_pdf = os.path.join(os.path.dirname(output_path) or ".", 
                                       os.path.splitext(os.path.basename(input_path))[0] + ".pdf")
                if temp_pdf != output_path and os.path.exists(temp_pdf):
                    os.rename(temp_pdf, output_path)
                return
        except (subprocess.CalledProcessError, FileNotFoundError):
            pass
        
        # Fallback: docx2pdf works on Windows with MS Word installed
        try:
            from docx2pdf import convert
            convert(input_path, output_path)
            return
        except (ImportError, Exception):
            pass
        
        # Safe fallback: text/table extraction using python-docx + reportlab
        from docx import Document
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.units import inch
        from reportlab.pdfgen import canvas
        
        doc = Document(input_path)

        page_width, page_height = A4
        left_margin = 0.75 * inch
        top_margin = 0.75 * inch
        line_height = 14
        max_chars = 100

        pdf = canvas.Canvas(output_path, pagesize=A4)
        y = page_height - top_margin

        def write_wrapped_line(text: str, bold: bool = False):
            nonlocal y
            if not text:
                y -= line_height
                return

            pdf.setFont("Helvetica-Bold" if bold else "Helvetica", 11)
            for line in textwrap.wrap(text, width=max_chars):
                if y < top_margin:
                    pdf.showPage()
                    y = page_height - top_margin
                    pdf.setFont("Helvetica-Bold" if bold else "Helvetica", 11)
                pdf.drawString(left_margin, y, line)
                y -= line_height

        for para in doc.paragraphs:
            text = (para.text or "").strip()
            write_wrapped_line(text, bold=(para.style and para.style.name.startswith("Heading")))

        if doc.tables:
            y -= line_height
            write_wrapped_line("Tables:", bold=True)
            for table in doc.tables:
                for row in table.rows:
                    row_text = " | ".join((cell.text or "").strip() for cell in row.cells)
                    write_wrapped_line(row_text)
                y -= line_height

        pdf.save()
        
    except ImportError as ie:
        raise Exception(f"Required libraries not installed. Error: {str(ie)}")
    except Exception as e:
        raise Exception(f"Error converting Word to PDF: {str(e)}")


def pdf_to_word(input_path: str, output_path: str):
    """Convert a PDF file to a Word document (DOCX) with improved formatting."""
    try:
        from pdf2docx import Converter

        converter = Converter(input_path)
        converter.convert(output_path, start=0, end=None)
        converter.close()
        
    except ImportError:
        raise Exception("Required library pdf2docx not installed. Install it with: pip install pdf2docx")
    except Exception as e:
        # Fallback: Create a text-based Word document if pdf2docx fails
        try:
            from docx import Document
            from PyPDF2 import PdfReader
            
            reader = PdfReader(input_path)
            doc = Document()
            doc.add_heading('Converted from PDF', 0)
            
            for page_num, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                if text.strip():
                    doc.add_heading(f'Page {page_num + 1}', level=2)
                    doc.add_paragraph(text)
            
            doc.save(output_path)
            
        except Exception as e2:
            raise Exception(f"Error converting PDF to Word: {str(e)} (Fallback also failed: {str(e2)})")


# ==================== NEW TOOLS ====================

def split_pdf(input_path: str, output_dir: str):
    """Split a PDF into individual pages."""
    try:
        from PyPDF2 import PdfReader, PdfWriter
        reader = PdfReader(input_path)
        output_paths = []
        
        for i, page in enumerate(reader.pages):
            writer = PdfWriter()
            writer.add_page(page)
            output_path = os.path.join(output_dir, f"page_{i + 1}.pdf")
            with open(output_path, 'wb') as f:
                writer.write(f)
            output_paths.append(output_path)
        
        return output_paths
    except Exception as e:
        raise Exception(f"Error splitting PDF: {str(e)}")


def remove_pages(input_path: str, output_path: str, page_numbers: list[int]):
    """Remove specified pages from a PDF file."""
    try:
        from PyPDF2 import PdfReader, PdfWriter
        reader = PdfReader(input_path)
        writer = PdfWriter()
        
        # Convert to 0-indexed and create set for faster lookup
        pages_to_remove = set(p - 1 for p in page_numbers)
        
        for i, page in enumerate(reader.pages):
            if i not in pages_to_remove:
                writer.add_page(page)
        
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise Exception(f"Error removing pages: {str(e)}")


def extract_pages(input_path: str, output_path: str, page_numbers: list[int]):
    """Extract specified pages from a PDF file."""
    try:
        from PyPDF2 import PdfReader, PdfWriter
        reader = PdfReader(input_path)
        writer = PdfWriter()
        
        # Convert to 0-indexed
        pages_to_extract = set(p - 1 for p in page_numbers)
        
        for i in sorted(pages_to_extract):
            if i < len(reader.pages):
                writer.add_page(reader.pages[i])
        
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise Exception(f"Error extracting pages: {str(e)}")


def rotate_pdf(input_path: str, output_path: str, angle: int = 90):
    """Rotate all pages in a PDF file."""
    try:
        from PyPDF2 import PdfReader, PdfWriter
        reader = PdfReader(input_path)
        writer = PdfWriter()
        
        # Normalize angle to 0, 90, 180, 270
        angle = angle % 360
        
        for page in reader.pages:
            page.rotate(angle)
            writer.add_page(page)
        
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise Exception(f"Error rotating PDF: {str(e)}")


def crop_pdf(input_path: str, output_path: str, page_number: int, left: float, top: float, right: float, bottom: float):
    """Crop a specific page in a PDF file."""
    try:
        from PyPDF2 import PdfReader, PdfWriter
        from PyPDF2.generic import RectangleObject
        
        reader = PdfReader(input_path)
        writer = PdfWriter()
        page_idx = page_number - 1
        
        if page_idx >= len(reader.pages):
            raise Exception("Page number out of range")
        
        page = reader.pages[page_idx]
        
        # Set crop box
        page.cropbox = RectangleObject([left, bottom, right, top])
        
        # Add all pages to writer, crop box applies to the one we set
        for i, p in enumerate(reader.pages):
            if i == page_idx:
                writer.add_page(page)
            else:
                writer.add_page(p)
        
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise Exception(f"Error cropping PDF: {str(e)}")


def add_watermark(input_path: str, output_path: str, watermark_text: str, opacity: float = 0.3):
    """Add text watermark to all pages of a PDF."""
    try:
        from PyPDF2 import PdfReader, PdfWriter
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        import io
        
        reader = PdfReader(input_path)
        writer = PdfWriter()
        
        for page in reader.pages:
            # Create watermark
            watermark_buffer = io.BytesIO()
            c = canvas.Canvas(watermark_buffer, pagesize=letter)
            c.setFont("Helvetica", 60)
            c.setFillAlpha(opacity)
            c.rotate(45)
            c.drawString(200, 100, watermark_text)
            c.save()
            
            watermark_buffer.seek(0)
            watermark_pdf = PdfReader(watermark_buffer)
            watermark_page = watermark_pdf.pages[0]
            
            # Merge watermark with original page
            page.merge_page(watermark_page)
            writer.add_page(page)
        
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise Exception(f"Error adding watermark: {str(e)}")


def add_page_numbers(input_path: str, output_path: str, position: str = "bottom-right"):
    """Add page numbers to a PDF document."""
    try:
        from PyPDF2 import PdfReader, PdfWriter
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        import io
        
        reader = PdfReader(input_path)
        writer = PdfWriter()
        
        positions = {
            "bottom-left": (30, 30),
            "bottom-right": (520, 30),
            "top-left": (30, 770),
            "top-right": (520, 770),
        }
        x, y = positions.get(position, positions["bottom-right"])
        
        for page_num, page in enumerate(reader.pages, 1):
            # Create page number
            number_buffer = io.BytesIO()
            c = canvas.Canvas(number_buffer, pagesize=letter)
            c.setFont("Helvetica", 10)
            c.drawString(x, y, f"Page {page_num}")
            c.save()
            
            number_buffer.seek(0)
            number_pdf = PdfReader(number_buffer)
            number_page = number_pdf.pages[0]
            
            # Merge with original page
            page.merge_page(number_page)
            writer.add_page(page)
        
        with open(output_path, 'wb') as f:
            writer.write(f)
    except Exception as e:
        raise Exception(f"Error adding page numbers: {str(e)}")


def repair_pdf(input_path: str, output_path: str):
    """Try to repair a damaged PDF file."""
    try:
        with pikepdf.open(input_path) as pdf:
            pdf.save(output_path, linearize=True)
    except Exception as e:
        # Fallback: Try with PyPDF2
        try:
            from PyPDF2 import PdfReader, PdfWriter
            reader = PdfReader(input_path)
            writer = PdfWriter()
            
            for page in reader.pages:
                writer.add_page(page)
            
            with open(output_path, 'wb') as f:
                writer.write(f)
        except Exception as e2:
            raise Exception(f"Error repairing PDF: {str(e)} | {str(e2)}")


def compare_pdfs(pdf1_path: str, pdf2_path: str) -> dict:
    """Compare two PDF files and return differences."""
    try:
        from PyPDF2 import PdfReader
        
        reader1 = PdfReader(pdf1_path)
        reader2 = PdfReader(pdf2_path)
        
        result = {
            "pdf1_pages": len(reader1.pages),
            "pdf2_pages": len(reader2.pages),
            "page_difference": abs(len(reader1.pages) - len(reader2.pages)),
            "same_page_count": len(reader1.pages) == len(reader2.pages),
        }
        
        return result
    except Exception as e:
        raise Exception(f"Error comparing PDFs: {str(e)}")


def powerpoint_to_pdf(input_path: str, output_path: str):
    """Convert a PowerPoint file to PDF."""
    try:
        import subprocess
        import platform
        
        try:
            if platform.system() == "Windows":
                subprocess.run([
                    "soffice",
                    "--headless",
                    "--convert-to", "pdf",
                    "--outdir", os.path.dirname(output_path) or ".",
                    input_path
                ], check=True, capture_output=True, timeout=60)
                
                temp_pdf = os.path.join(os.path.dirname(output_path) or ".", 
                                       os.path.splitext(os.path.basename(input_path))[0] + ".pdf")
                if temp_pdf != output_path and os.path.exists(temp_pdf):
                    os.rename(temp_pdf, output_path)
                return
            else:
                subprocess.run([
                    "libreoffice",
                    "--headless",
                    "--convert-to", "pdf",
                    "--outdir", os.path.dirname(output_path) or ".",
                    input_path
                ], check=True, capture_output=True, timeout=60)
                
                temp_pdf = os.path.join(os.path.dirname(output_path) or ".", 
                                       os.path.splitext(os.path.basename(input_path))[0] + ".pdf")
                if temp_pdf != output_path and os.path.exists(temp_pdf):
                    os.rename(temp_pdf, output_path)
                return
        except (subprocess.CalledProcessError, FileNotFoundError):
            raise Exception("LibreOffice not installed. Install LibreOffice for PowerPoint conversion.")
    except Exception as e:
        raise Exception(f"Error converting PowerPoint to PDF: {str(e)}")


def excel_to_pdf(input_path: str, output_path: str):
    """Convert an Excel file to PDF."""
    try:
        import subprocess
        import platform
        
        try:
            if platform.system() == "Windows":
                subprocess.run([
                    "soffice",
                    "--headless",
                    "--convert-to", "pdf",
                    "--outdir", os.path.dirname(output_path) or ".",
                    input_path
                ], check=True, capture_output=True, timeout=60)
                
                temp_pdf = os.path.join(os.path.dirname(output_path) or ".", 
                                       os.path.splitext(os.path.basename(input_path))[0] + ".pdf")
                if temp_pdf != output_path and os.path.exists(temp_pdf):
                    os.rename(temp_pdf, output_path)
                return
            else:
                subprocess.run([
                    "libreoffice",
                    "--headless",
                    "--convert-to", "pdf",
                    "--outdir", os.path.dirname(output_path) or ".",
                    input_path
                ], check=True, capture_output=True, timeout=60)
                
                temp_pdf = os.path.join(os.path.dirname(output_path) or ".", 
                                       os.path.splitext(os.path.basename(input_path))[0] + ".pdf")
                if temp_pdf != output_path and os.path.exists(temp_pdf):
                    os.rename(temp_pdf, output_path)
                return
        except (subprocess.CalledProcessError, FileNotFoundError):
            raise Exception("LibreOffice not installed. Install LibreOffice for Excel conversion.")
    except Exception as e:
        raise Exception(f"Error converting Excel to PDF: {str(e)}")

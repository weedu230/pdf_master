from PyPDF2 import PdfWriter

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
    quality_settings = {
        "low": {"compress_level": 9},
        "medium": {"compress_level": 6},
        "high": {"compress_level": 3},
    }
    
    settings = quality_settings.get(quality, quality_settings["medium"])
    
    try:
        with pikepdf.open(input_path) as pdf:
            # Try to save with compression. Skip object stream mode to avoid issues
            pdf.save(
                output_path,
                compress_streams=True,
                stream_decode_level=pikepdf.StreamDecodeLevel.all,
                normalize_content=False,  # Don't normalize to avoid breaking PDFs
            )
    except Exception as e:
        # Fallback: If pikepdf fails, try PyPDF2 compression
        try:
            from PyPDF2 import PdfReader, PdfWriter
            reader = PdfReader(input_path)
            writer = PdfWriter()
            
            for page in reader.pages:
                page.compress_content_streams()
                writer.add_page(page)
            
            with open(output_path, 'wb') as f:
                writer.write(f)
        except Exception as e2:
            raise Exception(f"Error compressing PDF (both methods failed): {str(e)} | {str(e2)}")


from pdf2image import convert_from_path
from PIL import Image
import os

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
        raise Exception(f"Error converting PDF to JPG: {str(e)}")


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
        # Try LibreOffice first (best quality, preserves everything)
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
            # LibreOffice not available, fallback to docx2pdf or better approach
            pass
        
        # Fallback: Use docx2pdf if available
        try:
            from docx2pdf import convert
            convert(input_path, output_path)
            return
        except (ImportError, Exception):
            pass
        
        # Last resort: Use python-docx with PIL to embed images in reportlab
        from docx import Document
        from docx.oxml import parse_xml
        from reportlab.lib.pagesizes import letter, A4
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle, PageBreak
        from reportlab.lib import colors
        from PIL import Image
        import io
        from copy import deepcopy
        
        doc = Document(input_path)
        
        # Create PDF
        pdf = SimpleDocTemplate(output_path, pagesize=letter, 
                               leftMargin=0.5*inch, rightMargin=0.5*inch,
                               topMargin=0.5*inch, bottomMargin=0.5*inch)
        elements = []
        styles = getSampleStyleSheet()
        
        # Add custom styles for better formatting
        normal_style = ParagraphStyle(
            'CustomNormal',
            parent=styles['Normal'],
            fontSize=11,
            leading=14,
            spaceAfter=6
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading1'],
            fontSize=14,
            leading=16,
            spaceAfter=12,
            textColor=colors.HexColor('#1a1a1a'),
            fontName='Helvetica-Bold'
        )
        
        # Process paragraphs with images
        for para in doc.paragraphs:
            # Check for inline images
            for run in para.runs:
                # Extract images from runs
                for drawing in run._element.findall('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}drawing'):
                    try:
                        # Extract image from drawing
                        blip = drawing.find('.//{http://schemas.openxmlformats.org/drawingml/2006/main}blip')
                        if blip is not None:
                            embed_id = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                            if embed_id:
                                image_part = doc.part.related_part(embed_id)
                                image_data = image_part.blob
                                
                                # Save and add to PDF
                                img_temp = io.BytesIO(image_data)
                                img = RLImage(img_temp, width=4*inch, height=3*inch)
                                elements.append(img)
                                elements.append(Spacer(1, 0.2*inch))
                    except Exception:
                        pass
            
            # Add paragraph text
            if para.text.strip():
                style = heading_style if para.style.name.startswith('Heading') else normal_style
                elements.append(Paragraph(para.text, style))
                elements.append(Spacer(1, 0.1*inch))
        
        # Handle tables
        for table in doc.tables:
            table_data = []
            for row in table.rows:
                row_data = []
                for cell in row.cells:
                    row_data.append(Paragraph(cell.text or "", styles['Normal']))
                table_data.append(row_data)
            
            if table_data:
                t = Table(table_data, colWidths=[2*inch]*len(table_data[0]))
                t.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 10),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                    ('GRID', (0, 0), (-1, -1), 1, colors.black)
                ]))
                elements.append(t)
                elements.append(Spacer(1, 0.2*inch))
        
        pdf.build(elements)
        
    except ImportError as ie:
        raise Exception(f"Required libraries not installed. Error: {str(ie)}")
    except Exception as e:
        raise Exception(f"Error converting Word to PDF: {str(e)}")


def pdf_to_word(input_path: str, output_path: str):
    """Convert a PDF file to a Word document (DOCX) with improved formatting."""
    try:
        from pdf2docx import convert
        
        # Use pdf2docx with better settings
        convert(input_path, output_path, start=0, end=None)
        
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
                text = page.extract_text()
                if text.strip():
                    doc.add_heading(f'Page {page_num + 1}', level=2)
                    doc.add_paragraph(text)
            
            doc.save(output_path)
            
        except Exception as e2:
            raise Exception(f"Error converting PDF to Word: {str(e)} (Fallback also failed: {str(e2)})")


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
        "low": {"/PreserveHalftone": False, "/ColorImageResolution": 100},
        "medium": {"/PreserveHalftone": False, "/ColorImageResolution": 150},
        "high": {"/PreserveHalftone": True, "/ColorImageResolution": 300},
    }
    
    try:
        with pikepdf.open(input_path) as pdf:
            pdf.save(output_path, compress_streams=True, optimize_streams=True)
    except Exception as e:
        raise Exception(f"Error compressing PDF: {str(e)}")


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
    """Convert a Word document (DOCX) to PDF."""
    try:
        from docx import Document
        from docx.shared import Pt, Inches
        
        # Read the Word document
        doc = Document(input_path)
        
        # For a simple approach, we'll use python-docx with reportlab
        # In production, you might want to use more robust tools like LibreOffice
        from reportlab.lib.pagesizes import letter
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
        from reportlab.lib.units import inch
        
        # Create PDF
        pdf = SimpleDocTemplate(output_path, pagesize=letter)
        elements = []
        styles = getSampleStyleSheet()
        style = styles['Normal']
        
        # Extract text and structure from Word doc
        for para in doc.paragraphs:
            if para.text.strip():
                elements.append(Paragraph(para.text, style))
                elements.append(Spacer(1, 0.2*inch))
        
        # Handle tables if any
        for table in doc.tables:
            for row in table.rows:
                row_text = " | ".join([cell.text for cell in row.cells])
                if row_text.strip():
                    elements.append(Paragraph(row_text, style))
                    elements.append(Spacer(1, 0.1*inch))
        
        pdf.build(elements)
        
    except ImportError:
        raise Exception("Required libraries not installed. Install python-docx and reportlab")
    except Exception as e:
        raise Exception(f"Error converting Word to PDF: {str(e)}")


def pdf_to_word(input_path: str, output_path: str):
    """Convert a PDF file to a Word document (DOCX)."""
    try:
        from pdf2docx import parse
        
        # Convert PDF to DOCX
        parse(input_path, output_path)
        
    except ImportError:
        raise Exception("Required library pdf2docx not installed")
    except Exception as e:
        raise Exception(f"Error converting PDF to Word: {str(e)}")


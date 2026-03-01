from fastapi import APIRouter, File, UploadFile, Form, BackgroundTasks, HTTPException
from fastapi.responses import FileResponse
import os
import tempfile
from app.utils.file_helpers import create_temp_file, cleanup_file
from app.utils.pdf_operations import (
    merge_pdfs,
    compress_pdf,
    pdf_to_jpg,
    jpg_to_pdf,
    protect_pdf,
    unlock_pdf,
    word_to_pdf,
    pdf_to_word,
    split_pdf,
    remove_pages,
    extract_pages,
    rotate_pdf,
    crop_pdf,
    add_watermark,
    add_page_numbers,
    repair_pdf,
    compare_pdfs,
    powerpoint_to_pdf,
    excel_to_pdf,
)
import zipfile
import shutil

router = APIRouter(prefix="/api", tags=["pdf"])


def is_allowed_file(upload_file: UploadFile, allowed_content_types: set[str], allowed_extensions: tuple[str, ...]) -> bool:
    content_type = (upload_file.content_type or "").lower()
    filename = (upload_file.filename or "").lower()
    return content_type in allowed_content_types or filename.endswith(allowed_extensions)


def is_pdf_file(upload_file: UploadFile) -> bool:
    return is_allowed_file(upload_file, {"application/pdf", "application/octet-stream"}, (".pdf",))


@router.post("/merge")
async def merge(background_tasks: BackgroundTasks, files: list[UploadFile] = File(...)):
    """Merge multiple PDF files into one."""
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="Please provide at least 2 PDF files")
    
    temp_paths = []
    output_path = None
    
    try:
        # Save uploaded files to temp
        for upload_file in files:
            if not is_pdf_file(upload_file):
                raise HTTPException(status_code=400, detail="All files must be PDF files")
            
            temp_path = create_temp_file(".pdf")
            content = await upload_file.read()
            with open(temp_path, "wb") as f:
                f.write(content)
            temp_paths.append(temp_path)
        
        # Merge PDFs
        output_path = create_temp_file(".pdf")
        merge_pdfs(temp_paths, output_path)
        
        # Schedule cleanup
        for temp_path in temp_paths + [output_path]:
            background_tasks.add_task(cleanup_file, temp_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="merged.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        # Cleanup on error
        for path in temp_paths + ([output_path] if output_path else []):
            cleanup_file(path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compress")
async def compress(background_tasks: BackgroundTasks, file: UploadFile = File(...), quality: str = Form("medium")):
    """Compress a PDF file."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        # Save uploaded file
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        # Compress
        output_path = create_temp_file(".pdf")
        compress_pdf(temp_path, output_path, quality)
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="compressed.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pdf-to-jpg")
async def pdf_to_jpg_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...), dpi: str = Form("150")):
    """Convert PDF pages to JPG images."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_pdf = None
    temp_dir = None
    zip_path = None
    
    try:
        # Save PDF
        temp_pdf = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_pdf, "wb") as f:
            f.write(content)
        
        # Convert to JPG
        temp_dir = tempfile.mkdtemp()
        image_paths = pdf_to_jpg(temp_pdf, temp_dir, int(dpi))
        
        # Create ZIP archive
        zip_path = create_temp_file(".zip")
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for img_path in image_paths:
                arcname = os.path.basename(img_path)
                zipf.write(img_path, arcname=arcname)
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_file, temp_pdf)
        background_tasks.add_task(shutil.rmtree, temp_dir, ignore_errors=True)
        background_tasks.add_task(cleanup_file, zip_path)
        
        return FileResponse(
            zip_path,
            media_type="application/zip",
            filename="images.zip",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_pdf:
            cleanup_file(temp_pdf)
        if temp_dir:
            shutil.rmtree(temp_dir, ignore_errors=True)
        if zip_path:
            cleanup_file(zip_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/jpg-to-pdf")
async def jpg_to_pdf_endpoint(background_tasks: BackgroundTasks, files: list[UploadFile] = File(...)):
    """Convert JPG images to PDF."""
    if len(files) == 0:
        raise HTTPException(status_code=400, detail="Please provide at least 1 image file")
    
    temp_paths = []
    output_path = None
    
    try:
        # Save uploaded files
        for upload_file in files:
            if upload_file.content_type not in ["image/jpeg", "image/png"]:
                raise HTTPException(status_code=400, detail="Files must be JPG or PNG images")
            
            temp_path = create_temp_file(".jpg")
            content = await upload_file.read()
            with open(temp_path, "wb") as f:
                f.write(content)
            temp_paths.append(temp_path)
        
        # Convert to PDF
        output_path = create_temp_file(".pdf")
        jpg_to_pdf(temp_paths, output_path)
        
        # Schedule cleanup
        for temp_path in temp_paths + [output_path]:
            background_tasks.add_task(cleanup_file, temp_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="document.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        for path in temp_paths + ([output_path] if output_path else []):
            cleanup_file(path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/protect")
async def protect(background_tasks: BackgroundTasks, file: UploadFile = File(...), password: str = Form(...)):
    """Add password protection to PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    if not password:
        raise HTTPException(status_code=400, detail="Password is required")
    
    temp_path = None
    output_path = None
    
    try:
        # Save uploaded file
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        # Protect
        output_path = create_temp_file(".pdf")
        protect_pdf(temp_path, output_path, password)
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="protected.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/unlock")
async def unlock(background_tasks: BackgroundTasks, file: UploadFile = File(...), password: str = Form(default="")):
    """Remove password protection from PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        # Save uploaded file
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        # Unlock
        output_path = create_temp_file(".pdf")
        unlock_pdf(temp_path, output_path, password if password else None)
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="unlocked.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/word-to-pdf")
async def word_to_pdf_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Convert a Word document (DOCX) to PDF."""
    if not is_allowed_file(
        file,
        {
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
            "application/octet-stream",
        },
        (".doc", ".docx"),
    ):
        raise HTTPException(status_code=400, detail="File must be a Word document (.docx or .doc)")
    
    temp_path = None
    output_path = None
    
    try:
        # Save uploaded file
        temp_path = create_temp_file(".docx")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        # Convert to PDF
        output_path = create_temp_file(".pdf")
        from app.utils.pdf_operations import word_to_pdf
        word_to_pdf(temp_path, output_path)
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="converted.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pdf-to-word")
async def pdf_to_word_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Convert a PDF file to a Word document (DOCX)."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        # Save uploaded file
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        # Convert to Word
        output_path = create_temp_file(".docx")
        from app.utils.pdf_operations import pdf_to_word
        pdf_to_word(temp_path, output_path)
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename="converted.docx",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


# ==================== NEW TOOLS ROUTES ====================

@router.post("/split")
async def split(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Split a PDF into individual pages."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_dir = None
    zip_path = None
    
    try:
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        output_dir = tempfile.mkdtemp()
        from app.utils.pdf_operations import split_pdf
        output_paths = split_pdf(temp_path, output_dir)
        
        zip_path = create_temp_file(".zip")
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for output_path in output_paths:
                zipf.write(output_path, os.path.basename(output_path))
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, zip_path)
        for path in output_paths:
            background_tasks.add_task(cleanup_file, path)
        
        return FileResponse(
            zip_path,
            media_type="application/zip",
            filename="split_pages.zip",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if zip_path:
            cleanup_file(zip_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/remove-pages")
async def remove_pages_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...), pages: str = Form(...)):
    """Remove specified pages from a PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        page_numbers = [int(p.strip()) for p in pages.split(",")]
        output_path = create_temp_file(".pdf")
        
        from app.utils.pdf_operations import remove_pages
        remove_pages(temp_path, output_path, page_numbers)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="removed_pages.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/extract-pages")
async def extract_pages_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...), pages: str = Form(...)):
    """Extract specified pages from a PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        page_numbers = [int(p.strip()) for p in pages.split(",")]
        output_path = create_temp_file(".pdf")
        
        from app.utils.pdf_operations import extract_pages
        extract_pages(temp_path, output_path, page_numbers)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="extracted_pages.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/rotate")
async def rotate(background_tasks: BackgroundTasks, file: UploadFile = File(...), angle: int = Form(90)):
    """Rotate all pages in a PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        output_path = create_temp_file(".pdf")
        from app.utils.pdf_operations import rotate_pdf
        rotate_pdf(temp_path, output_path, angle)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="rotated.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/crop")
async def crop(background_tasks: BackgroundTasks, file: UploadFile = File(...), page: int = Form(1), left: float = Form(0), top: float = Form(800), right: float = Form(600), bottom: float = Form(0)):
    """Crop a page in a PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        output_path = create_temp_file(".pdf")
        from app.utils.pdf_operations import crop_pdf
        crop_pdf(temp_path, output_path, page, left, top, right, bottom)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="cropped.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/watermark")
async def watermark(background_tasks: BackgroundTasks, file: UploadFile = File(...), text: str = Form("WATERMARK"), opacity: float = Form(0.3)):
    """Add watermark to a PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        output_path = create_temp_file(".pdf")
        from app.utils.pdf_operations import add_watermark
        add_watermark(temp_path, output_path, text, opacity)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="watermarked.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/page-numbers")
async def page_numbers(background_tasks: BackgroundTasks, file: UploadFile = File(...), position: str = Form("bottom-right")):
    """Add page numbers to a PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        output_path = create_temp_file(".pdf")
        from app.utils.pdf_operations import add_page_numbers
        add_page_numbers(temp_path, output_path, position)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="page_numbers.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/repair")
async def repair(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Repair a damaged PDF."""
    if not is_pdf_file(file):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".pdf")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        output_path = create_temp_file(".pdf")
        from app.utils.pdf_operations import repair_pdf
        repair_pdf(temp_path, output_path)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="repaired.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare")
async def compare(background_tasks: BackgroundTasks, file1: UploadFile = File(...), file2: UploadFile = File(...)):
    """Compare two PDF files."""
    if not is_pdf_file(file1) or not is_pdf_file(file2):
        raise HTTPException(status_code=400, detail="Both files must be PDFs")
    
    temp_path1 = None
    temp_path2 = None
    
    try:
        temp_path1 = create_temp_file(".pdf")
        content1 = await file1.read()
        with open(temp_path1, "wb") as f:
            f.write(content1)
        
        temp_path2 = create_temp_file(".pdf")
        content2 = await file2.read()
        with open(temp_path2, "wb") as f:
            f.write(content2)
        
        from app.utils.pdf_operations import compare_pdfs
        result = compare_pdfs(temp_path1, temp_path2)
        
        background_tasks.add_task(cleanup_file, temp_path1)
        background_tasks.add_task(cleanup_file, temp_path2)
        
        return result
    
    except Exception as e:
        if temp_path1:
            cleanup_file(temp_path1)
        if temp_path2:
            cleanup_file(temp_path2)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/powerpoint-to-pdf")
async def powerpoint_to_pdf_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Convert PowerPoint to PDF."""
    if not is_allowed_file(
        file,
        {
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/octet-stream",
        },
        (".ppt", ".pptx"),
    ):
        raise HTTPException(status_code=400, detail="File must be a PowerPoint file")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".pptx")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        output_path = create_temp_file(".pdf")
        from app.utils.pdf_operations import powerpoint_to_pdf
        powerpoint_to_pdf(temp_path, output_path)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="converted.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/excel-to-pdf")
async def excel_to_pdf_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Convert Excel to PDF."""
    if not is_allowed_file(
        file,
        {
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/octet-stream",
        },
        (".xls", ".xlsx"),
    ):
        raise HTTPException(status_code=400, detail="File must be an Excel file")
    
    temp_path = None
    output_path = None
    
    try:
        temp_path = create_temp_file(".xlsx")
        content = await file.read()
        with open(temp_path, "wb") as f:
            f.write(content)
        
        output_path = create_temp_file(".pdf")
        from app.utils.pdf_operations import excel_to_pdf
        excel_to_pdf(temp_path, output_path)
        
        background_tasks.add_task(cleanup_file, temp_path)
        background_tasks.add_task(cleanup_file, output_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename="converted.pdf",
            background=background_tasks
        )
    
    except Exception as e:
        if temp_path:
            cleanup_file(temp_path)
        if output_path:
            cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


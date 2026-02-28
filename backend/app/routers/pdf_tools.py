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
)
import zipfile
import shutil

router = APIRouter(prefix="/api", tags=["pdf"])


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
            if upload_file.content_type != "application/pdf":
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
    if file.content_type != "application/pdf":
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
        cleanup_file(temp_path)
        cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pdf-to-jpg")
async def pdf_to_jpg_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...), dpi: str = Form("150")):
    """Convert PDF pages to JPG images."""
    if file.content_type != "application/pdf":
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
        cleanup_file(temp_pdf)
        if temp_dir:
            shutil.rmtree(temp_dir, ignore_errors=True)
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
    if file.content_type != "application/pdf":
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
        cleanup_file(temp_path)
        cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/unlock")
async def unlock(background_tasks: BackgroundTasks, file: UploadFile = File(...), password: str = Form(default="")):
    """Remove password protection from PDF."""
    if file.content_type != "application/pdf":
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
        cleanup_file(temp_path)
        cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/word-to-pdf")
async def word_to_pdf_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Convert a Word document (DOCX) to PDF."""
    if file.content_type not in ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"]:
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
        cleanup_file(temp_path)
        cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pdf-to-word")
async def pdf_to_word_endpoint(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Convert a PDF file to a Word document (DOCX)."""
    if file.content_type != "application/pdf":
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
        cleanup_file(temp_path)
        cleanup_file(output_path)
        raise HTTPException(status_code=500, detail=str(e))

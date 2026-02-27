# PDF Master Backend API

FastAPI-based backend for PDF manipulation tools.

## Features
- Merge PDFs
- Compress PDFs
- Convert PDF to JPG
- Convert JPG to PDF
- Protect PDFs with password
- Unlock PDFs
- CORS enabled
- Health check endpoint

## Installation

```bash
cd backend
pip install -r requirements.txt
```

## Development

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

- `POST /api/merge` - Merge multiple PDFs
- `POST /api/compress` - Compress a PDF
- `POST /api/pdf-to-jpg` - Convert PDF to JPG images
- `POST /api/jpg-to-pdf` - Convert JPG images to PDF
- `POST /api/protect` - Add password protection
- `POST /api/unlock` - Remove password protection

## Environment Variables

Create a `.env` file in the backend directory:

```
FASTAPI_ENV=development
SECRET_KEY=your-secret-key-here
```

## Dependencies

- FastAPI - Web framework
- Uvicorn - ASGI server
- PyPDF2 - PDF merging
- pikepdf - PDF compression & encryption
- pdf2image - PDF to image conversion
- Pillow - Image processing
- python-multipart - Form data parsing

## Production Deployment

For production, consider:
1. Using a proper production ASGI server like Gunicorn with Uvicorn
2. Setting up proper CORS restrictions
3. Adding rate limiting
4. Implementing file size limits
5. Using a more secure secret key
6. Setting up async task queues for large file processing

# PDF Master Backend

FastAPI backend for PDF manipulation.

## Development

```bash
python -m venv venv
source venv/bin/activate  # or: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## API Documentation

Visit `http://localhost:8000/docs` for interactive API docs.

## Tech Stack

- FastAPI for REST API
- PyPDF2 for PDF manipulation
- pikepdf for compression
- pdf2image, Pillow for image conversion
- python-docx, pdf2docx for Word conversion
- reportlab for PDF generation

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

### Organize PDF
- `POST /api/merge` - Merge multiple PDFs
- `POST /api/split` - Split PDF into individual pages (returns ZIP)
- `POST /api/remove-pages` - Remove specific pages (comma-separated)
- `POST /api/extract-pages` - Extract selected pages

### Optimize PDF
- `POST /api/compress` - Compress a PDF
- `POST /api/repair` - Repair corrupted PDF

### Convert To PDF
- `POST /api/jpg-to-pdf` - Convert JPG images to PDF
- `POST /api/word-to-pdf` - Convert Word (DOCX) to PDF
- `POST /api/powerpoint-to-pdf` - Convert PowerPoint to PDF
- `POST /api/excel-to-pdf` - Convert Excel to PDF

### Convert From PDF
- `POST /api/pdf-to-jpg` - Convert PDF to JPG images (returns ZIP)
- `POST /api/pdf-to-word` - Convert PDF to Word (DOCX)

### Edit PDF
- `POST /api/rotate` - Rotate PDF pages (angle: 90/180/270)
- `POST /api/crop` - Crop PDF pages (requires coordinates)
- `POST /api/watermark` - Add text watermark (custom text + opacity)
- `POST /api/page-numbers` - Add page numbers (configurable position)

### PDF Security
- `POST /api/protect` - Add password protection
- `POST /api/unlock` - Remove password protection

### PDF Intelligence
- `POST /api/compare` - Compare two PDFs (returns JSON)

## Environment Variables

Create a `.env` file in the backend directory:

```
FASTAPI_ENV=development
SECRET_KEY=your-secret-key-here
```

## Dependencies

- FastAPI - Web framework
- Uvicorn - ASGI server
- PyPDF2 - PDF manipulation
- pikepdf - PDF compression & encryption
- pdf2image - PDF to image conversion
- Pillow - Image processing
- python-docx - Word document handling
- pdf2docx - PDF to Word conversion
- reportlab - PDF generation
- python-multipart - Form data parsing
- python-dotenv - Environment variables

## Production Deployment

For production, consider:
1. Using a proper production ASGI server like Gunicorn with Uvicorn
2. Setting up proper CORS restrictions
3. Adding rate limiting
4. Implementing file size limits
5. Using a more secure secret key
6. Setting up async task queues for large file processing

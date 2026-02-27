# PDF Master - API Reference

Complete reference for PDF Master API endpoints.

## Base URL

**Development:** `http://localhost:8000`
**Production:** `https://api.pdfmaster.com` (example)

## Endpoints

### Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "healthy"
}
```

---

### Merge PDFs

**POST** `/api/merge`

Merge multiple PDF files into a single PDF.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `files` (File, required, multiple): PDF files to merge

**Response:**
- Content-Type: application/pdf
- Returns: Merged PDF file

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/merge" \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf" \
  -F "files=@file3.pdf" \
  --output merged.pdf
```

**Example (Python):**
```python
import requests

files = [
    ('files', open('file1.pdf', 'rb')),
    ('files', open('file2.pdf', 'rb')),
]
response = requests.post('http://localhost:8000/api/merge', files=files)

with open('merged.pdf', 'wb') as f:
    f.write(response.content)
```

---

### Compress PDF

**POST** `/api/compress`

Compress a PDF file with specified quality level.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `file` (File, required): PDF file to compress
  - `quality` (Form, required): Quality level (`low`, `medium`, `high`)

**Response:**
- Content-Type: application/pdf
- Returns: Compressed PDF file

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/compress" \
  -F "file=@input.pdf" \
  -F "quality=medium" \
  --output compressed.pdf
```

**Quality Levels:**
- `low`: High compression, lower quality
- `medium`: Balanced compression and quality
- `high`: Lower compression, better quality

---

### Convert PDF to JPG

**POST** `/api/pdf-to-jpg`

Convert all pages of a PDF to JPG images (returned as ZIP).

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `file` (File, required): PDF file to convert
  - `dpi` (Form, required): Image quality/DPI (`72`, `150`, `300`)

**Response:**
- Content-Type: application/zip
- Returns: ZIP file containing JPG images

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/pdf-to-jpg" \
  -F "file=@input.pdf" \
  -F "dpi=150" \
  --output images.zip
```

**DPI Options:**
- `72`: Low quality, smaller files
- `150`: Standard quality
- `300`: High quality

---

### Convert JPG to PDF

**POST** `/api/jpg-to-pdf`

Convert one or more JPG/PNG images into a single PDF file.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `files` (File, required, multiple): Image files (JPG/PNG)

**Response:**
- Content-Type: application/pdf
- Returns: PDF file

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/jpg-to-pdf" \
  -F "files=@image1.jpg" \
  -F "files=@image2.jpg" \
  -F "files=@image3.png" \
  --output document.pdf
```

---

### Protect PDF

**POST** `/api/protect`

Add password protection to a PDF file.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `file` (File, required): PDF file to protect
  - `password` (Form, required): Password to set

**Response:**
- Content-Type: application/pdf
- Returns: Password-protected PDF file

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/protect" \
  -F "file=@input.pdf" \
  -F "password=mySecurePassword123" \
  --output protected.pdf
```

**Security Notes:**
- Uses AES-256 encryption by default
- Password is required to open the PDF
- Should be transmitted over HTTPS in production

---

### Unlock PDF

**POST** `/api/unlock`

Remove password protection from a PDF file.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `file` (File, required): Password-protected PDF file
  - `password` (Form, optional): Password (if required)

**Response:**
- Content-Type: application/pdf
- Returns: Unlocked PDF file

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/unlock" \
  -F "file=@protected.pdf" \
  -F "password=mySecurePassword123" \
  --output unlocked.pdf
```

**Example with no password:**
```bash
curl -X POST "http://localhost:8000/api/unlock" \
  -F "file=@protected.pdf" \
  --output unlocked.pdf
```

---

## Error Handling

All endpoints return appropriate HTTP status codes and error messages.

### Error Response Format

```json
{
  "detail": "Error description here"
}
```

### Common Error Codes

- `400 Bad Request`: Invalid input or missing required fields
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server-side processing error

### Example Error Response

```json
{
  "detail": "File must be a PDF"
}
```

---

## Rate Limiting & File Size

**Current Limits:**
- Max file size: Depends on server memory (typically 500MB)
- Max files per request: Unlimited (practical limit: 10-20)
- No rate limiting (implement in production)

**Recommendations for Production:**
- Implement rate limiting: 100 requests/minute
- File size limit: 100MB per file
- Total upload size: 500MB per request
- Timeout: 30 seconds

---

## Authentication (Optional Feature)

Currently, all endpoints are public. To implement authentication:

1. Add JWT token validation
2. Endpoints would require: `Authorization: Bearer {token}`
3. Implement rate limiting per user
4. Track usage history in database

---

## Testing with Postman

1. Open Postman
2. Create requests for each endpoint
3. Use form-data for file uploads
4. Set appropriate headers automatically
5. Save collection for reuse

**Collection Template:**
```json
{
  "info": {
    "name": "PDF Master API",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Merge PDFs",
      "request": {
        "method": "POST",
        "url": "http://localhost:8000/api/merge"
      }
    },
    // ... more endpoints
  ]
}
```

---

## Performance Notes

- **File Processing Time:** Varies based on file size and complexity
- **Network:** Large files take longer to upload/download
- **Server Resources:** PDFs are processed in memory; very large files may cause slowness

**Optimization Tips:**
- Compress before uploading for faster transfers
- Use lower DPI for PDF→JPG if quality allows
- Process multiple files sequentially, not in parallel

---

## Support

For API issues:
1. Check error message details
2. Verify file format and size
3. Test with sample files first
4. Check backend logs for details
5. Report bugs with reproduction steps

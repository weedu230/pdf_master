# 📘 PDF Master - Complete Manual

A complete reference guide for PDF Master—from setup to deployment.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation](#installation)
3. [Running Locally](#running-locally)
4. [Testing the Application](#testing-the-application)
5. [API Reference](#api-reference)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)
8. [Development](#development)

---

## Project Overview

**PDF Master** is a full-stack web application for PDF manipulation tools.

### What It Does
- Merge multiple PDFs
- Compress PDFs with quality control
- Convert PDF pages to JPG images
- Convert images to PDF
- Add password protection to PDFs
- Remove password protection

### Technology Stack

**Frontend:**
- React 18 (UI framework)
- Vite (bundler)
- Tailwind CSS (styling)
- React Router (navigation)
- Axios (API calls)

**Backend:**
- FastAPI (web framework)
- Python 3.11+
- PyPDF2 (merging)
- pikepdf (compression, encryption)
- pdf2image (conversion)
- Pillow (image processing)

---

## Installation

### Prerequisites

1. **Python 3.8+**
   - Download: https://python.org
   - Verify: `python --version`

2. **Node.js 16+** (for frontend)
   - Download: https://nodejs.org
   - Verify: `node --version` and `npm --version`

3. **Git** (optional, for version control)
   - Download: https://git-scm.com

### System-Specific Setup

#### Windows

1. **Python:**
   ```powershell
   # Verify installation
   python --version
   
   # Should output: Python 3.x.x
   ```

2. **Node.js:**
   ```powershell
   node --version
   npm --version
   ```

3. **For `pdf2image` support** (optional):
   - Download Poppler: https://github.com/oschwartz10612/poppler-windows/releases/
   - Extract to `C:\Program Files\poppler`
   - Add to system PATH

#### macOS

```bash
# Install Python via Homebrew
brew install python

# Install Node.js
brew install node

# For PDF support
brew install poppler
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install python3 python3-pip nodejs npm poppler-utils
```

---

## Running Locally

### Quick Start (Recommended)

#### Windows
```powershell
# Just double-click:
setup-and-run.bat
```

#### macOS/Linux
```bash
bash start.sh
```

### Manual Setup

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Application startup complete.
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected output:**
```
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### Access the Application

| Component | URL |
|-----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (ReDoc) | http://localhost:8000/redoc |

---

## Testing the Application

### Verify Installation

```bash
python verify.py
```

This checks:
- Python version and packages
- Backend structure and imports
- Frontend files
- Documentation
- API configuration

### Manual Testing

#### Test 1: Home Page
- Visit http://localhost:5173
- Should see 6 tool cards
- Click each card (should navigate)

#### Test 2: Merge PDF
1. Go to `/merge`
2. Upload 2+ PDF files using drag-and-drop or file picker
3. Click "Merge PDFs"
4. Download should start (merged.pdf)

#### Test 3: Compress PDF
1. Go to `/compress`
2. Upload a PDF
3. Select quality level (low/medium/high)
4. Click "Compress PDF"
5. Download should start (compressed.pdf)

#### Test 4: PDF to JPG
1. Go to `/pdf-to-jpg`
2. Upload a PDF
3. Select DPI (72/150/300)
4. Click "Convert to JPG"
5. Download ZIP file with images

#### Test 5: JPG to PDF
1. Go to `/jpg-to-pdf`
2. Upload 1+ JPG/PNG files
3. Click "Convert to PDF"
4. Download should start (document.pdf)

#### Test 6: Protect PDF
1. Go to `/protect`
2. Upload a PDF
3. Set password (with confirmation)
4. Click "Protect PDF"
5. Download should start (protected.pdf)

#### Test 7: Unlock PDF
1. Go to `/unlock`
2. Upload a protected PDF
3. Enter password (if required)
4. Click "Unlock PDF"
5. Download should start (unlocked.pdf)

### API Testing with cURL

```bash
# Test Merge
curl -X POST http://localhost:8000/api/merge \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf" \
  -o merged.pdf

# Test Compress
curl -X POST http://localhost:8000/api/compress \
  -F "file=@input.pdf" \
  -F "quality=medium" \
  -o compressed.pdf

# Test Health
curl http://localhost:8000/health
# Should return: {"status":"healthy"}
```

---

## API Reference

### Base URL

**Development:** `http://localhost:8000`

### Endpoints

All endpoints are under `/api/` prefix.

#### POST /api/merge
Merge multiple PDF files.

**Request:**
```
Content-Type: multipart/form-data
Body:
  files: [PDF File 1, PDF File 2, ...]
```

**Response:** Binary PDF file

#### POST /api/compress
Compress a single PDF.

**Request:**
```
Content-Type: multipart/form-data
Body:
  file: PDF File
  quality: low | medium | high
```

**Response:** Binary PDF file

#### POST /api/pdf-to-jpg
Convert PDF pages to JPG images.

**Request:**
```
Content-Type: multipart/form-data
Body:
  file: PDF File
  dpi: 72 | 150 | 300
```

**Response:** Binary ZIP file containing JPG images

#### POST /api/jpg-to-pdf
Convert JPG/PNG images to PDF.

**Request:**
```
Content-Type: multipart/form-data
Body:
  files: [Image File 1, Image File 2, ...]
```

**Response:** Binary PDF file

#### POST /api/protect
Add password protection to PDF.

**Request:**
```
Content-Type: multipart/form-data
Body:
  file: PDF File
  password: string
```

**Response:** Binary PDF file (encrypted)

#### POST /api/unlock
Remove password protection from PDF.

**Request:**
```
Content-Type: multipart/form-data
Body:
  file: PDF File (encrypted)
  password: string (optional)
```

**Response:** Binary PDF file (unencrypted)

#### GET /health
Health check endpoint.

**Response:**
```json
{"status": "healthy"}
```

---

## Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "PDF Master - Initial release"
   git push origin main
   ```

2. **Import in Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Framework: Vite
   - Root Directory: `frontend`
   - Click "Deploy"

3. **Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-url.onrender.com/api`

### Backend Deployment (Render)

1. **Push to GitHub** (if not already done)

2. **Create Web Service on Render**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Select your GitHub repo
   - Fill in details:
     - Name: `pdf-master-api`
     - Environment: `Python 3`
     - Build Command: `pip install -r backend/requirements.txt`
     - Start Command: `cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000`

3. **Environment Variables** (if needed)
   - Add any secrets or config in Render dashboard

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your API URL (e.g., https://pdf-master-api.onrender.com)

### Configure CORS for Production

Edit `backend/app/main.py`:

```python
# Change from:
allow_origins=["*"]

# To:
allow_origins=[
    "https://your-frontend-url.vercel.app",
    "https://www.your-domain.com",
]
```

Then redeploy backend.

### Custom Domain (Optional)

**Frontend (Vercel):**
1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS instructions

**Backend (Render):**
1. Go to Web Service settings
2. Click "Custom Domain"
3. Add your domain
4. Follow DNS instructions

---

## Troubleshooting

### Python Issues

**"Python not found"**
- Install from https://python.org
- Make sure to check "Add Python to PATH" during installation
- Restart terminal after installation

**"No module named fastapi"**
- Make sure venv is activated
- Run: `pip install -r requirements.txt`

**"Poppler not found"**
- For `pdf2image` functionality:
  - Windows: Download from https://github.com/oschwartz10612/poppler-windows/releases/
  - macOS: `brew install poppler`
  - Linux: `sudo apt install poppler-utils`

### Node.js Issues

**"npm command not found"**
- Install Node.js from https://nodejs.org
- Make sure to check "Add to PATH" during installation
- Restart terminal

**"Port 5173 already in use"**
- Run on different port: `npm run dev -- --port 3000`

### API Connection Issues

**"Cannot connect to backend"**
- Make sure backend is running on port 8000
- Check that Uvicorn shows "Application startup complete"
- In browser, try: http://localhost:8000/health

**"CORS error"**
- This is normal development behavior
- Backend correctly has CORS enabled
- In production, CORS is more restrictive

**"API URL not correct"**
- Check `frontend/.env.local` has: `VITE_API_URL=http://localhost:8000/api`
- Restart frontend dev server if you changed it

### File Upload Issues

**"File too large"**
- Typical limit: 500MB per operation
- For large files, consider splitting

**"PDF corrupt or invalid"**
- Try with a different PDF file
- Check backend logs for details

---

## Development

### Project Structure

```
pdf-master/
├── frontend/                    # React app
│   ├── src/
│   │   ├── pages/              # 7 tool pages
│   │   ├── components/         # Shared components
│   │   └── App.jsx             # Main routing
│   ├── public/                 # Static files
│   └── package.json            # Dependencies
│
├── backend/                     # FastAPI app
│   ├── app/
│   │   ├── main.py            # FastAPI setup
│   │   ├── routers/           # API endpoints
│   │   └── utils/             # Helpers
│   └── requirements.txt        # Dependencies
│
└── [Documentation files]
```

### Adding a New PDF Tool

1. **Create backend endpoint** in `backend/app/routers/pdf_tools.py`:
   ```python
   @router.post("/api/my-tool")
   async def my_tool(background_tasks, file: UploadFile):
       # Implementation
       pass
   ```

2. **Create frontend page** in `frontend/src/pages/MyToolPage.jsx`:
   ```jsx
   export default function MyToolPage() {
       return (/* UI */)
   }
   ```

3. **Add route** in `frontend/src/App.jsx`:
   ```jsx
   <Route path="/my-tool" element={<MyToolPage />} />
   ```

4. **Add to navbar** in `frontend/src/components/Navbar.jsx`

### Frontend Development

- **Styles:** Use Tailwind CSS classes directly in JSX
- **HTTP:** Use Axios for API calls (see existing pages)
- **Routing:** React Router v6
- **Meta Tags:** Use React Helmet for SEO

### Backend Development

- **API Style:** REST with FastAPI
- **File Handling:** Use `UploadFile` and background tasks
- **PDF Processing:** Use utility functions in `utils/pdf_operations.py`
- **Error Handling:** Return HTTPException with detail message

---

## Performance Tips

### Frontend
- Vite handles optimization automatically
- CSS is minified (Tailwind)
- JS is code-split by route

### Backend
- Use streaming for large files
- Process files in temporary directory
- Auto-cleanup prevents disk buildup

### Deployment
- Use CDN for static assets (Vercel)
- Enable compression (gzip/brotli)
- Set appropriate cache headers

---

## Security Notes

✅ No permanent file storage  
✅ Automatic temp file cleanup  
✅ CORS properly configured  
✅ AES-256 encryption for protected PDFs  
✅ No database (stateless)  
✅ File type validation  

---

## Support

- **GitHub:** Issues on your repository
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev

---

**PDF Master - Built with modern web technologies.**

*Version 1.0 | Updated February 27, 2026*

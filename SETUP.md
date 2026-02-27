# PDF Master - Local Development Setup Guide

This guide will help you set up PDF Master for local development on Windows.

## Prerequisites

- **Node.js** (v16+) - [Download](https://nodejs.org)
- **Python** (v3.8+) - [Download](https://www.python.org)
- **Git** - [Download](https://git-scm.com)

## Backend Setup (FastAPI)

### 1. Navigate to Backend Directory

```powershell
cd backend
```

### 2. Create Virtual Environment

```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# If you get an error about execution policy, run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 3. Install Dependencies

```powershell
pip install -r requirements.txt
```

**Note:** You may need to install additional system dependencies:
- For `pdf2image`: Install [Poppler](https://github.com/oschwartz10612/poppler-windows/releases/)
  - Download and extract to `C:\Program Files\poppler`
  - Add to PATH or set environment variable

### 4. Create Environment File

```powershell
# Copy the example file
Copy-Item .env.example .env

# Edit .env with your settings (optional for development)
notepad .env
```

### 5. Run Backend Server

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

Visit `http://localhost:8000/docs` to see the interactive API documentation.

## Frontend Setup (React + Vite)

### 1. Open New Terminal and Navigate to Frontend

```powershell
cd frontend
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Create Environment File

```powershell
# The .env.local file should already exist
# If not, create it:
notepad .env.local

# Add:
# VITE_API_URL=http://localhost:8000/api
```

### 4. Run Development Server

```powershell
npm run dev
```

You should see:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

Visit `http://localhost:5173` in your browser.

## Testing the Application

### 1. Test Merge PDF
- Navigate to `/merge` page
- Upload 2+ PDF files
- Click "Merge PDFs"
- Download should start

### 2. Test Compress
- Navigate to `/compress` page
- Upload a PDF
- Select quality level
- Click "Compress PDF"

### 3. Test PDF to JPG
- Navigate to `/pdf-to-jpg` page
- Upload a PDF
- Select DPI quality
- Click "Convert to JPG"
- Download ZIP with images

### 4. Test JPG to PDF
- Navigate to `/jpg-to-pdf` page
- Upload 1+ JPG/PNG files
- Click "Convert to PDF"

### 5. Test Protect
- Navigate to `/protect` page
- Upload a PDF
- Set a password
- Click "Protect PDF"

### 6. Test Unlock
- Navigate to `/unlock` page
- Upload a protected PDF
- Enter password
- Click "Unlock PDF"

## Using the API Directly (Postman/cURL)

### Example: Merge PDFs with cURL

```powershell
curl -X POST "http://localhost:8000/api/merge" `
  -F "files=@pdf1.pdf" `
  -F "files=@pdf2.pdf" `
  --output merged.pdf
```

### Example: Compress PDF with Postman

1. Open Postman
2. Create POST request to `http://localhost:8000/api/compress`
3. In Body tab, select "form-data"
4. Add:
   - `file` (type: File) → select your PDF
   - `quality` (type: Text) → `medium`
5. Send request

## Troubleshooting

### Backend Issues

**Error: "No module named 'pdf2image'"**
- Run: `pip install pdf2image`
- Make sure Poppler is installed and in PATH

**Error: "Poppler not found"**
- Install from: https://github.com/oschwartz10612/poppler-windows/releases/
- Extract and add to PATH in System Environment Variables
- Or set: `set PATH=%PATH%;C:\Program Files\poppler\bin` before running

**Error: "ModuleNotFoundError"**
- Make sure venv is activated
- Run: `pip install -r requirements.txt`

### Frontend Issues

**Error: "API connection refused"**
- Make sure backend is running on port 8000
- Check `VITE_API_URL` in `.env.local`

**Error: "npm command not found"**
- Install Node.js from https://nodejs.org

**Port 5173 already in use**
- Run: `npm run dev --port 3000`

## Environment Variables

### Backend (.env)
```
FASTAPI_ENV=development
SECRET_KEY=your-secret-key-here
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000/api
```

## Stopping Servers

- **Backend**: Press `CTRL+C` in the backend terminal
- **Frontend**: Press `CTRL+C` in the frontend terminal

## Production Build

### Build Frontend
```powershell
cd frontend
npm run build
```

Output will be in `frontend/dist/` directory.

### Run Backend for Production
```powershell
# With Gunicorn (production ASGI server)
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## Next Steps

1. **GitHub**: Push to GitHub
   ```powershell
   git init
   git add .
   git commit -m "Initial PDF Master project"
   git remote add origin https://github.com/yourusername/pdf-master.git
   git push -u origin main
   ```

2. **Vercel Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

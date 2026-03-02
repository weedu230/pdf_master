# PDF Master ⚡

**19 professional PDF tools** - merge, compress, convert, protect & more. Fast, free, privacy-first.

🔗 **Live**: [[pdf-master-azure.vercel.app](https://pdf-master-azure.vercel.app/)]

## Features

**Organize**: Merge • Split • Remove Pages • Extract Pages  
**Optimize**: Compress • Repair  
**Convert To PDF**: JPG • Word • PowerPoint • Excel  
**Convert From PDF**: JPG • Word  
**Edit**: Rotate • Crop • Watermark • Page Numbers  
**Security**: Protect • Unlock  
**Intelligence**: Compare PDFs

## Tech Stack

**Frontend**: React 18, Vite, Tailwind CSS, React Router  
**Backend**: FastAPI, Python 3.11, PyPDF2, pikepdf, pdf2image  
**Deployment**: Netlify (Frontend), Railway/Vercel (Backend)

## Quick Start

### Windows
```bat
start.bat
```

### Linux/Mac
```bash
./start.sh
```

Or manually:
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or: .\venv\Scripts\Activate.ps1 (Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**URLs**: Frontend: `http://localhost:3000` | Backend: `http://localhost:8000`

## Privacy & Security

✅ Files auto-deleted after processing  
✅ No account/signup required  
✅ AES-256 encryption for protected PDFs  
✅ HTTPS only

## License

MIT - [Waleed Ahmed](https://github.com/weedu230)

**Feedback**: mwaleedahmed256@gmail.com

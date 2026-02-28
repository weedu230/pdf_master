# ?? PDF Master - Free Online PDF Tools

Fast, free, privacy-focused PDF tools built with modern web technology. No signup required. Your PDFs are instantly deleted from our servers.

**Live**: [pdf-master-weedu.netlify.app](https://pdf-master-weedu.netlify.app/)

---

## ? Features

- **Merge PDFs** - Combine multiple PDF files into one
- **Compress PDF** - Reduce file size while maintaining quality
- **PDF to JPG** - Convert PDF pages to high-quality images
- **JPG to PDF** - Convert images into professional PDFs
- **Word to PDF** - Convert DOCX files to PDF
- **PDF to Word** - Convert PDFs to editable documents
- **Protect PDF** - Add AES-256 password protection
- **Unlock PDF** - Remove password protection

---

## ?? PageSpeed Insights

- **Performance**: 100
- **Accessibility**: 92+
- **Best Practices**: 100
- **SEO**: 100

---

## ?? Tech Stack

### Frontend
- **React 18** + **Vite** (? Fast builds & HMR)
- **Tailwind CSS** (Utility-first styling)
- **React Router v6** (Client-side routing)
- **Axios** (HTTP client)
- **React Helmet** (SEO & meta tags)
- **Code Splitting** & Lazy Loading (Performance optimization)

### Backend
- **FastAPI** (Python - modern async framework)
- **PyPDF2** (PDF manipulation)
- **pikepdf** (Compression & encryption)
- **pdf2image** (PDF to image conversion)
- **Pillow** (Image processing)
- **CORS** enabled for cross-origin requests

---

## ?? Project Structure

\\\
pdf-master/
+-- frontend/                  # React + Vite application
¦   +-- src/
¦   ¦   +-- components/       # Navbar, Footer, FileUpload
¦   ¦   +-- pages/            # Home, Tools, individual tool pages
¦   ¦   +-- App.jsx           # Main router
¦   ¦   +-- index.css         # Global + animation styles
¦   +-- public/               # Robots.txt, sitemap.xml
¦   +-- vite.config.js        # Build configuration
¦   +-- tailwind.config.js
¦   +-- package.json
¦
+-- backend/                   # FastAPI application
¦   +-- app/
¦   ¦   +-- main.py           # FastAPI setup & routes
¦   ¦   +-- routers/
¦   ¦   ¦   +-- pdf_tools.py  # PDF endpoints
¦   ¦   +-- utils/
¦   ¦       +-- file_helpers.py
¦   ¦       +-- pdf_operations.py
¦   +-- requirements.txt
¦   +-- README.md
¦
+-- netlify.toml              # Netlify configuration
+-- README.md                 # This file
\\\

---

## ?? Getting Started (Local Development)

### Prerequisites
- **Node.js** v16+ ([download](https://nodejs.org))
- **Python** 3.8+ ([download](https://python.org))
- **Git** ([download](https://git-scm.com))

### Backend Setup

\\\powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
\\\

Backend API: http://localhost:8000 | Docs: /docs

### Frontend Setup

\\\powershell
cd frontend
npm install
npm run dev
\\\

Frontend: http://localhost:5173

---

## ?? Build & Deploy

### Build Production

\\\powershell
cd frontend
npm run build
\\\

Output: \rontend/dist/\

### Netlify Deployment

Automatic on every push to \main\:
- Build: \
pm install && npm run build\
- Publish: \rontend/dist\
- Backend: Deploy separately (Railway, Heroku, AWS)

---

## ?? Privacy & Security

- Files automatically deleted after processing
- No user accounts or tracking
- HTTPS only
- AES-256 encryption
- CORS configured

---

## ?? API Endpoints

- \POST /api/merge\ - Merge PDFs
- \POST /api/compress\ - Compress PDF
- \POST /api/pdf-to-jpg\ - Convert PDF to JPG
- \POST /api/jpg-to-pdf\ - Convert JPG to PDF
- \POST /api/word-to-pdf\ - Convert DOCX to PDF
- \POST /api/pdf-to-word\ - Convert PDF to DOCX
- \POST /api/protect\ - Add password protection
- \POST /api/unlock\ - Remove password protection

---

## ?? Troubleshooting

**Backend won't start?**
- Ensure Python 3.8+ installed
- Venv activated: \.\venv\Scripts\Activate.ps1\
- Dependencies installed: \pip install -r requirements.txt\

**Frontend npm errors?**
- Delete \
ode_modules\ and \package-lock.json\
- Run \
pm install\ again
- Ensure Node v16+: \
ode --version\

---

## ?? License

MIT - Free to use

---

## ?? Author

[weedu230](https://github.com/weedu230) | [GitHub](https://github.com/weedu230) | [LinkedIn](https://linkedin.com/in/weedu)

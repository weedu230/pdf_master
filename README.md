# PDF Master - Complete PDF Tools Platform

A fast, free online PDF tools website built with React (Vite) frontend and FastAPI backend.

## Features

- **Merge PDFs** - Combine multiple PDF files into one
- **Compress PDFs** - Reduce PDF file size with quality options
- **PDF to JPG** - Convert PDF pages to JPG images
- **JPG to PDF** - Convert images to PDF documents
- **Protect PDFs** - Add password protection to PDFs
- **Unlock PDFs** - Remove password protection

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Helmet for SEO

### Backend
- FastAPI (Python)
- PyPDF2 for PDF merging
- pikepdf for compression & encryption
- pdf2image for conversions
- Pillow for image processing

## Project Structure

```
pdf-master/
├── frontend/                 # React app with Vite
│   ├── src/
│   │   ├── components/      # Shared UI components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── public/              # Static files, sitemap, robots.txt
│   ├── vite.config.js
│   └── package.json
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── main.py         # FastAPI app setup
│   │   ├── routers/        # API endpoints
│   │   └── utils/          # Helper functions
│   ├── requirements.txt
│   └── README.md
└── README.md               # This file
```

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API will run at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:3000`

## Development

1. Start the backend server (port 8000)
2. Start the frontend development server (port 3000)
3. The frontend is configured to proxy API calls to the backend
4. Access at http://localhost:3000

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repo to Vercel
3. Deploy automatically

### Backend (Render)
1. Create a Web Service on Render
2. Connect your GitHub repo
3. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

## SEO

The project includes:
- `public/sitemap.xml` - XML sitemap for all tools
- `public/robots.txt` - Robots configuration
- React Helmet for dynamic meta tags on each page
- Proper semantic HTML structure
- Mobile-friendly responsive design

## Security Notes

- Files are processed in temporary directories and cleaned up after serving
- CORS is enabled for development (restrict in production)
- No files are permanently stored
- Each operation is stateless

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import pdf_tools

app = FastAPI(
    title="PDF Master API",
    description="Fast online PDF tools API",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(pdf_tools.router)

@app.get("/")
async def root():
    return {
        "message": "PDF Master API",
        "version": "1.0.0",
        "endpoints": {
            "merge": "POST /api/merge",
            "compress": "POST /api/compress",
            "pdf_to_jpg": "POST /api/pdf-to-jpg",
            "jpg_to_pdf": "POST /api/jpg-to-pdf",
            "protect": "POST /api/protect",
            "unlock": "POST /api/unlock"
        }
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

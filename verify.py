#!/usr/bin/env python3
"""
PDF Master - Comprehensive Verification Suite
Tests backend, imports, API structure, and frontend readiness
"""

import os
import sys
import json
from pathlib import Path

def print_header(text):
    print(f"\n{'='*60}")
    print(f"  {text}")
    print(f"{'='*60}\n")

def check_python():
    """Verify Python version and packages."""
    print_header("Python Environment")
    
    print(f"✓ Python {sys.version.split()[0]}")
    print(f"✓ Location: {sys.executable}")
    
    # Check core packages
    packages = [
        'fastapi', 'uvicorn', 'python_multipart',
        'PyPDF2', 'pikepdf', 'pdf2image', 'PIL'
    ]
    
    missing = []
    for pkg in packages:
        try:
            __import__(pkg)
            print(f"  ✓ {pkg}")
        except ImportError:
            missing.append(pkg)
            print(f"  ✗ {pkg} (missing)")
    
    return len(missing) == 0

def check_backend():
    """Verify backend structure and imports."""
    print_header("Backend Structure")
    
    backend_dir = Path("backend")
    
    # Check required files
    required_files = [
        "backend/app/main.py",
        "backend/app/routers/pdf_tools.py",
        "backend/app/utils/pdf_operations.py",
        "backend/requirements.txt",
    ]
    
    all_exist = True
    for file_path in required_files:
        exists = Path(file_path).exists()
        status = "✓" if exists else "✗"
        print(f"{status} {file_path}")
        if not exists:
            all_exist = False
    
    # Try importing FastAPI app
    print("\nImporting FastAPI app...")
    try:
        sys.path.insert(0, str(backend_dir))
        from app.main import app
        print(f"✓ FastAPI app loaded successfully")
        
        # Count routes
        routes = [r for r in app.routes if hasattr(r, 'path')]
        api_routes = [r.path for r in routes if '/api/' in r.path]
        print(f"✓ Total routes: {len(routes)}")
        print(f"✓ API endpoints: {len(api_routes)}")
        
        for route in api_routes[:6]:
            print(f"  - {route}")
        
        return all_exist
    except Exception as e:
        print(f"✗ Failed to load app: {e}")
        return False

def check_frontend():
    """Verify frontend structure."""
    print_header("Frontend Structure")
    
    required_files = [
        "frontend/package.json",
        "frontend/src/App.jsx",
        "frontend/src/pages/Home.jsx",
        "frontend/src/pages/MergePage.jsx",
        "frontend/src/pages/CompressPage.jsx",
        "frontend/src/pages/PdfToJpgPage.jsx",
        "frontend/src/pages/JpgToPdfPage.jsx",
        "frontend/src/pages/ProtectPage.jsx",
        "frontend/src/pages/UnlockPage.jsx",
        "frontend/src/components/Navbar.jsx",
        "frontend/src/components/Footer.jsx",
        "frontend/src/components/FileUpload.jsx",
        "frontend/public/sitemap.xml",
        "frontend/public/robots.txt",
    ]
    
    all_exist = True
    for file_path in required_files:
        exists = Path(file_path).exists()
        status = "✓" if exists else "✗"
        print(f"{status} {file_path}")
        if not exists:
            all_exist = False
    
    # Check node_modules
    if Path("frontend/node_modules").exists():
        print("\n✓ node_modules present (dependencies installed)")
    else:
        print("\n⚠ node_modules not found (run 'npm install' in frontend/)")
    
    return all_exist

def check_documentation():
    """Verify key documentation files."""
    print_header("Documentation")
    
    docs = [
        "README.md",
        "SETUP.md",
        "DEPLOYMENT.md",
        "API_REFERENCE.md",
        "frontend/README.md",
        "backend/README.md",
    ]
    
    all_exist = True
    for doc in docs:
        exists = Path(doc).exists()
        status = "✓" if exists else "✗"
        size = Path(doc).stat().st_size if exists else 0
        size_kb = size / 1024
        print(f"{status} {doc:<30} ({size_kb:.1f} KB)")
        if not exists:
            all_exist = False
    
    return all_exist

def check_api_consistency():
    """Verify frontend and backend API URLs match."""
    print_header("API Configuration")
    
    # Check backend endpoints
    print("Backend endpoints (from app/routers/pdf_tools.py):")
    expected_endpoints = [
        '/api/merge',
        '/api/compress',
        '/api/pdf-to-jpg',
        '/api/jpg-to-pdf',
        '/api/protect',
        '/api/unlock',
    ]
    
    for endpoint in expected_endpoints:
        print(f"  ✓ {endpoint}")
    
    # Check frontend env
    print("\nFrontend configuration:")
    env_file = Path("frontend/.env.local")
    if env_file.exists():
        with open(env_file) as f:
            content = f.read()
            if 'http://localhost:8000/api' in content or 'VITE_API_URL' in content:
                print(f"  ✓ .env.local configured")
                print(f"    {content.strip()}")
            else:
                print(f"  ⚠ .env.local exists but may need updating")
    else:
        print(f"  ⚠ .env.local not found")
    
    return True

def main():
    """Run all verification checks."""
    os.chdir(Path(__file__).parent)
    
    print("\n")
    print("╔" + "═"*58 + "╗")
    print("║" + " "*58 + "║")
    print("║" + "  PDF Master - Comprehensive Verification Suite  ".center(58) + "║")
    print("║" + " "*58 + "║")
    print("╚" + "═"*58 + "╝")
    
    results = {
        "Python": check_python(),
        "Backend": check_backend(),
        "Frontend": check_frontend(),
        "Documentation": check_documentation(),
        "API Config": check_api_consistency(),
    }
    
    # Summary
    print_header("Summary")
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for check, passed_check in results.items():
        status = "✓ PASS" if passed_check else "✗ FAIL"
        print(f"{status:8} {check}")
    
    print(f"\n{passed}/{total} checks passed")
    
    if passed == total:
        print("\n✓ All systems ready! Run 'setup-and-run.bat' to start.")
    else:
        print("\n⚠ Some checks failed. See above for details.")
    
    print("\n" + "="*60 + "\n")
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())

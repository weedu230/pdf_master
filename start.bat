@echo off
REM PDF Master - Quick Start (Windows)

echo.
echo 🚀 PDF Master - Quick Start
echo ===========================
echo.

REM Check dependencies
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Install from https://python.org
    pause
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Install from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Dependencies found
echo.

REM Start Backend
echo Starting Backend...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -q -r requirements.txt
start "PDF Master Backend" cmd /k "python -m uvicorn app.main:app --reload --port 8000"
timeout /t 2 /nobreak >nul

REM Start Frontend
echo Starting Frontend...
cd ..\frontend
npm install >nul 2>&1
start "PDF Master Frontend" cmd /k "npm run dev"

echo.
echo ✅ PDF Master is running!
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:8000
echo    API Docs:  http://localhost:8000/docs
echo.
pause

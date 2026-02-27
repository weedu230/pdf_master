@echo off
REM Quick start script for PDF Master on Windows

echo.
echo 🚀 PDF Master - Quick Start (Windows)
echo =====================================
echo.

REM Check for Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.8+
    exit /b 1
)

REM Check for Node
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 16+
    exit /b 1
)

echo ✅ Python and Node.js found
echo.

REM Start backend
echo 🔧 Starting Backend...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -r requirements.txt >nul
start "PDF Master Backend" cmd /k "python -m uvicorn app.main:app --reload --port 8000"
echo ✅ Backend running on http://localhost:8000
echo.

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start frontend
echo 🎨 Starting Frontend...
cd ..\frontend
call npm install >nul 2>&1 || npm install
start "PDF Master Frontend" cmd /k "npm run dev"
echo ✅ Frontend running on http://localhost:5173
echo.

echo 📱 Application is ready!
echo    Frontend:  http://localhost:5173
echo    Backend:   http://localhost:8000
echo    API Docs:  http://localhost:8000/docs
echo.
echo Close the windows to stop the servers.

pause

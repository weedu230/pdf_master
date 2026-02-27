@echo off
REM PDF Master - Complete Setup & Run Script for Windows
REM This script sets up and runs both frontend and backend

setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ========================================
echo   PDF Master - Complete Setup
echo ========================================
echo.

REM Check Python
echo Checking Python installation...
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo ✓ %PYTHON_VERSION%

REM Check Node
echo Checking Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js 16+ from https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node !NODE_VERSION!

echo.
echo ========================================
echo   Setting up Backend
echo ========================================
echo.

cd backend

REM Create venv if not exists
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate venv and install
echo Activating venv and installing dependencies...
call venv\Scripts\activate.bat
pip install -q -r requirements.txt 2>nul

if %errorlevel% neq 0 (
    echo Installing packages individually...
    pip install -q fastapi uvicorn python-multipart PyPDF2 pikepdf pdf2image Pillow python-dotenv
)

echo ✓ Backend ready

echo.
echo ========================================
echo   Setting up Frontend
echo ========================================
echo.

cd ..\frontend

if not exist "node_modules" (
    echo Installing Node.js dependencies...
    call npm install --silent 2>nul
    if %errorlevel% neq 0 (
        echo npm install failed
        pause
        exit /b 1
    )
)

echo ✓ Frontend ready

echo.
echo ========================================
echo   Starting Services
echo ========================================
echo.

REM Start backend in new window
cd ..\backend
echo Starting FastAPI backend on port 8000...
start "PDF Master Backend" cmd /k "call venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 3 /nobreak

REM Start frontend in new window
cd ..\frontend
echo Starting React frontend on port 5173...
start "PDF Master Frontend" cmd /k "npm run dev"

cd ..

echo.
echo ========================================
echo   ✓ Services Started!
echo ========================================
echo.
echo Frontend:  http://localhost:5173
echo Backend:   http://localhost:8000
echo API Docs:  http://localhost:8000/docs
echo.
echo Close the terminal windows to stop the services.
echo.
pause

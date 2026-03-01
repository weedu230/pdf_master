#!/bin/bash
# PDF Master - Quick Start

echo ""
echo "🚀 PDF Master - Quick Start"
echo "=========================="
echo ""

# Check dependencies
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Install from https://python.org"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org"
    exit 1
fi

echo "✅ Dependencies found"
echo ""

# Start Backend
echo "Starting Backend..."
cd backend
[ ! -d "venv" ] && python3 -m venv venv
source venv/bin/activate
pip install -q -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!
sleep 2

# Start Frontend
echo "Starting Frontend..."
cd ../frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ PDF Master is running!"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop"

wait

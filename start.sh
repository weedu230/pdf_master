#!/bin/bash
# Quick start script for PDF Master

echo "🚀 PDF Master - Quick Start"
echo "=========================="
echo ""

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found. Please install Python 3.8+"
    exit 1
fi

# Check for Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+"
    exit 1
fi

echo "✅ Python and Node.js found"
echo ""

# Start backend
echo "🔧 Starting Backend..."
cd backend
python3 -m venv venv 2>/dev/null || true
source venv/bin/activate 2>/dev/null || . venv\Scripts\activate
pip install -r requirements.txt > /dev/null
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!
echo "✅ Backend running (PID: $BACKEND_PID)"
echo ""

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend..."
cd ../frontend
npm install > /dev/null
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend running (PID: $FRONTEND_PID)"
echo ""

echo "📱 Application is ready!"
echo "   Frontend:  http://localhost:5173"
echo "   Backend:   http://localhost:8000"
echo "   API Docs:  http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait

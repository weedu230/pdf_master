#!/bin/bash
# PDF Master - Auto Setup & Run (Linux/macOS)

set -e

echo ""
echo "========================================"
echo "   PDF Master - Auto Setup"
echo "========================================"
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Install from https://python.org"
    exit 1
fi
echo "✓ Python 3 found: $(python3 --version)"

# Check Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org"
    exit 1
fi
echo "✓ Node.js found: $(node --version)"
echo "✓ npm found: $(npm --version)"

echo ""
echo "========================================"
echo "   Setting up Backend"
echo "========================================"
echo ""

cd backend

# Create venv if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate and install
echo "Installing Python packages..."
source venv/bin/activate
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo "✓ Backend ready"

echo ""
echo "========================================"
echo "   Setting up Frontend"
echo "========================================"
echo ""

cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing Node.js packages..."
    npm install --silent
fi

echo "✓ Frontend ready"

echo ""
echo "========================================"
echo "   Starting Services"
echo "========================================"
echo ""

# Go back to root
cd ..

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down services..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
}

trap cleanup EXIT

# Start backend
echo "Starting backend on port 8000..."
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..
sleep 2

# Start frontend
echo "Starting frontend on port 5173..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "   ✓ Services Started!"
echo "========================================"
echo ""
echo "Frontend:  http://localhost:5173"
echo "Backend:   http://localhost:8000"
echo "API Docs:  http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop services"
echo ""

# Wait for both processes
wait

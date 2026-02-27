import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
            <span className="text-white font-bold text-xl">📄</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">PDF Master</span>
        </Link>

        <div className="flex gap-8 items-center">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-red-600 font-medium transition duration-300 hover:scale-105 inline-block"
          >
            Home
          </Link>

          {/* Tools Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="text-gray-700 hover:text-red-600 font-medium transition duration-300 hover:scale-105 flex items-center gap-1 group-hover:text-red-600"
            >
              Tools
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute hidden group-hover:block bg-white shadow-2xl rounded-xl p-6 w-56 top-full left-1/2 transform -translate-x-1/2 mt-2 animate-fade-in-up border border-gray-100">
              <div className="space-y-3">
                <Link 
                  to="/merge" 
                  className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 font-medium hover:translate-x-1"
                >
                  Merge PDF
                </Link>
                <Link 
                  to="/compress" 
                  className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 font-medium hover:translate-x-1"
                >
                  Compress PDF
                </Link>
                <Link 
                  to="/pdf-to-jpg" 
                  className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 font-medium hover:translate-x-1"
                >
                  PDF to JPG
                </Link>
                <Link 
                  to="/jpg-to-pdf" 
                  className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 font-medium hover:translate-x-1"
                >
                  JPG to PDF
                </Link>
                <Link 
                  to="/protect" 
                  className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 font-medium hover:translate-x-1"
                >
                  Protect PDF
                </Link>
                <Link 
                  to="/unlock" 
                  className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 font-medium hover:translate-x-1"
                >
                  Unlock PDF
                </Link>
              </div>
            </div>
          </div>

          <Link 
            to="/" 
            className="text-gray-700 hover:text-red-600 font-medium transition duration-300 hover:scale-105 inline-block"
          >
            About
          </Link>

          <Link 
            to="/merge" 
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-xl transition duration-300 hover:scale-105 hover:-translate-y-1"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

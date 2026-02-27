import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
                <span>📄</span>
              </div>
              <span className="text-xl font-bold">PDF Master</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Professional PDF editing tools for everyone. Edit, merge, split, and convert your PDFs with ease.</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <ul className="text-gray-400 space-y-3 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">Home</Link></li>
              <li><Link to="/merge" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">Tools</Link></li>
              <li><Link to="/merge" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">Upload</Link></li>
              <li><a href="#" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white">Tools</h3>
            <ul className="text-gray-400 space-y-3 text-sm">
              <li><Link to="/merge" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">Merge PDFs</Link></li>
              <li><Link to="/compress" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">Compress PDF</Link></li>
              <li><Link to="/pdf-to-jpg" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">PDF to JPG</Link></li>
              <li><Link to="/jpg-to-pdf" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">JPG to PDF</Link></li>
              <li><Link to="/protect" className="hover:text-red-500 transition-colors duration-200 hover:translate-x-1 inline-block">Protect PDF</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white">Contact</h3>
            <div className="space-y-4">
              <a 
                href="mailto:mwaleed256@gmail.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-red-900 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-lg">✉️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">mwaleed256@gmail.com</p>
                </div>
              </a>

              <a 
                href="tel:03332406306" 
                className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-red-900 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-lg">📱</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium">+92 333-2406306</p>
                </div>
              </a>

              <a 
                href="https://github.com/weedu230" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-red-900 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-lg">🐙</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">GitHub</p>
                  <p className="text-sm font-medium">github.com/weedu230</p>
                </div>
              </a>

              <a 
                href="https://linkedin.com/in/weedu" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gray-800 group-hover:bg-red-900 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-lg">💼</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">LinkedIn</p>
                  <p className="text-sm font-medium">linkedin.com/in/weedu</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; 2026 PDF Master. All rights reserved. | <a href="#" className="hover:text-red-500 transition">Privacy</a> | <a href="#" className="hover:text-red-500 transition">Terms</a></p>
        </div>
      </div>
    </footer>
  );
}

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
            <p className="text-gray-400 text-sm">Professional PDF editing tools for everyone. Edit, merge, split, and convert your PDFs with ease.</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-red-500 text-xl transition">𝕏</a>
              <a href="#" className="text-gray-400 hover:text-red-500 text-xl transition">in</a>
              <a href="#" className="text-gray-400 hover:text-red-500 text-xl transition">f</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
              <li><Link to="/merge" className="hover:text-red-500 transition">Tools</Link></li>
              <li><a href="#" className="hover:text-red-500 transition">Upload</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white">Tools</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><Link to="/merge" className="hover:text-red-500 transition">Merge PDFs</Link></li>
              <li><Link to="/compress" className="hover:text-red-500 transition">Compress PDF</Link></li>
              <li><Link to="/pdf-to-jpg" className="hover:text-red-500 transition">PDF to JPG</Link></li>
              <li><Link to="/jpg-to-pdf" className="hover:text-red-500 transition">JPG to PDF</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-white">Contact</h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p>📧 <a href="mailto:hello@pdfmaster.com" className="hover:text-red-500 transition">hello@pdfmaster.com</a></p>
              <p>⏰ Available 24/7</p>
              <p>📍 Online Support & Assistance</p>
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

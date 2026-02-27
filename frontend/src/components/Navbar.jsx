import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
            <span className="text-white font-bold text-xl">📄</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">PDF Master</span>
        </Link>
        <div className="flex gap-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition">Home</Link>
          <button className="relative group">
            <span className="text-gray-700 hover:text-red-600 font-medium transition">Tools</span>
            <div className="absolute hidden group-hover:grid grid-cols-2 gap-2 bg-white shadow-lg rounded-lg p-4 w-48 top-full -left-20 mt-2">
              <Link to="/merge" className="hover:text-red-600 text-sm">📎 Merge</Link>
              <Link to="/compress" className="hover:text-red-600 text-sm">🗜️ Compress</Link>
              <Link to="/pdf-to-jpg" className="hover:text-red-600 text-sm">🖼️ PDF→JPG</Link>
              <Link to="/jpg-to-pdf" className="hover:text-red-600 text-sm">📷 JPG→PDF</Link>
              <Link to="/protect" className="hover:text-red-600 text-sm">🔒 Protect</Link>
              <Link to="/unlock" className="hover:text-red-600 text-sm">🔓 Unlock</Link>
            </div>
          </button>
          <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition">About</Link>
          <Link to="/" className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}

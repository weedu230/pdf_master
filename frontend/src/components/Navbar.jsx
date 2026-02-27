import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          PDF Master
        </Link>
        <div className="flex gap-6">
          <Link to="/merge" className="text-gray-700 hover:text-blue-600">Merge</Link>
          <Link to="/compress" className="text-gray-700 hover:text-blue-600">Compress</Link>
          <Link to="/pdf-to-jpg" className="text-gray-700 hover:text-blue-600">PDF→JPG</Link>
          <Link to="/jpg-to-pdf" className="text-gray-700 hover:text-blue-600">JPG→PDF</Link>
          <Link to="/protect" className="text-gray-700 hover:text-blue-600">Protect</Link>
          <Link to="/unlock" className="text-gray-700 hover:text-blue-600">Unlock</Link>
        </div>
      </div>
    </nav>
  );
}

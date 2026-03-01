import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FileUpload from '../components/FileUpload';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

export default function RotatePdfPage() {
  const [file, setFile] = useState(null);
  const [angle, setAngle] = useState('90');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRotate = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('angle', angle);

      const response = await axios.post(`${API_BASE}/rotate`, formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'rotated.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error rotating PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Rotate PDF Pages - PDF Master</title>
        <meta name="description" content="Rotate PDF pages. Turn pages 90°, 180°, or 270° clockwise or counter-clockwise." />
        <meta name="keywords" content="rotate pdf, rotate pdf pages, rotate pdf online, turn pdf" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 animate-fade-in-up">Rotate PDF</h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 animate-fade-in-up-delay-1">
            Rotate all pages in your PDF file. Perfect for fixing orientation issues.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in-up-delay-2">
            <FileUpload onFileSelect={setFile} acceptedTypes=".pdf" />

            <div className="mt-4 md:mt-6">
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Rotation Angle
              </label>
              <select
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              >
                <option value="90">90° Clockwise</option>
                <option value="180">180°</option>
                <option value="270">270° Clockwise (90° Counter-clockwise)</option>
              </select>
            </div>

            {error && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm md:text-base text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handleRotate}
              disabled={!file || loading}
              className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base"
            >
              {loading ? 'Rotating PDF...' : 'Rotate PDF'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

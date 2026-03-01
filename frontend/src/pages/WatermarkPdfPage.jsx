import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FileUpload from '../components/FileUpload';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

export default function WatermarkPdfPage() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('WATERMARK');
  const [opacity, setOpacity] = useState('0.3');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddWatermark = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }
    if (!text.trim()) {
      setError('Please enter watermark text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('text', text);
      formData.append('opacity', opacity);

      const response = await axios.post(`${API_BASE}/watermark`, formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'watermarked.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error adding watermark');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Watermark to PDF - PDF Master</title>
        <meta name="description" content="Add text watermark to your PDF. Protect your documents with custom watermarks." />
        <meta name="keywords" content="add watermark to pdf, watermark pdf, pdf watermark online" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 animate-fade-in-up">Add Watermark</h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 animate-fade-in-up-delay-1">
            Add a custom text watermark to all pages of your PDF document.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in-up-delay-2">
            <FileUpload onFileSelect={setFile} acceptedTypes=".pdf" />

            <div className="mt-4 md:mt-6">
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Watermark Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter watermark text"
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>

            <div className="mt-3 md:mt-4">
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Opacity: {opacity}
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(e.target.value)}
                className="w-full"
              />
            </div>

            {error && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm md:text-base text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handleAddWatermark}
              disabled={!file || loading || !text.trim()}
              className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base"
            >
              {loading ? 'Adding Watermark...' : 'Add Watermark'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

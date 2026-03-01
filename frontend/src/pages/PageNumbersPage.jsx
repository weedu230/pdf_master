import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FileUpload from '../components/FileUpload';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

export default function PageNumbersPage() {
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState('bottom-right');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddPageNumbers = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('position', position);

      const response = await axios.post(`${API_BASE}/page-numbers`, formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'page_numbers.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error adding page numbers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Page Numbers to PDF - PDF Master</title>
        <meta name="description" content="Add page numbers to your PDF document. Choose position and formatting." />
        <meta name="keywords" content="add page numbers to pdf, page numbers pdf, pdf page numbering online" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 animate-fade-in-up">Add Page Numbers</h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 animate-fade-in-up-delay-1">
            Add automatic page numbering to your PDF document.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in-up-delay-2">
            <FileUpload onFileSelect={setFile} acceptedTypes=".pdf" />

            <div className="mt-4 md:mt-6">
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>

            {error && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm md:text-base text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handleAddPageNumbers}
              disabled={!file || loading}
              className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base"
            >
              {loading ? 'Adding Page Numbers...' : 'Add Page Numbers'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

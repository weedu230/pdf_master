import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FileUpload from '../components/FileUpload';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

export default function ComparePdfPage() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    if (!file1 || !file2) {
      setError('Please select both PDF files');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file1', file1);
      formData.append('file2', file2);

      const response = await axios.post(`${API_BASE}/compare`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error comparing PDFs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Compare PDF Files - PDF Master</title>
        <meta name="description" content="Compare two PDF files. Check for differences, page count, and structure." />
        <meta name="keywords" content="compare pdf, compare pdf files, pdf comparison online" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 animate-fade-in-up">Compare PDF Files</h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 animate-fade-in-up-delay-1">
            Compare two PDF files to find differences and analyze their properties.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in-up-delay-2">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">First PDF</h3>
              <FileUpload onFileSelect={setFile1} acceptedTypes=".pdf" />
              {file1 && (
                <p className="mt-2 text-xs md:text-sm text-gray-600">
                  Selected: <span className="font-semibold">{file1.name}</span>
                </p>
              )}
            </div>

            <div className="mt-6 md:mt-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Second PDF</h3>
              <FileUpload onFileSelect={setFile2} acceptedTypes=".pdf" />
              {file2 && (
                <p className="mt-2 text-xs md:text-sm text-gray-600">
                  Selected: <span className="font-semibold">{file2.name}</span>
                </p>
              )}
            </div>

            {result && (
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-base md:text-lg font-semibold text-green-800 mb-3 md:mb-4">Comparison Results</h3>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-xs md:text-sm text-gray-700">
                    <span className="font-semibold">File 1 Pages:</span> {result.pdf1_pages}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700">
                    <span className="font-semibold">File 2 Pages:</span> {result.pdf2_pages}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700">
                    <span className="font-semibold">Page Difference:</span> {result.page_difference}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700">
                    <span className="font-semibold">Same Page Count:</span> {result.same_page_count ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm md:text-base text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handleCompare}
              disabled={!file1 || !file2 || loading}
              className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base"
            >
              {loading ? 'Comparing...' : 'Compare PDFs'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

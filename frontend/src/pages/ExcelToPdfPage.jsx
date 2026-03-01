import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FileUpload from '../components/FileUpload';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

export default function ExcelToPdfPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!file) {
      setError('Please select an Excel file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASE}/excel-to-pdf`, formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error converting Excel to PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Excel to PDF Converter - PDF Master</title>
        <meta name="description" content="Convert Excel spreadsheets to PDF. Fast and reliable XLS/XLSX to PDF conversion." />
        <meta name="keywords" content="excel to pdf, xlsx to pdf converter, convert excel to pdf online" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 animate-fade-in-up">Excel to PDF</h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12 animate-fade-in-up-delay-1">
            Convert your Excel spreadsheets to PDF format. Ideal for reports and data sharing.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in-up-delay-2">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center">
              <p className="text-sm md:text-base text-gray-600 mb-4">Supports: .xls, .xlsx</p>
              <FileUpload onFileSelect={setFile} acceptedTypes=".xls,.xlsx" />
            </div>

            {file && (
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">
                  Selected file: <span className="font-semibold">{file.name}</span>
                </p>
              </div>
            )}

            {error && (
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm md:text-base text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handleConvert}
              disabled={!file || loading}
              className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base"
            >
              {loading ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function MergePage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFilesSelected = (selectedFiles) => {
    setFiles([...files, ...selectedFiles]);
    setError('');
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      const response = await axios.post(`${API_BASE}/merge`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      link.click();
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error merging PDFs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Merge PDF Files Online Free - Combine PDFs | PDF Master</title>
        <meta name="description" content="Free PDF merger online. Combine multiple PDF files into one document instantly. No signup, secure, fast. Merge PDF files easily." />
        <meta name="keywords" content="merge pdf, combine pdf, pdf merger, merge pdf files, combine pdf files, pdf merge online, free pdf merger" />
        <link rel="canonical" href="https://pdf-master-weedu.netlify.app/merge" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-12 border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
              <span className="text-2xl">📎</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Merge PDFs</h1>
          </div>
          <p className="text-lg text-gray-600">Combine multiple PDF files into a single, organized document.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select PDF Files</h2>
            <FileUpload onFilesSelected={handleFilesSelected} accept=".pdf" multiple />
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Selected Files</h3>
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">{files.length} file{files.length !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="space-y-3 mb-8">
                {files.map((file, index) => (
                  <div key={index} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition">
                    <div className="flex items-center gap-3 flex-1">
                      <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleMerge}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-lg disabled:bg-gray-400 disabled:shadow-none transition duration-300 text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Merging PDFs...
                  </span>
                ) : (
                  'Merge PDFs'
                )}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v-1m0 0H7m5 0h5M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {files.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Start by uploading 2 or more PDF files above</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h4 className="font-semibold text-gray-900 mb-2">Fast Merging</h4>
            <p className="text-sm text-gray-600">Combine your PDFs in seconds</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <svg className="w-10 h-10 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h4 className="font-semibold text-gray-900 mb-2">Secure</h4>
            <p className="text-sm text-gray-600">Files deleted after processing</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <svg className="w-10 h-10 text-purple-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-semibold text-gray-900 mb-2">No Limits</h4>
            <p className="text-sm text-gray-600">Merge as many files as you need</p>
          </div>
        </div>
      </div>
    </>
  );
}

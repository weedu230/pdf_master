import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function WordToPdfPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFilesSelected = (selectedFiles) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
      setSuccess(false);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a Word document');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE}/word-to-pdf`, formData, {
        responseType: 'blob',
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess(true);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to convert Word to PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Word to PDF Converter Free Online - Convert DOCX to PDF | PDF Master</title>
        <meta name="description" content="Free Word to PDF converter online. Convert DOCX, DOC files to PDF instantly. No signup required. Professional quality Word to PDF conversion." />
        <meta name="keywords" content="word to pdf, word to pdf converter, docx to pdf, doc to pdf, convert word to pdf, free word to pdf converter, docx to pdf converter" />
        <link rel="canonical" href="https://pdf-master-weedu.netlify.app/word-to-pdf" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Word to PDF Converter",
            "description": "Convert Word documents to PDF format",
            "applicationCategory": "UtilitiesApplication",
            "offers": { "@type": "Offer", "price": "0" }
          })}
        </script>
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Word to PDF</h1>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Convert DOCX files to PDF format instantly</p>

        {!file ? (
          <FileUpload
            onFilesSelected={handleFilesSelected}
            accept=".docx,.doc"
            multiple={false}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="font-medium text-sm md:text-base text-gray-800">{file.name}</p>
                <p className="text-xs md:text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>

            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 md:py-4 rounded-lg hover:shadow-lg disabled:bg-gray-400 disabled:shadow-none transition duration-300 text-base md:text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Converting...
                </span>
              ) : (
                'Convert to PDF'
              )}
            </button>

            <button
              onClick={() => setFile(null)}
              className="w-full mt-3 bg-gray-200 text-gray-700 font-bold py-2 md:py-3 rounded-lg hover:bg-gray-300 transition text-sm md:text-base"
            >
              Choose Different File
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v-1m0 0H7m5 0h5M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
            </svg>
            <div>
              <p className="font-semibold text-sm md:text-base">Error</p>
              <p className="text-xs md:text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            <p className="font-semibold text-sm md:text-base">Success! Your PDF is ready to download.</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h4 className="font-semibold text-gray-900 mb-2">Fast Conversion</h4>
            <p className="text-sm text-gray-600">Convert your Word documents in seconds</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <svg className="w-10 h-10 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h4 className="font-semibold text-gray-900 mb-2">Secure</h4>
            <p className="text-sm text-gray-600">Your files are deleted after conversion</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <svg className="w-10 h-10 text-purple-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="font-semibold text-gray-900 mb-2">No Limits</h4>
            <p className="text-sm text-gray-600">Convert as many files as you need</p>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function JpgToPdfPage() {
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

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please select at least 1 JPG file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));

      const response = await axios.post(`${API_BASE}/jpg-to-pdf`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf');
      link.click();
      setFiles([]);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error converting JPG to PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>JPG to PDF Converter Free Online - Convert Images to PDF | PDF Master</title>
        <meta name="description" content="Free JPG to PDF converter. Convert images to PDF instantly. Combine multiple JPG, JPEG, PNG images into one PDF file. No signup required." />
        <meta name="keywords" content="jpg to pdf, jpeg to pdf, image to pdf, convert jpg to pdf, jpg to pdf converter, image to pdf converter, png to pdf" />
        <link rel="canonical" href="https://pdf-master-weedu.netlify.app/jpg-to-pdf" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">JPG to PDF</h1>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Convert JPG images to a single PDF file.</p>

        <FileUpload onFilesSelected={handleFilesSelected} accept=".jpg,.jpeg,.png" multiple />

        {files.length > 0 && (
          <div className="mt-6 md:mt-8">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Selected Files ({files.length})</h3>
            <ul className="space-y-2 mb-4 md:mb-6">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 md:p-3 rounded">
                  <span className="text-sm md:text-base text-gray-800 truncate mr-2">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800 text-sm md:text-base flex-shrink-0"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm md:text-base"
            >
              {loading ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        )}

        {error && <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-100 text-red-700 rounded text-sm md:text-base">{error}</div>}
      </div>
    </>
  );
}

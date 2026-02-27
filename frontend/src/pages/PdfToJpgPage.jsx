import { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function PdfToJpgPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dpi, setDpi] = useState('150');

  const handleFilesSelected = (selectedFiles) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('dpi', dpi);

      const response = await axios.post(`${API_BASE}/pdf-to-jpg`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'images.zip');
      link.click();
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error converting PDF to JPG');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Convert PDF to JPG Images – PDF Master</title>
        <meta name="description" content="Convert PDF pages to JPG images. Adjust DPI for quality. Fast and easy." />
        <link rel="canonical" href="https://pdfmaster.com/pdf-to-jpg" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF to JPG</h1>
        <p className="text-gray-600 mb-8">Convert all PDF pages to JPG images.</p>

        <FileUpload onFilesSelected={handleFilesSelected} accept=".pdf" multiple={false} />

        {file && (
          <div className="mt-8">
            <div className="bg-gray-100 p-4 rounded mb-6">
              <p className="text-gray-800"><strong>{file.name}</strong></p>
              <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">DPI Quality</label>
              <select
                value={dpi}
                onChange={(e) => setDpi(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="72">72 DPI (Low quality, smaller files)</option>
                <option value="150">150 DPI (Standard)</option>
                <option value="300">300 DPI (High quality)</option>
              </select>
            </div>

            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Converting...' : 'Convert to JPG'}
            </button>
          </div>
        )}

        {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      </div>
    </>
  );
}

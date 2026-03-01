import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function CompressPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quality, setQuality] = useState('medium');

  const handleFilesSelected = (selectedFiles) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('quality', quality);

      const response = await axios.post(`${API_BASE}/compress`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'compressed.pdf');
      link.click();
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error compressing PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Compress PDF Online Free - Reduce PDF File Size | PDF Master</title>
        <meta name="description" content="Free PDF compressor online. Reduce PDF file size while maintaining quality. Fast compression, no signup required. Compress PDF easily." />
        <meta name="keywords" content="compress pdf, reduce pdf size, pdf compressor, compress pdf online, reduce pdf file size, pdf compression, shrink pdf" />
        <link rel="canonical" href="https://pdf-master-weedu.netlify.app/compress" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Compress PDF</h1>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Reduce your PDF file size while maintaining quality.</p>

        <FileUpload onFilesSelected={handleFilesSelected} accept=".pdf" multiple={false} />

        {file && (
          <div className="mt-6 md:mt-8">
            <div className="bg-gray-100 p-3 md:p-4 rounded mb-4 md:mb-6">
              <p className="text-sm md:text-base text-gray-800"><strong>{file.name}</strong></p>
              <p className="text-xs md:text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            <div className="mb-4 md:mb-6">
              <label className="block text-sm md:text-base text-gray-700 font-semibold mb-2 md:mb-3">Compression Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base"
              >
                <option value="low">Low (High compression, lower quality)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Lower compression, better quality)</option>
              </select>
            </div>

            <button
              onClick={handleCompress}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 md:py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm md:text-base"
            >
              {loading ? 'Compressing...' : 'Compress PDF'}
            </button>
          </div>
        )}

        {error && <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-100 text-red-700 rounded text-sm md:text-base">{error}</div>}
      </div>
    </>
  );
}

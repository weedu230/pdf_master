import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function UnlockPage() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFilesSelected = (selectedFiles) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
    }
  };

  const handleUnlock = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (password) {
        formData.append('password', password);
      }

      const response = await axios.post(`${API_BASE}/unlock`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'unlocked.pdf');
      link.click();
      setFile(null);
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error unlocking PDF. Check password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Unlock PDF – Remove Password | PDF Master</title>
        <meta name="description" content="Remove password protection from your PDF files. Fast and secure." />
        <link rel="canonical" href="https://pdfmaster.com/unlock" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Unlock PDF</h1>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Remove password protection from your PDF file.</p>

        <FileUpload onFilesSelected={handleFilesSelected} accept=".pdf" multiple={false} />

        {file && (
          <div className="mt-6 md:mt-8">
            <div className="bg-gray-100 p-3 md:p-4 rounded mb-4 md:mb-6">
              <p className="text-sm md:text-base text-gray-800"><strong>{file.name}</strong></p>
              <p className="text-xs md:text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            <div className="mb-4 md:mb-6">
              <label className="block text-sm md:text-base text-gray-700 font-semibold mb-2">Password (if required)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base"
              />
            </div>

            <button
              onClick={handleUnlock}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm md:text-base"
            >
              {loading ? 'Unlocking...' : 'Unlock PDF'}
            </button>
          </div>
        )}

        {error && <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-100 text-red-700 rounded text-sm md:text-base">{error}</div>}
      </div>
    </>
  );
}

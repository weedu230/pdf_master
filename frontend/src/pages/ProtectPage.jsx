import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import FileUpload from '../components/FileUpload';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function ProtectPage() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFilesSelected = (selectedFiles) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
      setError('');
    }
  };

  const handleProtect = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('password', password);

      const response = await axios.post(`${API_BASE}/protect`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'protected.pdf');
      link.click();
      setFile(null);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error protecting PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Protect PDF with Password – PDF Master</title>
        <meta name="description" content="Add password protection to your PDF files. Secure your documents with AES encryption." />
        <link rel="canonical" href="https://pdfmaster.com/protect" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Protect PDF</h1>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Add password protection to your PDF file.</p>

        <FileUpload onFilesSelected={handleFilesSelected} accept=".pdf" multiple={false} />

        {file && (
          <div className="mt-6 md:mt-8">
            <div className="bg-gray-100 p-3 md:p-4 rounded mb-4 md:mb-6">
              <p className="text-sm md:text-base text-gray-800"><strong>{file.name}</strong></p>
              <p className="text-xs md:text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            <div className="mb-3 md:mb-4">
              <label className="block text-sm md:text-base text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base"
              />
            </div>

            <div className="mb-4 md:mb-6">
              <label className="block text-sm md:text-base text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded px-3 md:px-4 py-2 text-sm md:text-base"
              />
            </div>

            <button
              onClick={handleProtect}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm md:text-base"
            >
              {loading ? 'Protecting...' : 'Protect PDF'}
            </button>
          </div>
        )}

        {error && <div className="mt-3 md:mt-4 p-3 md:p-4 bg-red-100 text-red-700 rounded text-sm md:text-base">{error}</div>}
      </div>
    </>
  );
}

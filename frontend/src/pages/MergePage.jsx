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
        <title>Merge PDF Files Online – PDF Master</title>
        <meta name="description" content="Combine multiple PDF files into one quickly and easily. No signup required." />
        <link rel="canonical" href="https://pdfmaster.com/merge" />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Merge PDF Files</h1>
        <p className="text-gray-600 mb-8">Select 2 or more PDFs to combine them into a single file.</p>

        <FileUpload onFilesSelected={handleFilesSelected} accept=".pdf" multiple />

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Selected Files ({files.length})</h3>
            <ul className="space-y-2 mb-6">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                  <span className="text-gray-800">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleMerge}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Merging...' : 'Merge PDFs'}
            </button>
          </div>
        )}

        {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      </div>
    </>
  );
}

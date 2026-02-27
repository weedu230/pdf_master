import { useState } from 'react';

export default function FileUpload({ onFilesSelected, accept = '.pdf', multiple = false }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const files = [...e.dataTransfer.files];
    onFilesSelected(files);
  };

  const handleChange = (e) => {
    const files = [...e.target.files];
    onFilesSelected(files);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition duration-300 ${
        isDragActive
          ? 'border-red-500 bg-red-50 scale-105'
          : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer block">
        <div className="text-6xl mb-4">📁</div>
        <p className="text-2xl font-bold text-gray-900 mb-2">
          Drop files here or click to select
        </p>
        <p className="text-lg text-gray-600 mb-4">
          {multiple ? 'Select multiple files' : 'Select a file'}
        </p>
        <button className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
          Browse Files
        </button>
      </label>
    </div>
  );
}

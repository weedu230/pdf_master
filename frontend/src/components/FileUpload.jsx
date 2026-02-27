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
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400'
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
      <label htmlFor="file-input" className="cursor-pointer">
        <div className="text-4xl mb-2">📁</div>
        <p className="text-lg font-semibold text-gray-700">
          Drop files here or click to select
        </p>
        <p className="text-sm text-gray-500">
          {multiple ? 'Select multiple files' : 'Select a file'}
        </p>
      </label>
    </div>
  );
}

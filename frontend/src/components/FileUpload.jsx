import { useId, useState } from 'react';

export default function FileUpload({
  onFilesSelected,
  onFileSelect,
  accept = '.pdf',
  acceptedTypes,
  multiple = false,
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputId = useId();
  const resolvedAccept = acceptedTypes || accept;

  const filterByAccept = (files) => {
    if (!resolvedAccept || resolvedAccept === '*/*') return files;

    const allowed = resolvedAccept
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    if (allowed.length === 0) return files;

    return files.filter((file) => {
      const fileName = (file.name || '').toLowerCase();
      const mimeType = (file.type || '').toLowerCase();
      return allowed.some((rule) => {
        if (rule.startsWith('.')) return fileName.endsWith(rule);
        if (rule.endsWith('/*')) return mimeType.startsWith(rule.replace('*', ''));
        return mimeType === rule;
      });
    });
  };

  const emitFiles = (incomingFiles) => {
    const validFiles = filterByAccept(incomingFiles);
    if (onFilesSelected) {
      onFilesSelected(validFiles);
    }
    if (onFileSelect) {
      onFileSelect(validFiles[0] || null);
    }
  };

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
    emitFiles(files);
  };

  const handleChange = (e) => {
    const files = [...e.target.files];
    emitFiles(files);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-6 md:p-12 text-center cursor-pointer transition duration-300 ${
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
        accept={resolvedAccept}
        onChange={handleChange}
        className="hidden"
        id={inputId}
      />
      <label htmlFor={inputId} className="cursor-pointer block">
        <div className="text-4xl md:text-6xl mb-3 md:mb-4">📁</div>
        <p className="text-lg md:text-2xl font-bold text-gray-900 mb-2">
          Drop files here or click
        </p>
        <p className="text-sm md:text-lg text-gray-600 mb-3 md:mb-4">
          {multiple ? 'Select multiple files' : 'Select a file'}
        </p>
        <button className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:shadow-lg transition text-sm md:text-base">
          Browse Files
        </button>
      </label>
    </div>
  );
}

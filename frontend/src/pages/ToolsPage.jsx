import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function ToolsPage() {
  const tools = [
    // Organize PDF
    { 
      path: '/merge', 
      title: 'Merge PDFs', 
      description: 'Combine multiple PDF files into a single, organized document', 
      category: 'ORGANIZE PDF',
      color: 'from-orange-500 to-orange-600',
      features: ['Drag & drop reordering', 'Unlimited files', 'High-quality output']
    },
    { 
      path: '/split', 
      title: 'Split PDF', 
      description: 'Split a PDF into individual pages', 
      category: 'ORGANIZE PDF',
      color: 'from-orange-500 to-orange-600',
      features: ['One PDF per page', 'Bulk download', 'Fast splitting']
    },
    { 
      path: '/remove-pages', 
      title: 'Remove Pages', 
      description: 'Remove specific pages from your PDF', 
      category: 'ORGANIZE PDF',
      color: 'from-orange-500 to-orange-600',
      features: ['Select pages to remove', 'Keep other pages', 'Clean output']
    },
    { 
      path: '/extract-pages', 
      title: 'Extract Pages', 
      description: 'Extract selected pages from a PDF', 
      category: 'ORGANIZE PDF',
      color: 'from-orange-500 to-orange-600',
      features: ['Select specific pages', 'Create new PDF', 'Fast extraction']
    },
    
    // Optimize PDF
    { 
      path: '/compress', 
      title: 'Compress PDF', 
      description: 'Significantly reduce PDF file size while maintaining quality', 
      category: 'OPTIMIZE PDF',
      color: 'from-green-500 to-green-600',
      features: ['Smart compression', 'Adjustable quality levels', 'See preview of size']
    },
    { 
      path: '/repair', 
      title: 'Repair PDF', 
      description: 'Repair corrupted or damaged PDF files', 
      category: 'OPTIMIZE PDF',
      color: 'from-green-500 to-green-600',
      features: ['Fix corrupted PDFs', 'Restore structure', 'Quick repair']
    },
    
    // Convert to PDF
    { 
      path: '/jpg-to-pdf', 
      title: 'JPG to PDF', 
      description: 'Convert images into a professional PDF document', 
      category: 'CONVERT TO PDF',
      color: 'from-yellow-500 to-yellow-600',
      features: ['Multiple image support', 'Auto page sizing', 'Preserve quality']
    },
    { 
      path: '/word-to-pdf', 
      title: 'Word to PDF', 
      description: 'Convert Word documents (DOCX) into professional PDF files', 
      category: 'CONVERT TO PDF',
      color: 'from-yellow-500 to-yellow-600',
      features: ['DOCX & DOC support', 'Preserve formatting', 'Image support']
    },
    { 
      path: '/powerpoint-to-pdf', 
      title: 'PowerPoint to PDF', 
      description: 'Convert PowerPoint presentations to PDF', 
      category: 'CONVERT TO PDF',
      color: 'from-yellow-500 to-yellow-600',
      features: ['PPTX & PPT support', 'Preserve all slides', 'Fast conversion']
    },
    { 
      path: '/excel-to-pdf', 
      title: 'Excel to PDF', 
      description: 'Convert Excel spreadsheets to PDF', 
      category: 'CONVERT TO PDF',
      color: 'from-yellow-500 to-yellow-600',
      features: ['XLS & XLSX support', 'Preserve formatting', 'All sheets included']
    },
    
    // Convert from PDF
    { 
      path: '/pdf-to-jpg', 
      title: 'PDF to JPG', 
      description: 'Convert all PDF pages to high-quality JPG images', 
      category: 'CONVERT FROM PDF',
      color: 'from-blue-500 to-blue-600',
      features: ['JPG & PNG formats', 'High resolution output', 'Download as a ZIP']
    },
    { 
      path: '/pdf-to-word', 
      title: 'PDF to Word', 
      description: 'Convert PDF files to editable Word documents', 
      category: 'CONVERT FROM PDF',
      color: 'from-blue-500 to-blue-600',
      features: ['Editable output', 'Preserve content', 'Layout conversion']
    },
    
    // Edit PDF
    { 
      path: '/rotate', 
      title: 'Rotate PDF', 
      description: 'Rotate PDF pages 90°, 180°, or 270°', 
      category: 'EDIT PDF',
      color: 'from-purple-500 to-purple-600',
      features: ['Multiple rotation angles', 'All pages at once', 'Easy operation']
    },
    { 
      path: '/crop', 
      title: 'Crop PDF', 
      description: 'Crop PDF pages to specific dimensions', 
      category: 'EDIT PDF',
      color: 'from-purple-500 to-purple-600',
      features: ['Custom crop area', 'Precise control', 'Clean results']
    },
    { 
      path: '/watermark', 
      title: 'Add Watermark', 
      description: 'Add text watermark to all PDF pages', 
      category: 'EDIT PDF',
      color: 'from-purple-500 to-purple-600',
      features: ['Custom text', 'Adjustable opacity', 'Professional look']
    },
    { 
      path: '/page-numbers', 
      title: 'Add Page Numbers', 
      description: 'Add automatic page numbering to PDF', 
      category: 'EDIT PDF',
      color: 'from-purple-500 to-purple-600',
      features: ['Multiple positions', 'Custom formatting', 'All pages']
    },
    
    // PDF Security
    { 
      path: '/protect', 
      title: 'Protect PDF', 
      description: 'Add password protection with AES-256 encryption', 
      category: 'PDF SECURITY',
      color: 'from-red-500 to-red-600',
      features: ['AES-256 encryption', 'Custom passwords', 'Secure encryption']
    },
    { 
      path: '/unlock', 
      title: 'Unlock PDF', 
      description: 'Remove password protection from PDF files', 
      category: 'PDF SECURITY',
      color: 'from-red-500 to-red-600',
      features: ['Quick unlock', 'Enter password', 'Safe processing']
    },
    
    // PDF Intelligence
    { 
      path: '/compare', 
      title: 'Compare PDF', 
      description: 'Compare two PDF files and find differences', 
      category: 'PDF INTELLIGENCE',
      color: 'from-indigo-500 to-indigo-600',
      features: ['Quick comparison', 'Detailed report', 'Page count check']
    }
  ];

  return (
    <>
      <Helmet>
        <title>All PDF Tools – PDF Master</title>
        <meta name="description" content="Complete collection of PDF tools: merge, compress, convert, protect, and more. Free online PDF editing tools." />
        <link rel="canonical" href="https://pdfmaster.com/tools" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-50 to-white py-10 md:py-16 border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 animate-fade-in-up">
            PDF Tools
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay-1">
            Professional-grade PDF editing tools designed for efficiency and precision. Choose the perfect tool for your document needs.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {tools.map((tool, index) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`group bg-white rounded-2xl shadow-md p-5 md:p-8 border border-gray-100 animate-fade-in-up-delay-${index % 3 + 1}`}
            >
              <div className={`inline-block bg-gradient-to-br ${tool.color} p-3 md:p-4 rounded-xl mb-4 md:mb-6`}>
                <div className="w-6 md:w-8 h-6 md:h-8 bg-white rounded-lg"></div>
              </div>
              
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                {tool.title}
              </h3>
              
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                {tool.description}
              </p>

              <ul className="space-y-1 md:space-y-2 mb-4 md:mb-6">
                {tool.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <span className="text-red-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Use This Tool →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-gray-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">Why Choose PDF Master?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                <svg className="w-6 md:w-8 h-6 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Lightning Fast</h3>
              <p className="text-sm md:text-base text-gray-600">Process your PDFs instantly with our optimized algorithms</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">100% Secure</h3>
              <p className="text-sm md:text-base text-gray-600">Your files are encrypted and deleted after processing</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Works Anywhere</h3>
              <p className="text-sm md:text-base text-gray-600">No downloads needed - works directly in your browser</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

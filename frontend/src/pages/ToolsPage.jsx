import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function ToolsPage() {
  const tools = [
    { 
      path: '/merge', 
      title: 'Merge PDFs', 
      description: 'Combine multiple PDF files into a single, organized document', 
      color: 'from-blue-500 to-blue-600',
      features: ['Drag & drop reordering', 'Unlimited files', 'High-quality output']
    },
    { 
      path: '/compress', 
      title: 'Compress PDF', 
      description: 'Significantly reduce PDF file size while maintaining quality', 
      color: 'from-orange-500 to-orange-600',
      features: ['Smart compression', 'Adjustable quality levels', 'See preview of size']
    },
    { 
      path: '/pdf-to-jpg', 
      title: 'PDF to JPG', 
      description: 'Convert all PDF pages to high-quality JPG images', 
      color: 'from-green-500 to-green-600',
      features: ['JPG & PNG formats', 'High resolution output', 'Download as a ZIP']
    },
    { 
      path: '/jpg-to-pdf', 
      title: 'JPG to PDF', 
      description: 'Convert images into a professional PDF document', 
      color: 'from-purple-500 to-purple-600',
      features: ['Multiple image support', 'Auto page sizing', 'Preserve quality']
    },
    { 
      path: '/protect', 
      title: 'Protect PDF', 
      description: 'Add password protection with AES-256 encryption', 
      color: 'from-red-500 to-red-600',
      features: ['AES-256 encryption', 'Custom passwords', 'Secure encryption']
    },
    { 
      path: '/unlock', 
      title: 'Unlock PDF', 
      description: 'Remove password protection from PDF files', 
      color: 'from-pink-500 to-pink-600',
      features: ['Quick unlock', 'Enter password', 'Safe processing']
    },
  ];

  return (
    <>
      <Helmet>
        <title>All PDF Tools – PDF Master</title>
        <meta name="description" content="Complete collection of PDF tools: merge, compress, convert, protect, and more. Free online PDF editing tools." />
        <link rel="canonical" href="https://pdfmaster.com/tools" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-50 to-white py-16 border-b border-red-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            PDF Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay-1">
            Professional-grade PDF editing tools designed for efficiency and precision. Choose the perfect tool for your document needs.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl p-8 transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-gray-200 animate-fade-in-up-delay-${index % 3 + 1}`}
            >
              <div className={`inline-block bg-gradient-to-br ${tool.color} p-4 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tool.description}
              </p>

              <ul className="space-y-2 mb-6">
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
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose PDF Master?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Process your PDFs instantly with our optimized algorithms</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Secure</h3>
              <p className="text-gray-600">Your files are encrypted and deleted after processing</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Works Anywhere</h3>
              <p className="text-gray-600">No downloads needed - works directly in your browser</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

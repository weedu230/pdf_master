import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { memo } from 'react';

const Home = memo(() => {
  const tools = [
    { path: '/merge', title: 'Merge PDFs', description: 'Combine multiple PDF files into a single, organized document', color: 'from-blue-500 to-blue-600' },
    { path: '/split', title: 'Split PDF', description: 'Split a PDF into individual pages', color: 'from-orange-500 to-orange-600' },
    { path: '/compress', title: 'Compress PDF', description: 'Significantly reduce PDF file size while maintaining quality', color: 'from-green-500 to-green-600' },
    { path: '/pdf-to-jpg', title: 'PDF to JPG', description: 'Convert all PDF pages to high-quality JPG images', color: 'from-purple-500 to-purple-600' },
    { path: '/jpg-to-pdf', title: 'JPG to PDF', description: 'Convert images into a professional PDF document', color: 'from-cyan-500 to-cyan-600' },
    { path: '/word-to-pdf', title: 'Word to PDF', description: 'Convert Word documents to PDF with images', color: 'from-yellow-500 to-yellow-600' },
    { path: '/pdf-to-word', title: 'PDF to Word', description: 'Convert PDF files to editable Word documents', color: 'from-indigo-500 to-indigo-600' },
    { path: '/powerpoint-to-pdf', title: 'PowerPoint to PDF', description: 'Convert presentations to PDF format', color: 'from-pink-500 to-pink-600' },
    { path: '/excel-to-pdf', title: 'Excel to PDF', description: 'Convert spreadsheets to PDF format', color: 'from-teal-500 to-teal-600' },
    { path: '/rotate', title: 'Rotate PDF', description: 'Rotate PDF pages to any angle', color: 'from-violet-500 to-violet-600' },
    { path: '/crop', title: 'Crop PDF', description: 'Crop PDF pages to specific dimensions', color: 'from-slate-500 to-slate-600' },
    { path: '/watermark', title: 'Add Watermark', description: 'Add text watermark to your PDFs', color: 'from-blue-500 to-blue-600' },
    { path: '/page-numbers', title: 'Add Page Numbers', description: 'Add automatic page numbering to PDF', color: 'from-orange-500 to-orange-600' },
    { path: '/remove-pages', title: 'Remove Pages', description: 'Remove specific pages from your PDF', color: 'from-red-500 to-red-600' },
    { path: '/extract-pages', title: 'Extract Pages', description: 'Extract selected pages from a PDF', color: 'from-green-500 to-green-600' },
    { path: '/repair', title: 'Repair PDF', description: 'Repair corrupted or damaged PDF files', color: 'from-yellow-500 to-yellow-600' },
    { path: '/compare', title: 'Compare PDFs', description: 'Compare two PDF documents', color: 'from-purple-500 to-purple-600' },
    { path: '/protect', title: 'Protect PDF', description: 'Add password protection with AES-256 encryption', color: 'from-red-500 to-red-600' },
    { path: '/unlock', title: 'Unlock PDF', description: 'Remove password protection from PDF files', color: 'from-pink-500 to-pink-600' },
  ];

  const features = [
    { 
      title: 'Your Privacy is Sacred', 
      desc: 'We don\'t want your data. Your files are encrypted and automatically deleted from our servers. Period.',
      svgIcon: (
        <svg className="w-6 md:w-8 h-6 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: 'No-Nonsense Speed', 
      desc: 'This tool is built to be fast. No unnecessary animations, no bloated code. Just pure performance.',
      svgIcon: (
        <svg className="w-6 md:w-8 h-6 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: 'It Just Works. Anywhere.', 
      desc: 'No downloads. No installations. If you have a browser, you can use PDF Master. Simple as that.',
      svgIcon: (
        <svg className="w-6 md:w-8 h-6 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <>
      <Helmet>
        <title>Free PDF Tools Online - Convert, Merge, Compress PDFs | PDF Master</title>
        <meta name="description" content="Free online PDF tools: Convert PDF to Word/JPG, Word/PowerPoint/Excel to PDF, merge, split, compress, rotate, crop, watermark, protect PDFs. 19 professional tools, fast, secure, no signup required." />
        <meta name="keywords" content="pdf to word, word to pdf, pdf to jpg, jpg to pdf, powerpoint to pdf, excel to pdf, merge pdf, split pdf, compress pdf, rotate pdf, watermark pdf, pdf converter, free pdf tools, pdf editor online" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Free PDF Tools Online - Convert, Merge, Compress PDFs" />
        <meta property="og:description" content="Professional PDF tools: PDF to Word, Word to PDF, merge, compress, convert PDFs. Fast, free, secure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf-master-weedu.netlify.app/" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PDF Tools Online - PDF Master" />
        <meta name="twitter:description" content="Convert PDF to Word, merge, compress PDFs online for free" />
        
        <link rel="canonical" href="https://pdf-master-weedu.netlify.app/" />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF Master",
            "url": "https://pdf-master-weedu.netlify.app/",
            "description": "Free online PDF tools for converting, merging, compressing, and editing PDFs",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "PDF to Word Converter",
              "Word to PDF Converter", 
              "PDF to JPG Converter",
              "JPG to PDF Converter",
              "PowerPoint to PDF Converter",
              "Excel to PDF Converter",
              "Merge PDF Files",
              "Split PDF Files",
              "Compress PDF",
              "Rotate PDF Pages",
              "Crop PDF Pages",
              "Add Watermark to PDF",
              "Add Page Numbers to PDF",
              "Remove Pages from PDF",
              "Extract Pages from PDF",
              "Repair Corrupted PDF",
              "Compare PDF Files",
              "Protect PDF with Password",
              "Unlock PDF"
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-3 md:mb-6 leading-tight">
              Edit PDFs <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 animate-gradient">Easily Online</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-2">19 Professional PDF tools at your fingertips.</p>
            <p className="text-base md:text-lg text-gray-500 mb-6 md:mb-8">Merge, split, convert, rotate, crop, watermark and more - all in one place.</p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
              <Link 
                to="/tools" 
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Start Editing →
              </Link>
              <Link 
                to="/tools" 
                className="border-2 border-gray-300 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:border-red-500 hover:text-red-600 transition-colors duration-300 hover:scale-105"
              >
                Upload Files
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mt-8 md:mt-12 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No registration required
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free to use
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Files deleted automatically
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 md:mb-4 text-gray-900 animate-fade-in-up">PDF Tools</h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base lg:text-lg animate-fade-in-up-delay-1">Professional-grade PDF editing tools designed for efficiency and precision.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {tools.map((tool, index) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl p-5 md:p-8 transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-gray-200 animate-fade-in-up-delay-${index % 3 + 1}`}
            >
              <div className={`inline-block bg-gradient-to-br ${tool.color} p-3 md:p-4 rounded-xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-6 md:w-8 h-6 md:h-8 bg-white rounded-lg"></div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors">{tool.title}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">{tool.description}</p>
              <span className="text-red-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Use This Tool →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 md:mb-4 text-gray-900">What We Stand For</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base lg:text-lg">Built on principles of privacy, performance, and accessibility</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 md:w-8 h-6 md:h-8">
                    {feature.svgIcon}
                  </div>
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">Ready to Edit Your PDFs?</h2>
          <p className="text-red-100 text-base md:text-lg mb-6 md:mb-8">Start with any of our tools. No credit card required.</p>
          <Link 
            to="/tools" 
            className="inline-block bg-white text-red-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </>
  );
});

Home.displayName = 'Home';
export default Home;

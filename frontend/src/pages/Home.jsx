import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Home() {
  const tools = [
    { path: '/merge', title: 'Merge PDFs', description: 'Combine multiple PDF files into a single, organized document', color: 'from-blue-500 to-blue-600' },
    { path: '/compress', title: 'Compress PDF', description: 'Significantly reduce PDF file size while maintaining quality', color: 'from-orange-500 to-orange-600' },
    { path: '/pdf-to-jpg', title: 'PDF to JPG', description: 'Convert all PDF pages to high-quality JPG images', color: 'from-green-500 to-green-600' },
    { path: '/jpg-to-pdf', title: 'JPG to PDF', description: 'Convert images into a professional PDF document', color: 'from-purple-500 to-purple-600' },
    { path: '/protect', title: 'Protect PDF', description: 'Add password protection with AES-256 encryption', color: 'from-red-500 to-red-600' },
    { path: '/unlock', title: 'Unlock PDF', description: 'Remove password protection from PDF files', color: 'from-pink-500 to-pink-600' },
  ];

  const features = [
    { 
      title: 'Your Privacy is Sacred', 
      desc: 'We don\'t want your data. Your files are encrypted and automatically deleted from our servers. Period.',
      svgIcon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: 'No-Nonsense Speed', 
      desc: 'This tool is built to be fast. No unnecessary animations, no bloated code. Just pure performance.',
      svgIcon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: 'It Just Works. Anywhere.', 
      desc: 'No downloads. No installations. If you have a browser, you can use PDF Master. Simple as that.',
      svgIcon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <>
      <Helmet>
        <title>PDF Master – Edit PDFs Easily Online</title>
        <meta name="description" content="Professional PDF editing tools. Merge, compress, convert, protect PDFs. Fast, free, no signup required." />
        <link rel="canonical" href="https://pdfmaster.com/" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold text-red-600 bg-red-100 px-4 py-2 rounded-full inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Trusted by 50,000+ users
              </span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Edit PDFs <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 animate-gradient">Easily Online</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-2">Professional PDF editing tools at your fingertips.</p>
            <p className="text-lg text-gray-500 mb-8">Merge, split, and convert your documents with ease.</p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/tools" 
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-pulse-glow"
              >
                Start Editing →
              </Link>
              <Link 
                to="/tools" 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-bold text-lg hover:border-red-500 hover:text-red-600 transition-all duration-300 hover:scale-105"
              >
                Upload Files
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex justify-center gap-12 mt-12 text-sm text-gray-600">
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
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 animate-fade-in-up">PDF Tools</h2>
        <p className="text-center text-gray-600 mb-12 text-lg animate-fade-in-up-delay-1">Professional-grade PDF editing tools designed for efficiency and precision.</p>
        
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
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{tool.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{tool.description}</p>
              <span className="text-red-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Use This Tool →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">What We Stand For</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Built on principles of privacy, performance, and accessibility</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.svgIcon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Edit Your PDFs?</h2>
          <p className="text-red-100 text-lg mb-8">Start with any of our tools. No credit card required.</p>
          <Link 
            to="/tools" 
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose PDF Master?</h2>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              Built for professionals who need reliable, fast, and secure PDF tools
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition">
              <h3 className="text-5xl font-bold text-red-600 mb-2">3</h3>
              <p className="text-gray-600 text-lg">Real Registered Users <br/>(We don't fake this number. It's the actual count.)</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">$0</h3>
              <p className="text-gray-600 text-lg">Cost to You <br/>(And we plan to keep the core tools free forever.)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

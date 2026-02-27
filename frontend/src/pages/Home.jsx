import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Home() {
  const tools = [
    { path: '/merge', title: 'Merge PDFs', description: 'Combine multiple PDF files into a single, organized document', icon: '📎', color: 'from-blue-500 to-blue-600' },
    { path: '/compress', title: 'Compress PDF', description: 'Significantly reduce PDF file size while maintaining quality', icon: '🗜️', color: 'from-orange-500 to-orange-600' },
    { path: '/pdf-to-jpg', title: 'PDF to JPG', description: 'Convert all PDF pages to high-quality JPG images', icon: '🖼️', color: 'from-green-500 to-green-600' },
    { path: '/jpg-to-pdf', title: 'JPG to PDF', description: 'Convert images into a professional PDF document', icon: '📷', color: 'from-purple-500 to-purple-600' },
    { path: '/protect', title: 'Protect PDF', description: 'Add password protection with AES-256 encryption', icon: '🔒', color: 'from-red-500 to-red-600' },
    { path: '/unlock', title: 'Unlock PDF', description: 'Remove password protection from PDF files', icon: '🔓', color: 'from-pink-500 to-pink-600' },
  ];

  const features = [
    { title: 'Your Privacy is Sacred', desc: 'We don\'t want your data. Your files are encrypted and automatically deleted from our servers. Period.', icon: '🛡️' },
    { title: 'No-Nonsense Speed', desc: 'This tool is built to be fast. No unnecessary animations, no bloated code. Just pure performance.', icon: '⚡' },
    { title: 'It Just Works. Anywhere.', desc: 'No downloads. No installations. If you have a browser, you can use PDF Master. Simple as that.', icon: '🌍' },
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
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-red-600 bg-red-100 px-4 py-2 rounded-full">Trusted by 50,000+ users</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Edit PDFs <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Easily Online</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-2">Professional PDF editing tools at your fingertips.</p>
            <p className="text-lg text-gray-500 mb-8">Merge, split, and convert your documents with ease.</p>
            <div className="flex gap-4 justify-center">
              <Link to="/merge" className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:scale-105">
                Start Editing →
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-bold text-lg hover:border-red-500 hover:text-red-600 transition">
                Upload Files
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">PDF Tools</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Professional-grade PDF editing tools designed for efficiency and precision.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl p-8 transition transform hover:scale-105 duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className={`inline-block bg-gradient-to-br ${tool.color} p-4 rounded-xl mb-4 text-4xl`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <span className="text-red-600 font-semibold group-hover:translate-x-2 transition inline-block">
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
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
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
          <Link to="/merge" className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:scale-105">
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-5xl font-bold text-red-600 mb-2">3</h3>
            <p className="text-gray-600 text-lg">Real Registered Users (We don't fake this number. It's the actual count.)</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold text-gray-900 mb-2">$0</h3>
            <p className="text-gray-600 text-lg">Cost to You (And we plan to keep the core tools free forever.)</p>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Everything You Need for PDFs</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Merge multiple PDFs</h4>
                    <p className="text-gray-600 text-sm">Combine files effortlessly</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Split PDFs into pages</h4>
                    <p className="text-gray-600 text-sm">Extract specific sections</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Compress file sizes</h4>
                    <p className="text-gray-600 text-sm">Maintain quality while reducing size</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Convert to/from images</h4>
                    <p className="text-gray-600 text-sm">JPG, PNG format support</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Add watermarks</h4>
                    <p className="text-gray-600 text-sm">Protect and brand documents</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Convert to/from images</h4>
                    <p className="text-gray-600 text-sm">Full format compatibility</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-2xl p-12">
              <div className="text-center">
                <div className="text-7xl mb-4 bg-gradient-to-br from-red-500 to-red-600 bg-clip-text text-transparent">📄</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload & Process</h3>
                <p className="text-gray-600">Drag, drop, and transform your PDFs in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

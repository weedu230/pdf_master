import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Home() {
  const tools = [
    { path: '/merge', title: 'Merge PDF', description: 'Combine multiple PDFs into one', icon: '📎' },
    { path: '/compress', title: 'Compress PDF', description: 'Reduce PDF file size', icon: '🗜️' },
    { path: '/pdf-to-jpg', title: 'PDF to JPG', description: 'Convert PDF pages to images', icon: '🖼️' },
    { path: '/jpg-to-pdf', title: 'JPG to PDF', description: 'Convert images to PDF', icon: '📄' },
    { path: '/protect', title: 'Protect PDF', description: 'Add password protection', icon: '🔒' },
    { path: '/unlock', title: 'Unlock PDF', description: 'Remove password protection', icon: '🔓' },
  ];

  return (
    <>
      <Helmet>
        <title>PDF Master – Free Online PDF Tools</title>
        <meta name="description" content="Fast & free online PDF tools: merge, compress, convert to JPG, protect with password. No signup required." />
        <link rel="canonical" href="https://pdfmaster.com/" />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF Master</h1>
          <p className="text-xl text-gray-600 mb-2">Free online PDF tools. No signup. No limits.</p>
          <p className="text-gray-500">Your PDFs are safe. We don't store them.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition transform hover:scale-105"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{tool.title}</h2>
              <p className="text-gray-600">{tool.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why PDF Master?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ No registration required</li>
            <li>✓ Files deleted after 1 hour</li>
            <li>✓ Works in any browser</li>
            <li>✓ Fast processing</li>
            <li>✓ Completely free</li>
          </ul>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqs = [
    {
      question: "Is my data safe? Do you store my files?",
      answer: "Your privacy is our top priority. All files are processed temporarily on our secure servers and automatically deleted after conversion. We never store, share, or access your files for any reason. Your data is yours alone."
    },
    {
      question: "What file sizes can I upload?",
      answer: "You can upload files up to 100MB. For most common PDF operations, this covers the vast majority of use cases. If you need to process larger files, feel free to reach out with your requirements."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account needed! PDF Master is completely free and anonymous. Start converting, merging, or editing PDFs instantly without any registration or login."
    },
    {
      question: "Which browsers are supported?",
      answer: "PDF Master works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience."
    },
    {
      question: "Can I use this offline?",
      answer: "PDF Master requires an internet connection as files are processed on our servers. However, we're exploring offline capabilities for future releases."
    },
    {
      question: "What makes PDF Master different?",
      answer: "PDF Master is built by a student for everyone. No ads, no forced logins, no upselling. Just simple, fast, and privacy-focused PDF tools. Clean interface, powerful backend, zero complications."
    },
    {
      question: "How much does it cost?",
      answer: "Completely free! All 19 PDF tools are available at no cost. We believe great tools should be accessible to everyone."
    },
    {
      question: "Will you add more tools in the future?",
      answer: "Absolutely! We're constantly working on new features based on user feedback. Click 'Review' in the navbar to suggest features you'd like to see."
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      icon: "⚛️",
      technologies: [
        "React 18 with modern hooks",
        "Vite 5.4 for lightning-fast builds",
        "Tailwind CSS 4.1 for responsive UI",
        "React Router v6 for navigation",
        "Axios for API communication"
      ]
    },
    {
      category: "Backend",
      icon: "🐍",
      technologies: [
        "Python 3.11 with FastAPI",
        "Uvicorn async server",
        "PyPDF2 for PDF manipulation",
        "pikepdf for compression",
        "pdf2image & Pillow for image conversion",
        "python-docx for Word documents",
        "reportlab for PDF generation"
      ]
    },
    {
      category: "Deployment",
      icon: "🚀",
      technologies: [
        "Netlify for frontend hosting",
        "Railway/Vercel for backend",
        "Automated CI/CD pipeline",
        "Docker containerization",
        "GitHub for version control"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              About PDF Master
            </h1>
            <p className="text-base md:text-lg lg:text-2xl text-red-100">
              A free, fast, and privacy-first PDF toolkit
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Tech Stack Section */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Built With Modern Tech</h2>
              <p className="text-base md:text-lg text-gray-600">Cutting-edge technologies powering PDF Master</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {techStack.map((stack, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow">
                  <div className="text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4">{stack.icon}</div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{stack.category}</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {stack.technologies.map((tech, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3">
                        <svg className="w-4 md:w-5 h-4 md:h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm md:text-base text-gray-700">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Frequently Asked Questions</h2>
              <p className="text-base md:text-lg text-gray-600">Everything you need to know about PDF Master</p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                    className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 text-left">{faq.question}</h3>
                    <svg 
                      className={`w-5 md:w-6 h-5 md:h-6 text-red-500 transition-transform flex-shrink-0 ${expandedFaq === idx ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 md:mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 md:p-8 lg:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Ready to try PDF Master?</h3>
            <p className="text-red-100 text-base md:text-lg mb-4 md:mb-6">
              All tools are free and completely anonymous. No signup required.
            </p>
            <a 
              href="/tools"
              className="inline-block bg-white text-red-600 px-6 md:px-8 py-2 md:py-3 rounded-lg font-bold text-sm md:text-base hover:bg-gray-100 transition-colors"
            >
              Explore All Tools →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutPage;

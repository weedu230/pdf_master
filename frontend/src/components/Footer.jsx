import { Link } from 'react-router-dom';
import { memo } from 'react';

const Footer = memo(() => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold">PDF Master</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              19 professional PDF tools for everyone. Fast, secure, and completely free. No signup required.
            </p>
            <p className="text-gray-300 text-xs">
              Built with passion by a student developer
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-lg">Quick Links</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-400 transition-colors duration-200">Home</Link></li>
              <li><Link to="/tools" className="hover:text-red-400 transition-colors duration-200">All Tools</Link></li>
              <li><Link to="/about" className="hover:text-red-400 transition-colors duration-200">About</Link></li>
              <li><a href="mailto:mwaleed256@gmail.com" className="hover:text-red-400 transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-bold mb-4 text-white text-lg">Popular Tools</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><Link to="/merge" className="hover:text-red-400 transition-colors duration-200">Merge PDF</Link></li>
              <li><Link to="/compress" className="hover:text-red-400 transition-colors duration-200">Compress PDF</Link></li>
              <li><Link to="/pdf-to-word" className="hover:text-red-400 transition-colors duration-200">PDF to Word</Link></li>
              <li><Link to="/word-to-pdf" className="hover:text-red-400 transition-colors duration-200">Word to PDF</Link></li>
              <li><Link to="/pdf-to-jpg" className="hover:text-red-400 transition-colors duration-200">PDF to JPG</Link></li>
              <li><Link to="/protect" className="hover:text-red-400 transition-colors duration-200">Protect PDF</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold mb-4 text-white text-lg">Connect</h3>
            <div className="space-y-3">
              <a 
                href="mailto:mwaleed256@gmail.com" 
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>mwaleed256@gmail.com</span>
              </a>

              <a 
                href="tel:03332406306" 
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+92 333-2406306</span>
              </a>

              <div className="flex gap-3 mt-4">
                <a 
                  href="https://github.com/weedu230" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Visit our GitHub profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>

                <a 
                  href="https://linkedin.com/in/weedu" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Visit our LinkedIn profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2026 PDF Master. All rights reserved. Made with ❤️ for everyone.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/about" className="text-gray-400 hover:text-red-400 transition-colors">Privacy</a>
              <a href="/about" className="text-gray-400 hover:text-red-400 transition-colors">Terms</a>
              <a href="mailto:mwaleed256@gmail.com" className="text-gray-400 hover:text-red-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;

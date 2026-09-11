import React from 'react';
import { FileText, Scissors, RotateCw, Merge, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

const Footer = React.memo(() => {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                PDF Master
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Fast, free, privacy-focused PDF tools built with modern web technology. No signup required. Your PDFs are instantly deleted from our servers.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:mwaleedahmed256@gmail/com" 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/split" className="hover:text-red-400 transition-colors flex items-center gap-2"><Scissors className="w-4 h-4" /> Split PDF</a></li>
              <li><a href="/merge" className="hover:text-red-400 transition-colors flex items-center gap-2"><Merge className="w-4 h-4" /> Merge PDF</a></li>
              <li><a href="/compress" className="hover:text-red-400 transition-colors flex items-center gap-2"><RotateCw className="w-4 h-4" /> Compress PDF</a></li>
              <li><a href="/convert" className="hover:text-red-400 transition-colors flex items-center gap-2"><ArrowUpRight className="w-4 h-4" /> Convert PDF</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Security</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Privacy First</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> No Signup Required</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Instant Deletion</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2026 PDF Master. All rights reserved. Made with ❤️ for everyone.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/about" className="text-gray-400 hover:text-red-400 transition-colors">Privacy</a>
              <a href="/about" className="text-gray-400 hover:text-red-400 transition-colors">Terms</a>
              <a href="mailto:mwaleedahmed256@gmail/com" className="text-gray-400 hover:text-red-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;

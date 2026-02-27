export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-2">About</h3>
            <p className="text-sm text-gray-400">PDF Master provides fast, free online PDF tools without signup.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Tools</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Merge PDFs</li>
              <li>Compress PDF</li>
              <li>Convert PDF to JPG</li>
              <li>Convert JPG to PDF</li>
              <li>Protect PDF</li>
              <li>Unlock PDF</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Legal</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; 2026 PDF Master. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

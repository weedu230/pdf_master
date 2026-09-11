import { Link } from 'react-router-dom';
import { useState, memo } from 'react';

const Navbar = memo(() => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');

  const handleReviewSubmit = (e) => {
    e?.preventDefault?.();

    if (reviewText.trim()) {
      const subject = encodeURIComponent('PDF Master - Feature Request/Feedback');
      const body = encodeURIComponent(`Feature/Feedback:\n${reviewText}\n\nEmail: ${reviewEmail || 'Anonymous'}`);
      window.location.href = `mailto:mwaleedahmed256@gmail.com?subject=${subject}&body=${body}`;
      setReviewText('');
      setReviewEmail('');
      setShowReviewModal(false);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
            <svg className="w-5 md:w-6 h-5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg md:text-2xl font-bold text-gray-900 hidden sm:inline">PDF Master</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-300">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-300">About</Link>
          <Link to="/tools" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-300">Tools</Link>
          <button onClick={() => setShowReviewModal(true)} className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition duration-300 text-sm">Review</button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-700 hover:text-red-600 transition-colors" aria-label="Toggle navigation menu" aria-expanded={isMobileMenuOpen}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-40 border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <Link to="/" onClick={closeMobileMenu} className="block text-gray-700 hover:text-red-600 font-medium transition-colors py-2">Home</Link>
              <Link to="/about" onClick={closeMobileMenu} className="block text-gray-700 hover:text-red-600 font-medium transition-colors py-2">About</Link>
              <Link to="/tools" onClick={closeMobileMenu} className="block text-gray-700 hover:text-red-600 font-medium transition-colors py-2">All Tools</Link>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm font-semibold text-gray-600 mb-2">Popular Tools</p>
                <div className="space-y-2">
                  <Link to="/merge" onClick={closeMobileMenu} className="block text-sm text-gray-700 hover:text-red-600 py-1">Merge PDF</Link>
                  <Link to="/compress" onClick={closeMobileMenu} className="block text-sm text-gray-700 hover:text-red-600 py-1">Compress PDF</Link>
                  <Link to="/pdf-to-jpg" onClick={closeMobileMenu} className="block text-sm text-gray-700 hover:text-red-600 py-1">PDF to JPG</Link>
                  <Link to="/word-to-pdf" onClick={closeMobileMenu} className="block text-sm text-gray-700 hover:text-red-600 py-1">Word to PDF</Link>
                  <Link to="/protect" onClick={closeMobileMenu} className="block text-sm text-gray-700 hover:text-red-600 py-1">Protect PDF</Link>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowReviewModal(true);
                  closeMobileMenu();
                }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition duration-300 text-sm mt-3"
              >
                Send Feedback
              </button>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
            <form
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onSubmit={handleReviewSubmit}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Send Feedback</h3>
                <button type="button" onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">What feature would you like us to add, remove, or improve?</p>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your feedback or feature request..."
                className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-28 text-sm"
              />

              <input
                type="email"
                value={reviewEmail}
                onChange={(e) => setReviewEmail(e.target.value)}
                placeholder="Your email (optional)"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />

              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-red-500 text-white py-2 md:py-3 rounded-lg font-medium hover:bg-red-600 transition text-sm md:text-base">Submit</button>
                <button type="button" onClick={() => setShowReviewModal(false)} className="flex-1 bg-gray-200 text-gray-800 py-2 md:py-3 rounded-lg font-medium hover:bg-gray-300 transition text-sm md:text-base">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;

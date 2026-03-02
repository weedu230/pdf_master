import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Retry lazy loading with better error handling
const lazyRetry = (componentImport) => 
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload();
      }
      throw error;
    }
  });

// Lazy load page components with retry
const Home = lazyRetry(() => import('./pages/Home'));
const ToolsPage = lazyRetry(() => import('./pages/ToolsPage'));
const AboutPage = lazyRetry(() => import('./pages/AboutPage'));

// Organize PDF
const MergePage = lazyRetry(() => import('./pages/MergePage'));
const SplitPdfPage = lazyRetry(() => import('./pages/SplitPdfPage'));
const RemovePagesPage = lazyRetry(() => import('./pages/RemovePagesPage'));
const ExtractPagesPage = lazyRetry(() => import('./pages/ExtractPagesPage'));

// Optimize PDF
const CompressPage = lazyRetry(() => import('./pages/CompressPage'));
const RepairPdfPage = lazyRetry(() => import('./pages/RepairPdfPage'));

// Convert to PDF
const PdfToJpgPage = lazyRetry(() => import('./pages/PdfToJpgPage'));
const JpgToPdfPage = lazyRetry(() => import('./pages/JpgToPdfPage'));
const WordToPdfPage = lazyRetry(() => import('./pages/WordToPdfPage'));
const PowerpointToPdfPage = lazyRetry(() => import('./pages/PowerpointToPdfPage'));
const ExcelToPdfPage = lazyRetry(() => import('./pages/ExcelToPdfPage'));

// Convert from PDF
const PdfToWordPage = lazyRetry(() => import('./pages/PdfToWordPage'));

// Edit PDF
const RotatePdfPage = lazyRetry(() => import('./pages/RotatePdfPage'));
const CropPdfPage = lazyRetry(() => import('./pages/CropPdfPage'));
const WatermarkPdfPage = lazyRetry(() => import('./pages/WatermarkPdfPage'));
const PageNumbersPage = lazyRetry(() => import('./pages/PageNumbersPage'));

// PDF Security
const ProtectPage = lazyRetry(() => import('./pages/ProtectPage'));
const UnlockPage = lazyRetry(() => import('./pages/UnlockPage'));

// PDF Intelligence
const ComparePdfPage = lazyRetry(() => import('./pages/ComparePdfPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  </div>
);

// Error Boundary for lazy loading failures
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md px-4">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please refresh the page to continue</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>PDF Master - Free Online PDF Tools | Merge, Compress, Convert</title>
        <meta name="description" content="Free online PDF tools to merge, compress, convert, split, and edit PDFs. No signup required. Fast, secure, and privacy-focused." />
        <meta name="keywords" content="PDF tools, merge PDF, compress PDF, convert PDF, PDF to Word, Word to PDF, free PDF editor" />
        <meta name="author" content="Waleed Ahmed" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="PDF Master - Free Online PDF Tools" />
        <meta property="og:description" content="Free online PDF tools to merge, compress, convert, split, and edit PDFs. No signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdfmaster.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Master - Free Online PDF Tools" />
        <meta name="twitter:description" content="Free online PDF tools to merge, compress, convert, split, and edit PDFs." />
        <link rel="canonical" href="https://pdfmaster.com" />
      </Helmet>
      <ErrorBoundary>
        <BrowserRouter>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/about" element={<AboutPage />} />
                
                {/* Organize PDF */}
                <Route path="/merge" element={<MergePage />} />
                <Route path="/split" element={<SplitPdfPage />} />
                <Route path="/remove-pages" element={<RemovePagesPage />} />
                <Route path="/extract-pages" element={<ExtractPagesPage />} />
                
                {/* Optimize PDF */}
                <Route path="/compress" element={<CompressPage />} />
                <Route path="/repair" element={<RepairPdfPage />} />
                
                {/* Convert to PDF */}
                <Route path="/jpg-to-pdf" element={<JpgToPdfPage />} />
                <Route path="/word-to-pdf" element={<WordToPdfPage />} />
                <Route path="/powerpoint-to-pdf" element={<PowerpointToPdfPage />} />
                <Route path="/excel-to-pdf" element={<ExcelToPdfPage />} />
                
                {/* Convert from PDF */}
                <Route path="/pdf-to-jpg" element={<PdfToJpgPage />} />
                <Route path="/pdf-to-word" element={<PdfToWordPage />} />
                
                {/* Edit PDF */}
                <Route path="/rotate" element={<RotatePdfPage />} />
                <Route path="/crop" element={<CropPdfPage />} />
                <Route path="/watermark" element={<WatermarkPdfPage />} />
                <Route path="/page-numbers" element={<PageNumbersPage />} />
                
                {/* PDF Security */}
                <Route path="/protect" element={<ProtectPage />} />
                <Route path="/unlock" element={<UnlockPage />} />
                
                {/* PDF Intelligence */}
                <Route path="/compare" element={<ComparePdfPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

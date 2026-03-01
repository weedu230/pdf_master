import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Organize PDF
const MergePage = lazy(() => import('./pages/MergePage'));
const SplitPdfPage = lazy(() => import('./pages/SplitPdfPage'));
const RemovePagesPage = lazy(() => import('./pages/RemovePagesPage'));
const ExtractPagesPage = lazy(() => import('./pages/ExtractPagesPage'));

// Optimize PDF
const CompressPage = lazy(() => import('./pages/CompressPage'));
const RepairPdfPage = lazy(() => import('./pages/RepairPdfPage'));

// Convert to PDF
const PdfToJpgPage = lazy(() => import('./pages/PdfToJpgPage'));
const JpgToPdfPage = lazy(() => import('./pages/JpgToPdfPage'));
const WordToPdfPage = lazy(() => import('./pages/WordToPdfPage'));
const PowerpointToPdfPage = lazy(() => import('./pages/PowerpointToPdfPage'));
const ExcelToPdfPage = lazy(() => import('./pages/ExcelToPdfPage'));

// Convert from PDF
const PdfToWordPage = lazy(() => import('./pages/PdfToWordPage'));

// Edit PDF
const RotatePdfPage = lazy(() => import('./pages/RotatePdfPage'));
const CropPdfPage = lazy(() => import('./pages/CropPdfPage'));
const WatermarkPdfPage = lazy(() => import('./pages/WatermarkPdfPage'));
const PageNumbersPage = lazy(() => import('./pages/PageNumbersPage'));

// PDF Security
const ProtectPage = lazy(() => import('./pages/ProtectPage'));
const UnlockPage = lazy(() => import('./pages/UnlockPage'));

// PDF Intelligence
const ComparePdfPage = lazy(() => import('./pages/ComparePdfPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
  </div>
);

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
    </HelmetProvider>
  );
}

export default App;

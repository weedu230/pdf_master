import { BrowserRouter, Routes, Route, Suspense, lazy } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const MergePage = lazy(() => import('./pages/MergePage'));
const CompressPage = lazy(() => import('./pages/CompressPage'));
const PdfToJpgPage = lazy(() => import('./pages/PdfToJpgPage'));
const JpgToPdfPage = lazy(() => import('./pages/JpgToPdfPage'));
const ProtectPage = lazy(() => import('./pages/ProtectPage'));
const UnlockPage = lazy(() => import('./pages/UnlockPage'));
const WordToPdfPage = lazy(() => import('./pages/WordToPdfPage'));
const PdfToWordPage = lazy(() => import('./pages/PdfToWordPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/merge" element={<MergePage />} />
            <Route path="/compress" element={<CompressPage />} />
            <Route path="/pdf-to-jpg" element={<PdfToJpgPage />} />
            <Route path="/jpg-to-pdf" element={<JpgToPdfPage />} />
            <Route path="/protect" element={<ProtectPage />} />
            <Route path="/unlock" element={<UnlockPage />} />
            <Route path="/word-to-pdf" element={<WordToPdfPage />} />
            <Route path="/pdf-to-word" element={<PdfToWordPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

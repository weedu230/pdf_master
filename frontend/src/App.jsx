import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToolsPage from './pages/ToolsPage';
import MergePage from './pages/MergePage';
import CompressPage from './pages/CompressPage';
import PdfToJpgPage from './pages/PdfToJpgPage';
import JpgToPdfPage from './pages/JpgToPdfPage';
import ProtectPage from './pages/ProtectPage';
import UnlockPage from './pages/UnlockPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/merge" element={<MergePage />} />
          <Route path="/compress" element={<CompressPage />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpgPage />} />
          <Route path="/jpg-to-pdf" element={<JpgToPdfPage />} />
          <Route path="/protect" element={<ProtectPage />} />
          <Route path="/unlock" element={<UnlockPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

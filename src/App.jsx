import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlatformPage from './pages/platform/PlatformPage';
import EnterprisePage from './pages/enterprise/EnterprisePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/platform" replace />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
      </Routes>
    </Router>
  );
}

export default App;

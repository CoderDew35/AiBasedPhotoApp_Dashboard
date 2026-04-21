import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import AcquisitionPage from './pages/AcquisitionPage';
import ActivationPage from './pages/ActivationPage';
import ConversionPage from './pages/ConversionPage';
import RetentionPage from './pages/RetentionPage';
import RevenuePage from './pages/RevenuePage';
import ABTestingPage from './pages/ABTestingPage';
import ComingSoonPage from './pages/ComingSoonPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/acquisition" replace />} />
          <Route path="acquisition" element={<AcquisitionPage />} />
          <Route path="activation" element={<ActivationPage />} />
          <Route path="conversion" element={<ConversionPage />} />
          <Route path="retention" element={<RetentionPage />} />
          <Route path="referral" element={<ComingSoonPage />} />
          <Route path="revenue" element={<RevenuePage />} />
          <Route path="ab-testing" element={<ABTestingPage />} />
          <Route path="system-logs" element={<ComingSoonPage />} />
          <Route path="*" element={<Navigate to="/acquisition" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

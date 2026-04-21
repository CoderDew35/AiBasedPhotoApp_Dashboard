import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LoadingSkeleton from './components/ui/LoadingSkeleton';

// Lazy-loaded pages — code-split per route for optimal bundle size
const AcquisitionPage = lazy(() => import('./pages/AcquisitionPage'));
const ActivationPage = lazy(() => import('./pages/ActivationPage'));
const ConversionPage = lazy(() => import('./pages/ConversionPage'));
const RetentionPage = lazy(() => import('./pages/RetentionPage'));
const RevenuePage = lazy(() => import('./pages/RevenuePage'));
const ABTestingPage = lazy(() => import('./pages/ABTestingPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route
            index
            element={<Navigate to="/acquisition" replace />}
          />
          <Route
            path="acquisition"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <AcquisitionPage />
              </Suspense>
            }
          />
          <Route
            path="activation"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ActivationPage />
              </Suspense>
            }
          />
          <Route
            path="conversion"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ConversionPage />
              </Suspense>
            }
          />
          <Route
            path="retention"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <RetentionPage />
              </Suspense>
            }
          />
          <Route
            path="referral"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ComingSoonPage />
              </Suspense>
            }
          />
          <Route
            path="revenue"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <RevenuePage />
              </Suspense>
            }
          />
          <Route
            path="ab-testing"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ABTestingPage />
              </Suspense>
            }
          />
          <Route
            path="system-logs"
            element={
              <Suspense fallback={<LoadingSkeleton />}>
                <ComingSoonPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/acquisition" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import React, { Suspense, useState, useEffect, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BackToTop } from './components/BackToTop';
import SEO from './components/SEO';
import { GlobalStyles } from './styles/GlobalStyles';
import { RoutePaths } from './utils/routes';
import { Skeleton } from './components/Skeleton';
import Navigation from './components/Navigation';
import LoadingFallback from './components/LoadingFallback';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import useRouteOptimization from './hooks/useRouteOptimization';

// Import pages with improved code splitting and chunk naming
const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home'));
const ContactPage = lazy(() => import(/* webpackChunkName: "contact" */ './pages/contactus'));
const ErrorPage = lazy(() => import(/* webpackChunkName: "error" */ './pages/Error'));
const WorkPage = lazy(() => import(/* webpackChunkName: "work" */ './pages/Work'));

// Import work-related components with chunk grouping
const GraphicsWorkPageBase = lazy(() => import(/* webpackChunkName: "graphics-work" */ './work/Graphics'));
const GraphicsDetailPageBase = lazy(() => import(/* webpackChunkName: "graphics-detail" */ './work/GraphicsDetail'));
const UXUIWorkPageBase = lazy(() => import(/* webpackChunkName: "uxui-work" */ './work/UXUI'));
const UXUIDetailPageBase = lazy(() => import(/* webpackChunkName: "uxui-detail" */ './work/UXUIDetail'));
const WebDevWorkPageBase = lazy(() => import(/* webpackChunkName: "webdev-work" */ './work/WebDev'));
const WebDevDetailPageBase = lazy(() => import(/* webpackChunkName: "webdev-detail" */ './work/WebDevDetail'));

// Simple wrapper components - base components now use ThemeContext directly
const WebDevWorkPage = () => <WebDevWorkPageBase />;
const WebDevDetailPage = () => <WebDevDetailPageBase />;

// UXUI page wrapper components
const UXUIWorkPage = () => <UXUIWorkPageBase />;
const UXUIDetailPage = () => <UXUIDetailPageBase />;

// Graphics page wrapper components
const GraphicsWorkPage = () => <GraphicsWorkPageBase />;
const GraphicsDetailPage = () => <GraphicsDetailPageBase />;

// Import special pages with their own chunks
const UfanisiSpecialPage = lazy(() => import(/* webpackChunkName: "ufanisi-special" */ './pages/UfanisiSpecialPage'));
const UfanisiResortPage = lazy(() => import(/* webpackChunkName: "ufanisi-resort" */ './work/UfanisiResort'));

// AppContent component to use hooks that require Router context
const AppContent: React.FC = () => {
  // Use route optimization hook
  useRouteOptimization();
  
  // Access theme context
  const { theme, toggleTheme } = useTheme();
  
  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // If loading, show improved loading fallback
  if (loading) {
    return (
      <>
        <GlobalStyles />
        <LoadingFallback message="Initializing application..." />
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <SEO title="Home" description="Welcome to my portfolio" />
      <BackToTop />
      {/* Add Navigation */}
      <Navigation />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
              {/* Improved routes for Ufanisi Resort that use proper styling */}
              <Route path="/ufanisi" element={<UfanisiSpecialPage />} />
              <Route path="ufanisi" element={<UfanisiSpecialPage />} />
              
              <Route path={RoutePaths.Home} element={<Home />} />
              <Route path={RoutePaths.Contact} element={<ContactPage />} />
              
              {/* Work-related routes */}
              <Route path={RoutePaths.Work} element={<WorkPage />} />
              <Route path={RoutePaths.GraphicsWork} element={<GraphicsWorkPage />} />
              <Route path={RoutePaths.GraphicsDetail} element={<GraphicsDetailPage />} />
              <Route path={RoutePaths.UXUIWork} element={<UXUIWorkPage />} />
              
              {/* Special dedicated routes for Ufanisi Resort - all possible format variations */}
              <Route path="/work/uxui/ufanisi-resort" element={<UfanisiResortPage />} />
              <Route path="work/uxui/ufanisi-resort" element={<UfanisiResortPage />} />
              <Route path="/ufanisi-resort-project" element={<UfanisiResortPage />} />
              <Route path="ufanisi-resort-project" element={<UfanisiResortPage />} />
              
              <Route path={RoutePaths.UXUIDetail} element={<UXUIDetailPage />} />
              <Route path={RoutePaths.WebDevWork} element={<WebDevWorkPage />} />
              <Route path={RoutePaths.WebDevDetail} element={<WebDevDetailPage />} />
              
              {/* Error route should always be last */}
              <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

// Main App component
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

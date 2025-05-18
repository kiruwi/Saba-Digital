import React, { Suspense, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes/theme';
import { HelmetProvider } from 'react-helmet-async';
import ThemeToggle from './components/ThemeToggle';
import { BackToTop } from './components/BackToTop';
import SEO from './components/SEO';
import { GlobalStyles } from './styles/GlobalStyles';
import ThemeUtils from './utils/theme';
import { RoutePaths } from './utils/routes';
import { Skeleton } from './components/Skeleton';
import Navigation from './components/Navigation';

// Import pages directly to avoid routing issues
const Home = React.lazy(() => import('./pages/Home'));
const ContactPage = React.lazy(() => import('./pages/contactus'));
const ErrorPage = React.lazy(() => import('./pages/Error'));
const WorkPage = React.lazy(() => import('./pages/Work'));

// Import work-related components
const GraphicsWorkPage = React.lazy(() => import('./work/Graphics'));
const GraphicsDetailPage = React.lazy(() => import('./work/GraphicsDetail'));
const UXUIWorkPage = React.lazy(() => import('./work/UXUI'));
const UXUIDetailPage = React.lazy(() => import('./work/UXUIDetail'));
const WebDevWorkPage = React.lazy(() => import('./work/WebDev'));
const WebDevDetailPage = React.lazy(() => import('./work/WebDevDetail'));

// Import special pages
const UfanisiSpecialPage = React.lazy(() => import('./pages/UfanisiSpecialPage'));
const UfanisiResortPage = React.lazy(() => import('./work/UfanisiResort'));

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    ThemeUtils.getInitialTheme()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle theme initialization
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme as 'light' | 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // If loading, show skeleton
  if (loading) {
    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div className="loading">Loading...</div>
      </ThemeProvider>
    );
  }

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <SEO title="Home" description="Welcome to my portfolio" />
        {/* With HashRouter, we don't need a basename as it uses hash-based routing */}
        <Router>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <BackToTop />
          {/* Add Navigation */}
          <Navigation />
          <Suspense fallback={<div>Loading...</div>}>
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
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

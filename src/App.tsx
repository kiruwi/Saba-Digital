// src/App.tsx
import React, { Suspense, lazy } from "react";
// import { enhanceKeyboardNavigation } from "./utils/keyboardNavigation";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import { useGAPageViews } from "./utils/analytics";
import { ThemeProvider as CustomThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AccessibilityProvider } from "./components/AccessibilityProvider";
// import { AccessibilityTester } from "./components/AccessibilityTester";
import { lightTheme, darkTheme } from "./themes/theme";
import Layout from './components/Layout';
import AdDesign from './work/AdDesign';
import MotionGraphics from './work/MotionGraphics';
import ErrorPage from "./pages/Error";
import LoadingFallback from "./components/LoadingFallback";
import "./App.css";
import "./nohemi-fonts.css"; // Import Nohemi font definitions
import "./satoshi-fonts.css"; // Import Satoshi font definitions
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";

// Lazy load components for better code splitting
const Home = lazy(() => import("./pages/index"));
const ContactPage = lazy(() => import("./pages/contactus"));
const UXUI = lazy(() => import("./work/UXUI"));
const WebDev = lazy(() => import("./work/WebDev"));
const Graphics = lazy(() => import("./work/Graphics"));
const UXUIDetail = lazy(() => import("./work/UXUIDetail"));
const WebDevDetail = lazy(() => import("./work/WebDevDetail"));
const GraphicsDetail = lazy(() => import("./work/GraphicsDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

// RouteChangeTracker component to track page views
function RouteChangeTracker() {
  // Use the custom hook to track page views
  useGAPageViews();
  return null;
}

// Wrapper component to access theme context
function AppContent() {
  const { theme } = useTheme();
  
  // Convert theme string to the appropriate theme object
  const themeObject = theme === 'light' ? lightTheme : darkTheme;
  

  // Apply keyboard navigation enhancement on mount and when routes change
  // useEffect(() => {
  //   // Short timeout to ensure DOM is fully rendered
  //   const timer = setTimeout(() => {
  //     enhanceKeyboardNavigation();
  //   }, 500);
    
  //   return () => clearTimeout(timer);
  // }, []);
  
  return (
    <HelmetProvider>
      <StyledThemeProvider theme={themeObject}>
        <AccessibilityProvider>
          <GlobalStyles />
          <CookieBanner />
          <Router>
          {/* Skip navigation link removed */}
          {/* <AccessibilityTester /> */}
          <ScrollToTop /> {/* Add ScrollToTop to ensure proper scroll restoration */}
          <RouteChangeTracker />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              <Route path="/contact" element={
                <Layout>
                  <ContactPage />
                </Layout>
              } />
              <Route path="/contactus" element={<Navigate to="/contact" replace />} />
              <Route path="/work/ux-ui" element={
                <Layout>
                  <UXUI />
                </Layout>
              } />
              <Route path="/work/web-dev" element={
                <Layout>
                  <WebDev />
                </Layout>
              } />
              <Route path="/work/graphics" element={
                <Layout>
                  <Graphics />
                </Layout>
              } />
              <Route path="/work/ad-design" element={
                <Layout>
                  <AdDesign />
                </Layout>
              } />
              <Route path="/work/motion" element={
                <Layout>
                  <MotionGraphics />
                </Layout>
              } />
              <Route path="/work/ux-ui/:id" element={
                <Layout>
                  <UXUIDetail />
                </Layout>
              } />
              <Route path="/work/web-dev/:id" element={
                <Layout>
                  <WebDevDetail />
                </Layout>
              } />
              <Route path="/work/graphics/:id" element={
                <Layout>
                  <GraphicsDetail />
                </Layout>
              } />
              <Route path="/privacy" element={
                <Layout>
                  <PrivacyPolicy />
                </Layout>
              } />
              <Route path="/cookies" element={
                <Layout>
                  <CookiePolicy />
                </Layout>
              } />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </Router>
        </AccessibilityProvider>
      </StyledThemeProvider>
    </HelmetProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;

// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyles from "./components/GlobalStyles";
import { useGAPageViews } from "./utils/analytics";
import { ThemeProvider as CustomThemeProvider, useTheme } from "./contexts/ThemeContext";
import { lightTheme, darkTheme } from "./themes/theme";
import { Home } from "./pages";
import ContactPage from "./pages/contactus";
import ErrorPage from "./pages/Error";
import UXUI from "./work/UXUI";
import WebDev from "./work/WebDev";
import Graphics from "./work/Graphics";
import UXUIDetail from "./work/UXUIDetail";
import WebDevDetail from "./work/WebDevDetail";
import GraphicsDetail from "./work/GraphicsDetail";
import Layout from "./components/Layout";
import "./App.css";
import "./fonts.css"; // Import SpotifyMix font definitions
import ScrollToTop from "./components/ScrollToTop";

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
  
  // Log the current theme for debugging
  console.log('App current theme:', theme);
  
  return (
  
    <HelmetProvider>
      <StyledThemeProvider theme={themeObject}>
        <GlobalStyles />
        <Router>
          <ScrollToTop /> {/* Add ScrollToTop to ensure proper scroll restoration */}
          <RouteChangeTracker />
          <Routes>
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/contactus" element={
              <Layout>
                <ContactPage />
              </Layout>
            } />

            {/* work pages */}
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

            {/* project detail pages */}
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

            {/* 404 error page */}
            <Route path="*" element={
              <Layout>
                <ErrorPage />
              </Layout>
            } />
          </Routes>
        </Router>
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

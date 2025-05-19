// src/App.js
import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/theme";
import { trackPageView } from "./utils/analytics";
import { Home } from "./pages";
import ContactPage from "./pages/contactus";
import ErrorPage from "./pages/Error";
import UXUI from "./work/UXUI";
import WebDev from "./work/WebDev";
import Graphics from "./work/Graphics";
import UXUIDetail from "./work/UXUIDetail";
import WebDevDetail from "./work/WebDevDetail";
import GraphicsDetail from "./work/GraphicsDetail";
import "./App.css";

// RouteChangeTracker component to track page views
function RouteChangeTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view with Google Analytics
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function App() {
  // Setting a consistent light theme for the entire application
  useEffect(() => {
    document.body.className = 'light';
  }, []);
  
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <Router>
          <RouteChangeTracker />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contactus" element={<ContactPage />} />

            {/* work pages */}
            <Route path="/work/ux-ui" element={<UXUI />} />
            <Route path="/work/web-dev" element={<WebDev />} />
            <Route path="/work/graphics" element={<Graphics />} />

            {/* project detail pages */}
            <Route path="/work/ux-ui/:id" element={<UXUIDetail />} />
            <Route path="/work/web-dev/:id" element={<WebDevDetail />} />
            <Route path="/work/graphics/:id" element={<GraphicsDetail />} />

            {/* 404 route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

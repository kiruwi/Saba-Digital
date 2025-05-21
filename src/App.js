// src/App.js
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes/theme";
import ThemeUtils from "./utils/theme";
// Import commented out temporarily
// import ThemeToggle from "./components/ThemeToggle";
import GlobalStyles from "./components/GlobalStyles";
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
  // Get initial theme preference
  // eslint-disable-next-line no-unused-vars
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Use server-side rendering safe check
    if (typeof window !== 'undefined') {
      return ThemeUtils.getInitialTheme();
    }
    return 'light';
  });

  // Toggle between light and dark theme - temporarily commented out
  // const toggleTheme = () => {
  //   setCurrentTheme(prevTheme => ThemeUtils.toggleTheme(prevTheme));
  // };
  
  // Update body class when theme changes
  useEffect(() => {
    document.body.className = currentTheme;
  }, [currentTheme]);
  
  // Get the current theme object
  const theme = currentTheme === 'light' ? lightTheme : darkTheme;
  
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {/* Theme toggle temporarily commented out - will be added back later */}
        {/* <ThemeToggle theme={currentTheme} toggleTheme={toggleTheme} /> */}
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

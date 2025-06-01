// src/App.js
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes/theme";
import ThemeUtils from "./utils/theme";
import GlobalStyles from "./components/GlobalStyles";
import { useGAPageViews } from "./utils/analytics";
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
import "./fonts.css"; // Import SpotifyMix font definitions
import ScrollToTop from "./components/ScrollToTop";

// RouteChangeTracker component to track page views
function RouteChangeTracker() {
  // Use the custom hook to track page views
  useGAPageViews();
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

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => ThemeUtils.toggleTheme(prevTheme));
  };
  
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
        <Router>
          <ScrollToTop /> {/* Add ScrollToTop to ensure proper scroll restoration */}
          <RouteChangeTracker />
          <Routes>
            <Route path="/" element={<Home currentTheme={currentTheme} toggleTheme={toggleTheme} />} />
            <Route path="/contactus" element={<ContactPage currentTheme={currentTheme} toggleTheme={toggleTheme} />} />

            {/* work pages */}
            <Route path="/work/ux-ui" element={<UXUI currentTheme={currentTheme} toggleTheme={toggleTheme} />} />
            <Route path="/work/web-dev" element={<WebDev currentTheme={currentTheme} toggleTheme={toggleTheme} />} />
            <Route path="/work/graphics" element={<Graphics currentTheme={currentTheme} toggleTheme={toggleTheme} />} />

            {/* project detail pages */}
            <Route path="/work/ux-ui/:id" element={<UXUIDetail currentTheme={currentTheme} toggleTheme={toggleTheme} />} />
            <Route path="/work/web-dev/:id" element={<WebDevDetail currentTheme={currentTheme} toggleTheme={toggleTheme} />} />
            <Route path="/work/graphics/:id" element={<GraphicsDetail currentTheme={currentTheme} toggleTheme={toggleTheme} />} />

            {/* 404 route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

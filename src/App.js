// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/theme";
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

function App() {
  // Setting a consistent light theme for the entire application
  React.useEffect(() => {
    document.body.className = 'light';
  }, []);
  
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <Router>
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

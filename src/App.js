import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import ContactPage from './pages/contactus';

function App() {
  return (
    <Router basename="/Saba-Digital">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";   // contains the Services rail
import Services from "../components/Services";        // standalone Services section
import Footer from "../components/Footer";            // optional footer
// CMSDebug component removed

// Only visible on mobile screens
const MobileOnlySection = styled.div`
  display: none;
  
  @media (max-width: 1000px) {
    display: block;
  }
`;

export const Home = ({ currentTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <Navbar toggle={toggle} isOpen={isOpen} currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <HeroSection />
      <MobileOnlySection>
        <Services />
      </MobileOnlySection>
      
      {/* CMSDebug component has been removed */}
      
      <Footer />
    </>
  );
};

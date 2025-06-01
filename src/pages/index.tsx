import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";   // contains the Services rail
import Services from "../components/Services";        // standalone Services section
import Footer from "../components/Footer";            // optional footer
import { useTheme } from "../contexts/ThemeContext";
import SEO from "../components/SEO";

// Only visible on mobile screens
const MobileOnlySection = styled.div`
  display: none;
  
  @media (max-width: 1000px) {
    display: block;
  }
`;

const HomePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <SEO 
        title="Ian K. Cheruiyot | Graphics Designer & UX/UI Portfolio - Nairobi" 
        description="Professional Graphics Designer & UX/UI specialist in Nairobi. Portfolio showcasing 3D visualization, brand identity, and web design projects."
      />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} isOpen={isOpen} />
      <HeroSection />
      <MobileOnlySection>
        <Services />
      </MobileOnlySection>
      <Footer />
    </>
  );
};

export default HomePage;

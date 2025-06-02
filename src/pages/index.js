import React from "react";
import styled from "styled-components";
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
  return (
    <>
      <HeroSection />
      <MobileOnlySection>
        <Services />
      </MobileOnlySection>
      
      {/* CMSDebug component has been removed */}
      
      <Footer />
    </>
  );
};

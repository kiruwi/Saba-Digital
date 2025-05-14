import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";   // contains the Services rail
import Services from "../components/Services";        // standalone Services section
import Footer from "../components/Footer";            // optional footer

// Only visible on mobile screens
const MobileOnlySection = styled.div`
  display: none;
  
  @media (max-width: 1000px) {
    display: block;
  }
`;

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <HeroSection />
      <MobileOnlySection>
        <Services />
      </MobileOnlySection>
      <Footer />
    </>
  );
};

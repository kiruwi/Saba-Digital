import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";   // contains the Services rail
import Services from "../components/Services";        // standalone Services section
import Footer from "../components/Footer";            // optional footer
import CMSDebug from "../components/CMSDebug";       // debugging component for CMS

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
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} isOpen={isOpen} />
      <HeroSection />
      <MobileOnlySection>
        <Services />
      </MobileOnlySection>
      
      {/* Add CMS Debug component for troubleshooting */}
      <div style={{ padding: "0 2rem" }}>
        <CMSDebug />
      </div>
      
      <Footer />
    </>
  );
};

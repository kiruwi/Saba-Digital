import React from "react";
import HeroSection from "../components/HeroSection";   // contains the Services rail
import Footer from "../components/Footer";            // optional footer
import TrustedBy from "../components/TrustedBy";
// CMSDebug component removed

// Main Home component that uses HeroSection for the profile layout
const Home = () => {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      {/* Testimonials section removed */}
      
      {/* CMSDebug component has been removed */}
      
      <Footer />
    </>
  );
};

export default Home;

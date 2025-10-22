import React from "react";
import SEO from "../components/SEO";
import HeroSection from "../components/HeroSection";   // contains the Services rail
import Footer from "../components/Footer";            // optional footer
import TrustedBy from "../components/TrustedBy";
import Testimonials from "../components/Testimonials";

// Main Home component that uses HeroSection for the profile layout
const Home = () => {
  return (
    <>
      <SEO title="Home" description="Welcome to my portfolio" />
      <HeroSection />
      <TrustedBy />
      <Testimonials />
      
      <Footer />
    </>
  );
};

export default Home;

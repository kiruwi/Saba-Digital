import React from "react";
import SEO from "../components/SEO";
import HeroSection from "../components/HeroSection/HeroSection";   // contains the Services rail
import Footer from "../components/Footer/Footer";                  // optional footer
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Testimonials from "../components/Testimonials/Testimonials";

// Main Home component that uses HeroSection for the profile layout
const Home = () => {
  return (
    <>
      <SEO
        title="Saba Digital | UX/UI, Web Development & Branding"
        description="Saba Digital is the portfolio of Ian K. Cheruiyot, showcasing UX/UI design, web development, branding, ad design, and motion graphics work."
        canonical="https://iancheruiyot.work/"
        disableTitleTemplate
      />
      <HeroSection />
      <TrustedBy />
      <Testimonials />
      
      <Footer />
    </>
  );
};

export default Home;

import React from "react";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import HeroSection from "../components/HeroSection/HeroSection";   // contains the Services rail
import Footer from "../components/Footer/Footer";                  // optional footer
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Testimonials from "../components/Testimonials/Testimonials";

// Main Home component that uses HeroSection for the profile layout
const Home = () => {
  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="/images/optimized/portrait/ian-720.webp"
          imageSrcSet="/images/optimized/portrait/ian-480.webp 480w, /images/optimized/portrait/ian-720.webp 720w, /images/optimized/portrait/ian-960.webp 960w, /images/optimized/portrait/ian-1200.webp 1200w"
          imageSizes="(max-width: 1000px) 85vw, 528px"
          fetchPriority="high"
        />
      </Helmet>
      <SEO
        title="Saba Digital | UX/UI, Web Development & Branding"
        description="Saba Digital is the portfolio of Ian K. Cheruiyot, showcasing UX/UI design, web development, branding, ad design, and motion graphics work."
        canonical="https://iankcheruiyot.work/"
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

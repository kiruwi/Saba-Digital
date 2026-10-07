import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import HeroSection from "../components/HeroSection/HeroSection";
import Footer from "../components/Footer/Footer";
import TrustedBy from "../components/TrustedBy/TrustedBy";
import Testimonials from "../components/Testimonials/Testimonials";
import FeaturedWork from "../components/FeaturedWork";

const Home = () => {
  const { hash } = useLocation();
  if (hash === '#about') return <Navigate to="/about" replace />;
  return (
    <>
      <SEO
        title="Saba Digital | UX/UI, Web Development & Branding"
        description="Saba Digital is the portfolio of Ian K. Cheruiyot, showcasing UX/UI design, web development, branding, ad design, and motion graphics work."
        canonical="https://iankcheruiyot.work/"
        disableTitleTemplate
      />
      <HeroSection />
      <FeaturedWork />
      <TrustedBy />
      <Testimonials />
      
      <Footer offWhite={false} />
    </>
  );
};

export default Home;

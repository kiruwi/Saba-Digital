import React, { memo, FC } from "react";
import HeroSection from "../components/HeroSection";   // contains the Services rail
import Footer from "../components/Footer";            // optional footer
// CMSDebug component removed



export const Home: FC = memo(() => {

  return (
    <>
      <HeroSection />
      
      {/* CMSDebug component has been removed */}
      
      <Footer />
    </>
  );
});

Home.displayName = 'Home';

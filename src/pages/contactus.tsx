// src/pages/ContactPage.tsx
import React, { useState, memo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
// import { useAccessibility } from "../components/AccessibilityProvider";

const ContactPage: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const { announceToScreenReader } = useAccessibility();
  
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
    // announceToScreenReader(isOpen ? "Menu closed" : "Menu opened");
  }, [isOpen]);

  return (
    <>
      <Helmet>
        <title>Contact - Ian Cheruiyot | Get In Touch</title>
        <meta name="description" content="Get in touch with Ian Cheruiyot for your next project. Available for UX/UI design, web development, and graphic design services." />
        <meta name="keywords" content="contact, hire designer, UX UI designer, web developer, graphic designer" />
        <link rel="canonical" href="https://iancheruiyot.work/#/contactus" />
      </Helmet>
      
      <main role="main">
        <Navbar toggle={toggle} isOpen={isOpen} />

        {/* contact form */}
        <ContactUs />

        <Footer />
      </main>
    </>
  );
});

ContactPage.displayName = 'ContactPage';

export default ContactPage;

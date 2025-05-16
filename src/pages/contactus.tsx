// src/pages/ContactPage.tsx
import React from "react";
import Navbar from "../components/Navbar";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

/* Functional component with explicit type */
const ContactPage: React.FC = () => (
  <>
    <Navbar toggle={undefined} isOpen={false} />
    <ContactUs />
    <Footer />
  </>
);

export default ContactPage;

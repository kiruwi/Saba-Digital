// src/pages/ContactPage.tsx
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";

import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const ContactPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Contact - Ian Cheruiyot | Get In Touch</title>
        <meta
          name="description"
          content="Get in touch with Ian Cheruiyot for your next project. Available for UX/UI design, web development, and graphic design services."
        />
        <meta
          name="keywords"
          content="contact, hire designer, UX UI designer, web developer, graphic designer"
        />
        <link rel="canonical" href="https://iancheruiyot.work/contactus" />
      </Helmet>

      <main role="main">
        {/* contact form */}
        <ContactUs />
        <Footer />
      </main>
    </>
  );
});

ContactPage.displayName = "ContactPage";

export default ContactPage;

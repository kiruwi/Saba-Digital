// src/pages/ContactPage.tsx
import React, { memo } from "react";

import ContactUs from "../components/ContactUs/ContactUs";
import Footer from "../components/Footer/Footer";
import SEO from "../components/SEO";

const ContactPage: React.FC = memo(() => {
  return (
    <>
      <SEO
        title="Contact Saba Digital"
        description="Contact Ian K. Cheruiyot at Saba Digital for UX/UI design, web development, branding, ad design, and motion graphics projects."
        canonical="https://iancheruiyot.work/contact"
      />

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

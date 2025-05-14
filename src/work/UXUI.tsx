import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UXUI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "4rem 1.5rem" }}>
        <h1>UX / UI Projects</h1>
        <p>Coming soon...</p>
      </main>
      <Footer />
    </>
  );
};

export default UXUI;
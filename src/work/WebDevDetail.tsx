import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WebDevProjectDetail from "../components/ProjectDetail/WebDevProjectDetail";
import { webProjects } from "../data/projects";

const WebDevDetail: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <WebDevProjectDetail projects={webProjects} />
      </main>
      <Footer />
    </>
  );
};

export default WebDevDetail;

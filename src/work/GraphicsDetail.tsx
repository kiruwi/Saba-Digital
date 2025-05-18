import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GraphicsProjectDetail from "../components/ProjectDetail/GraphicsProjectDetail";
import { graphicsProjects } from "../data/projects";

const GraphicsDetail: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <GraphicsProjectDetail projects={graphicsProjects} />
      </main>
      <Footer />
    </>
  );
};

export default GraphicsDetail;

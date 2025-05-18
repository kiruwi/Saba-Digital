import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GraphicsGrid } from "./GraphicsElements";
// Import hardcoded data
import { graphicsProjects } from "../data/projects";
import GraphicsProjectCard from "../components/ProjectCard/GraphicsProjectCard";

const Graphics: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <h1>Graphics Projects</h1>

        <GraphicsGrid>
          {graphicsProjects.map((project) => (
            <GraphicsProjectCard key={project.id} project={project} />
          ))}
        </GraphicsGrid>
      </main>
      <Footer />
    </>
  );
};

export default Graphics;

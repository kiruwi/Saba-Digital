import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WebDevGrid } from "./WebDevElements";
// Import hardcoded data
import { webProjects } from "../data/projects";
import WebDevProjectCard from "../components/ProjectCard/WebDevProjectCard";

const WebDev: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <h1>Web Development Projects</h1>
        
        <WebDevGrid>
          {webProjects.map(project => (
            <WebDevProjectCard key={project.id} project={project} />
          ))}
        </WebDevGrid>
      </main>
      <Footer />
    </>
  );
};

export default WebDev;
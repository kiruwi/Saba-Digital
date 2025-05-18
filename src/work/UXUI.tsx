import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UXUIGrid } from "./UXUIElements";
// Import hardcoded data
import { uxProjects } from "../data/projects";
import UXUIProjectCard from "../components/ProjectCard/UXUIProjectCard";

const UXUI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <h1>UX / UI Projects</h1>
        
        <UXUIGrid>
          {uxProjects.map(project => (
            <UXUIProjectCard key={project.id} project={project} />
          ))}
        </UXUIGrid>
      </main>
      <Footer />
    </>
  );
};

export default UXUI;
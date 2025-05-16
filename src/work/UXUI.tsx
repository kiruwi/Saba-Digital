import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ProjectGrid } from "../components/ProjectCard/ProjectCardElements";
import ProjectCard from "../components/ProjectCard";
import { uxProjects } from "../data/projects";

const UXUI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <h1>UX / UI Projects</h1>
        
        <ProjectGrid>
          {uxProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ProjectGrid>
      </main>
      <Footer />
    </>
  );
};

export default UXUI;
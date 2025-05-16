import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ProjectGrid } from "../components/ProjectCard/ProjectCardElements";
import ProjectCard from "../components/ProjectCard";
// Import the CMS data loader instead of hardcoded data
import { getGraphicsProjects } from "../utils/cmsLoader";

const Graphics: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const toggle = () => setIsOpen(!isOpen);

  // Fetch projects from CMS when component mounts
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const graphicsProjectsData = await getGraphicsProjects();
        setProjects(graphicsProjectsData);
      } catch (error) {
        console.error("Error loading graphics projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <h1>Graphics Projects</h1>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <ProjectGrid>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectGrid>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Graphics;

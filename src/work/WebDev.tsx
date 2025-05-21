import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WebDevGrid } from "./WebDevElements";
// Import hardcoded data
import { webProjects } from "../data/projects";
import WebDevProjectCard from "../components/ProjectCard/WebDevProjectCard";
import styled from "styled-components";
import AnimatedSection from "../components/AnimatedSection";

const MainContent = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const SectionTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// No props needed as we're using ThemeContext

interface WebDevProps {
  currentTheme: any;
  toggleTheme: () => void;
}

const WebDev: React.FC<WebDevProps> = ({ currentTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <MainContent>
        <ProjectsContainer>
          <AnimatedSection animationType="fadeInDown" duration={800}>
            <SectionTitle>Web Development Projects</SectionTitle>
          </AnimatedSection>
          
          <AnimatedSection animationType="fadeInUp" delay={300} duration={1000}>
            <WebDevGrid>
              {webProjects.map((project, index) => (
                <AnimatedSection 
                  key={project.id} 
                  animationType="fadeInUp" 
                  delay={300 + (index * 150)} 
                  duration={800}
                >
                  <WebDevProjectCard project={project} />
                </AnimatedSection>
              ))}
            </WebDevGrid>
          </AnimatedSection>
        </ProjectsContainer>
      </MainContent>
      <Footer />
    </>
  );
};

export default WebDev;
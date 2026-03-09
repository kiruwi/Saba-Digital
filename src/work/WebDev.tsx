import React from "react";

import Footer from "../components/Footer/Footer";
import { WebDevGrid } from "./WebDevElements";
// Import hardcoded data
import { webProjects } from "../data/projects";
import WebDevProjectCard from "../components/ProjectCard/WebDevProjectCard";
import styled from "styled-components";
import AnimatedSection from "../components/AnimatedSection/AnimatedSection";
import SEO from "../components/SEO";
import { useTheme } from "../contexts/ThemeContext";

const MainContent = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const SectionTitle = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.theme === 'dark' ? theme.colors.headingText : theme.colors.primary};
  text-align: center;
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Using ThemeContext directly

const WebDev: React.FC = () => {
  // Get theme from context - even though we don't use these variables directly,
  // destructuring them ensures the component subscribes to context changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { theme } = useTheme();
  
  
  

  return (
    <>
      <SEO
        title="Web Development Projects"
        description="Web development portfolio by Saba Digital, including business websites and conversion-focused digital experiences."
        canonical="https://iancheruiyot.work/work/web-dev"
      />

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

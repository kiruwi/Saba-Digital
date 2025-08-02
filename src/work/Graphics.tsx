import React from "react";

import Footer from "../components/Footer";
import { GraphicsGrid } from "./GraphicsElements";
// Import hardcoded data
import { graphicsProjects } from "../data/projects";
import styled from "styled-components";
import AnimatedSection from "../components/AnimatedSection";
import usePerformanceOptimization from "../hooks/usePerformanceOptimization";

import { useTheme } from "../contexts/ThemeContext";
import GraphicsProjectCard from "../components/ProjectCard/GraphicsProjectCard";

const MainContainer = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.theme === 'dark' ? theme.colors.headingText : theme.colors.primary};
  text-align: center;
`;

interface ProjectType {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category?: string;
  link?: string;
}

// Using ThemeContext directly - no props needed

const Graphics: React.FC = () => {
  // Get theme from context - even though we don't use these variables directly,
  // destructuring them ensures the component subscribes to context changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { theme } = useTheme();


  
  // Theme is now passed as props
  
  // Use our performance optimization hook for image preloading
  usePerformanceOptimization(
    // Preload the first few images as critical resources
    graphicsProjects
      .filter((project: any) => project.category === 'graphics')
      .slice(0, 4)
      .map((project: any) => project.image),
    [],
    'image'
  );
  
  // Theme is now handled by ThemeContext at the app level

  return (
    <>

      <MainContainer>
        <AnimatedSection animationType="fadeInDown" duration={800}>
          <PageTitle>Graphics Projects</PageTitle>
        </AnimatedSection>

        <AnimatedSection animationType="fadeIn" delay={300} duration={1000}>
          <GraphicsGrid>
            {graphicsProjects
              .filter((project: any) => project.category === 'graphics')
              .map((project: ProjectType, index: number) => (
                <AnimatedSection 
                  key={project.id}
                  animationType="fadeInUp" 
                  delay={400 + (index * 100)} 
                  duration={800}
                >
                  <GraphicsProjectCard 
                    project={project} 
                  />
                </AnimatedSection>
              ))}
          </GraphicsGrid>
        </AnimatedSection>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Graphics;

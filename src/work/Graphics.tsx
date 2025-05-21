import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GraphicsGrid } from "./GraphicsElements";
// Import hardcoded data
import { graphicsProjects } from "../data/projects";
import styled from "styled-components";
import AnimatedSection from "../components/AnimatedSection";
import usePerformanceOptimization from "../hooks/usePerformanceOptimization";
import LazyImage from "../components/LazyImage";
import { Link, useNavigate } from "react-router-dom";

const MainContainer = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const ViewProjectLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  align-self: flex-start;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
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

interface GraphicsProps {
  currentTheme: any;
  toggleTheme: () => void;
}

const Graphics: React.FC<GraphicsProps> = ({ currentTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  
  // Theme is now passed as props
  
  // Use our performance optimization hook for image preloading
  usePerformanceOptimization(
    // Preload the first few images as critical resources
    graphicsProjects
      .filter((project: any) => project.category === 'graphics')
      .slice(0, 3)
      .map((project: any) => project.image),
    [],
    'image'
  );
  
  // Theme is now handled by ThemeContext at the app level

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} currentTheme={currentTheme} toggleTheme={toggleTheme} />
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
                  <ProjectCard onClick={() => navigate(`/work/graphics/${project.id}`)}>
                    <ProjectImage>
                      <LazyImage 
                        src={project.image} 
                        alt={project.title} 
                        threshold={0.1}
                        rootMargin="200px"
                      />
                    </ProjectImage>
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.shortDescription}</ProjectDescription>
                      <ViewProjectLink 
                        to={`/work/graphics/${project.id}`}
                        onClick={(e) => e.stopPropagation()} // Prevent the card click from triggering when clicking the button
                      >
                        View Details
                      </ViewProjectLink>
                    </ProjectContent>
                  </ProjectCard>
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

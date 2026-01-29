import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiArrowUpRight } from 'react-icons/fi';

import Footer from "../components/Footer";
import { webProjects } from "../data/projects";
import styled from "styled-components";
import AnimatedSection from "../components/AnimatedSection";
import usePerformanceOptimization from "../hooks/usePerformanceOptimization";
import LazyImage from "../components/LazyImage";
import ZoomableGallery from "../components/ZoomableGallery";
import { useTheme } from "../contexts/ThemeContext";

const MainContainer = styled.main`
  padding: 7rem 1.5rem 4rem 1.5rem;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  
  /* Force vertical stacking on all viewports */
`;

const ProjectImageContainer = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ProjectInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProjectDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const TechStackContainer = styled.div`
  margin-top: 2rem;
`;

const TechStackTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const TechStackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const AdditionalImagesContainer = styled.div`
  margin-top: 3rem;
  width: 100%;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
  }
`;

// Removed unused styled components
/*
const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin: 0 auto;
`;
*/

/* Commented out to fix unused variable warning
const ImageItem = styled.div`
  .image-item {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
    transition: transform 0.3s ease;
    aspect-ratio: 16/9;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;
*/

const BackButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const BackButton = styled.button`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 28px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

// Visit site button styled using BackButton styles plus blue background
const VisitSiteButton = styled(BackButton)`
  background-color: #0d6efd;
  margin-left: 1rem;
  &:hover {
    background-color: #0b5ed7;
  }
`;

interface ProjectType {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fullDescription2?: string;
  fullDescription3?: Array<{heading: string; content: string}>;
  image: string;
  additionalImages?: string[];
  category?: string;
  link?: string;
  techStack?: string[];
  features?: string[];
}

// Using ThemeContext directly - no props needed

const WebDevDetail: React.FC = () => {
  // Get theme from context - even though we don't use these variables directly,
  // destructuring them ensures the component subscribes to context changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { theme } = useTheme();


  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectType | null>(null);
  
  // Find the project based on the ID parameter
  useEffect(() => {
    // Always scroll to top first to ensure proper position
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    if (id) {
      const foundProject = webProjects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
      }
    }
  }, [id]);
  
  // Use our performance optimization hook for image preloading
  usePerformanceOptimization(
    project ? [project.image] : [],
    project?.additionalImages || [],
    'image'
  );
  
  // Handle back button click
  const handleBack = () => {
    window.history.back();
  };

  if (!project) {
    return (
      <>

        <MainContainer>
          <AnimatedSection animationType="fadeIn" duration={800}>
            <ProjectHeader>
              <ProjectTitle>Project Not Found</ProjectTitle>
              <p>The project you're looking for doesn't exist or has been removed.</p>
              <BackButtonContainer>
                <BackButton onClick={handleBack}>Back to Projects</BackButton>
              </BackButtonContainer>
            </ProjectHeader>
          </AnimatedSection>
        </MainContainer>
        <Footer />
      </>
    );
  }
  
  return (
    <>

      <MainContainer>
        <ContentWrapper>
          <AnimatedSection animationType="fadeInDown" duration={800}>
            <ProjectHeader>
              <ProjectTitle>{project.title}</ProjectTitle>
            </ProjectHeader>
          </AnimatedSection>
          
          {/* Main project content */}
          <ProjectContent>
            <AnimatedSection animationType="fadeInLeft" delay={300} duration={1000}>
              <ProjectImageContainer>
                <LazyImage 
                  src={project.image} 
                  alt={project.title} 
                  threshold={0.1}
                  rootMargin="200px"
                />
              </ProjectImageContainer>
            </AnimatedSection>
            
            <AnimatedSection animationType="fadeInRight" delay={300} duration={1000}>
              <ProjectInfo>
                <ProjectDescription>{project.fullDescription}</ProjectDescription>
                {project.fullDescription2 && (
                  <ProjectDescription>{project.fullDescription2}</ProjectDescription>
                )}
                {project.fullDescription3 && project.fullDescription3.map((section, index) => (
                  <div key={index}>
                    <h3>{section.heading}</h3>
                    <ProjectDescription>{section.content}</ProjectDescription>
                  </div>
                ))}
                
                {/* Tech Stack Section */}
                {project.techStack && project.techStack.length > 0 && (
                  <TechStackContainer>
                    <TechStackTitle>Technologies Used</TechStackTitle>
                    <TechStackGrid>
                      {project.techStack.map((tech, index) => (
                        <TechItem key={index}>
                          {tech}
                        </TechItem>
                      ))}
                    </TechStackGrid>
                  </TechStackContainer>
                )}
              </ProjectInfo>
            </AnimatedSection>
          </ProjectContent>
          
          {/* Additional images gallery */}
          {project.additionalImages && project.additionalImages.length > 0 && (
            <AnimatedSection animationType="fadeInUp" delay={600} duration={1000}>
              <AdditionalImagesContainer>
                <h2>Project Gallery</h2>
                <ZoomableGallery 
                  images={project.additionalImages.map((image, index) => ({
                    src: image,
                    alt: `${project.title} - Image ${index + 1}`,
                    caption: `${project.title} - Image ${index + 1}`
                  }))} 
                  showInstructions={true}
                />
              </AdditionalImagesContainer>
            </AnimatedSection>
          )}
          
          {/* Back button */}
          <BackButtonContainer>
            <BackButton onClick={handleBack}>Back to Projects</BackButton>
            {project?.id === 'mutai-enterprises' && (
               <VisitSiteButton as="a" href="https://mutai.co.ke" target="_blank" rel="noopener noreferrer">
                 Visit mutai.co.ke <FiArrowUpRight />
               </VisitSiteButton>
             )}
             {project?.id === 'makvo-llc' && (
               <VisitSiteButton as="a" href="https://makvo.co.ke" target="_blank" rel="noopener noreferrer">
                 Visit makvo.co.ke <FiArrowUpRight />
               </VisitSiteButton>
             )}
             {project?.id === 'eve-on-safari' && (
               <VisitSiteButton as="a" href="https://www.eveonsafari.com/" target="_blank" rel="noopener noreferrer">
                 Visit eveonsafari.com <FiArrowUpRight />
               </VisitSiteButton>
             )}
          </BackButtonContainer>
        </ContentWrapper>
      </MainContainer>
      <Footer />
    </>
  );
};

export default WebDevDetail;

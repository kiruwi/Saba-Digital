import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
import { graphicsProjects } from "../data/projects";
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
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
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

const SynnefaGifContainer = styled.div`
  width: 50%;
  float: left;
  margin-right: 2rem;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  
  @media (max-width: 768px) {
    width: 100%;
    float: none;
    margin-right: 0;
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Synnefa3DImageContainer = styled.div`
  width: 40%;
  float: left;
  margin-right: 2rem;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};

  @media (max-width: 768px) {
    width: 100%;
    float: none;
    margin-right: 0;
  }

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

// Removed unused ImagesGrid styled component

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
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;


// Using ThemeContext directly - no props needed

const GraphicsDetail: React.FC = () => {
  // Get theme from context - even though we don't use these variables directly,
  // destructuring them ensures the component subscribes to context changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, toggleTheme } = useTheme();


  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  
  // Theme is now passed as props
  
  // Find the project based on the ID parameter and handle scroll restoration
  useEffect(() => {
    // Always scroll to top first to ensure proper position
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    if (id) {
      const foundProject = graphicsProjects.find(p => p.id === id);
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
          
          {/* Wrapper div for content with clearfix */}
          <div style={{ overflow: 'hidden' }}>
            {/* Special Synnefa GIF display - floated left */}
            {project.id === 'synnefa-rebrand' && (
              <AnimatedSection animationType="fadeIn" delay={200} duration={800}>
                <SynnefaGifContainer>
                  <LazyImage 
                    src="/images/Synnefa rebrand.gif" 
                    alt={project.title} 
                    threshold={0.1}
                    rootMargin="200px"
                  />
                </SynnefaGifContainer>
              </AnimatedSection>
            )}
          
            {/* Main project content */}
            <ProjectContent>
            <AnimatedSection animationType="fadeInLeft" delay={300} duration={1000}>
              {project.id !== 'synnefa-rebrand' && (
                <ProjectImageContainer>
                  <LazyImage 
                    src={project.image} 
                    alt={project.title} 
                    threshold={0.1}
                    rootMargin="200px"
                  />
                </ProjectImageContainer>
              )}
            </AnimatedSection>
            
            <AnimatedSection animationType="fadeInRight" delay={300} duration={1000}>
              <ProjectInfo>
                <ProjectDescription>{project.fullDescription}</ProjectDescription>
                {project.fullDescription2 && (
                  <ProjectDescription>{project.fullDescription2}</ProjectDescription>
                )}
                {project.fullDescription3 && project.fullDescription3.map((section: {heading: string; content: string}, index: number) => (
                  <div key={index} style={{ overflow: 'hidden' }}>
        {project.id === 'synnefa-rebrand' && section.heading === '3D Product Visualization' && (
          <Synnefa3DImageContainer>
            <LazyImage 
              src="/assets/projects/3d-graphics/synnefa-images/service3-bg.jpg" 
              alt="3D Product Visualization" 
              threshold={0.1}
              rootMargin="200px"
            />
          </Synnefa3DImageContainer>
        )}
                    <h3>{section.heading}</h3>
                    <ProjectDescription>{section.content}</ProjectDescription>
                  </div>
                ))}
              </ProjectInfo>
            </AnimatedSection>
          </ProjectContent>
          </div>
          
          {/* Additional images gallery */}
          {project.additionalImages && project.additionalImages.length > 0 && (
            <AnimatedSection animationType="fadeInUp" delay={600} duration={1000}>
              <AdditionalImagesContainer>
                <h2>Project Gallery</h2>
                <ZoomableGallery 
                  images={project.additionalImages.map((image: string, index: number) => ({
                    src: image,
                    alt: `${project.title} - Image ${index + 1}`,
                    caption: `${project.title} - Image ${index + 1}`
                  }))}
                  showInstructions={true}
                />
              </AdditionalImagesContainer>
            </AnimatedSection>
          )}
          
          {/* Gallery images */}
          {project && (project as any).gallery && (project as any).gallery.length > 0 && (
            <AnimatedSection animationType="fadeInUp" delay={600} duration={1000}>
              <AdditionalImagesContainer>
                <h2>Project Gallery</h2>
                <ZoomableGallery 
                  images={(project as any).gallery.map((item: {src: string; alt: string}) => ({
                    src: item.src,
                    alt: item.alt,
                    caption: item.alt
                  }))}
                  showInstructions={true}
                />
              </AdditionalImagesContainer>
            </AnimatedSection>
          )}
          
          {/* Back button */}
          <BackButtonContainer>
            <BackButton onClick={handleBack}>Back to Projects</BackButton>
          </BackButtonContainer>
        </ContentWrapper>
      </MainContainer>
      <Footer />
    </>
  );
};

export default GraphicsDetail;

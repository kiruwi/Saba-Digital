// src/components/ProjectDetail/ProjectDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ProjectDetailContainer, 
  ProjectDetailHeader,
  DetailTitle, 
  DetailDescription,
  DetailImage,
  BackButton,
  SideBySideContainer,
  MobileImageFirst,
  MobileTextSecond,
  MobileOnlyImage,

} from '../ProjectCard/ProjectCardElements';
import ProcessSection from '../ProcessSection/ProcessSection';
import OsimLaiBrandGallery from '../OsimLaiBrandGallery/OsimLaiBrandGallery';
import { FaArrowLeft } from 'react-icons/fa';

interface ProjectDetailProps {
  projects: any[]; // TODO: Use proper Project type from types/projects
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  
  // Set up mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Find the project by id
  // Debug: Current ID param and available projects
  
  // Directly hardcode Ufanisi Resort if the path is malformed
  let project = null;
  if (location.pathname.includes('ufanisi-resort')) {
    // Force-load Ufanisi Resort from the uxProjects array
    project = projects.find(p => p.id === 'ufanisi-resort');
    // Using Ufanisi project as fallback
  } else {
    // Regular lookup by ID
    project = projects.find(project => project.id === id);
  }
  
  if (!project) {
    return (
      <ProjectDetailContainer>
        <BackButton to="" onClick={() => navigate(-1)}>
          <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
        </BackButton>
        <DetailTitle>Project Not Found</DetailTitle>
        <DetailDescription>The project you're looking for doesn't exist or has been moved.</DetailDescription>
      </ProjectDetailContainer>
    );
  }

  return (
    <ProjectDetailContainer>
      <BackButton to="" onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
      </BackButton>
      
      {/* Hero Image with Title Overlay */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
          {/* For Ufanisi project on desktop, don't show the image in the hero section */}
          {project.id !== 'ufanisi-resort' || isMobile ? (
            <>
              <DetailImage 
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)',
                color: 'white'
              }}>
                <DetailTitle style={{ color: 'white', margin: 0 }}>{project.title}</DetailTitle>
              </div>
            </>
          ) : (
            <div style={{ padding: '2rem 0', backgroundColor: '#111', textAlign: 'center' }}>
              <DetailTitle>{project.title}</DetailTitle>
            </div>
          )}
        </div>
      </div>

      {/* Project Content Below Image */}
      <ProjectDetailHeader style={{ width: '100%', maxWidth: '100%' }}>
        <DetailDescription>
          {project.fullDescription.split('\n\n').map((paragraph: string, index: number) => {
            // Check if this paragraph is a heading or number marker
            const isHeading = /^\d+\.?$/.test(paragraph.trim());
            
            return (
              <p 
                key={`desc1-${index}`} 
                style={{
                  marginTop: index > 0 ? '1rem' : '0',
                  fontWeight: isHeading ? 'bold' : 'normal',
                  fontSize: isHeading ? '1.1rem' : 'inherit'
                }}
              >
                {paragraph}
              </p>
            );
          })}
          
          {project.fullDescription2 && (
            <p style={{ marginTop: '1rem', fontWeight: 'normal' }}>
              {project.fullDescription2}
            </p>
          )}
          
          {project.fullDescription3 && Array.isArray(project.fullDescription3) && project.fullDescription3.map((section: any, index: number) => {
            // Check if this is the "Previous Design Issues" section
            const isPreviousDesignIssues = section.heading === "Previous Design Issues";
            
            return (
              <div key={`section-${index}`} style={{ marginTop: '1.5rem' }}>
                {/* Show the image above the heading for "Previous Design Issues" on mobile */}
                {isPreviousDesignIssues && (
                  <MobileOnlyImage>
                    <DetailImage src="/assets/projects/ux-ui/u-r.jpg" alt="Previous design issues" />
                  </MobileOnlyImage>
                )}
                
                <p 
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#2db670', // Green color for headings
                    marginBottom: '0.5rem'
                  }}
                >
                  {section.heading}
                </p>
                <p>
                  {section.content}
                </p>
              </div>
            );
          })}
        </DetailDescription>
      </ProjectDetailHeader>
      
      {/* Add another side by side container for Ufanisi project */}
      {project.id === 'ufanisi-resort' && (
        <SideBySideContainer style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <MobileImageFirst>
            <DetailImage src="/assets/projects/ux-ui/ufanisi.jpg" alt="Previous design issues" />
          </MobileImageFirst>
          <MobileTextSecond>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>My Design Transformation</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              My previous design suffered from fundamental flaws in typography and layout that I needed to address. My original interface 
              featured a chaotic mix of font families, I had combined serif, sans-serif, and decorative fonts without clear purpose. 
              Font weights varied randomly throughout sections, which created visual confusion and made content hierarchy unclear.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              Spacing was problematic throughout my first attempt, with inconsistent margins and padding that failed to create logical 
              relationships between elements. My excessive reliance on center alignment for nearly all elements created an 
              unbalanced layout that ignored natural reading patterns and made scanning difficult for users.
            </p>
            <p style={{ lineHeight: '1.6' }}>
              User-unfriendly elements were abundant in my initial work, buttons lacked proper affordances, interactive elements had insufficient 
              contrast, and the navigation required users to hunt for basic functions. This second project served as a refresher for me, allowing me to 
              implement a consistent type system, thoughtful spacing hierarchy, and intuitive interaction patterns in my redesign.
            </p>
          </MobileTextSecond>
        </SideBySideContainer>
      )}
      
      {/* Process Section - Only for Ufanisi project */}
      {project.id === 'ufanisi-resort' && (
        <ProcessSection />
      )}
      
      {/* OsimLaiBrandGallery - Only for Osim Lai project */}
      {project.id === 'osim-lai-branding' && (
        <OsimLaiBrandGallery />
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Features</h3>
        <ul>
          {project.features.map((feature: string, index: number) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Tools Used</h3>
        <p>{project.tools.join(', ')}</p>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Year</h3>
        <p>{project.year}</p>
      </div>
    </ProjectDetailContainer>
  );
};

export default ProjectDetail;

// src/components/ProjectDetail/WebDevProjectDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  WebDevDetailContainer, 
  WebDevDetailHeader,
  WebDevDetailTitle, 
  WebDevDetailDescription,
  WebDevDetailImage,
  WebDevBackButton,
  WebDevSideBySideContainer,
  WebDevMobileImageFirst,
  WebDevMobileTextSecond,
  WebDevMobileOnlyImage,
  WebDevHeading,
  TechStackContainer,
  TechStackGrid,
  TechItem,
  TechIcon,
  TechName,
  CodeSnippetContainer,
  CodeSnippetHeader,
  CodeSnippetTitle,
  CodeSnippetContent
} from '../../work/WebDevElements';
import { FaArrowLeft } from 'react-icons/fa';

const WebDevProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  
  // Debug location information
  console.log('WebDevDetail - Current location:', location);
  console.log('WebDevDetail - ID param:', id);
  
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
  
  // Find the project by id with more robust URL handling
  let project = null;
  
  // Check for makvo-llc in various URL formats
  if (id === 'makvo-llc' || 
      location.pathname.includes('makvo-llc') || 
      location.hash.includes('makvo-llc')) {
    project = projects.find(p => p.id === 'makvo-llc');
    console.log('WebDevDetail - Found Makvo LLC project:', project);
  } else {
    // Regular lookup by ID
    project = projects.find(project => project.id === id);
  }
  
  useEffect(() => {
    // Reload the page if we detect URL issues with Makvo LLC
    if (id === 'makvo-llc' && !project) {
      console.log('WebDevDetail - Forcing refresh for Makvo LLC');
      window.location.hash = '/work/web-dev/makvo-llc';
    }
  }, [id, project]);
  
  if (!project) {
    return (
      <WebDevDetailContainer>
        <WebDevBackButton onClick={() => navigate(-1)}>
          <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
        </WebDevBackButton>
        <WebDevDetailTitle>Project Not Found</WebDevDetailTitle>
        <WebDevDetailDescription>The project you're looking for doesn't exist or has been moved.</WebDevDetailDescription>
      </WebDevDetailContainer>
    );
  }

  return (
    <WebDevDetailContainer>
      <WebDevBackButton onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
      </WebDevBackButton>
      
      {/* Hero Image with Title Overlay */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
          <WebDevDetailImage 
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
            <WebDevDetailTitle style={{ color: 'white', margin: 0 }}>{project.title}</WebDevDetailTitle>
          </div>
        </div>
      </div>

      {/* Project Content Below Image */}
      <WebDevDetailHeader style={{ width: '100%', maxWidth: '100%' }}>
        <WebDevDetailDescription>
          {project.fullDescription.split('\n\n').map((paragraph, index) => {
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
          
          {project.fullDescription3 && Array.isArray(project.fullDescription3) && project.fullDescription3.map((section, index) => {
            return (
              <div key={`section-${index}`} style={{ marginTop: '1.5rem' }}>
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
        </WebDevDetailDescription>
      </WebDevDetailHeader>
      
      <div style={{ marginTop: '2rem' }}>
        <WebDevHeading>Features</WebDevHeading>
        <ul>
          {project.features && project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <WebDevHeading>Technologies Used</WebDevHeading>
        <p>{project.tools && project.tools.join(', ')}</p>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <WebDevHeading>Year</WebDevHeading>
        <p>{project.year}</p>
      </div>
    </WebDevDetailContainer>
  );
};

export default WebDevProjectDetail;

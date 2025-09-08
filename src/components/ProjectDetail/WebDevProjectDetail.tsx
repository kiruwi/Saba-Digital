// src/components/ProjectDetail/WebDevProjectDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  WebDevDetailContainer, 
  WebDevDetailHeader,
  WebDevDetailTitle, 
  WebDevDetailDescription,
  WebDevDetailImage,
  WebDevBackButton,
  WebDevHeading
} from '../../work/WebDevElements';
import { ProjectType } from '../../types';
import { FaArrowLeft } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import styled from 'styled-components';

// Blue visit-site button styled on top of back button style
const VisitSiteButton = styled(WebDevBackButton)`
  background: #0d6efd; /* bootstrap blue */
  color: #ffffff;
  padding: 0.4rem 0.9rem;
  margin-left: 1rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  &:hover {
    opacity: 0.9;
    text-decoration: none;
  }
`;

interface WebDevProjectDetailProps {
  projects: ProjectType[];
}

const WebDevProjectDetail: React.FC<WebDevProjectDetailProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [, setIsMobile] = useState(false);
  
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
  let project: ProjectType | undefined = undefined;
  
  // Check for makvo-llc in various URL formats
  if (id === 'makvo-llc' || 
      location.pathname.includes('makvo-llc')) {
    project = projects.find(p => p.id === 'makvo-llc');
  } else {
    // Regular lookup by ID
    project = projects.find(project => project.id === id);
  }
  
  useEffect(() => {
    // Reload the page if we detect URL issues with Makvo LLC
    if (id === 'makvo-llc' && !project) {
      navigate('/work/web-dev/makvo-llc');
    }
  }, [id, project, navigate]);
  
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
      <div style={{display:'flex',alignItems:'center',marginBottom:'2rem'}}>
        <WebDevBackButton onClick={() => navigate(-1)}>
          <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
        </WebDevBackButton>
        {project.id === 'mutai-enterprises' && (
          <VisitSiteButton as="a" href="https://mutai.co.ke" target="_blank" rel="noopener noreferrer">
            Visit mutai.co.ke <FiArrowUpRight />
          </VisitSiteButton>
        )}
        {project.id === 'makvo-llc' && (
          <VisitSiteButton as="a" href="https://makvo.co.ke" target="_blank" rel="noopener noreferrer">
            Visit makvo.co.ke <FiArrowUpRight />
          </VisitSiteButton>
        )}
      </div>
      
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
          {project.fullDescription && project.fullDescription.split('\n\n').map((paragraph, index) => {
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
            if (typeof section === 'object' && 'heading' in section && 'content' in section) {
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
            }
            return null;
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

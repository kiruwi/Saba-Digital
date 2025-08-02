// src/components/ProjectDetail/GraphicsProjectDetail.tsx
import React, { useEffect, Suspense } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraphicsDetailContainer, 
  GraphicsDetailHeader,
  GraphicsDetailTitle, 
  GraphicsDetailDescription,
  GraphicsDetailImage,
  GraphicsBackButton,
  GraphicsDetailSubtitle,
  GraphicsGalleryContainer,
  GraphicsGalleryItem,
  GraphicsGalleryImage
} from '../../work/GraphicsElements';
import { ProjectType } from '../../types';
import { FaArrowLeft } from 'react-icons/fa';

// Lazy load gallery components
const OsimLaiBrandGallery = React.lazy(() => import('../OsimLaiBrandGallery'));
const SynnefaGallery = React.lazy(() => import('../SynnefaGallery'));
const GSCGallery = React.lazy(() => import('../GSCGallery'));

interface GraphicsProjectDetailProps {
  projects: ProjectType[];
}

const GraphicsProjectDetail: React.FC<GraphicsProjectDetailProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find the project by id with more robust URL handling
  let project: ProjectType | undefined = undefined;
  
  // Check for project ids in various URL formats
  const projectIds = ['synnefa-rebrand', 'osim-lai-branding'];
  const targetId = projectIds.find(projectId => 
    id === projectId || 
    location.pathname.includes(projectId) || 
    location.hash.includes(projectId)
  );
  
  if (targetId) {
    project = projects.find(p => p.id === targetId);
  } else {
    // Regular lookup by ID
    project = projects.find(project => project.id === id);
  }
  
  useEffect(() => {
    // Reload the page if we detect URL issues with specific projects
    if (targetId && !project) {
      window.location.hash = `/work/graphics/${targetId}`;
    }
  }, [id, project, targetId]);
  
  if (!project) {
    return (
      <GraphicsDetailContainer>
        <GraphicsBackButton onClick={() => navigate(-1)}>
          <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
        </GraphicsBackButton>
        <GraphicsDetailTitle>Project Not Found</GraphicsDetailTitle>
        <GraphicsDetailDescription>The project you're looking for doesn't exist or has been moved.</GraphicsDetailDescription>
      </GraphicsDetailContainer>
    );
  }

  return (
    <GraphicsDetailContainer>
      <GraphicsBackButton onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
      </GraphicsBackButton>
      
      {/* Hero Image with Title Overlay */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
          <GraphicsDetailImage 
            src={project.id === 'synnefa-rebrand' ? './assets/projects/3d-graphics/synnefa-images/banner.jpg' : project.image} 
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
            <GraphicsDetailTitle style={{ color: 'white', margin: 0 }}>{project.title}</GraphicsDetailTitle>
          </div>
        </div>
      </div>

      {/* Project Content Below Image */}
      <GraphicsDetailHeader style={{ width: '100%', maxWidth: '100%' }}>
        <GraphicsDetailDescription>
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
        </GraphicsDetailDescription>
      </GraphicsDetailHeader>
      
      {/* Project-specific galleries */}
      {project.id === 'osim-lai-branding' && (
        <Suspense fallback={null}>
          <OsimLaiBrandGallery />
        </Suspense>
      )}
      
      {/* Synnefa Gallery - specific to this project */}
      {project.id === 'synnefa-rebrand' && (
        <Suspense fallback={null}>
          <SynnefaGallery />
        </Suspense>
      )}
      
      {/* GSC Hauling Gallery */}
      {project.id === 'gsc-hauling' && (
        <Suspense fallback={null}>
          <GSCGallery />
        </Suspense>
      )}
      
      {/* Generic gallery for projects with additionalImages */}
      {project.additionalImages && project.additionalImages.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <GraphicsDetailSubtitle>Project Gallery</GraphicsDetailSubtitle>
          <GraphicsGalleryContainer>
            {project.additionalImages.map((imgSrc: string, index: number) => (
              <GraphicsGalleryItem key={`gallery-${index}`}>
                <GraphicsGalleryImage 
                  src={imgSrc} 
                  alt={`${project.title} - Image ${index + 1}`} 
                />
              </GraphicsGalleryItem>
            ))}
          </GraphicsGalleryContainer>
        </div>
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <GraphicsDetailSubtitle>Features</GraphicsDetailSubtitle>
        <ul>
          {project.features && project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <GraphicsDetailSubtitle>Tools Used</GraphicsDetailSubtitle>
        <p>{project.tools && project.tools.join(', ')}</p>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <GraphicsDetailSubtitle>Year</GraphicsDetailSubtitle>
        <p>{project.year}</p>
      </div>
    </GraphicsDetailContainer>
  );
};

export default GraphicsProjectDetail;

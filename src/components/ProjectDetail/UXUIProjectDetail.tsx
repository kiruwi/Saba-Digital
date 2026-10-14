// src/components/ProjectDetail/UXUIProjectDetail.tsx
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  UXUIDetailContainer, 
  UXUIDetailHeader,
  UXUIDetailTitle,
  UXUIDetailDescription,
  UXUIDetailImage,
  UXUIBackButton,
  UXUIBackIcon,
  UXUIHeroContainer,
  UXUIHeroInner,
  UXUIHeroOverlay,
  UXUIHeroTitle,
  UXUIHeroTitleBand,
  UXUIPageTitle,
  UXUIIntroduction,
  UXUISideBySideContainer,
  UXUIMobileImageFirst,
  UXUITextContent,
  UXUIDetailParagraph,
  UXUIHeading,
  UXUISection,
  UXUISectionMd,
  UXUISectionLg,
  UXUISectionHeading,
  UXUIList,
  UXUIListItem,
  UXUIProcessTimeline,
  UXUIProcessTimelineStep,
  UXUIProcessTimelineNumber,
  UXUIProcessTimelineTitle,
  UXUIProcessTimelineDescription,
} from '../../work/UXUIElements';
import ProcessSection from '../ProcessSection/ProcessSection';
import ZoomableGallery from '../ZoomableGallery/ZoomableGallery';

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
  features?: string[];
  tools?: string[];
  year?: string;
}

interface UXUIProjectDetailProps {
  projects: ProjectType[];
}

const UXUIProjectDetail: React.FC<UXUIProjectDetailProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find the project by id
  let project = null;
  if (location.pathname.includes('ufanisi-resort')) {
    // Force-load Ufanisi Resort from the uxProjects array
    project = projects.find(p => p.id === 'ufanisi-resort');
  } else {
    // Regular lookup by ID
    project = projects.find(project => project.id === id);
  }
  
  if (!project) {
    return (
      <UXUIDetailContainer>
        <UXUIBackButton onClick={() => navigate(-1)}>
          <UXUIBackIcon /> Go Back
        </UXUIBackButton>
        <UXUIDetailTitle>Project Not Found</UXUIDetailTitle>
        <UXUIDetailDescription>The project you're looking for doesn't exist or has been moved.</UXUIDetailDescription>
      </UXUIDetailContainer>
    );
  }

  return (
    <UXUIDetailContainer>
      <UXUIBackButton onClick={() => navigate(-1)}>
        <UXUIBackIcon /> Go Back
      </UXUIBackButton>
      
      {/* Hero Image with Title Overlay */}
      <UXUIHeroContainer style={project.id === 'ufanisi-resort' ? { marginBottom: '3rem' } : undefined}>
        <UXUIHeroInner>
          {project.id !== 'ufanisi-resort' ? (
            <>
              <UXUIDetailImage 
                src={project.image} 
                alt={project.title} 
              />
              <UXUIHeroOverlay>
                <UXUIHeroTitle>{project.title}</UXUIHeroTitle>
              </UXUIHeroOverlay>
            </>
          ) : (
            <>
              <UXUIHeroTitleBand>
                <UXUIPageTitle>{project.title}</UXUIPageTitle>
              </UXUIHeroTitleBand>
            </>
          )}
        </UXUIHeroInner>
      </UXUIHeroContainer>

      {project.id === 'ufanisi-resort' && (
        <UXUIIntroduction>
          <UXUIDetailImage
            src={project.image}
            alt="Ufanisi Resort food delivery app interface"
            decoding="async"
          />
          <div>
            <UXUISectionHeading as="h2">Ufanisi Resort Food Delivery App</UXUISectionHeading>
            <UXUIDetailParagraph>{project.fullDescription}</UXUIDetailParagraph>
            {project.fullDescription3?.filter(section => section.heading !== 'My Design Process').map(section => (
              <UXUISectionMd key={section.heading}>
                <UXUISectionHeading as="h2">{section.heading}</UXUISectionHeading>
                <UXUIDetailParagraph>{section.content}</UXUIDetailParagraph>
              </UXUISectionMd>
            ))}
          </div>
        </UXUIIntroduction>
      )}

      {/* Project Content Below Image */}
      <UXUIDetailHeader>
        <UXUIDetailDescription as="div">
          {project.id !== 'ufanisi-resort' && project.fullDescription.split('\n\n').map((paragraph, index) => {
            // Check if this paragraph is a heading or number marker
            const isHeading = /^\d+\.?$/.test(paragraph.trim());
            
            return (
              <UXUIDetailParagraph
                key={`desc1-${index}`}
                $hasTopMargin={index > 0}
                $isHeading={isHeading}
              >
                {paragraph}
              </UXUIDetailParagraph>
            );
          })}
          
          {project.fullDescription2 && (
            <UXUIDetailParagraph $hasTopMargin>
              {project.fullDescription2}
            </UXUIDetailParagraph>
          )}
          
          {project.fullDescription3?.filter(section => project.id !== 'ufanisi-resort' || section.heading === 'My Design Process').map((section, index) => {
            return (
              <UXUISectionMd key={`section-${index}`}>
                <UXUISectionHeading as="h2">
                  {section.heading}
                </UXUISectionHeading>
                {section.heading === 'My Design Process' ? (
                  <UXUIProcessTimeline role="list" aria-label="My Design Process">
                    {section.content.split('\n').filter(step => step.trim()).map((step, stepIndex) => {
                      const content = step.replace(/^\s*\d+\.\s*/, '');
                      const separatorIndex = content.indexOf(' - ');
                      const title = separatorIndex === -1 ? content : content.slice(0, separatorIndex);
                      const description = separatorIndex === -1 ? '' : content.slice(separatorIndex + 3);

                      return (
                        <UXUIProcessTimelineStep key={title}>
                          <UXUIProcessTimelineNumber aria-hidden="true">{stepIndex + 1}</UXUIProcessTimelineNumber>
                          <div>
                            <UXUIProcessTimelineTitle>{title}</UXUIProcessTimelineTitle>
                            {description && <UXUIProcessTimelineDescription>{description}</UXUIProcessTimelineDescription>}
                          </div>
                        </UXUIProcessTimelineStep>
                      );
                    })}
                  </UXUIProcessTimeline>
                ) : (
                  <UXUIDetailParagraph>
                    {section.content}
                  </UXUIDetailParagraph>
                )}
              </UXUISectionMd>
            );
          })}
        </UXUIDetailDescription>
      </UXUIDetailHeader>
      
      {/* Add another side by side container for Ufanisi project */}
      {project.id === 'ufanisi-resort' && (
        <UXUISectionLg>
          <UXUISideBySideContainer>
            <UXUIMobileImageFirst>
              <UXUIDetailImage src="/assets/projects/ux-ui/ufanisi.jpg" alt="Previous design issues" />
            </UXUIMobileImageFirst>
            <UXUITextContent>
              <UXUIHeading>Refining the Interface</UXUIHeading>
              <UXUIDetailParagraph>
                The initial interface lacked a consistent type hierarchy, spacing system, and clear navigation.
                I focused the redesign on making content easier to scan and the ordering flow easier to follow.
              </UXUIDetailParagraph>
              <UXUIDetailParagraph $hasTopMargin>
                I replaced competing font styles with a consistent type system, grouped related content with deliberate spacing,
                and used alignment to establish a clearer reading order.
              </UXUIDetailParagraph>
              <UXUIDetailParagraph $hasTopMargin>
                Clearer button styling and stronger contrast gave key actions more prominence.
                The aim was to help users recognise their next step without searching through the interface.
              </UXUIDetailParagraph>
            </UXUITextContent>
          </UXUISideBySideContainer>
        </UXUISectionLg>
      )}
      
      {/* Process Section - Only for Ufanisi project */}
      {project.id === 'ufanisi-resort' && (
        <ProcessSection />
      )}
      
      {/* Project Gallery - For projects with additional images */}
      {project.additionalImages && project.additionalImages.length > 0 && (
        <UXUISectionLg>
          <UXUIHeading>Project Gallery</UXUIHeading>
          <ZoomableGallery 
            images={project.additionalImages.map((image, index) => ({
              src: image,
              alt: `${project.title} - Image ${index + 1}`,
              caption: `${project.title} - Image ${index + 1}`
            }))}
            showInstructions={true}
          />
        </UXUISectionLg>
      )}
      
      <UXUISection>
        <UXUIHeading>{project.id === 'ufanisi-resort' ? 'Prototype Features' : 'Features'}</UXUIHeading>
        {project.id === 'ufanisi-resort' && (
          <UXUIDetailParagraph>
            These features describe the proposed app experience. The three-tap ordering flow is a design target,
            rather than a measured improvement in a live product.
          </UXUIDetailParagraph>
        )}
        <UXUIList>
          {project.features && project.features.map((feature, index) => (
            <UXUIListItem key={index}>{feature}</UXUIListItem>
          ))}
        </UXUIList>
      </UXUISection>
      
      <UXUISection>
        <UXUIHeading>Tools Used</UXUIHeading>
        <UXUIDetailParagraph>{project.tools && project.tools.join(', ')}</UXUIDetailParagraph>
      </UXUISection>
      
      <UXUISection>
        <UXUIHeading>Year</UXUIHeading>
        <UXUIDetailParagraph>{project.year}</UXUIDetailParagraph>
      </UXUISection>
    </UXUIDetailContainer>
  );
};

export default UXUIProjectDetail;

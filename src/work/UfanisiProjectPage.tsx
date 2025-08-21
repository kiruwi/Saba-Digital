import React from 'react';

import Footer from "../components/Footer";
import { 
  ProjectDetailContainer, 
  DetailTitle, 
  DetailImage,
  BackButton,
  MobileImageFirst,
  MobileTextSecond
} from '../components/ProjectCard/ProjectCardElements';
import ProcessSection from '../components/ProcessSection';
import { useNavigate } from 'react-router-dom';
import { uxProjects } from "../data/projects";
import {
  UfanisiMain,
  TitleStrip,
  FullWidthHeader,
  MultiColumnDescription,
  Para,
  SectionBlock,
  BlockMB,
  NumberedList,
  MultiColP,
  SpacedSideBySideContainer,
  SectionHeading,
  BodyP,
  InfoSection,
  BackIcon
} from './UfanisiProjectPageElements';

const UfanisiProjectPage: React.FC = () => {


  const navigate = useNavigate();
  
  // Get the Ufanisi project directly
  const ufanisiProject = uxProjects.find(project => project.id === 'ufanisi-resort');
  
  if (!ufanisiProject) {
    return (
      <>

        <UfanisiMain>
          <ProjectDetailContainer>
            <BackButton to="" onClick={() => navigate(-1)}>
              <BackIcon /> Go Back
            </BackButton>
            <DetailTitle>Project Not Found</DetailTitle>
            <Para>The Ufanisi Resort project couldn't be loaded.</Para>
          </ProjectDetailContainer>
        </UfanisiMain>
        <Footer />
      </>
    );
  }

  return (
    <>

      <UfanisiMain>
        <ProjectDetailContainer>
          <BackButton to="" onClick={() => navigate(-1)}>
            <BackIcon /> Go Back
          </BackButton>
          
          {/* Title with background style */}
          <TitleStrip>
            <DetailTitle>{ufanisiProject.title}</DetailTitle>
          </TitleStrip>

          {/* Project Content */}
          <FullWidthHeader>
            {/* Multi-column layout on wide screens */}
            <MultiColumnDescription>
              {ufanisiProject.fullDescription.split('\n\n').map((paragraph, index) => {
                // Check if this paragraph is a heading or number marker
                const isHeading = /^\d+\.?$/.test(paragraph.trim());
                
                return (
                  <Para
                    key={`desc1-${index}`}
                    $mt={index > 0 ? '1rem' : '0'}
                    $isHeading={isHeading}
                  >
                    {paragraph}
                  </Para>
                );
              })}
              
              {ufanisiProject.fullDescription2 && (
                <Para $mt="1rem">
                  {ufanisiProject.fullDescription2}
                </Para>
              )}
              
              {ufanisiProject.fullDescription3 && Array.isArray(ufanisiProject.fullDescription3) && ufanisiProject.fullDescription3.map((section, index) => {
                // Check if this is the "Previous Design Issues" section
                const isPreviousDesignIssues = section.heading === "Previous Design Issues";
                
                return (
                  <SectionBlock key={`section-${index}`}>
                    {/* Show the image above the heading for "Previous Design Issues" on all viewports */}
                    {isPreviousDesignIssues && (
                      <BlockMB>
                        <DetailImage src="/assets/projects/ux-ui/u-r.jpg" alt="Previous design issues" />
                      </BlockMB>
                    )}
                    
                    <Para $isHeading $mb="0.5rem">
                      {section.heading}
                    </Para>
                    {section.heading === "My Design Process" ? (
                      (() => {
                        // Prefer splitting on explicit newlines if present
                        let parts = section.content.split('\n').map(s => s.trim()).filter(Boolean);
                        // Fallback: split inline numbered items like "1. ... 2. ..."
                        if (parts.length <= 1) {
                          parts = section.content
                            .split(/(?=\b\d+\.[\s\S]?)/g)
                            .map(s => s.trim())
                            .filter(Boolean);
                        }
                        return (
                          <NumberedList>
                            {parts.map((item, i) => (
                              <li key={`proc-${i}`}>{item.replace(/^\d+\.\s*/, '')}</li>
                            ))}
                          </NumberedList>
                        );
                      })()
                    ) : (
                      <MultiColP>
                        {section.content}
                      </MultiColP>
                    )}
                  </SectionBlock>
                );
              })}
            </MultiColumnDescription>
          </FullWidthHeader>
          
          {/* Additional content specific to Ufanisi */}
          <SpacedSideBySideContainer>
            <MobileImageFirst>
              <DetailImage src="/assets/projects/ux-ui/ufanisi.jpg" alt="Previous design issues" />
            </MobileImageFirst>
            <MobileTextSecond>
              <SectionHeading>My Design Transformation</SectionHeading>
              <BodyP>
                My previous design suffered from fundamental flaws in typography and layout that I needed to address. My original interface 
                featured a chaotic mix of font families—I had combined serif, sans-serif, and decorative fonts without clear purpose. 
                Font weights varied randomly throughout sections, which created visual confusion and made content hierarchy unclear.
              </BodyP>
              <BodyP>
                Spacing was problematic throughout my first attempt, with inconsistent margins and padding that failed to create logical 
                relationships between elements. My excessive reliance on center alignment for nearly all elements created an 
                unbalanced layout that ignored natural reading patterns and made scanning difficult for users.
              </BodyP>
              <BodyP $mb="0">
                User-unfriendly elements were abundant in my initial work—buttons lacked proper affordances, interactive elements had insufficient 
                contrast, and the navigation required users to hunt for basic functions. This second project served as a refresher for me, allowing me to 
                implement a consistent type system, thoughtful spacing hierarchy, and intuitive interaction patterns in my redesign.
              </BodyP>
            </MobileTextSecond>
          </SpacedSideBySideContainer>
          
          {/* Process Section */}
          <ProcessSection />
          
          <InfoSection>
            <h3>Features</h3>
            <ul>
              {ufanisiProject.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </InfoSection>
          
          <InfoSection>
            <h3>Tools Used</h3>
            <p>{ufanisiProject.tools?.join(', ') || 'Not specified'}</p>
          </InfoSection>
          
          <InfoSection>
            <h3>Year</h3>
            <p>{ufanisiProject.year}</p>
          </InfoSection>
        </ProjectDetailContainer>
      </UfanisiMain>
      <Footer />
    </>
  );
};

export default UfanisiProjectPage;

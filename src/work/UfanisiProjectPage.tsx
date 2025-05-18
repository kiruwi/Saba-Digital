import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
  DesktopOnlyImage
} from '../components/ProjectCard/ProjectCardElements';
import ProcessSection from '../components/ProcessSection';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { uxProjects } from "../data/projects";

const UfanisiProjectPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  
  // Get the Ufanisi project directly
  const ufanisiProject = uxProjects.find(project => project.id === 'ufanisi-resort');
  
  if (!ufanisiProject) {
    return (
      <>
        <Navbar toggle={toggle} isOpen={isOpen} />
        <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
          <ProjectDetailContainer>
            <BackButton to="" onClick={() => navigate(-1)}>
              <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
            </BackButton>
            <DetailTitle>Project Not Found</DetailTitle>
            <DetailDescription>The Ufanisi Resort project couldn't be loaded.</DetailDescription>
          </ProjectDetailContainer>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <ProjectDetailContainer>
          <BackButton to="" onClick={() => navigate(-1)}>
            <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
          </BackButton>
          
          {/* Title with background style */}
          <div style={{ padding: '2rem 0', backgroundColor: '#111', textAlign: 'center', marginBottom: '2rem' }}>
            <DetailTitle>{ufanisiProject.title}</DetailTitle>
          </div>

          {/* Project Content */}
          <ProjectDetailHeader style={{ width: '100%', maxWidth: '100%' }}>
            <DetailDescription>
              {ufanisiProject.fullDescription.split('\n\n').map((paragraph, index) => {
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
              
              {ufanisiProject.fullDescription2 && (
                <p style={{ marginTop: '1rem', fontWeight: 'normal' }}>
                  {ufanisiProject.fullDescription2}
                </p>
              )}
              
              {ufanisiProject.fullDescription3 && Array.isArray(ufanisiProject.fullDescription3) && ufanisiProject.fullDescription3.map((section, index) => {
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
          
          {/* Additional content specific to Ufanisi */}
          <SideBySideContainer style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <MobileImageFirst>
              <DetailImage src="/assets/projects/ux-ui/ufanisi.jpg" alt="Previous design issues" />
            </MobileImageFirst>
            <MobileTextSecond>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>My Design Transformation</h3>
              <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                My previous design suffered from fundamental flaws in typography and layout that I needed to address. My original interface 
                featured a chaotic mix of font families—I had combined serif, sans-serif, and decorative fonts without clear purpose. 
                Font weights varied randomly throughout sections, which created visual confusion and made content hierarchy unclear.
              </p>
              <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                Spacing was problematic throughout my first attempt, with inconsistent margins and padding that failed to create logical 
                relationships between elements. My excessive reliance on center alignment for nearly all elements created an 
                unbalanced layout that ignored natural reading patterns and made scanning difficult for users.
              </p>
              <p style={{ lineHeight: '1.6' }}>
                User-unfriendly elements were abundant in my initial work—buttons lacked proper affordances, interactive elements had insufficient 
                contrast, and the navigation required users to hunt for basic functions. This second project served as a refresher for me, allowing me to 
                implement a consistent type system, thoughtful spacing hierarchy, and intuitive interaction patterns in my redesign.
              </p>
            </MobileTextSecond>
          </SideBySideContainer>
          
          {/* Process Section */}
          <ProcessSection />
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Features</h3>
            <ul>
              {ufanisiProject.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Tools Used</h3>
            <p>{ufanisiProject.tools.join(', ')}</p>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Year</h3>
            <p>{ufanisiProject.year}</p>
          </div>
        </ProjectDetailContainer>
      </main>
      <Footer />
    </>
  );
};

export default UfanisiProjectPage;

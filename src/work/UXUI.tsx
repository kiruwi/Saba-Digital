import React from "react";

import Footer from "../components/Footer";
import { uxProjects } from "../data/projects";
import styled from "styled-components";
import AnimatedSection from "../components/AnimatedSection";
import { Link } from "react-router-dom";
import ufanisiImg from "../images/ufanisi.webp";

// Import Ufanisi styled components for responsive layout
import { UfanisiSideBySide, UfanisiMobileImageFirst, UfanisiMobileTextSecond } from "./UfanisiResortElements";
import { useTheme } from "../contexts/ThemeContext";

/* eslint-disable @typescript-eslint/no-unused-vars */

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

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin: 2rem 0 1rem;
  color: ${({ theme }) => theme.theme === 'dark' ? theme.colors.headingText : theme.colors.primary};
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => 
      // Use a darker shade of the primary color for hover
      `${theme.colors.primary}cc`};
  }
`;



// Using ThemeContext directly - no props needed

const UXUI: React.FC = () => {
  // Get theme from context - even though we don't use these variables directly,
  // destructuring them ensures the component subscribes to context changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { theme } = useTheme();
  
  

  // Get the Ufanisi Resort project
  const ufanisiProject = uxProjects.find(project => project.id === "ufanisi-resort");



  return (
    <>

      <MainContainer>
        <AnimatedSection animationType="fadeInDown" duration={800}>
          <PageTitle>UX / UI Design</PageTitle>
        </AnimatedSection>

        {ufanisiProject && (
          <ContentWrapper>
            <AnimatedSection animationType="fadeIn" delay={300} duration={1000}>
              {/* <ProjectImage>
                <LazyImage 
                  src={ufanisiProject.image} 
                  alt={ufanisiProject.title} 
                  threshold={0.1}
                  rootMargin="200px"
                />
              </ProjectImage> */}

              <SectionTitle>{ufanisiProject.title}</SectionTitle>
              {/* <ProjectDescription>{ufanisiProject.fullDescription}</ProjectDescription> */}
              {/* <ProjectDescription>{ufanisiProject.fullDescription2}</ProjectDescription> */}





              <UfanisiSideBySide>
                <UfanisiMobileImageFirst>
                  <img 
                    src={ufanisiImg} 
                    alt="Ufanisi Design Transformation" 
                    loading="lazy"
                    decoding="async"
                    style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover', maxHeight: '400px' }} 
                  />
                </UfanisiMobileImageFirst>
                <UfanisiMobileTextSecond>
                  <SectionTitle>My Design Transformation</SectionTitle>
                  <ProjectDescription>
                    My previous design suffered from fundamental flaws in typography and layout that I needed to address. My original interface 
                    featured a chaotic mix of font families, I had combined serif, sans-serif, and decorative fonts without clear purpose. 
                    Font weights varied randomly throughout sections, which created visual confusion and made content hierarchy unclear.
                  </ProjectDescription>
                  <ProjectDescription>
                    Spacing was problematic throughout my first attempt, with inconsistent margins and padding that failed to create logical 
                    relationships between elements. My excessive reliance on center alignment for nearly all elements created an 
                    unbalanced layout that ignored natural reading patterns and made scanning difficult for users.
                  </ProjectDescription>
                  <ProjectDescription>
                    User-unfriendly elements were abundant in my initial work, buttons lacked proper affordances, interactive elements had insufficient 
                    contrast, and the navigation required users to hunt for basic functions. This second project served as a refresher for me, allowing me to 
                    implement a consistent type system, thoughtful spacing hierarchy, and intuitive interaction patterns in my redesign.
                  </ProjectDescription>
                </UfanisiMobileTextSecond>
              </UfanisiSideBySide>

              {/* <SectionTitle>Design Process</SectionTitle>
              <ProcessStepsContainer>
                {designSteps.map((step, index) => (
                  <AnimatedSection 
                    key={step.number}
                    animationType="fadeInUp" 
                    delay={400 + (index * 100)} 
                    duration={800}
                  >
                    <ProcessStep>
                      <StepTitle>
                        <StepNumber>{step.number}</StepNumber>
                        {step.icon}
                        {step.title}
                      </StepTitle>
                      <StepContent>
                        <ProjectDescription>{step.content}</ProjectDescription>
                      </StepContent>
                    </ProcessStep>
                  </AnimatedSection>
                ))}
              </ProcessStepsContainer>

              <SectionTitle>Key Features</SectionTitle>
              <ul>
                {ufanisiProject.features && ufanisiProject.features.map((feature, index) => (
                  <li key={index}>
                    <ProjectDescription>{feature}</ProjectDescription>
                  </li>
                ))}
              </ul>

              <SectionTitle>Tools Used</SectionTitle>
              <ul>
                {ufanisiProject.tools && ufanisiProject.tools.map((tool, index) => (
                  <li key={index}>
                    <ProjectDescription>{tool}</ProjectDescription>
                  </li>
                ))}
              </ul>

              */}
              <ButtonLink to="/work/ux-ui/ufanisi-resort">View Detailed Case Study</ButtonLink>
            </AnimatedSection>
          </ContentWrapper>
        )}
      </MainContainer>
      <Footer />
    </>
  );
};

export default UXUI;

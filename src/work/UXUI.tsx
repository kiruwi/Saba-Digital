import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { uxProjects } from "../data/projects";
import styled from "styled-components";
import AnimatedSection from "../components/AnimatedSection";
import { Link } from "react-router-dom";
import ufanisiImg from "../images/ufanisi.jpg";
import { FaUsers, FaRocket, FaShoppingCart, FaLanguage, FaUniversalAccess, FaMicrophone, FaHistory, FaCreditCard, FaStarHalfAlt } from 'react-icons/fa';
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

const ProjectImage = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin: 2rem 0 1rem;
  color: ${({ theme }) => theme.colors.primary};
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

// Process step components
const ProcessStepsContainer = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
`;

const ProcessStep = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};
  }
`;

const StepNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  margin-right: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.2em;
  }
`;

const StepContent = styled.div`
  margin-left: 3.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
`;

// Using ThemeContext directly - no props needed

const UXUI: React.FC = () => {
  // Get theme from context - even though we don't use these variables directly,
  // destructuring them ensures the component subscribes to context changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Get the Ufanisi Resort project
  const ufanisiProject = uxProjects.find(project => project.id === "ufanisi-resort");

  // Define UX/UI design process steps
  const designSteps = [
    {
      number: "1",
      title: "Start with real users",
      icon: <FaUsers />,
      content: "Ran 6 short interviews with Nairobi diners and delivery riders to surface pain points similar to those in the case study: speed, simplicity, language, accessibility. Turned findings into one clear persona and a quick journey map to keep the team focused."
    },
    {
      number: "2",
      title: "Lean UX loop",
      icon: <FaRocket />,
      content: "Framed one hypothesis per sprint, prototyped fast in Figma, tested with at least five users, then tweaked. The two-round study cycle kept design decisions grounded."
    },
    {
      number: "3",
      title: "Faster ordering flow",
      icon: <FaShoppingCart />,
      content: "Default home screen: top categories, search bar, 'order again' tiles. Targeted three taps from launch to checkout; hungry users have limited attention."
    },
    {
      number: "4",
      title: "Language & icon support",
      icon: <FaLanguage />,
      content: "Added a Swahili toggle and used clear icons so text-heavy screens don't block non-English speakers."
    },
    {
      number: "5",
      title: "Accessibility by default",
      icon: <FaUniversalAccess />,
      content: "High-contrast palette, 48 px minimum tap targets, alt text for images, voice-over labels — mirrors the case study's inclusive guidelines."
    },
    {
      number: "6",
      title: "Speak-to-search",
      icon: <FaMicrophone />,
      content: "Quick microphone search cuts typing on the go, matching the article's voice feature."
    },
    {
      number: "7",
      title: "Remember-me shortcut",
      icon: <FaHistory />,
      content: "Keep returning customers in the flow with saved address, card, and 'repeat last order' button — a direct win noted in the second usability round."
    },
    {
      number: "8",
      title: "Payment flexibility",
      icon: <FaCreditCard />,
      content: "Showed mobile-money first, but left 'pay on delivery/pick-up' for users who prefer cash, echoing two interviewees' request."
    },
    {
      number: "9",
      title: "Smart upsells",
      icon: <FaStarHalfAlt />,
      content: "Recommended sides and drinks based on main dish selection, but kept them one tap away to avoid slowing down the core flow."
    }
  ];

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
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
                    style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover', maxHeight: '400px' }} 
                  />
                </UfanisiMobileImageFirst>
                <UfanisiMobileTextSecond>
                  <SectionTitle>My Design Transformation</SectionTitle>
                  <ProjectDescription>
                    My previous design suffered from fundamental flaws in typography and layout that I needed to address. My original interface 
                    featured a chaotic mix of font families—I had combined serif, sans-serif, and decorative fonts without clear purpose. 
                    Font weights varied randomly throughout sections, which created visual confusion and made content hierarchy unclear.
                  </ProjectDescription>
                  <ProjectDescription>
                    Spacing was problematic throughout my first attempt, with inconsistent margins and padding that failed to create logical 
                    relationships between elements. My excessive reliance on center alignment for nearly all elements created an 
                    unbalanced layout that ignored natural reading patterns and made scanning difficult for users.
                  </ProjectDescription>
                  <ProjectDescription>
                    User-unfriendly elements were abundant in my initial work—buttons lacked proper affordances, interactive elements had insufficient 
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
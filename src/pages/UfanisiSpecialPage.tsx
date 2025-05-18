import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { uxProjects } from "../data/projects";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProcessSection from "../components/ProcessSection";
import styled from "styled-components";

// Styled components specifically for this page
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const SideBySideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 3rem 0;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const ImageColumn = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  
  @media screen and (min-width: 768px) {
    width: 45%;
    margin-bottom: 0;
  }
`;

const TextColumn = styled.div`
  width: 100%;
  
  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const FeaturesList = styled.ul`
  margin-bottom: 2rem;
  padding-left: 1.5rem;
`;

const FeatureItem = styled.li`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const UfanisiSpecialPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  
  // Get the Ufanisi Resort project data
  const project = uxProjects.find(p => p.id === "ufanisi-resort");
  
  if (!project) {
    return (
      <>
        <Navbar toggle={toggle} isOpen={isOpen} />
        <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
          <Container>
            <BackButton onClick={() => navigate(-1)}>
              <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
            </BackButton>
            <Title>Project Not Found</Title>
            <Description>The Ufanisi Resort project you're looking for doesn't exist or has been moved.</Description>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
        <Container>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
          </BackButton>
          
          <Title>{project.title}</Title>
          
          <TagsContainer>
            {project.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
          
          {/* Hero Image */}
          <ProjectImage src={project.image} alt={project.title} />
          
          <Description>{project.fullDescription}</Description>
          <Description>{project.fullDescription2}</Description>
          
          {/* Side by Side Layout */}
          <SideBySideContainer>
            <ImageColumn>
              <ProjectImage src={project.image} alt="Previous design issues" />
            </ImageColumn>
            <TextColumn>
              <SectionHeading>My Design Transformation</SectionHeading>
              <Description>
                My previous design suffered from fundamental flaws in typography and layout that I needed to address. 
                My original interface featured a chaotic mix of font families—I had combined serif, sans-serif, and 
                decorative fonts without clear purpose. Font weights varied randomly throughout sections, which created 
                visual confusion and made content hierarchy unclear.
              </Description>
              <Description>
                Spacing was problematic throughout my first attempt, with inconsistent margins and padding that failed 
                to create logical relationships between elements. My excessive reliance on center alignment for nearly 
                all elements created an unbalanced layout that ignored natural reading patterns and made scanning 
                difficult for users.
              </Description>
              <Description>
                User-unfriendly elements were abundant in my initial work—buttons lacked proper affordances, interactive 
                elements had insufficient contrast, and the navigation required users to hunt for basic functions. This 
                second project served as a refresher for me, allowing me to implement a consistent type system, thoughtful 
                spacing hierarchy, and intuitive interaction patterns in my redesign.
              </Description>
            </TextColumn>
          </SideBySideContainer>
          
          {/* Process Section */}
          <ProcessSection />
          
          {/* Features Section */}
          <SectionHeading>Features</SectionHeading>
          <FeaturesList>
            {project.features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default UfanisiSpecialPage;

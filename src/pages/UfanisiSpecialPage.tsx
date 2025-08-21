import React from "react";
import Footer from "../components/Footer";

import { uxProjects } from "../data/projects";
import { useNavigate } from "react-router-dom";
import ProcessSection from "../components/ProcessSection";
import {
  SpecialMainContainer,
  Container,
  Title,
  BackButton,
  BackIcon,
  ProjectImage,
  Description,
  TagsContainer,
  Tag,
  SideBySideContainer,
  ImageColumn,
  TextColumn,
  SectionHeading,
  FeaturesList,
  FeatureItem,
} from "./UfanisiSpecialPageElements";

const UfanisiSpecialPage: React.FC = () => {


  const navigate = useNavigate();
  
  // Get the Ufanisi Resort project data
  const project = uxProjects.find(p => p.id === "ufanisi-resort");
  
  if (!project) {
    return (
      <>

        <SpecialMainContainer>
          <Container>
            <BackButton onClick={() => navigate(-1)}>
              <BackIcon /> Go Back
            </BackButton>
            <Title>Project Not Found</Title>
            <Description>The Ufanisi Resort project you're looking for doesn't exist or has been moved.</Description>
          </Container>
        </SpecialMainContainer>
        <Footer />
      </>
    );
  }

  return (
    <>

      <SpecialMainContainer>
        <Container>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon /> Go Back
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
            {project.features?.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        </Container>
      </SpecialMainContainer>
      <Footer />
    </>
  );
};

export default UfanisiSpecialPage;

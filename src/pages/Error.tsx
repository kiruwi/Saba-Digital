import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { uxProjects } from "../data/projects";

import Footer from "../components/Footer";
import {
  ErrorMainContainer,
  ProjectContainer,
  BackButton,
  ProjectTitle,
  ProjectDescription,
  ProjectImage,
  SectionTitle,
  TagsContainer,
  Tag,
  FeaturesList,
  FeatureItem,
  ErrorFullPageContainer,
  ErrorHeading,
  ErrorMessage,
} from "./ErrorElements";

interface ErrorProps {
  code?: string;
  message?: string;
}

// Styled components moved to ./ErrorElements

const ErrorPage: React.FC<ErrorProps> = ({
  code = "404",
  message = "The page you're looking for doesn't exist or has been moved.",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  

  // Check if this is the Ufanisi Resort path
  const isUfanisiResort = location.pathname.includes('ufanisi-resort');
  
  // Get the Ufanisi Resort project data if needed
  const ufanisiProject = isUfanisiResort ? 
    uxProjects.find(p => p.id === "ufanisi-resort") : null;
  
  // Debug logging removed for production build
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  // If this is the Ufanisi Resort path and we have the project data, render it
  if (isUfanisiResort && ufanisiProject) {
    return (
      <>
        
        <ErrorMainContainer>
          <ProjectContainer>
            <BackButton onClick={handleGoBack}>← Go Back</BackButton>
            
            <ProjectTitle>{ufanisiProject.title}</ProjectTitle>
            
            <TagsContainer>
              {ufanisiProject.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
            
            <ProjectImage src={ufanisiProject.image} alt={ufanisiProject.title} />
            
            <ProjectDescription>{ufanisiProject.fullDescription}</ProjectDescription>
            <ProjectDescription>{ufanisiProject.fullDescription2}</ProjectDescription>
            
            {ufanisiProject.fullDescription3 && ufanisiProject.fullDescription3.map((section, index) => (
              <div key={index}>
                <SectionTitle>{section.heading}</SectionTitle>
                <ProjectDescription>{section.content}</ProjectDescription>
              </div>
            ))}
            
            <SectionTitle>Features</SectionTitle>
            <FeaturesList>
              {ufanisiProject.features?.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeaturesList>
          </ProjectContainer>
        </ErrorMainContainer>
        <Footer />
      </>
    );
  }

  // Regular error page
  return (
    <ErrorFullPageContainer>
      <ErrorHeading>Error {code}</ErrorHeading>
      <ErrorMessage>{message}</ErrorMessage>
      <Button onClick={handleGoHome}>Return to Home</Button>
    </ErrorFullPageContainer>
  );
};

export default ErrorPage;

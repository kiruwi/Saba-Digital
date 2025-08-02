import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { uxProjects } from "../data/projects";

import Footer from "../components/Footer";
import styled from "styled-components";

interface ErrorProps {
  code?: string;
  message?: string;
}

// Styled components for the Ufanisi Resort content
const ProjectContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
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

const FeaturesList = styled.ul`
  margin-bottom: 2rem;
  padding-left: 1.5rem;
`;

const FeatureItem = styled.li`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorPage: React.FC<ErrorProps> = ({
  code = "404",
  message = "The page you're looking for doesn't exist or has been moved.",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  

  // Check if this is the Ufanisi Resort path
  const isUfanisiResort = location.pathname.includes('ufanisi-resort') ||
                          location.hash.includes('ufanisi-resort');
  
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
        
        <main style={{ padding: "7rem 1.5rem 4rem 1.5rem", marginTop: "10px", background: "#000", color: "#fff" }}>
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
        </main>
        <Footer />
      </>
    );
  }

  // Regular error page
  return (
    <div style={{
      background: "#000",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "3rem",
        marginBottom: "1rem",
        color: "#fff"
      }}>
        Error {code}
      </h1>
      <p style={{
        fontSize: "1.2rem",
        marginBottom: "2rem",
        maxWidth: "600px"
      }}>
        {message}
      </p>
      <Button onClick={handleGoHome}>Return to Home</Button>
    </div>
  );
};

export default ErrorPage;

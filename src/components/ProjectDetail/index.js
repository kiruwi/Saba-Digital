// src/components/ProjectDetail/index.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ProjectDetailContainer, 
  ProjectDetailHeader,
  DetailTitle, 
  DetailDescription,
  DetailImage,
  BackButton,
  SideBySideContainer
} from '../ProjectCard/ProjectCardElements';
import { FaArrowLeft } from 'react-icons/fa';

const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the project by id
  const project = projects.find(project => project.id === id);
  
  if (!project) {
    return (
      <ProjectDetailContainer>
        <BackButton to="" onClick={() => navigate(-1)}>
          <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
        </BackButton>
        <DetailTitle>Project Not Found</DetailTitle>
        <DetailDescription>The project you're looking for doesn't exist or has been moved.</DetailDescription>
      </ProjectDetailContainer>
    );
  }

  return (
    <ProjectDetailContainer>
      <BackButton to="" onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Go Back
      </BackButton>
      
      <SideBySideContainer>
        <ProjectDetailHeader>
          <DetailTitle>{project.title}</DetailTitle>
          <DetailDescription>
            <p>{project.fullDescription}</p>
            {project.fullDescription2 && <p style={{ marginTop: '1rem' }}>{project.fullDescription2}</p>}
            {project.fullDescription3 && <p style={{ marginTop: '1rem' }}>{project.fullDescription3}</p>}
          </DetailDescription>
        </ProjectDetailHeader>
        
        <div>
          <DetailImage src={project.image} alt={project.title} />
        </div>
      </SideBySideContainer>
      
      <div>
        <h3>Features</h3>
        <ul>
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Tools Used</h3>
        <p>{project.tools.join(', ')}</p>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Year</h3>
        <p>{project.year}</p>
      </div>
    </ProjectDetailContainer>
  );
};

export default ProjectDetail;

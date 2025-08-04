// src/components/ProjectCard/index.tsx
import React, { useRef, useEffect } from 'react';
import {
  CardContainer,
  ImageWrapper,
  ProjectImage,
  ContentWrapper,
  ProjectTitle,
  ProjectDescription,
  ProjectTags,
  Tag
} from './ProjectCardElements';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    shortDescription: string;
    image: string;
    tags: string[];
    category: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, shortDescription, image, tags, category } = project;
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Add animation class after component mounts to trigger CSS animations
  useEffect(() => {
    const currentCardRef = cardRef.current;
    
    if (currentCardRef) {
      // Add a slight delay for the animation to be noticeable
      setTimeout(() => {
        currentCardRef.classList.add('animated-in');
      }, 100); // Short delay for animation
    }
  }, []);

  // Create URL path for project
  // For Ufanisi Resort, use a direct route that doesn't use parameters
  let projectPath;
  if (id === 'ufanisi-resort') {
    // Direct route that doesn't get processed by router parameter parsing
    projectPath = '/ufanisi';
  } else {
    // Regular path for other projects
    projectPath = `/work/${category}/${id}`;
  }
  
  // For Ufanisi Resort, we need to render a regular anchor tag instead of a router Link
  if (id === 'ufanisi-resort') {
    // Use the styled component styles but with a regular anchor tag
    return (
      <a 
        href="/work/uxui/ufanisi-resort" 
        ref={cardRef}
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#000000',
          borderRadius: '0px',
          overflow: 'hidden',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.5s ease-in-out',
          textDecoration: 'none',
          color: '#fff',
          height: '100%',
          opacity: '0.9',
          transform: 'translateY(10px)',
          animation: 'cardAppear 0.8s forwards'
        }}
      >
        <ImageWrapper>
          <ProjectImage src={image} alt={title} />
        </ImageWrapper>
        <ContentWrapper>
          <ProjectTitle>{title}</ProjectTitle>
          <ProjectDescription>{shortDescription}</ProjectDescription>
          <ProjectTags>
            {tags && tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </ProjectTags>
        </ContentWrapper>
      </a>
    );
  }
  
  // For all other projects, use the normal router Link
  return (
    <CardContainer 
      to={projectPath}
      ref={cardRef}
      className="card"
    >
      <ImageWrapper>
        <ProjectImage src={image} alt={title} />
      </ImageWrapper>
      <ContentWrapper>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDescription>{shortDescription}</ProjectDescription>
        <ProjectTags>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </ProjectTags>
      </ContentWrapper>
    </CardContainer>
  );
};

export default ProjectCard;

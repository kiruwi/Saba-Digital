// src/components/ProjectCard/GraphicsProjectCard.tsx
import React, { useState, useEffect, useRef, FC } from "react";
import { ProjectType } from "../../types";
import {
  GraphicsCardContainer,
  GraphicsImageWrapper,
  GraphicsProjectImage,
  GraphicsContentWrapper,
  GraphicsProjectTitle,
  GraphicsProjectDescription,
  GraphicsProjectTags,
  GraphicsTag
} from "../../work/GraphicsElements";

interface GraphicsProjectCardProps {
  project: ProjectType;
}

const GraphicsProjectCard: FC<GraphicsProjectCardProps> = ({ project }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  
  // Immediately make cards visible on load rather than requiring hover
  useEffect(() => {
    setIsVisible(true);
    
    // Add visibility class after a short delay
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add('animated-in');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (cardRef.current) {
            cardRef.current.classList.add('animated-in');
          }
        }
      },
      {
        threshold: 0.1, // More sensitive threshold
        rootMargin: '0px 0px -100px 0px' // Trigger before fully scrolled into view
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <GraphicsCardContainer 
      to={`/work/graphics/${project.id}`}
      ref={cardRef}
      className={isVisible ? 'visible' : ''}
    >
      <GraphicsImageWrapper>
        <GraphicsProjectImage 
          src={project.id === 'synnefa-rebrand' ? '/assets/projects/3d-graphics/synnefa-images/banner.jpg' : project.image} 
          alt={project.title} 
        />
      </GraphicsImageWrapper>
      <GraphicsContentWrapper>
        <GraphicsProjectTitle>{project.title}</GraphicsProjectTitle>
        <GraphicsProjectDescription>{project.shortDescription}</GraphicsProjectDescription>
        <GraphicsProjectTags>
          {project.tags && project.tags.map((tag, index) => (
            <GraphicsTag key={index}>{tag}</GraphicsTag>
          ))}
        </GraphicsProjectTags>
      </GraphicsContentWrapper>
    </GraphicsCardContainer>
  );
};

export default GraphicsProjectCard;

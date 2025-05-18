// src/components/ProjectCard/UXUIProjectCard.tsx
import React, { useState, useEffect, useRef, FC } from "react";
import { ProjectType } from "../../types";
import {
  UXUICardContainer,
  UXUIImageWrapper,
  UXUIProjectImage,
  UXUIContentWrapper,
  UXUIProjectTitle,
  UXUIProjectDescription,
  UXUIProjectTags,
  UXUITag
} from "../../work/UXUIElements";

interface UXUIProjectCardProps {
  project: ProjectType;
}

const UXUIProjectCard: FC<UXUIProjectCardProps> = ({ project }) => {
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
    <UXUICardContainer 
      to={`/work/ux-ui/${project.id}`}
      ref={cardRef}
      className={isVisible ? 'visible' : ''}
    >
      <UXUIImageWrapper>
        <UXUIProjectImage src={project.image} alt={project.title} />
      </UXUIImageWrapper>
      <UXUIContentWrapper>
        <UXUIProjectTitle>{project.title}</UXUIProjectTitle>
        <UXUIProjectDescription>{project.shortDescription}</UXUIProjectDescription>
        <UXUIProjectTags>
          {project.tags && project.tags.map((tag, index) => (
            <UXUITag key={index}>{tag}</UXUITag>
          ))}
        </UXUIProjectTags>
      </UXUIContentWrapper>
    </UXUICardContainer>
  );
};

export default UXUIProjectCard;

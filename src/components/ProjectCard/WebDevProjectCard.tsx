// src/components/ProjectCard/WebDevProjectCard.tsx
import React, { useState, useEffect, useRef, FC } from "react";
import { ProjectType } from "../../types";
import {
  WebDevCardContainer,
  WebDevImageWrapper,
  WebDevProjectImage,
  WebDevContentWrapper,
  WebDevProjectTitle,
  WebDevProjectDescription,
  WebDevProjectTags,
  WebDevTag
} from "../../work/WebDevElements";

interface WebDevProjectCardProps {
  project: ProjectType;
}

const WebDevProjectCard: FC<WebDevProjectCardProps> = ({ project }) => {
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
    <WebDevCardContainer 
      to={`/work/web-dev/${project.id}`}
      ref={cardRef}
      className={isVisible ? 'visible' : ''}
    >
      <WebDevImageWrapper>
        <WebDevProjectImage src={project.image} alt={project.title} />
      </WebDevImageWrapper>
      <WebDevContentWrapper>
        <WebDevProjectTitle>{project.title}</WebDevProjectTitle>
        <WebDevProjectDescription>{project.shortDescription}</WebDevProjectDescription>
        <WebDevProjectTags>
          {project.tags && project.tags.map((tag, index) => (
            <WebDevTag key={index}>{tag}</WebDevTag>
          ))}
        </WebDevProjectTags>
      </WebDevContentWrapper>
    </WebDevCardContainer>
  );
};

export default WebDevProjectCard;

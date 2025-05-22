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
  // Always visible by default, no animation or scroll detection
  const [isVisible] = useState(true);
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  
  // Force visibility immediately on component mount
  useEffect(() => {
    // Immediately add the animated-in class to make content visible
    if (cardRef.current) {
      cardRef.current.classList.add('visible');
      cardRef.current.classList.add('animated-in');
    }
  }, []);
  
  // No intersection observer - we don't want to wait for scrolling
  
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

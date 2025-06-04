// src/components/MemoizedProjectCard.tsx
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectType } from '../data/projects';
import { useAccessibility } from './AccessibilityProvider';

interface MemoizedProjectCardProps {
  project: ProjectType;
  index: number;
  category: 'uxui' | 'webdev' | 'graphics';
  onProjectClick?: (project: ProjectType) => void;
}

const MemoizedProjectCard: React.FC<MemoizedProjectCardProps> = memo(({ 
  project, 
  index, 
  category,
  onProjectClick 
}) => {
  const navigate = useNavigate();
  const { announceToScreenReader, keyboardNavigation, reduceMotion } = useAccessibility();

  const handleClick = useCallback(() => {
    if (onProjectClick) {
      onProjectClick(project);
    } else {
      navigate(`/${category}/${project.id}`);
    }
    announceToScreenReader(`Navigating to ${project.title} project details`);
  }, [project, category, navigate, onProjectClick, announceToScreenReader]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View ${project.title} project details`}
      aria-describedby={`project-desc-${index}`}
      style={{
        cursor: 'pointer',
        transition: reduceMotion ? 'none' : 'transform 0.2s ease, box-shadow 0.2s ease',
        outline: keyboardNavigation ? '2px solid #007acc' : 'none',
        outlineOffset: '2px',
      }}
      onFocus={() => keyboardNavigation && announceToScreenReader(`${project.title} project card focused`)}
    >
      <img 
        src={project.image} 
        alt={`${project.title} project preview`}
        loading="lazy"
        style={{ 
          width: '100%', 
          height: 'auto',
          borderRadius: '8px',
        }}
      />
      <h3 aria-level={3}>{project.title}</h3>
      <p id={`project-desc-${index}`}>{project.shortDescription}</p>
      {project.tags && (
        <div role="list" aria-label="Project technologies">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              role="listitem"
              style={{
                display: 'inline-block',
                margin: '2px 4px',
                padding: '4px 8px',
                backgroundColor: 'rgba(0, 122, 204, 0.1)',
                borderRadius: '12px',
                fontSize: '0.8em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.project.id === nextProps.project.id &&
    prevProps.index === nextProps.index &&
    prevProps.category === nextProps.category
  );
});

MemoizedProjectCard.displayName = 'MemoizedProjectCard';

export default MemoizedProjectCard;

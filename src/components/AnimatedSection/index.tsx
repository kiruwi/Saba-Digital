import React, { ReactNode } from 'react';
import styled from 'styled-components';
import useAnimations from '../../hooks/useAnimations';

interface AnimatedSectionProps {
  children: ReactNode;
  animationType?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

const StyledSection = styled.div<{ $styles: Record<string, any> }>`
  ${({ $styles }) => Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animationType = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className,
  as = 'div'
}) => {
  const { elementRef, getAnimationStyles } = useAnimations({
    delay,
    duration,
    threshold
  });

  const animationStyles = getAnimationStyles(animationType);

  return (
    <StyledSection
      ref={elementRef as React.RefObject<HTMLDivElement>}
      $styles={animationStyles}
      className={className}
      as={as}
    >
      {children}
    </StyledSection>
  );
};

export default AnimatedSection;

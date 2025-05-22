import { useEffect, useState, useRef } from 'react';

type AnimationOptions = {
  duration?: number;
  delay?: number;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
};

/**
 * Custom hook for managing animations
 * Provides utilities for entrance animations, scroll animations, and hover effects
 */
export const useAnimations = (options: AnimationOptions = {}) => {
  const {
    duration = 600,
    delay = 0,
    easing = 'cubic-bezier(0.5, 0, 0.15, 1)'
    // We no longer need threshold and rootMargin since we removed the observer
  } = options;
  
  // Always set to visible and animated by default - no scroll detection needed
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(true);
  const elementRef = useRef<HTMLElement | null>(null);
  // We no longer need the observer reference

  // No intersection observer - everything is visible immediately
  useEffect(() => {
    // Force everything to be visible and animated immediately
    setIsVisible(true);
    setIsAnimated(true);
    
    // No need for observer anymore
    return () => {};
  }, []);

  // Generate CSS for animations
  const getAnimationStyles = (animationType: string) => {
    // Use isAnimated instead of isVisible to keep elements visible once they've been animated
    const baseStyles = {
      opacity: isAnimated ? 1 : (isVisible ? 1 : 0),
      transition: `all ${duration}ms ${easing} ${delay}ms`,
    };
    
    const animationStyles: Record<string, any> = {
      fadeIn: {
        ...baseStyles,
      },
      fadeInUp: {
        ...baseStyles,
        transform: isAnimated ? 'translateY(0)' : (isVisible ? 'translateY(0)' : 'translateY(20px)'),
      },
      fadeInDown: {
        ...baseStyles,
        transform: isAnimated ? 'translateY(0)' : (isVisible ? 'translateY(0)' : 'translateY(-20px)'),
      },
      fadeInLeft: {
        ...baseStyles,
        transform: isAnimated ? 'translateX(0)' : (isVisible ? 'translateX(0)' : 'translateX(20px)'),
      },
      fadeInRight: {
        ...baseStyles,
        transform: isAnimated ? 'translateX(0)' : (isVisible ? 'translateX(0)' : 'translateX(-20px)'),
      },
      zoomIn: {
        ...baseStyles,
        transform: isAnimated ? 'scale(1)' : (isVisible ? 'scale(1)' : 'scale(0.95)'),
      },
    };
    
    return animationStyles[animationType] || baseStyles;
  };

  // Apply animation to an element
  const applyAnimation = (element: HTMLElement, animationType: string) => {
    if (!element) return;
    
    const styles = getAnimationStyles(animationType);
    Object.entries(styles).forEach(([property, value]) => {
      // @ts-ignore
      element.style[property] = value;
    });
  };

  return {
    elementRef,
    isVisible,
    isAnimated,
    getAnimationStyles,
    applyAnimation,
  };
};

export default useAnimations;

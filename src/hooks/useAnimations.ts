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
    easing = 'cubic-bezier(0.5, 0, 0.15, 1)',
    threshold = 0.1,
    rootMargin = '0px'
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup intersection observer for scroll-based animations
  useEffect(() => {
    if (!elementRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
        
        // Once element has been animated, we can stop observing it
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
        }
      },
      { threshold, rootMargin }
    );
    
    observerRef.current.observe(elementRef.current);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, isAnimated]);

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

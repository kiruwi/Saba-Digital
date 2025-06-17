// src/components/HeroSection/index.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import meImage from "../../images/me.png";

import { animateScroll as scroll } from "react-scroll";

/* Services */
import { ServicesRail } from "../Services"; // Slide is the full‑height wrapper
import { Slide } from "../Services/ServicesElements";
/* styled parts */
import {
  HeroContainer,
  HeroBg,
  HeroText,
  TitleBackground,
  HeroTitleTop,
  HeroTitleBottom,
  HeroRight,
  Rail,
  MobileImg,
  DesktopImg,
   BtnWrap,
  PortfolioButton,
  ArrowBadge,
  ArrowUpIcon,
  ScrollIndicatorWrapper,
  ScrollText,
  ScrollArrow,
  SlideIndicatorsContainer,
  SlideIndicator
} from "./HeroElements";

const HeroSection = () => {
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const railRef = useRef(null);
  const hasScrolled = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const totalSlides = 4; // Profile slide + 3 service slides
  
  // Function to handle the View Services button click
  const handleViewServicesClick = () => {
    // Check if we're on mobile (when railRef is not accessible)
    const isMobile = window.innerWidth <= 1000;
    
    if (!isMobile && railRef.current) {
      // Desktop: Smooth scroll in the rail
      const slideHeight = window.innerHeight;
      
      railRef.current.scrollTo({
        top: slideHeight,
        behavior: 'smooth'
      });
      
      // Update scroll indicator state
      hasScrolled.current = true;
      setScrollIndicatorVisible(false);
      setCurrentSlide(1);
    }
    // For mobile devices, we'll use the default react-scroll behavior
    // The Button component will handle this with its 'to' prop
  };

  // Function to scroll to a specific slide wrapped in useCallback
  const scrollToSlide = useCallback((slideIndex) => {
    if (railRef.current && slideIndex >= 0 && slideIndex < totalSlides) {
      setIsScrolling(true);
      const slideHeight = window.innerHeight;
      
      railRef.current.scrollTo({
        top: slideHeight * slideIndex,
        behavior: 'smooth'
      });
      
      setCurrentSlide(slideIndex);
      hasScrolled.current = true;
      setScrollIndicatorVisible(slideIndex === 0);
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    } else if (slideIndex >= totalSlides) {
      // Scroll to footer when we've gone through all slides
      scroll.scrollToBottom({ duration: 800 });
    }
  }, [totalSlides, railRef, setIsScrolling, setCurrentSlide, setScrollIndicatorVisible]);

  // These functions have been moved inside the useEffect

  useEffect(() => {
    // Handle wheel events to control scrolling
    const handleWheel = (e) => {
      // Skip if already scrolling or on mobile
      if (isScrolling || window.innerWidth <= 1000) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSlide = currentSlide + direction;
      
      // Prevent default scrolling behavior
      e.preventDefault();
      
      // If scrolling down from the last slide, go to footer
      if (direction > 0 && currentSlide === totalSlides - 1) {
        scrollToSlide(totalSlides); // This will trigger the footer scroll
      } 
      // Otherwise navigate between slides
      else if (nextSlide >= 0 && nextSlide < totalSlides) {
        scrollToSlide(nextSlide);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      // Skip if already scrolling or on mobile
      if (isScrolling || window.innerWidth <= 1000) return;
      
      // Arrow Down or Page Down
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSlide === totalSlides - 1) {
          scrollToSlide(totalSlides); // Go to footer
        } else {
          scrollToSlide(currentSlide + 1);
        }
      }
      // Arrow Up or Page Up
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSlide(Math.max(0, currentSlide - 1));
      }
      // Home key
      else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(0);
      }
      // End key
      else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(totalSlides); // Go to footer
      }
    };

    const handleScroll = () => {
      if (railRef.current) {
        // Check if we're at the top of the rail
        const atTop = railRef.current.scrollTop < 50;
        
        // If we haven't scrolled yet or we're back at the top
        if (!hasScrolled.current || atTop) {
          setScrollIndicatorVisible(true);
        } else {
          setScrollIndicatorVisible(false);
        }
        
        // Mark that we've scrolled
        if (railRef.current.scrollTop > 50 && !hasScrolled.current) {
          hasScrolled.current = true;
        }
        
        // Update current slide based on scroll position
        if (!isScrolling) {
          const slideHeight = window.innerHeight;
          const currentPos = railRef.current.scrollTop;
          const newSlide = Math.round(currentPos / slideHeight);
          
          if (newSlide !== currentSlide) {
            setCurrentSlide(newSlide);
          }
        }
      }
    };

    // Add wheel event listener to the document for controlled scrolling
    const wheelHandler = (e) => {
      if (railRef.current && document.activeElement === document.body) {
        handleWheel(e);
      }
    };

    const railElement = railRef.current;
    if (railElement) {
      railElement.addEventListener('scroll', handleScroll);
      document.addEventListener('wheel', wheelHandler, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (railElement) {
        railElement.removeEventListener('scroll', handleScroll);
        document.removeEventListener('wheel', wheelHandler);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [currentSlide, isScrolling, totalSlides, scrollToSlide]);

  return (
    <HeroContainer id="home">
      <HeroBg />

      {/* Slide indicators (desktop only) */}
      <SlideIndicatorsContainer>
        {[...Array(totalSlides)].map((_, index) => (
          <SlideIndicator 
            key={index} 
            active={currentSlide === index}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        <SlideIndicator 
          active={false}
          onClick={() => scrollToSlide(totalSlides)}
          aria-label="Go to footer"
        />
      </SlideIndicatorsContainer>

      {/* left column */}
      <HeroText>
        <TitleBackground>
          <HeroTitleTop>
            Currently a Digital Designer.
          </HeroTitleTop>
          <HeroTitleBottom>
            Living in Nairobi, creating products that empower
            clients.
          </HeroTitleBottom>
        </TitleBackground>

        <BtnWrap>
          <PortfolioButton
            to="services"
            onClick={handleViewServicesClick}
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={0}
            aria-label="View Portfolio"
          >
            View Portfolio <ArrowBadge>
              <ArrowUpIcon />
            </ArrowBadge>
          </PortfolioButton>
        </BtnWrap>
      </HeroText>

      {/* right rail */}
      <HeroRight>
        <Rail ref={railRef}>
          {/* first slide = profile image */}
          <Slide>
            <DesktopImg src={meImage} alt="Ian Cheruiyot" />
            <ScrollIndicatorWrapper visible={scrollIndicatorVisible}>
              <ScrollText>Scroll Down</ScrollText>
              <ScrollArrow />
            </ScrollIndicatorWrapper>
          </Slide>

          {/* next slides = service cards */}
          <ServicesRail />
        </Rail>
      </HeroRight>

      {/* mobile photo */}
      <MobileImg src={meImage} alt="Ian Cheruiyot" />
    </HeroContainer>
  );
};

export default HeroSection;

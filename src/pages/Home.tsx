import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';
import { APP } from '../utils/constants';
import LazyImage from '../components/LazyImage';
import AnimatedSection from '../components/AnimatedSection';
import usePerformanceOptimization from '../hooks/usePerformanceOptimization';
import { preloadSectionImages } from '../utils/preloadImages';

const Container = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  text-align: center;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px ${props => props.theme.colors.shadow};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.a`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px ${props => props.theme.colors.shadow};
  }
`;

const Home: React.FC = () => {
  // Use our performance optimization hook
  usePerformanceOptimization(
    ['/images/hero-image.jpg'], // Critical resources
    [], // Non-critical resources
    'image'
  );
  
  // Preload images for the home section when component mounts
  useEffect(() => {
    preloadSectionImages('home');
  }, []);
  
  return (
    <Container>
      <SEO title="Home" description="Welcome to my portfolio" />
      
      <AnimatedSection animationType="fadeInDown" duration={800}>
        <Title>Welcome to My Portfolio</Title>
      </AnimatedSection>
      
      <AnimatedSection animationType="fadeIn" delay={300} duration={1000}>
        <Description>
          {APP.description}
        </Description>
      </AnimatedSection>
      
      <AnimatedSection animationType="fadeInUp" delay={600} duration={1000}>
        <ImageContainer>
          <LazyImage 
            src="/images/hero-image.jpg" 
            alt="Portfolio showcase" 
            threshold={0.1}
            rootMargin="200px"
          />
        </ImageContainer>
      </AnimatedSection>
      
      <AnimatedSection animationType="fadeInUp" delay={900} duration={800}>
        <ButtonContainer>
          <Button href="/work">View My Work</Button>
          <Button href="/contactus">Contact Me</Button>
        </ButtonContainer>
      </AnimatedSection>
    </Container>
  );
};

export default Home;

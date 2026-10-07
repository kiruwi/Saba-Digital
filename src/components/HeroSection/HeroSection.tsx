import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import ProjectStream from './ProjectStream';

const Hero = styled.section`
  max-width: 1250px; margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) 1.5rem 3rem;
  display: flex; flex-direction: column; align-items: flex-start; gap: 2rem;
  position: relative; isolation: isolate; min-height: 600px; justify-content: center;
  @media (max-width: 700px) { min-height: auto; gap: 1.5rem; }
`;
const Title = styled.h1`
  position: relative; z-index: 1; pointer-events: none;
  text-shadow: 0 2px 16px rgba(255,255,255,.8);
  grid-column: 1 / -1;
  font-size: clamp(3.4rem, 8.7vw, 8rem); line-height: 1; letter-spacing: -.035em; font-weight: 500;
  color: ${({ theme }) => theme.colors.headingText};
  span { display: block; color: inherit; font-family: inherit; }
  em { color: ${({ theme }) => theme.colors.primary}; font-style: normal; font-family: inherit; }
  @media (max-width: 600px) { font-size: clamp(2.6rem, 10vw, 4rem); }
`;
const Actions = styled.div`
  position: relative; z-index: 1;
  display: flex; flex-wrap: wrap; align-items: center; gap: 1rem;
`;
export const WorkLink = styled(Link)`
  display: inline-flex; align-items: center; justify-content: center; gap: 1rem;
  min-height: 48px; padding: .9rem 1.5rem; border-radius: 0;
  background: #161916; color: #ffffff;
  font-weight: 700; text-decoration: none;
  svg { color: inherit; }
  &:hover { background: ${({ theme }) => theme.colors.primary}; color: #121212; }
`;
const ContactLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  padding: .9rem 1rem; min-height: 48px; text-decoration: underline; text-underline-offset: 5px;
  &:hover { text-decoration-color: ${({ theme }) => theme.colors.primary}; }
`;
const HeroSection: React.FC = () => (
  <Hero aria-labelledby="hero-title">
    <ProjectStream />
    <Title id="hero-title">Built Different<em>.</em><span>Designed Better<em>.</em></span></Title>
      <Actions>
        <WorkLink to="/work">Explore my work <FiArrowUpRight aria-hidden="true" /></WorkLink>
        <ContactLink to="/contact">Let’s talk</ContactLink>
      </Actions>
  </Hero>
);
export default HeroSection;

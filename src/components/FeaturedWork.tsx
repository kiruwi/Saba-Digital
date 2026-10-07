import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PortfolioGrid, { featuredItems } from './ProjectCard/PortfolioGrid';

export const Section = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.theme === 'light' ? '#f5f6f3' : theme.colors.background};
  padding: clamp(3rem, 6vw, 5rem) 1.5rem;
  h2 { font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -.03em; }
`;
const Inner = styled.div`max-width: 1202px; margin: 0 auto;`;
const Header = styled.div`
  display: flex; justify-content: space-between; align-items: end; gap: 1.5rem; margin-bottom: 2rem;
  p { margin-top: .75rem; max-width: 36rem; }
  a { white-space: nowrap; text-underline-offset: 5px; }
  @media (max-width: 600px) { flex-direction: column; align-items: start; }
`;
const FeaturedWork = () => <Section aria-labelledby="featured-title">
  <Inner>
  <Header><h2 id="featured-title">Selected work</h2><Link to="/work">View all work ↗</Link></Header>
  <PortfolioGrid items={featuredItems} featured />
  </Inner>
</Section>;
export default FeaturedWork;

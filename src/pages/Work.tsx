import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { RoutePaths } from '../utils/routes';

const WorkContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.primary};
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

const WorkCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CategoryCard = styled(Link)`
  display: block;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 4px 6px ${props => props.theme.colors.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px ${props => props.theme.colors.shadow};
  }
  
  h2 {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    color: ${props => props.theme.colors.text};
  }
`;

const Work: React.FC = () => {
  return (
    <WorkContainer>
      <SEO 
        title="Work | Saba Digital Portfolio" 
        description="Explore Saba Digital case studies across graphics, UX/UI, web development, ad design, and motion graphics." 
        canonical="https://iankcheruiyot.work/work"
      />
      <Title>Our Work</Title>
      <Description>
        Explore our portfolio of creative solutions across different disciplines.
        From visual designs and user experiences to web applications, we take pride in
        delivering high-quality work that meets our clients' needs.
      </Description>
      
      <WorkCategories>
        <CategoryCard to={RoutePaths.GraphicsWork}>
          <h2>Graphics</h2>
          <p>Branding, illustrations, print designs and visual identity projects</p>
        </CategoryCard>
        
        <CategoryCard to={RoutePaths.UXUIWork}>
          <h2>UX/UI Design</h2>
          <p>User experience research, interface designs and prototypes</p>
        </CategoryCard>
        
        <CategoryCard to={RoutePaths.WebDevWork}>
          <h2>Web Development</h2>
          <p>Websites, web applications and digital platform development</p>
        </CategoryCard>

        <CategoryCard to={RoutePaths.AdDesignWork}>
          <h2>Ad Design</h2>
          <p>Campaign-ready ad creatives for social, print, and digital channels</p>
        </CategoryCard>

        <CategoryCard to={RoutePaths.MotionWork}>
          <h2>Motion Graphics</h2>
          <p>Animated visual storytelling and short-form motion content</p>
        </CategoryCard>
      </WorkCategories>
    </WorkContainer>
  );
};

export default Work;

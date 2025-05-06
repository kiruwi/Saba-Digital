import React from 'react';
import styled from 'styled-components';
import { lightTheme, darkTheme } from '../../themes/theme';
import { SEO } from '../../components/SEO';
import { constants } from '../../utils/constants';

const Container = styled.div`
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
  color: ${props => props.theme.colors.text};
`;

const Home: React.FC = () => {
  return (
    <Container>
      <SEO title="Home" description="Welcome to my portfolio" />
      <Title>Welcome to My Portfolio</Title>
      <Description>
        {constants.APP.description}
      </Description>
    </Container>
  );
};

export default Home;

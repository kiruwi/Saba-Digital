import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { ThemeType } from '../themes/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorContainer = styled.div<{ theme: ThemeType }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorIcon = styled(FontAwesomeIcon)<{ theme: ThemeType }>`
  font-size: 80px;
  color: ${props => props.theme.colors.error};
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h1<{ theme: ThemeType }>`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const ErrorMessage = styled.p<{ theme: ThemeType }>`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

interface ErrorProps {
  code?: string;
  message?: string;
}

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <ErrorContainer>
      <SEO title="404" description="Page Not Found" />
      <ErrorIcon icon="exclamation-triangle" />
      <ErrorTitle>404</ErrorTitle>
      <ErrorMessage>Page Not Found</ErrorMessage>
      <Button onClick={handleGoBack}>Go Back</Button>
    </ErrorContainer>
  );
};

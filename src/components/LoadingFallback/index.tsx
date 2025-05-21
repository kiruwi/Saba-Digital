import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingFallbackProps {
  message?: string;
}

const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const LoadingContent = styled.div`
  text-align: center;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Message = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 1rem auto;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/**
 * LoadingFallback component to display during code splitting/lazy loading
 * Provides a consistent loading experience with theme support
 */
const LoadingFallback: React.FC<LoadingFallbackProps> = ({ message = 'Loading content...' }) => {
  return (
    <LoadingContainer>
      <LoadingContent>
        <Logo>Saba Digital</Logo>
        <Spinner />
        <Message>{message}</Message>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingFallback;

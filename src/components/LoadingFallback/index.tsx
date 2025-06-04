import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  ${css`animation: ${pulse} 1.5s infinite ease-in-out`};
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.02em;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  opacity: 0.8;
`;

const Spinner = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.text}33;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 1rem auto;
  ${css`animation: ${spin} 1s linear infinite`};
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

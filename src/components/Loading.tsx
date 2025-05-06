import React from 'react';
import styled from 'styled-components';
import { Theme } from '../themes/theme';

const LoadingContainer = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid ${({ theme }) => theme.colors.primary};
    border-top: 5px solid ${({ theme }) => theme.colors.background};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .text {
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.text};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <LoadingContainer>
      <div className="spinner"></div>
      <div className="text">{message}</div>
    </LoadingContainer>
  );
};

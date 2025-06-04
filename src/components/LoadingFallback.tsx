// src/components/LoadingFallback.tsx
import React, { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAccessibility } from './AccessibilityProvider';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  ${css`animation: ${fadeIn} 0.3s ease-in`};
  color: ${({ theme }) => theme.colors.text};
`;

const Spinner = styled.div<{ $reduceMotion: boolean }>`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.text}33;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  ${({ $reduceMotion }) => $reduceMotion ? css`animation: none` : css`animation: ${spin} 1s linear infinite`};
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  margin: 0;
  text-align: center;
  font-family: 'SpotifyMix', sans-serif;
`;

const LoadingSubtext = styled.p`
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.7;
  text-align: center;
`;

interface LoadingFallbackProps {
  message?: string;
  subMessage?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = memo(({ 
  message = "Loading...",
  subMessage = "Please wait while we prepare your content"
}) => {
  const { reduceMotion } = useAccessibility();

  return (
    <LoadingContainer role="status" aria-live="polite">
      <Spinner $reduceMotion={reduceMotion} aria-hidden="true" />
      <LoadingText>{message}</LoadingText>
      {subMessage && <LoadingSubtext>{subMessage}</LoadingSubtext>}
      <span className="sr-only">Content is loading, please wait.</span>
    </LoadingContainer>
  );
});

LoadingFallback.displayName = 'LoadingFallback';

export default LoadingFallback;

import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Theme } from '../themes/theme';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

const SkeletonContainer = styled.div<{ theme: Theme }>`
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1), 
    rgba(255, 255, 255, 0.3), 
    rgba(255, 255, 255, 0.1)
  );
  background-size: 200% 100%;
  ${css`animation: ${shimmer} 1.5s infinite;`}
`;

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className,
}) => {
  return (
    <SkeletonContainer className={className} style={{
      width,
      height,
      borderRadius,
    }} />
  );
};

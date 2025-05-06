import { createGlobalStyle } from 'styled-components';
import { Theme } from '../themes/theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color ${({ theme }) => theme.transitions.default};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  button {
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.default};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Loading state */
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Skeleton loading */
  .skeleton {
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.1), 
      rgba(255, 255, 255, 0.3), 
      rgba(255, 255, 255, 0.1)
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }

  /* Responsive typography */
  @media (max-width: 768px) {
    body {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }

  /* Performance optimization */
  .will-change {
    will-change: transform;
  }

  .backface-visibility {
    backface-visibility: hidden;
    transform: translateZ(0);
  }
`;

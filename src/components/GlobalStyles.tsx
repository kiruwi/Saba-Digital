// src/components/GlobalStyles.tsx
import { createGlobalStyle } from 'styled-components';
import { Theme } from '../themes/theme';

/**
 * Global styles component that applies theme-based styling across the application
 */
const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }
  
  /* Update text colors for regular elements */
  p, h1, h2, h3, h4, h5, h6, span, div, ul, li, a {
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.3s ease;
  }
  
  /* Base card and container styles */
  .card, .container, section {
    background-color: ${({ theme }) => theme.colors.background};
    transition: background-color 0.3s ease;
  }
  
  /* Form elements */
  input, textarea, select {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};
  }

  /* Preserve the green accent color for buttons and links */
  .accent-color, a.accent-color, button.accent-color {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  /* Custom dark mode adjustments */
  .dark-mode-text {
    color: ${({ theme }) => theme.colors.text};
  }
  
  /* Custom styling for code blocks, syntax highlighting, etc. */
  pre, code {
    background-color: ${({ theme }) => theme.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
    color: ${({ theme }) => theme.theme === 'dark' ? '#e3e3e3' : '#333'};
  }
`;

export default GlobalStyles;

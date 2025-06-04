// src/components/GlobalStyles.tsx
import { createGlobalStyle } from 'styled-components';
import { Theme } from '../themes/theme';

/**
 * Global styles component that applies theme-based styling across the application
 * Enhanced with accessibility features and responsive design improvements
 */
const GlobalStyles = createGlobalStyle`
  /* Reset and base styles */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  /* Enhanced focus styles for keyboard navigation */
  :focus {
    outline: 2px solid #007e41;
    outline-offset: 2px;
  }
  
  /* Only show focus styles for keyboard users */
  :focus:not(:focus-visible) {
    outline: none;
  }
  
  :focus-visible {
    outline: 2px solid #007e41;
    outline-offset: 2px;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px; /* Base font size for rem calculations */
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
    font-family: 'SpotifyMix', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    
    /* Improved readability */
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    html {
      scroll-behavior: auto;
    }
  }
  
  /* Update text colors for regular elements */
  p, h1, h2, h3, h4, h5, h6, span, div, ul, li, a {
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.3s ease;
    font-family: 'SpotifyMix', sans-serif;
  }

  /* Improved heading hierarchy */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.2;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.125rem; }
  h6 { font-size: 1rem; }

  /* Responsive typography */
  @media (max-width: 768px) {
    html { font-size: 14px; }
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.25rem; }
  }
  
  /* Base card and container styles */
  .card, .container, section {
    background-color: ${({ theme }) => theme.colors.background};
    transition: background-color 0.3s ease;
  }
  
  /* Form elements with accessibility improvements */
  input, textarea, select, button {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};
    font-family: inherit;
    font-size: inherit;
    
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
    
    &:focus:not(:focus-visible) {
      outline: none;
    }
  }

  /* Improved button accessibility */
  button, [role="button"] {
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  /* Link accessibility */
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    transition: color 0.2s ease;
    
    &:hover, &:focus {
      color: ${({ theme }) => theme.colors.secondary};
    }
    
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  /* Screen reader only content */
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  /* Skip navigation link */
  /* Skip navigation styles removed */

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: ${({ theme }) => theme.colors.text} !important;
    }
    
    button, [role="button"] {
      border: 2px solid ${({ theme }) => theme.colors.text} !important;
    }
  }

  /* Preserve the green accent color for buttons and links */
  .accent-color, a.accent-color, button.accent-color {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  /* Custom dark mode adjustments */
  .dark-mode-text {
    color: ${({ theme }) => theme.colors.text};
  }
  
  /* Custom styling for code blocks */
  pre, code {
    background-color: ${({ theme }) => theme.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
    color: ${({ theme }) => theme.theme === 'dark' ? '#e3e3e3' : '#333'};
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    border-radius: 4px;
    padding: 0.25em 0.5em;
  }

  pre {
    padding: 1rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  /* Loading animations */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Utility classes */
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  .slide-in-up {
    animation: slideInUp 0.3s ease-out;
  }

  .loading {
    animation: pulse 1.5s ease-in-out infinite;
  }

  /* Focus management */
  .focus-within:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Print styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
    }
    
    .no-print {
      display: none !important;
    }
  }
`;

export default GlobalStyles;

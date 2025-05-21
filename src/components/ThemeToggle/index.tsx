import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

// Define props interface to support both context and prop-based usage
interface ThemeToggleProps {
  theme?: any;
  toggleTheme?: () => void;
}

interface ToggleProps {
  $isDarkMode: boolean;
}

const ToggleContainer = styled.button<ToggleProps>`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 4rem;
  height: 2rem;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0.25rem;
    left: ${({ $isDarkMode }) => $isDarkMode ? '2.25rem' : '0.25rem'};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  svg {
    height: 1rem;
    width: 1rem;
    transition: all 0.3s linear;
    position: relative;
    z-index: 1;

    // sun icon
    &:first-child {
      transform: ${({ $isDarkMode }) => !$isDarkMode ? 'translateY(0)' : 'translateY(100px)'};
      color: #F9D71C;
    }

    
    // moon icon
    &:nth-child(2) {
      transform: ${({ $isDarkMode }) => !$isDarkMode ? 'translateY(-100px)' : 'translateY(0)'};
      color: #F5F3CE;
    }
  }
`;

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme: propTheme, toggleTheme: propToggleTheme }) => {
  // Get theme and toggleTheme from context
  const { theme: contextTheme, toggleTheme: contextToggleTheme } = useTheme();
  
  // Use props if provided, otherwise use context
  const theme = propTheme || contextTheme;
  const toggleTheme = propToggleTheme || contextToggleTheme;
  
  const isDarkMode = theme === 'dark';
  
  return (
    <ToggleContainer 
      $isDarkMode={isDarkMode} 
      onClick={toggleTheme} 
      aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      title={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      role="switch"
      aria-checked={isDarkMode}
    >
      <FaSun />
      <FaMoon />
      <span className="sr-only">
        {isDarkMode ? "Currently in dark mode, click to switch to light mode" : "Currently in light mode, click to switch to dark mode"}
      </span>
    </ToggleContainer>
  );
};

export default ThemeToggle;

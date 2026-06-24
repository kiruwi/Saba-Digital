import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

// Define props interface to support both context and prop-based usage
interface ThemeToggleProps {}

interface ToggleButtonProps {
  $isDark: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
  background: ${({ $isDark }) => ($isDark ? '#333' : '#fff')};
  color: ${({ $isDark }) => ($isDark ? '#fff' : '#333')};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 2.8rem;
  height: 2.8rem;
  outline: none;
  box-shadow: 0 0 8px ${({ theme }) => `${theme.colors.primary}4D`};
  transition: all 0.3s ease;
  position: relative;
  margin: 0 0.5rem;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 12px ${({ theme }) => `${theme.colors.primary}66`};
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 1.5rem;
    color: ${({ $isDark }) => ($isDark ? '#F5F3CE' : '#F9D71C')};
    transition: all 0.3s ease;
  }
`;

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (typeof toggleTheme === 'function') {
        toggleTheme();
      } else {
        const currentTheme = document.documentElement.getAttribute('data-theme') || theme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.className = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.setAttribute('data-theme-updated', Date.now().toString());
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Error in theme toggle:', error);
      }
      alert('Error toggling theme. See console for details.');
    }
  };

  const isDark = theme === 'dark';

  return (
    <ToggleButton
      $isDark={isDark}
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

export default ThemeToggle;

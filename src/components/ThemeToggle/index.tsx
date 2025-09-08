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
  border: 2px solid #00CF95; /* Use the green brand color for the border */
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 2.8rem;
  height: 2.8rem;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 207, 149, 0.5); /* Add glow effect with brand color */
  transition: all 0.3s ease;
  position: relative;
  margin: 0 0.5rem;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 12px rgba(0, 207, 149, 0.7); /* Enhanced glow on hover */
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 1.5rem;
    color: ${({ $isDark }) => $isDark ? '#F5F3CE' : '#F9D71C'}; /* Light yellow for moon in dark mode, bright yellow for sun in light mode */
    transition: all 0.3s ease;
  }
`;

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  // Get theme and toggleTheme directly from context
  const { theme, toggleTheme } = useTheme();
  
  // Super robust click handler with multiple fallbacks
  const handleClick = (e: React.MouseEvent) => {
    // Stop propagation to prevent parent elements from capturing the click
    e.stopPropagation();
    e.preventDefault();
    
    // Theme toggle clicked
    
    try {
      // APPROACH 1: Use the context toggle function
      if (typeof toggleTheme === 'function') {
        // Using context toggleTheme function
        toggleTheme();
      } 
      // APPROACH 2: Direct DOM and localStorage manipulation as fallback
      else {
        // Using direct DOM manipulation as fallback
        // Determine current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || theme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update DOM
        document.documentElement.className = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Force refresh by updating data attribute
        document.documentElement.setAttribute('data-theme-updated', Date.now().toString());
        
        // Emergency theme toggle via DOM
        
        // Try to force React re-render
        window.dispatchEvent(new Event('storage'));
      }
      
      // For debugging: Alert on success
      // alert('Theme toggle clicked! Check console logs.');
      
    } catch (error) {
      // Error in theme toggle - log only in development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Error in theme toggle:', error);
      }
      alert('Error toggling theme. See console for details.');
    }
  };
  
  // Check if we're in dark mode
  const isDark = theme === 'dark';
  
  return (
    <ToggleButton 
      $isDark={isDark} 
      onClick={handleClick}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {/* Show sun icon in dark mode (to switch to light), moon icon in light mode (to switch to dark) */}
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

export default ThemeToggle;

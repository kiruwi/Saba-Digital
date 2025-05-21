import React from 'react';
import styled from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeType } from '../themes/theme';

interface ThemeToggleProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  z-index: 100;
  transition: all ${({ theme }) => theme.transitions.default};
  box-shadow: 0 2px 5px ${({ theme }) => theme.colors.shadow};
  
  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}50;
  }
`;

const ToggleContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 90px;
  z-index: 1000;
  
  @media screen and (max-width: 768px) {
    right: 70px; /* Adjusted to avoid overlap with mobile dropdown icon */
    top: 20px;
  }
`;

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <ToggleContainer>
      <ToggleButton onClick={toggleTheme} aria-label="Toggle dark mode">
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;

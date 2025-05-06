import React from 'react';
import styled from 'styled-components';
import { Theme } from '../themes/theme';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleContainer = styled.div<{ theme: Theme }>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: scale(1.1);
  }

  .icon {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      {theme === 'light' ? (
        <FaMoon className="icon" />
      ) : (
        <FaSun className="icon" />
      )}
    </ToggleContainer>
  );
};

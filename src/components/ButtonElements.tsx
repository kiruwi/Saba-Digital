// src/components/ButtonElements.tsx
import styled from 'styled-components';
import { Link } from 'react-scroll';
import React from 'react';

// Define our custom props
interface StyledButtonProps {
  $primary?: string;
  $dark?: string;
  $big?: boolean;
  $fontBig?: boolean;
}

// Create a styled component for the button
const ButtonStyle = styled.button<StyledButtonProps>`
  border-radius: 0;  /* ← rectangular */
  background: ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.background)};
  white-space: nowrap;
  padding: ${({ $big }) => ($big ? '14px 48px' : '12px 30px')};
  color: ${({ $dark, theme }) => ($dark ? theme.colors.background : theme.colors.text)};
  font-size: ${({ $fontBig }) => ($fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${({ $primary, theme }) => ($primary ? theme.colors.text : theme.colors.primary)};
    color: ${({ theme }) => theme.colors.background};
  }
`;

// Props for our Button component
interface ButtonProps {
  to: string;
  smooth?: boolean;
  duration?: number;
  spy?: boolean;
  exact?: string;
  offset?: number;
  $primary?: string;
  $dark?: string;
  $big?: boolean;
  $fontBig?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Export the Button component
export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  smooth = true,
  duration = 500,
  spy = true,
  exact = 'true',
  offset = -80,
  $primary,
  $dark,
  $big,
  $fontBig,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  return (
    <Link
      to={to}
      smooth={smooth}
      duration={duration}
      spy={spy}
      exact={exact}
      offset={offset}
      onClick={onClick}
    >
      <ButtonStyle
        $primary={$primary}
        $dark={$dark}
        $big={$big}
        $fontBig={$fontBig}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...rest}
      >
        {children}
      </ButtonStyle>
    </Link>
  );
};

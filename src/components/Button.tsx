import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../themes/theme';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

const ButtonStyled = styled.button<ButtonProps>`
  padding: ${({ size }) => 
    size === 'small' ? '0.5rem 1rem' :
    size === 'large' ? '1rem 2rem' :
    '0.75rem 1.5rem'
  };
  font-size: ${({ size }) => 
    size === 'small' ? '0.875rem' :
    size === 'large' ? '1.125rem' :
    '1rem'
  };
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.primary :
    variant === 'secondary' ? theme.colors.secondary :
    'transparent'
  };
  color: ${({ theme, variant }) => 
    variant === 'outline' ? theme.colors.primary : 'white'
  };
  border: ${({ theme, variant }) => 
    variant === 'outline' ? `2px solid ${theme.colors.primary}` : 'none'
  };

  &:hover {
    background-color: ${({ theme, variant, disabled }) => 
      !disabled && variant === 'primary' ? theme.colors.secondary :
      !disabled && variant === 'secondary' ? theme.colors.primary :
      !disabled && variant === 'outline' ? theme.colors.primary :
      undefined
    };
    color: ${({ theme, variant, disabled }) => 
      !disabled && variant === 'outline' ? 'white' : undefined
    };
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
}) => {
  return (
    <ButtonStyled
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;

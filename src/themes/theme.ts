import { DefaultTheme } from 'styled-components';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    shadow: string;
    error: string;
    accent: string;
    success: string;
    warning: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    heading: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  transitions: {
    default: string;
    fast: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    image: string;
    url: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#1e40af',
    background: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
    shadow: '#d1d5db',
    error: '#dc2626',
    accent: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    heading: '2rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '2.5rem',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 8px 12px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: 'all 0.2s ease',
    fast: 'all 0.1s ease',
  },
  meta: {
    title: 'My Portfolio',
    description: 'Professional portfolio showcasing my work and skills',
    keywords: ['portfolio', 'developer', 'design', 'projects'],
    image: '/og-image.png',
    url: 'https://kiruwi.github.io/Saba-Digital/',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#2563eb',
    background: '#1f2937',
    text: '#f3f4f6',
    border: '#374151',
    shadow: '#4b5563',
    error: '#f87171',
    accent: '#60a5fa',
    success: '#34d399',
    warning: '#fbbf24',
  },
  fontSizes: lightTheme.fontSizes,
  spacing: lightTheme.spacing,
  breakpoints: lightTheme.breakpoints,
  shadows: lightTheme.shadows,
  transitions: lightTheme.transitions,
  meta: lightTheme.meta,
};

export type ThemeType = typeof lightTheme;

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};

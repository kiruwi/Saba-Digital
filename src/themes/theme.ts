// Define the Theme interface directly in this file
export interface Theme {
  theme: ThemeType; // Add theme property to track current theme
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    shadow: string;
    accent: string;
    error: string;
    cardBackground: string; // For card backgrounds
    headingText: string; // For headings
    buttonText: string; // For button text
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    base: string; // Added as required property
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    default: string;
  };
  meta: {
    title: string;
    description: string;
    image: string;
    keywords: string[];
    url: string;
  };
}

export type ThemeType = 'light' | 'dark';

// Light theme configuration
export const lightTheme: Theme = {
  theme: 'light',
  colors: {
    primary: '#007e41', // Darker green for better contrast with white text
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#343a40',
    border: '#dee2e6',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#007e41', // Same darker green for accent
    error: '#dc3545',
    cardBackground: '#f8f9fa', // Light card background
    headingText: '#000000', // Pure black heading text for light theme
    buttonText: '#ffffff' // White text for buttons
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    base: '1rem' // Added base font size
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem'
  },
  transitions: {
    default: '0.3s ease'
  },
  meta: {
    title: 'Saba Digital',
    description: 'A modern digital experience platform',
    image: '/images/logo.png',
    keywords: ['digital', 'web', 'design', 'development'],
    url: 'https://saba-digital.com'
  }
};

// Dark theme configuration
export const darkTheme: Theme = {
  theme: 'dark',
  colors: {
    primary: '#3db54e', // Darker green for better contrast with white text
    secondary: '#6c757d',
    background: '#0e1322',
    text: '#f8f9fa',
    border: '#495057',
    shadow: 'rgba(0, 0, 0, 0.5)',
    accent: '#3db54e', // Same darker green for accent
    error: '#e35d6a',
    cardBackground: '#1e1e1e', // Dark card background
    headingText: '#ffffff', // Light heading text for dark theme
    buttonText: '#ffffff' // White text for buttons
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    base: '1rem' // Added base font size
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem'
  },
  transitions: {
    default: '0.3s ease'
  },
  meta: {
    title: 'Saba Digital',
    description: 'A modern digital experience platform',
    image: '/images/logo.png',
    keywords: ['digital', 'web', 'design', 'development'],
    url: 'https://saba-digital.com'
  }
};

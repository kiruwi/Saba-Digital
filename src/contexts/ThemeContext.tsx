import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeType, lightTheme, darkTheme } from '../themes/theme';

// Define the context type
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  // Helper function to get initial theme from localStorage or system preference
  const getInitialTheme = (): ThemeType => {
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Default to dark theme
    return 'dark';
  };

  // Initialize theme state
  const [theme, setTheme] = useState<ThemeType>(getInitialTheme());

  // Simple toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme class directly to document
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Add appropriate class to body
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  };

  // Apply theme on initial render
  useEffect(() => {
    // Update data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add appropriate class to body
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  // Create context value
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme
  };

  // Get the appropriate theme object
  const themeObject = theme === 'light' ? lightTheme : darkTheme;
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={themeObject}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;

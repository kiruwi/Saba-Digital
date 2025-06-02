import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
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

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Helper function to get initial theme from localStorage or system preference
  const getInitialTheme = (): ThemeType => {
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light theme
    return 'light';
  };

  // Initialize theme state with string 'light' or 'dark'
  const [theme, setTheme] = useState<ThemeType>(getInitialTheme());

  // Toggle theme function with additional debugging and force update
  const toggleTheme = () => {
    console.log('⚠️ Theme toggle called, theme before toggle:', theme); // Debug
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('⚠️ Setting new theme to:', newTheme); // Debug
    
    // Update state
    setTheme(newTheme);
    
    // Also update localStorage
    localStorage.setItem('theme', newTheme);
    
    // Apply theme class directly to document to force immediate visual update
    document.documentElement.className = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Force re-render by updating a custom data attribute
    document.documentElement.setAttribute('data-theme-updated', Date.now().toString());
    
    console.log('⚠️ Theme toggle completed, DOM updated');
    
    // Alert for debugging
    // alert(`Theme toggled to: ${newTheme}`);
  };

  // Update theme when system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if there's no saved theme preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener for theme preference changes
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Listen for custom theme change events from direct DOM manipulation
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail?.theme as ThemeType;
      if (newTheme && (newTheme === 'light' || newTheme === 'dark')) {
        console.log('🎧 ThemeContext: Received themechange event with theme:', newTheme);
        setTheme(newTheme);
      }
    };
    
    // Add event listener for custom theme changes
    window.addEventListener('themechange', handleThemeChange as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('themechange', handleThemeChange as EventListener);
    };
  }, []);
  
  // Apply theme to document element for CSS variables
  useEffect(() => {
    // Update data-theme attribute on document element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Optional: Add a class to body for additional CSS targeting
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  // Provide the theme context value
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme
  };

  // Use the styled-components ThemeProvider with our context
  // Always pass a theme object to styled-components ThemeProvider, not a string
  const themeObject = theme === 'light' ? lightTheme : darkTheme;
  
  // Debug the current theme
  console.log('Current theme:', theme);
  console.log('Using theme object:', themeObject);
  
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

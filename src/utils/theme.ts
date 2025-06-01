import { ThemeType } from '../themes/theme';

class ThemeUtils {
  /**
   * Gets the initial theme from localStorage or system preferences
   * @returns The initial theme ('light' | 'dark')
   */
  static getInitialTheme = (): ThemeType => {
    // Check if theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Default to dark mode regardless of system preference
    return 'dark';
  };

  /**
   * Toggles between light and dark theme
   * @param currentTheme The current theme
   * @returns The new theme
   */
  static toggleTheme = (currentTheme: ThemeType): ThemeType => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return newTheme;
  };
}

export default ThemeUtils;

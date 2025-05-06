import { Theme } from '../themes/theme';

export const ThemeUtils = {
  getSystemTheme: (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  persistTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem('theme', theme);
  },

  getInitialTheme: (): 'light' | 'dark' => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return savedTheme || ThemeUtils.getSystemTheme();
  },

  toggleTheme: (currentTheme: 'light' | 'dark'): 'light' | 'dark' => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    ThemeUtils.persistTheme(newTheme);
    return newTheme;
  },
};

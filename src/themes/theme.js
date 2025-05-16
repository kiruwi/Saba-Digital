// JavaScript wrapper for the TypeScript theme
import { lightTheme } from './theme.ts';

// Add darkTheme as a duplicate of lightTheme to resolve build errors
const darkTheme = { ...lightTheme };

export { lightTheme, darkTheme };

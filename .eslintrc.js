module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off', // Using TypeScript for prop validation
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

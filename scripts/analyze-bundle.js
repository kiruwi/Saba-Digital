#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Helps identify large dependencies and optimization opportunities
 */

const fs = require('fs');
const path = require('path');

// Check for webpack-bundle-analyzer
const analyzerScript = `
npm install --save-dev webpack-bundle-analyzer
npx react-scripts build
npx webpack-bundle-analyzer build/static/js/*.js
`;

console.log('To analyze your bundle size, run:');
console.log(analyzerScript);

// Analyze package.json for potential optimizations
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

console.log('\n📦 Dependency Analysis:');
console.log('=======================');

const dependencies = packageJson.dependencies || {};
const heavyPackages = [
  'gsap', 'ogl', 'react-youtube', 'react-markdown'
];

heavyPackages.forEach(pkg => {
  if (dependencies[pkg]) {
    console.log(`⚠️  ${pkg}: Consider lazy loading or code splitting`);
  }
});

// Check for unused dependencies
console.log('\n🔍 Potential Optimizations:');
console.log('============================');
console.log('1. Lazy load GSAP animations only when needed');
console.log('2. Consider replacing react-youtube with lighter alternative');
console.log('3. Code split OGL 3D components');
console.log('4. Implement route-based code splitting for all pages');

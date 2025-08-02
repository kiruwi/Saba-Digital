# Dependency Optimization Recommendations

## Move to DevDependencies
These packages are only needed during build/development:
```json
"devDependencies": {
  "gray-matter": "^4.0.3", // Already moved ✅
  "ajv": "^8.17.1" // Already moved ✅
}
```

## Consider Lazy Loading
```javascript
// Instead of importing GSAP globally, lazy load when needed
const loadGSAP = async () => {
  const gsap = await import('gsap');
  return gsap.default;
};

// OGL 3D components - only load when 3D content is viewed
const load3DComponents = async () => {
  const ogl = await import('ogl');
  return ogl;
};
```

## Bundle Size Reduction Opportunities
1. **GSAP**: ~180KB - Consider loading only specific modules
2. **OGL**: ~45KB - Lazy load for 3D components only
3. **react-youtube**: ~15KB - Could use iframe for lighter implementation
4. **react-markdown**: ~30KB - Consider if all features are needed

## Recommended Package Updates
```bash
npm update @types/react @types/react-dom
npm update react-router-dom
npm update typescript
```

## Alternative Lightweight Options
- **react-youtube** → Custom iframe component (saves ~15KB)
- **emailjs-com** → Native fetch API for contact forms
- **react-intersection-observer** → Native Intersection Observer API

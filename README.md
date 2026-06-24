# Saba Digital portfolio

React and TypeScript portfolio deployed as a static site on Cloudflare Pages.

## Development

```bash
npm install
npm start
```

## Production build

```bash
npm run build
```

Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `build`
- Root directory: repository root

Cloudflare Pages reads `public/_headers` and `public/_redirects` into the
production build. The redirect rules provide SPA routing for React Router.

## Other commands

```bash
npm run lint
npm test
```

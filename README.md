# Saba Digital portfolio

React and TypeScript portfolio deployed as static assets on Cloudflare Workers.

## Development

```bash
npm install
npm start
```

## Production build

```bash
npm run build
```

Cloudflare build settings:

- Build command: `npm run build`
- Build output directory: `build`
- Root directory: repository root
- Deploy command: `npm run deploy`

`wrangler.jsonc` serves the `build` directory and uses Cloudflare's
`single-page-application` fallback for React Router routes.

## Other commands

```bash
npm run lint
npm test
```

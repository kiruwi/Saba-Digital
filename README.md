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

## Contact form

The contact form posts to the Cloudflare Worker endpoint at `/api/contact`.
Turnstile validates submissions and Resend delivers them by email.

Before deploying:

1. Create a Turnstile widget for `iancheruiyot.work`.
2. Verify `iancheruiyot.work` as a sending domain in Resend.
3. Add these secrets to the `my-portfolio` Worker:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SITE_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
```

The committed Worker variables send enquiries to `iankcheruiyot@gmail.com`
from `Saba Digital <contact@iancheruiyot.work>`. Update `wrangler.jsonc` if
either address changes.

`ALLOWED_ORIGIN` may contain a comma-separated list of additional trusted
origins. Same-origin submissions are always accepted, including Cloudflare
preview and `workers.dev` URLs.

For local Worker development, copy `.dev.vars.example` to `.dev.vars` and
provide development credentials. `.dev.vars` is ignored by Git.

## Other commands

```bash
npm run lint
npm test
```

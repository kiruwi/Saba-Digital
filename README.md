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
Turnstile validates submissions and Brevo SMTP delivers them by email.

Before deploying:

1. Create a Turnstile widget for `iankcheruiyot.work`.
2. Verify `info@iankcheruiyot.work` as a sender in Brevo.
3. Add these secrets to the `my-portfolio` Worker:

```bash
npx wrangler secret put SMTP_USERNAME
npx wrangler secret put SMTP_PASSWORD
npx wrangler secret put TURNSTILE_SECRET_KEY
```

The public Turnstile site key is committed in `wrangler.jsonc` so Git-based
deployments keep it synchronized.

The Worker sends enquiries from `info@iankcheruiyot.work` to
`iankcheruiyot@gmail.com` through `smtp-relay.brevo.com:587` using STARTTLS.

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

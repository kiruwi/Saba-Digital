/// <reference types="@cloudflare/workers-types" />

import { connect } from "cloudflare:sockets";

interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_SITE_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USERNAME?: string;
  SMTP_PASSWORD?: string;
  ALLOWED_ORIGIN?: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
}

interface RouteMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

const SITE_URL = "https://iankcheruiyot.work";
const SOCIAL_IMAGE = `${SITE_URL}/images/optimized/portrait/ian-1200.webp`;
const DEFAULT_KEYWORDS =
  "Saba Digital, UX/UI Design, Web Development, Branding, Graphic Design, Nairobi";

const routeMetadata: Record<string, RouteMetadata> = {
  "/": {
    title: "Saba Digital | UX/UI, Web Development & Branding",
    description:
      "Saba Digital is the portfolio of Ian K. Cheruiyot, showcasing UX/UI design, web development, branding, ad design, and motion graphics work.",
    canonicalPath: "/",
  },
  "/work": {
    title: "Work | Saba Digital Portfolio",
    description:
      "Explore Saba Digital case studies across graphics, UX/UI, web development, ad design, and motion graphics.",
    canonicalPath: "/work",
  },
  "/work/graphics": {
    title: "Branding & Graphics Projects",
    description:
      "Brand identity, visual design, and rebranding projects by Saba Digital.",
    canonicalPath: "/work/graphics",
  },
  "/work/ux-ui": {
    title: "UX/UI Projects",
    description:
      "UX/UI case studies by Saba Digital, including user research, product design, and interface redesign projects.",
    canonicalPath: "/work/ux-ui",
  },
  "/work/web-dev": {
    title: "Web Development Projects",
    description:
      "Web development portfolio by Saba Digital, including business websites and conversion-focused digital experiences.",
    canonicalPath: "/work/web-dev",
  },
  "/work/ad-design": {
    title: "Ad Design Projects",
    description: "Ad creative and campaign design portfolio from Saba Digital.",
    canonicalPath: "/work/ad-design",
  },
  "/work/motion": {
    title: "Motion Graphics Projects",
    description: "Motion graphics and animation projects from Saba Digital.",
    canonicalPath: "/work/motion",
  },
  "/contact": {
    title: "Contact Saba Digital",
    description:
      "Contact Ian K. Cheruiyot at Saba Digital for UX/UI design, web development, branding, ad design, and motion graphics projects.",
    canonicalPath: "/contact",
  },
  "/contactus": {
    title: "Contact Saba Digital",
    description:
      "Contact Ian K. Cheruiyot at Saba Digital for UX/UI design, web development, branding, ad design, and motion graphics projects.",
    canonicalPath: "/contact",
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "Privacy policy for Saba Digital and iankcheruiyot.work.",
    canonicalPath: "/privacy",
  },
  "/cookies": {
    title: "Cookie Policy",
    description: "Cookie policy for Saba Digital and iankcheruiyot.work.",
    canonicalPath: "/cookies",
  },
  "/work/ux-ui/ufanisi-resort": {
    title: "Ufanisi Resort | UX/UI Case Study",
    description:
      "A UX/UI redesign case study for Ufanisi Resort covering research, prototyping, usability, and visual design.",
    canonicalPath: "/work/ux-ui/ufanisi-resort",
    type: "article",
  },
  "/work/web-dev/makvo-llc": {
    title: "Makvo LLC | Web Development Case Study",
    description:
      "Corporate website for Makvo with responsive design and modern UI elements.",
    canonicalPath: "/work/web-dev/makvo-llc",
    type: "article",
  },
  "/work/web-dev/mutai-enterprises": {
    title: "Mutai Enterprises Limited | Web Development Case Study",
    description:
      "Freight forwarding and logistics website for a Kenyan transport company.",
    canonicalPath: "/work/web-dev/mutai-enterprises",
    type: "article",
  },
  "/work/web-dev/eve-on-safari": {
    title: "Eve On Safari | Web Development Case Study",
    description:
      "Tanzania safari planning website with curated itineraries, travel styles, and custom trip requests.",
    canonicalPath: "/work/web-dev/eve-on-safari",
    type: "article",
  },
  "/work/graphics/gsc-hauling": {
    title: "GSC Hauling | Branding & Graphics Case Study",
    description:
      "In-house graphic design and brand identity work for a professional hauling company.",
    canonicalPath: "/work/graphics/gsc-hauling",
    type: "article",
  },
  "/work/graphics/osim-lai-branding": {
    title: "Osim Lai Brand Identity | Branding & Graphics Case Study",
    description: "Complete brand identity design for a lifestyle company.",
    canonicalPath: "/work/graphics/osim-lai-branding",
    type: "article",
  },
  "/work/graphics/synnefa-rebrand": {
    title: "Synnefa Rebrand & 3D | Branding & Graphics Case Study",
    description:
      "A technology brand refresh with identity design and 3D product visualization.",
    canonicalPath: "/work/graphics/synnefa-rebrand",
    type: "article",
  },
};

const json = (body: unknown, status = 200): Response =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character
  );

const normalizePathname = (pathname: string): string => {
  if (pathname === "/index.html") return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
};

const renderMetadata = (metadata: RouteMetadata): string => {
  const canonicalUrl = `${SITE_URL}${metadata.canonicalPath}`;
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const robots = metadata.noIndex ? "noindex, nofollow" : "index, follow";

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<meta name="keywords" content="${DEFAULT_KEYWORDS}">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${canonicalUrl}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:type" content="${metadata.type ?? "website"}">`,
    `<meta property="og:url" content="${canonicalUrl}">`,
    `<meta property="og:image" content="${SOCIAL_IMAGE}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${SOCIAL_IMAGE}">`,
  ].join("");
};

const applyRouteMetadata = (html: string, metadata: RouteMetadata): string => {
  const withoutManagedMetadata = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(
      /<meta\s+[^>]*(?:name|property)=["'](?:description|keywords|robots|og:title|og:description|og:type|og:url|og:image|twitter:card|twitter:title|twitter:description|twitter:image)["'][^>]*>/gi,
      ""
    )
    .replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi, "");

  return withoutManagedMetadata.replace(
    "</head>",
    `${renderMetadata(metadata)}</head>`
  );
};

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const encoder = new TextEncoder();

const toBase64 = (value: string): string => {
  const bytes = encoder.encode(value);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
};

const toBase64Lines = (value: string): string =>
  toBase64(value).match(/.{1,76}/g)?.join("\r\n") ?? "";

const createContactEmail = (
  from: string,
  to: string,
  replyTo: string,
  name: string,
  subject: string,
  message: string
): string => {
  const safeSubject = subject || "Portfolio enquiry";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(replyTo);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const text = `${safeSubject}\n\nFrom: ${name} <${replyTo}>\n\n${message}`;
  const html = `
    <h2>${escapeHtml(safeSubject)}</h2>
    <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
    <p>${safeMessage}</p>
  `;
  const boundary = `contact-${crypto.randomUUID()}`;
  const messageIdDomain = from.split("@")[1];

  return [
    `From: Saba Digital <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: =?UTF-8?B?${toBase64(safeSubject)}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${messageIdDomain}>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary=\"${boundary}\"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    toBase64Lines(text),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    toBase64Lines(html),
    `--${boundary}--`,
    "",
  ].join("\r\n");
};

interface SmtpResponse {
  code: number;
  lines: string[];
}

class SmtpSession {
  private reader: ReadableStreamDefaultReader<Uint8Array>;
  private writer: WritableStreamDefaultWriter<Uint8Array>;
  private decoder = new TextDecoder();
  private buffer = "";

  constructor(
    private socket: ReturnType<typeof connect>
  ) {
    this.reader = socket.readable.getReader();
    this.writer = socket.writable.getWriter();
  }

  async close(): Promise<void> {
    await this.socket.close();
  }

  async upgradeToTls(): Promise<SmtpSession> {
    this.reader.releaseLock();
    this.writer.releaseLock();
    return new SmtpSession(this.socket.startTls());
  }

  async command(command: string): Promise<SmtpResponse> {
    await this.writer.write(encoder.encode(`${command}\r\n`));
    return this.readResponse();
  }

  async writeData(data: string): Promise<SmtpResponse> {
    const dotStuffed = data.replace(/(^|\r\n)\./g, "$1..");
    await this.writer.write(encoder.encode(`${dotStuffed}\r\n.\r\n`));
    return this.readResponse();
  }

  private async readLine(): Promise<string> {
    while (true) {
      const lineEnd = this.buffer.indexOf("\r\n");
      if (lineEnd !== -1) {
        const line = this.buffer.slice(0, lineEnd);
        this.buffer = this.buffer.slice(lineEnd + 2);
        return line;
      }

      const { value, done } = await this.reader.read();
      if (done) {
        throw new Error("SMTP server closed the connection unexpectedly.");
      }

      this.buffer += this.decoder.decode(value, { stream: true });
    }
  }

  async readResponse(): Promise<SmtpResponse> {
    const lines: string[] = [];
    const firstLine = await this.readLine();
    const match = /^(\d{3})([ -])/.exec(firstLine);

    if (!match) {
      throw new Error("SMTP server returned an invalid response.");
    }

    const code = Number(match[1]);
    lines.push(firstLine);

    if (match[2] === "-") {
      while (true) {
        const line = await this.readLine();
        lines.push(line);
        if (line.startsWith(`${code} `)) break;
      }
    }

    return { code, lines };
  }
}

const expectSmtpResponse = (
  response: SmtpResponse,
  expectedCodes: number[]
): void => {
  if (!expectedCodes.includes(response.code)) {
    throw new Error(`SMTP command failed with status ${response.code}.`);
  }
};

const sendWithSmtp = async (
  env: Env,
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const host = env.SMTP_HOST?.trim();
  const port = Number(env.SMTP_PORT);
  const from = env.CONTACT_FROM_EMAIL?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const username = env.SMTP_USERNAME?.trim();
  const password = env.SMTP_PASSWORD;

  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !from ||
    !isValidEmail(from) ||
    !to ||
    !isValidEmail(to) ||
    !username ||
    !password
  ) {
    throw new Error("SMTP is not configured.");
  }

  let session = new SmtpSession(
    connect(
      { hostname: host, port },
      { secureTransport: "starttls", allowHalfOpen: false }
    )
  );

  try {
    expectSmtpResponse(await session.readResponse(), [220]);
    const ehloResponse = await session.command("EHLO iankcheruiyot.work");
    expectSmtpResponse(ehloResponse, [250]);

    if (!ehloResponse.lines.some((line) => /\bSTARTTLS\b/i.test(line))) {
      throw new Error("SMTP server does not support STARTTLS.");
    }

    expectSmtpResponse(await session.command("STARTTLS"), [220]);
    session = await session.upgradeToTls();

    expectSmtpResponse(
      await session.command("EHLO iankcheruiyot.work"),
      [250]
    );
    expectSmtpResponse(await session.command("AUTH LOGIN"), [334]);
    expectSmtpResponse(await session.command(toBase64(username)), [334]);
    expectSmtpResponse(await session.command(toBase64(password)), [235]);

    expectSmtpResponse(await session.command(`MAIL FROM:<${from}>`), [250]);
    expectSmtpResponse(await session.command(`RCPT TO:<${to}>`), [250, 251]);
    expectSmtpResponse(await session.command("DATA"), [354]);
    expectSmtpResponse(
      await session.writeData(
        createContactEmail(from, to, email, name, subject, message)
      ),
      [250]
    );
    expectSmtpResponse(await session.command("QUIT"), [221]);
  } finally {
    await session.close().catch(() => undefined);
  }
};

const verifyTurnstile = async (
  token: string,
  request: Request,
  secret: string
): Promise<boolean> => {
  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", token);

  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) formData.set("remoteip", remoteIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) return false;

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
};

const handleContact = async (
  request: Request,
  env: Env
): Promise<Response> => {
  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.CONTACT_TO_EMAIL ||
    !env.CONTACT_FROM_EMAIL ||
    !env.SMTP_HOST ||
    !env.SMTP_PORT ||
    !env.SMTP_USERNAME ||
    !env.SMTP_PASSWORD
  ) {
    return json({ error: "Contact service is not configured." }, 503);
  }

  const origin = request.headers.get("Origin");
  if (origin) {
    const requestOrigin = new URL(request.url).origin;
    const configuredOrigins = (env.ALLOWED_ORIGIN ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    const allowedOrigins = new Set([requestOrigin, ...configuredOrigins]);

    if (!allowedOrigins.has(origin)) {
      return json({ error: "Origin is not allowed." }, 403);
    }
  }

  const contentLength = Number(request.headers.get("Content-Length") ?? "0");
  if (contentLength > 20_000) {
    return json({ error: "Request is too large." }, 413);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject =
    typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const turnstileToken =
    typeof payload.turnstileToken === "string"
      ? payload.turnstileToken.trim()
      : "";

  if (
    !name ||
    name.length > 50 ||
    !isValidEmail(email) ||
    email.length > 100 ||
    subject.length > 100 ||
    !message ||
    message.length > 5000 ||
    !turnstileToken
  ) {
    return json({ error: "Please check the submitted fields." }, 400);
  }

  const turnstileValid = await verifyTurnstile(
    turnstileToken,
    request,
    env.TURNSTILE_SECRET_KEY
  );

  if (!turnstileValid) {
    return json({ error: "Security verification failed." }, 400);
  }

  try {
    await sendWithSmtp(env, name, email, subject, message);
  } catch (error) {
    console.error(
      "Brevo SMTP rejected contact email",
      error instanceof Error ? error.message : "Unknown SMTP error"
    );
    return json({ error: "Email delivery failed. Please try again later." }, 502);
  }

  return json({ ok: true });
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact/config" && request.method === "GET") {
      if (!env.TURNSTILE_SITE_KEY) {
        return json({ error: "Contact service is not configured." }, 503);
      }

      return json({ turnstileSiteKey: env.TURNSTILE_SITE_KEY });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "Not found." }, 404);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const contentType = assetResponse.headers.get("Content-Type") ?? "";
    const isHtml = contentType.includes("text/html");
    const isStandaloneHtml = ["/security-policy", "/security-policy.html"].includes(
      url.pathname
    );

    if (!isHtml || isStandaloneHtml || !["GET", "HEAD"].includes(request.method)) {
      return assetResponse;
    }

    const pathname = normalizePathname(url.pathname);
    const metadata = routeMetadata[pathname] ?? {
      title: "Page Not Found | Saba Digital",
      description: "The requested page could not be found.",
      canonicalPath: pathname,
      noIndex: true,
    };
    const status = routeMetadata[pathname] ? assetResponse.status : 404;
    const headers = new Headers(assetResponse.headers);

    if (request.method === "HEAD") {
      return new Response(null, { status, headers });
    }

    const html = await assetResponse.text();
    headers.delete("Content-Length");
    return new Response(applyRouteMetadata(html, metadata), {
      status,
      headers,
    });
  },
};

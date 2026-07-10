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
      { secureTransport: "starttls" }
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

    return env.ASSETS.fetch(request);
  },
};

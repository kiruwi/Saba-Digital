interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_SITE_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
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
    !env.RESEND_API_KEY ||
    !env.TURNSTILE_SECRET_KEY ||
    !env.CONTACT_TO_EMAIL ||
    !env.CONTACT_FROM_EMAIL
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

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "Portfolio enquiry");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Portfolio enquiry: ${subject || "New message"}`,
      html: `
        <h2>${safeSubject}</h2>
        <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
        <p>${safeMessage}</p>
      `,
      text: `${subject || "Portfolio enquiry"}\n\nFrom: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const resendErrorText = await resendResponse.text();
    let clientMessage = "Email provider rejected the message.";

    try {
      const resendError = JSON.parse(resendErrorText) as { message?: string };
      if (
        resendResponse.status === 403 &&
        resendError.message?.toLowerCase().includes("domain")
      ) {
        clientMessage = "The sender domain is not verified in Resend.";
      }
    } catch {
      // Keep the generic client-safe message when Resend does not return JSON.
    }

    console.error("Resend rejected contact email", {
      status: resendResponse.status,
      body: resendErrorText,
    });
    return json({ error: clientMessage }, 502);
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

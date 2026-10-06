/**
 * HTTP security headers, applied to every response from next.config.ts.
 *
 * Content-Security-Policy decision (Stage 11):
 * - A nonce-based policy would force every page to render on each request (Next.js can only
 *   inject nonces at request time), giving up the static, CDN-cached pages this site is built on.
 * - Next.js's hash-based alternative (Subresource Integrity) is still experimental.
 * - So scripts allow 'unsafe-inline' (Next.js's own inline bootstrap), but only from this origin
 *   plus Cloudflare Turnstile. Everything else is locked down: no third-party scripts, frames,
 *   fonts, images or connections; no plugins; no framing of this site; forms post only here.
 *   The XSS surface is small: React escapes all output, the only raw HTML is JSON-LD with `<`
 *   escaped, and no visitor input is ever rendered back as HTML.
 * Revisit when SRI is stable: drop 'unsafe-inline' from script-src.
 */

const TURNSTILE = "https://challenges.cloudflare.com";
/** Vercel's comment/feedback toolbar, injected on preview deployments only (sources per Vercel docs). */
const VERCEL_LIVE = "https://vercel.live";

export interface SecurityHeaderOptions {
  /** `next dev` needs eval for fast refresh and a websocket for hot reload. */
  readonly isDev: boolean;
  /** Value of VERCEL_ENV, if deployed on Vercel. */
  readonly vercelEnv?: string | undefined;
}

export function contentSecurityPolicy({ isDev, vercelEnv }: SecurityHeaderOptions): string {
  const preview = vercelEnv === "preview";
  const directives: Record<string, readonly string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      TURNSTILE,
      ...(isDev ? ["'unsafe-eval'"] : []),
      ...(preview ? [VERCEL_LIVE] : []),
    ],
    "style-src": ["'self'", "'unsafe-inline'", ...(preview ? [VERCEL_LIVE] : [])],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      ...(preview ? [VERCEL_LIVE, "https://vercel.com"] : []),
    ],
    "font-src": ["'self'", ...(preview ? [VERCEL_LIVE, "https://assets.vercel.com"] : [])],
    "connect-src": [
      "'self'",
      ...(isDev ? ["ws:"] : []),
      ...(preview ? [VERCEL_LIVE, "wss://ws-us3.pusher.com"] : []),
    ],
    "frame-src": [TURNSTILE, ...(preview ? [VERCEL_LIVE] : [])],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "manifest-src": ["'self'"],
    "worker-src": ["'self'", "blob:"],
  };

  const policy = Object.entries(directives).map(([name, values]) => `${name} ${values.join(" ")}`);
  // Only on real HTTPS deployments; local `next start` runs on plain http://localhost.
  if (vercelEnv) policy.push("upgrade-insecure-requests");
  return policy.join("; ");
}

export function securityHeaders(options: SecurityHeaderOptions) {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(options) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    // Legacy companion to frame-ancestors for older browsers.
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
    },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  ];
}

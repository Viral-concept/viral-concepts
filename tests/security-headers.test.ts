import { describe, expect, it } from "vitest";

import { contentSecurityPolicy, securityHeaders } from "@/config/security-headers";

function directives(policy: string): Map<string, string[]> {
  return new Map(
    policy.split("; ").map((part) => {
      const [name = "", ...values] = part.split(" ");
      return [name, values];
    }),
  );
}

describe("content security policy", () => {
  const production = directives(contentSecurityPolicy({ isDev: false, vercelEnv: "production" }));

  it("allows scripts and frames only from this site and Cloudflare Turnstile", () => {
    expect(production.get("default-src")).toEqual(["'self'"]);
    expect(production.get("script-src")).toEqual([
      "'self'",
      "'unsafe-inline'",
      "https://challenges.cloudflare.com",
    ]);
    expect(production.get("frame-src")).toEqual(["https://challenges.cloudflare.com"]);
    expect(production.get("connect-src")).toEqual(["'self'"]);
  });

  it("blocks plugins, framing of the site and foreign form targets", () => {
    expect(production.get("object-src")).toEqual(["'none'"]);
    expect(production.get("frame-ancestors")).toEqual(["'none'"]);
    expect(production.get("form-action")).toEqual(["'self'"]);
    expect(production.get("base-uri")).toEqual(["'self'"]);
    expect(production.has("upgrade-insecure-requests")).toBe(true);
  });

  it("never allows eval or the Vercel toolbar in production", () => {
    const text = contentSecurityPolicy({ isDev: false, vercelEnv: "production" });
    expect(text).not.toContain("unsafe-eval");
    expect(text).not.toContain("vercel.live");
  });

  it("adds only what development and previews need", () => {
    expect(contentSecurityPolicy({ isDev: true })).toContain("'unsafe-eval'");
    expect(contentSecurityPolicy({ isDev: false, vercelEnv: "preview" })).toContain("vercel.live");
    expect(contentSecurityPolicy({ isDev: false })).not.toContain("upgrade-insecure-requests");
  });
});

describe("security headers", () => {
  it("sends the standard hardening headers", () => {
    const keys = securityHeaders({ isDev: false, vercelEnv: "production" }).map((h) => h.key);
    expect(keys).toEqual([
      "Content-Security-Policy",
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Cross-Origin-Opener-Policy",
      "Permissions-Policy",
      "Strict-Transport-Security",
    ]);
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * The content mode decides whether unconfirmed content can render, so its resolution rules
 * are tested directly. The module reads the environment at import time, hence resetModules.
 */
async function loadEnv(vars: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(vars)) vi.stubEnv(key, value);
  return import("@/config/env.server");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("content mode", () => {
  it("defaults to production and noindex when nothing is set", async () => {
    const env = await loadEnv({ VERCEL_ENV: undefined, CONTENT_PREVIEW: undefined });
    expect(env.contentMode).toBe("production");
    expect(env.isIndexable).toBe(false);
  });

  it("is preview on Vercel preview deployments, which are never indexable", async () => {
    const env = await loadEnv({ VERCEL_ENV: "preview" });
    expect(env.contentMode).toBe("preview");
    expect(env.isIndexable).toBe(false);
  });

  it("ignores CONTENT_PREVIEW on the Vercel production deployment", async () => {
    const env = await loadEnv({ VERCEL_ENV: "production", CONTENT_PREVIEW: "true" });
    expect(env.contentMode).toBe("production");
    expect(env.isIndexable).toBe(true);
  });

  it("allows local preview by explicit opt-in, still noindex", async () => {
    const env = await loadEnv({ VERCEL_ENV: undefined, CONTENT_PREVIEW: "true" });
    expect(env.contentMode).toBe("preview");
    expect(env.isIndexable).toBe(false);
  });

  it("allows indexing on non-Vercel hosts only by explicit opt-in", async () => {
    const env = await loadEnv({ VERCEL_ENV: undefined, SITE_INDEXABLE: "true" });
    expect(env.isIndexable).toBe(true);
  });
});

describe("lead form configuration", () => {
  const keys = {
    RESEND_API_KEY: "re_test",
    LEAD_TO_EMAIL: "sales@example.org, desk@example.org",
    LEAD_FROM_EMAIL: "Website <website@example.org>",
    TURNSTILE_SECRET_KEY: "secret",
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: "site-key",
  };

  it("is disabled and lists what is missing instead of throwing", async () => {
    const env = await loadEnv({
      RESEND_API_KEY: undefined,
      LEAD_TO_EMAIL: undefined,
      LEAD_FROM_EMAIL: undefined,
      TURNSTILE_SECRET_KEY: undefined,
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: undefined,
      LEAD_FORM_MODE: undefined,
    });
    const config = env.getLeadFormConfig();
    expect(config.mode).toBe("disabled");
    if (config.mode === "disabled") {
      expect(config.missing).toContain("RESEND_API_KEY");
      expect(config.missing).toContain("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
    }
  });

  it("is live with every key, parsing a comma-separated recipient list", async () => {
    const env = await loadEnv({ ...keys, LEAD_FORM_MODE: undefined });
    const config = env.getLeadFormConfig();
    expect(config.mode).toBe("live");
    if (config.mode === "live") {
      expect(config.env.LEAD_TO_EMAIL).toEqual(["sales@example.org", "desk@example.org"]);
      expect(config.env.LEAD_AUTO_REPLY).toBe(true);
    }
  });

  it("needs the public site key as well as the secrets", async () => {
    const env = await loadEnv({ ...keys, NEXT_PUBLIC_TURNSTILE_SITE_KEY: undefined });
    expect(env.getLeadFormConfig().mode).toBe("disabled");
  });

  it("refuses test mode on Vercel unless it is a preview, even without VERCEL_ENV", async () => {
    const hidden = await loadEnv({
      ...keys,
      VERCEL: "1",
      VERCEL_ENV: undefined,
      LEAD_FORM_MODE: "test",
    });
    expect(hidden.getLeadFormConfig().mode).toBe("live");
    const preview = await loadEnv({ VERCEL: "1", VERCEL_ENV: "preview", LEAD_FORM_MODE: "test" });
    expect(preview.getLeadFormConfig().mode).toBe("test");
  });

  it("allows test mode locally but never on the Vercel production deployment", async () => {
    const local = await loadEnv({
      VERCEL: undefined,
      VERCEL_ENV: undefined,
      LEAD_FORM_MODE: "test",
    });
    expect(local.getLeadFormConfig().mode).toBe("test");
    const production = await loadEnv({ ...keys, VERCEL_ENV: "production", LEAD_FORM_MODE: "test" });
    expect(production.getLeadFormConfig().mode).toBe("live");
  });

  it("refuses test mode on any indexable host, Vercel or not", async () => {
    const indexable = await loadEnv({
      VERCEL: undefined,
      VERCEL_ENV: undefined,
      SITE_INDEXABLE: "true",
      LEAD_FORM_MODE: "test",
    });
    expect(indexable.getLeadFormConfig().mode).not.toBe("test");
  });
});

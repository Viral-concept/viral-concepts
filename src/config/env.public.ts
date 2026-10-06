import { z } from "zod";

/**
 * Public (browser-safe) environment.
 *
 * Next.js only inlines NEXT_PUBLIC_* variables that are referenced literally, so each
 * one is read explicitly below — do not refactor this into a dynamic lookup.
 */

/** Canonical origin from the Company Profile (CP p.35). Canonical host is still to be confirmed. */
const DEFAULT_SITE_URL = "https://www.viralconcepts.co";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .url({ protocol: /^https?$/ })
    .transform((value) => value.replace(/\/+$/, ""))
    .default(DEFAULT_SITE_URL),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
});

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined,
});

if (!parsed.success) {
  // Fail the build loudly: a malformed public URL would poison every canonical tag.
  throw new Error(`Invalid public environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const publicEnv = parsed.data;

/** Absolute site origin without a trailing slash, e.g. "https://www.viralconcepts.co". */
export const siteUrl = publicEnv.NEXT_PUBLIC_SITE_URL;

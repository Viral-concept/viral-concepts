import "server-only";

import { z } from "zod";

import type { ContentMode } from "@/types/content";

/**
 * Server-only environment. Importing this file from a Client Component fails the build,
 * which keeps secrets out of browser bundles.
 */

/* -------------------------------------------------------------------------- */
/* Deployment context                                                          */
/* -------------------------------------------------------------------------- */

const deploymentSchema = z.object({
  /** Set automatically by Vercel. Undefined locally and on other hosts. */
  VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),
  /**
   * Opt-in for showing proposed/draft content with a visible banner (local review only).
   * Ignored on Vercel production deployments.
   */
  CONTENT_PREVIEW: z.enum(["true", "false"]).optional(),
  /**
   * Opt-in for search indexing on non-Vercel hosts. On Vercel, only the production
   * deployment is indexable.
   */
  SITE_INDEXABLE: z.enum(["true", "false"]).optional(),
});

const deployment = deploymentSchema.parse({
  VERCEL_ENV: process.env.VERCEL_ENV || undefined,
  CONTENT_PREVIEW: process.env.CONTENT_PREVIEW || undefined,
  SITE_INDEXABLE: process.env.SITE_INDEXABLE || undefined,
});

/**
 * Production is the safe default. Preview mode (unconfirmed content visible with a banner)
 * is only possible on Vercel preview deployments or with an explicit local opt-in, and is
 * impossible on the Vercel production deployment.
 */
export const contentMode: ContentMode =
  deployment.VERCEL_ENV === "production"
    ? "production"
    : deployment.VERCEL_ENV === "preview" || deployment.CONTENT_PREVIEW === "true"
      ? "preview"
      : "production";

/** Running on a Vercel deployment (Vercel Analytics is only served there). */
export const isVercel: boolean = deployment.VERCEL_ENV !== undefined;

/** Search engines may index this deployment. Previews and local builds are always noindex. */
export const isIndexable: boolean =
  contentMode === "production" &&
  (deployment.VERCEL_ENV === "production" ||
    (deployment.VERCEL_ENV === undefined && deployment.SITE_INDEXABLE === "true"));

/* -------------------------------------------------------------------------- */
/* Lead form secrets (validated lazily)                                        */
/* -------------------------------------------------------------------------- */

const emailList = z
  .string()
  .transform((value) =>
    value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.email()).min(1));

const leadFormEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  LEAD_TO_EMAIL: emailList,
  LEAD_FROM_EMAIL: z.string().min(3),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  /** Send the visitor a confirmation email (default on). */
  LEAD_AUTO_REPLY: z
    .enum(["true", "false"])
    .default("true")
    .transform((value) => value === "true"),
});

export type LeadFormEnv = z.infer<typeof leadFormEnvSchema>;

/**
 * How the lead form delivers in this deployment.
 * - live: Turnstile is verified with Cloudflare and email is sent through Resend.
 * - test: for local QA without network access or keys. The security check is skipped and the
 *   enquiry is logged (metadata only, never the visitor's details) instead of emailed.
 *   Allowed locally and on Vercel preview deployments only, and labelled on the page. It is
 *   the default for `npm run dev` when the keys are not set.
 * - disabled: keys are missing on a deployed site. The form still works: it hands the brief to
 *   the visitor's own email app, addressed to the company's published email (see LeadForm).
 */
export type LeadFormConfig =
  | { readonly mode: "live"; readonly env: LeadFormEnv }
  | { readonly mode: "test" }
  | { readonly mode: "disabled"; readonly missing: readonly string[] };

export function getLeadFormConfig(): LeadFormConfig {
  // On Vercel, only preview deployments may use test mode (VERCEL=1 is set even when the other
  // system variables are not exposed). The form also labels itself in test mode, and the
  // production audit (qa:leaks) fails on that label.
  const onVercel = process.env.VERCEL === "1" || deployment.VERCEL_ENV !== undefined;
  // Never on a deployment search engines may index (also covers non-Vercel hosts that opt in).
  const testAllowed = !isIndexable && (onVercel ? deployment.VERCEL_ENV === "preview" : true);
  if (process.env.LEAD_FORM_MODE === "test" && testAllowed) {
    return { mode: "test" };
  }

  const parsed = leadFormEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
    LEAD_TO_EMAIL: process.env.LEAD_TO_EMAIL || undefined,
    LEAD_FROM_EMAIL: process.env.LEAD_FROM_EMAIL || undefined,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY || undefined,
    LEAD_AUTO_REPLY: process.env.LEAD_AUTO_REPLY || undefined,
  });
  // The widget needs the public site key too; without it no visitor could pass the check.
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (parsed.success && siteKey) return { mode: "live", env: parsed.data };

  // Local development (`npm run dev`) without keys: show the working form in test mode, so the
  // contact page can be tried without Resend or Turnstile accounts. Never on Vercel.
  if (process.env.NODE_ENV === "development" && !onVercel && testAllowed) {
    return { mode: "test" };
  }

  const missing = [
    ...new Set([
      ...(parsed.success ? [] : parsed.error.issues.map((issue) => String(issue.path[0]))),
      ...(siteKey ? [] : ["NEXT_PUBLIC_TURNSTILE_SITE_KEY"]),
    ]),
  ];
  return { mode: "disabled", missing };
}

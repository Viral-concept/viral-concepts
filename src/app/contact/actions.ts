"use server";

import { randomUUID } from "node:crypto";

import { headers } from "next/headers";

import { siteUrl } from "@/config/env.public";
import { getLeadFormConfig, isIndexable } from "@/config/env.server";
import { getContactChannels } from "@/lib/content";
import { sendWithResend } from "@/lib/leads/email";
import { handleLead } from "@/lib/leads/handle-lead";
import { createRateLimiter } from "@/lib/leads/rate-limit";
import { getLeadServiceLabels } from "@/lib/leads/services";
import type { LeadFormState } from "@/lib/leads/state";
import { verifyTurnstile } from "@/lib/leads/turnstile";

/**
 * Lead form Server Action. Everything the browser sends is re-validated in `handleLead`;
 * secrets are read here on the server and never returned to the client.
 */

// Per-instance, best-effort limits (see rate-limit.ts). The Vercel Firewall rule is the real one.
const ipLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });
const emailLimiter = createRateLimiter({ limit: 3, windowMs: 60 * 60_000 });

async function clientIp(): Promise<string> {
  const list = await headers();
  // On Vercel, x-forwarded-for is set by the platform; the first entry is the client.
  return list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip") || "unknown";
}

export async function submitLead(
  _previous: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const config = getLeadFormConfig();
  const { phone } = getContactChannels();

  return handleLead(
    formData,
    {
      config,
      services: getLeadServiceLabels(),
      ip: await clientIp(),
      phoneDisplay: phone?.value.display,
      now: new Date(),
      // Previews run on changing *.vercel.app hosts; the live (indexable) site pins its domain.
      expectedHostname: isIndexable ? new URL(siteUrl).hostname : undefined,
    },
    {
      verifyTurnstile: (input) => verifyTurnstile(input),
      send: (message, key) =>
        config.mode === "live"
          ? sendWithResend(config.env.RESEND_API_KEY, message, key)
          : Promise.resolve({ ok: false }),
      ipLimiter,
      emailLimiter,
      randomId: randomUUID,
    },
  );
}

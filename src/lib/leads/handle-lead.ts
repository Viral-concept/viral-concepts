import "server-only";

import type { LeadFormConfig } from "@/config/env.server";
import { logger } from "@/lib/logger";

import { composeAutoReply, composeTeamEmail, type EmailMessage, type SendResult } from "./email";
import type { RateLimiter } from "./rate-limit";
import { HONEYPOT_FIELD, leadValuesFromFormData, parseLead, TURNSTILE_FIELD } from "./schema";
import type { LeadFormState } from "./state";
import type { TurnstileResult } from "./turnstile";

/**
 * The lead pipeline, independent of Next.js so every branch is unit-tested:
 *
 *   honeypot → validation → Turnstile → rate limit → email to the team → auto-reply
 *
 * Order matters: cheap checks first, and Cloudflare is only asked about submissions that are
 * otherwise valid. Logs carry outcomes only — never the visitor's name, email or message.
 */

export interface LeadContext {
  readonly config: LeadFormConfig;
  /** Service values offered on the form, with their display labels. */
  readonly services: ReadonlyMap<string, string>;
  readonly ip: string;
  readonly phoneDisplay?: string | undefined;
  readonly now: Date;
  /** On production, the Turnstile token must have been issued on this hostname. */
  readonly expectedHostname?: string | undefined;
}

export interface LeadDeps {
  readonly verifyTurnstile: (input: {
    secret: string;
    token: string | undefined;
    remoteIp?: string;
    expectedHostname?: string;
  }) => Promise<TurnstileResult>;
  readonly send: (message: EmailMessage, idempotencyKey: string) => Promise<SendResult>;
  readonly ipLimiter: RateLimiter;
  readonly emailLimiter: RateLimiter;
  readonly randomId: () => string;
}

const SCOPE = "lead-form";

const GENERIC_FAILURE =
  "Sorry, we couldn’t send your message just now. Please try again, or call or email us.";

export async function handleLead(
  formData: FormData,
  context: LeadContext,
  deps: LeadDeps,
): Promise<LeadFormState> {
  const values = leadValuesFromFormData(formData);

  if (context.config.mode === "disabled") {
    logger.error(SCOPE, "form not configured", { missing: context.config.missing.join(",") });
    return { status: "error", message: GENERIC_FAILURE, values };
  }

  // Bots fill every field. Pretend it worked so they learn nothing, and send nothing.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    logger.warn(SCOPE, "honeypot filled");
    return { status: "success", firstName: "", serviceLabel: "" };
  }

  const parsed = parseLead(values, [...context.services.keys()]);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
      values,
    };
  }
  const { lead } = parsed;

  if (context.config.mode === "live") {
    const tokenValue = formData.get(TURNSTILE_FIELD);
    const check = await deps.verifyTurnstile({
      secret: context.config.env.TURNSTILE_SECRET_KEY,
      token: typeof tokenValue === "string" ? tokenValue : undefined,
      remoteIp: context.ip,
      ...(context.expectedHostname ? { expectedHostname: context.expectedHostname } : {}),
    });
    if (!check.ok) {
      logger.warn(SCOPE, "turnstile failed", { reason: check.reason });
      return {
        status: "error",
        message:
          check.reason === "unreachable"
            ? GENERIC_FAILURE
            : "Please complete the security check and send again.",
        values,
      };
    }
  }

  // Limits count only valid, human-verified submissions: a visitor fixing typos is never locked
  // out, and a bot without a Turnstile token cannot use up a real client's allowance.
  if (!deps.ipLimiter.hit(context.ip)) {
    logger.warn(SCOPE, "rate limited", { by: "ip" });
    return {
      status: "error",
      message:
        "You’ve sent several messages in a short time. Please wait a few minutes, or call or email us.",
      values,
    };
  }
  if (!deps.emailLimiter.hit(lead.email)) {
    logger.warn(SCOPE, "rate limited", { by: "email" });
    return {
      status: "error",
      message:
        "We’ve already received several messages from this address. Please call or email us.",
      values,
    };
  }

  const serviceLabel = context.services.get(lead.service) ?? lead.service;
  const firstName = lead.name.split(/\s+/)[0] ?? lead.name;

  if (context.config.mode === "test") {
    logger.info(SCOPE, "test mode: enquiry accepted, not emailed", {
      service: lead.service,
      hasPhone: Boolean(lead.phone),
      messageLength: lead.message.length,
    });
    return { status: "success", firstName, serviceLabel };
  }

  const { env } = context.config;
  const id = deps.randomId();
  const team = composeTeamEmail(lead, serviceLabel, context.now, {
    from: env.LEAD_FROM_EMAIL,
    to: env.LEAD_TO_EMAIL,
  });
  const delivered = await deps.send(team, `lead-${id}`);
  if (!delivered.ok) {
    logger.error(SCOPE, "delivery failed", { status: delivered.status ?? null });
    return { status: "error", message: GENERIC_FAILURE, values };
  }

  if (env.LEAD_AUTO_REPLY) {
    const reply = composeAutoReply(lead, serviceLabel, {
      from: env.LEAD_FROM_EMAIL,
      phone: context.phoneDisplay,
    });
    const replied = await deps.send(reply, `lead-${id}-reply`);
    // The enquiry already reached the team, so a failed confirmation is not the visitor's problem.
    if (!replied.ok) logger.warn(SCOPE, "auto-reply failed", { status: replied.status ?? null });
  }

  logger.info(SCOPE, "enquiry delivered", { service: lead.service });
  return { status: "success", firstName, serviceLabel };
}

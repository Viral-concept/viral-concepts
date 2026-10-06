import "server-only";

import { brandColors } from "@/config/brand";

import { budgetLabel, type Lead } from "./schema";

/**
 * Lead emails, sent through the Resend REST API (https://resend.com/docs/api-reference).
 * Plain fetch keeps the dependency list short; the API key is read on the server only.
 *
 * Everything the visitor typed is escaped before it goes into HTML, and the visitor's address
 * is used as reply-to (never as the sender), so the team can answer with one click.
 */

export interface EmailMessage {
  readonly from: string;
  readonly to: readonly string[];
  readonly replyTo?: string;
  readonly subject: string;
  readonly text: string;
  readonly html: string;
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

const dubaiTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dubai",
  dateStyle: "medium",
  timeStyle: "short",
});

function formatEventDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, day)),
  );
}

function rows(lead: Lead, serviceLabel: string): [label: string, value: string][] {
  return [
    ["Name", lead.name],
    ["Company", lead.company ?? "—"],
    ["Email", lead.email],
    ["Phone", lead.phone ?? "—"],
    ["Service", serviceLabel],
    ["Budget", lead.budget ? budgetLabel(lead.budget) : "—"],
    ["Event or launch date", lead.eventDate ? formatEventDate(lead.eventDate) : "—"],
  ];
}

function htmlParagraphs(text: string): string {
  return escapeHtml(text).replace(/\r?\n/g, "<br>");
}

/** The enquiry as the Viral Concepts team receives it. */
export function composeTeamEmail(
  lead: Lead,
  serviceLabel: string,
  submittedAt: Date,
  { from, to }: { readonly from: string; readonly to: readonly string[] },
): EmailMessage {
  const details = rows(lead, serviceLabel);
  const when = dubaiTime.format(submittedAt);
  const subject = `New enquiry: ${serviceLabel} — ${lead.name}`;

  const text = [
    `New enquiry from the website (${when}, Dubai time)`,
    "",
    ...details.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    lead.message,
    "",
    "Reply to this email to answer the visitor directly.",
  ].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:${brandColors.ink}">
<p style="margin:0 0 16px">New enquiry from the website (${escapeHtml(when)}, Dubai time)</p>
<table cellpadding="6" style="border-collapse:collapse">
${details
  .map(
    ([label, value]) =>
      `<tr><td style="color:${brandColors.muted};vertical-align:top">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin:16px 0 4px;color:${brandColors.muted}">Message</p>
<p style="margin:0">${htmlParagraphs(lead.message)}</p>
<p style="margin:24px 0 0;color:${brandColors.muted};font-size:13px">Reply to this email to answer the visitor directly.</p>
</div>`;

  return { from, to, replyTo: lead.email, subject, text, html };
}

/**
 * Confirmation to the visitor. A fixed text: it echoes nothing the visitor typed (not even the
 * name), so the form cannot be used to send someone else a message from our domain. It states
 * only that the enquiry arrived — no promised timings.
 */
export function composeAutoReply(
  lead: Lead,
  serviceLabel: string,
  { from, phone }: { readonly from: string; readonly phone?: string | undefined },
): EmailMessage {
  const urgent = phone ? `If it’s urgent, call us on ${phone}.` : undefined;
  const subject = "We’ve received your enquiry — Viral Concepts";
  // serviceLabel comes from the site's own list of services, never from the visitor.
  const body = `Thank you for contacting Viral Concepts. We’ve received your enquiry about ${serviceLabel}, and our team will get back to you.`;

  const text = [
    "Hello,",
    "",
    body,
    ...(urgent ? ["", urgent] : []),
    "",
    "Viral Concepts, Dubai",
  ].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:${brandColors.ink}">
<p>Hello,</p>
<p>${escapeHtml(body)}</p>
${urgent ? `<p>${escapeHtml(urgent)}</p>` : ""}
<p style="margin:24px 0 0">Viral Concepts, Dubai</p>
</div>`;

  return { from, to: [lead.email], subject, text, html };
}

export type SendResult = { readonly ok: true } | { readonly ok: false; readonly status?: number };

export async function sendWithResend(
  apiKey: string,
  message: EmailMessage,
  idempotencyKey: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SendResult> {
  try {
    const response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: message.from,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok ? { ok: true } : { ok: false, status: response.status };
  } catch {
    return { ok: false };
  }
}

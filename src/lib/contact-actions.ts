import "server-only";

import type { CtaAction } from "@/components/sections/CtaBand";
import { getContactChannels } from "@/lib/content";

/** wa.me link for a WhatsApp number in E.164 form. */
export function whatsappHref(e164: string): string {
  return `https://wa.me/${e164.replace(/\D/g, "")}`;
}

/**
 * The secondary action next to "Start a Project": WhatsApp when a number is confirmed,
 * otherwise a call link, otherwise nothing. One rule for every page.
 */
export function getSecondaryContactAction(): CtaAction | undefined {
  const { phone, whatsapp } = getContactChannels();
  if (whatsapp)
    return { label: "WhatsApp us", href: whatsappHref(whatsapp.value.e164), icon: "chat" };
  if (phone) {
    return { label: `Call ${phone.value.display}`, href: `tel:${phone.value.e164}`, icon: "phone" };
  }
  return undefined;
}

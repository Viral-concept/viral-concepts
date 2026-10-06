import type { Governed, ServiceHighlight } from "@/types/content";

import { OWNER_APPROVED } from "./digital-services/approval";

/**
 * Copy for /digital-solutions (Discovery doc, section G). The heading is the homepage band's
 * line; the lead covers the full approved offering (marketing, web & apps, AI & automation).
 */
export const digitalLanding = {
  eyebrow: "Digital Solutions",
  title: "Take your brand beyond the physical world",
  lead: "Digital marketing, websites and apps, and AI & automation for businesses across the Gulf — planned, built and run by the Dubai team behind your events and branding.",
  services: {
    eyebrow: "What we offer",
    title: "Digital services",
    intro:
      "Websites, apps, search and social, from the same company that produces your events and branding.",
  },
  seo: {
    title: "Digital Marketing, Web & AI Solutions in Dubai",
    description:
      "SEO, social media, Google & Meta Ads, websites, apps, e-commerce and AI automation for Gulf businesses — from the Dubai team behind your events.",
  },
  /** Short positioning lines shown in the landing page's capability strip. */
  pillars: [
    { id: "marketing", label: "Be found", body: "SEO, social media and paid campaigns." },
    { id: "build", label: "Convert", body: "Websites, apps and online stores." },
    { id: "ai", label: "Scale", body: "AI agents and automated workflows." },
  ],
  cta: {
    title: "Ready to take your brand further online?",
    lead: "Tell us what you need — marketing, a website or app, or AI automation — and we’ll roll it out for you.",
  },
} as const;

/**
 * "Bridge" ideas linking physical activations to digital reach: capabilities, not past
 * results (Discovery doc, section G). Approved with the digital offering.
 */
export const digitalBridge = {
  ...OWNER_APPROVED,
  eyebrow: "Physical meets digital",
  title: "Where your events and your digital work connect",
  items: [
    {
      id: "event-microsites",
      title: "Event microsites",
      body: "A website for a single event or launch, carrying the same identity as the stand and the signage.",
    },
    {
      id: "qr-campaigns",
      title: "QR-driven campaigns",
      body: "Printed materials, flags and signage that lead people straight to a page, an offer or a form.",
    },
    {
      id: "event-social",
      title: "Social coverage of events",
      body: "Your event shared on your channels before, during and after the day.",
    },
  ],
} as const satisfies Governed & {
  readonly eyebrow: string;
  readonly title: string;
  readonly items: readonly ServiceHighlight[];
};

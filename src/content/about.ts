import type { Governed } from "@/types/content";

import { companyProfile } from "./sources";

/**
 * Copy for /about. Every statement restates the Company Profile on the cited pages.
 * Not used, because they are template-only (Discovery doc, sections M and N): the values list
 * (Excellence, Creativity, …), "11+ years", "across the region", the office stock photo, and
 * any team members.
 */

export interface Statement extends Governed {
  readonly id: string;
  readonly label: string;
  readonly text: string;
}

export const aboutContent = {
  hero: {
    eyebrow: "About Viral Concepts",
    title: "Your events and branding partner *since 2014.*",
    /** CP p.3, p.16. */
    lead: "From Viral Concepts Advertising LLC in 2014 to a one-stop shop for events and branding, with our own production house in Dubai.",
  },

  story: {
    eyebrow: "Our story",
    title: "Built to spread",
    /** CP p.3. */
    paragraphs: [
      "Viral Concepts began as Viral Concepts Advertising LLC in 2014. Today, Viral Concepts is a one-stop shop for events and branding in the Middle East, with a production house in Dubai providing design, print, branding, fabrication and décor.",
      "Over the years, the trust of our clients and partners has made us stronger, and the experience we have gained lets us offer a wide range of tailored, specialised services — and expert solutions and operational support for our clients’ events.",
      "Staying true to our name, Viral Concepts is built to spread within advertising and events. With our value-added services we are not only your branding partner but your event partner, providing everything you need under one roof.",
    ],
    /** CP p.16 (production house), p.35 (reach). */
    facts: [
      { label: "Production house", value: "Dubai" },
      { label: "Where we work", value: "UAE · KSA · Qatar" },
    ],
  },

  /**
   * CP p.4, in the profile's heading order. The website template swaps the two labels and adds
   * "across the region"; the profile wins (Discovery doc, section M). Labels to be confirmed by
   * the client with the rest of the copy (checklist #26).
   */
  purpose: [
    {
      id: "vision",
      label: "Our vision",
      text: "To be the trusted and preferred one-stop partner for advertising and event needs.",
      status: "live",
      verified: true,
      source: companyProfile(4),
    },
    {
      id: "mission",
      label: "Our mission",
      text: "To deliver creative, reliable and end-to-end advertising and event solutions through personalised, tailored and budget-friendly services. We focus on quality execution, timely delivery and seamless support.",
      status: "live",
      verified: true,
      source: companyProfile(4),
    },
  ] satisfies readonly Statement[],

  capabilities: {
    eyebrow: "What we do",
    title: "From flags and banners to fabrication and décor",
    intro: "A wide spectrum of tailored, specialised services, including:",
    /** CP p.3, in the profile's order. */
    items: [
      "Textile & flags printing",
      "Event brandings",
      "Banners",
      "Graphics",
      "Roll-up & pop-up stands",
      "Backdrops",
      "Foam & forex boards",
      "Signboards",
      "Indoor & outdoor brandings",
      "Fabrication",
      "AV equipment rentals",
      "Event décor",
    ],
  },

  seo: {
    /** Already contains the brand, so it is used without the site suffix. */
    title: "About Viral Concepts – Dubai Production House Since 2014",
    description:
      "From Viral Concepts Advertising LLC in 2014 to a one-stop events and branding partner with an in-house Dubai production facility.",
  },

  cta: {
    /** CP p.4. */
    title: "Got a business idea, an event or an exhibition?",
    lead: "We’ll roll it out for you.",
  },
} as const;

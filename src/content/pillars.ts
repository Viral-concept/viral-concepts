import type { Pillar } from "@/types/content";

/**
 * Homepage grouping of the service lines (Discovery doc, section C). Pillars are a
 * presentation layer only — URLs stay flat under /services and /digital-solutions.
 */
export const pillars = [
  {
    id: "events-experiences",
    title: "Events & Experiences",
    summary:
      "Event production, rentals, exhibitions, festive décor and event staffing, delivered by one team.",
  },
  {
    id: "branding-advertising",
    title: "Branding & Advertising",
    summary:
      "Large format and fabric printing, signage, flags, vehicle branding, gifts, activations and outdoor media.",
  },
  {
    id: "digital-technology",
    title: "Digital & Technology",
    summary: "Websites, applications, SEO and social media management.",
  },
] as const satisfies readonly Pillar[];

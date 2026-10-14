import type { Pillar } from "@/types/content";

/**
 * Homepage grouping of the service lines (Discovery doc, section C). Pillars are a
 * presentation layer only — URLs stay flat under /services.
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
] as const satisfies readonly Pillar[];

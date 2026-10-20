import type { Pillar } from "@/types/content";

/**
 * How services are grouped on the Services page and in the menus. Pillars are a presentation
 * layer only — every service URL stays flat under /services.
 */
export const pillars = [
  {
    id: "events-experiences",
    title: "Events & Production",
    summary:
      "Event production and fabrication, exhibitions, festive décor and brand activations, delivered by one team.",
  },
  {
    id: "event-rentals",
    title: "Event Rentals",
    summary:
      "Furniture, tents, fencing, barriers, AV, entertainment and staff — supplied, set up and collected.",
  },
  {
    id: "branding-advertising",
    title: "Branding & Print",
    summary:
      "Flags, fabric and large format printing, signage, vehicle branding and corporate gifts from our own print house.",
  },
] as const satisfies readonly Pillar[];

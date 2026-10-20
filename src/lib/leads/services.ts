import "server-only";

import { getServices } from "@/lib/content";

import { OTHER_SERVICE } from "./schema";

/** One option of the "What can we help with?" choice. */
export interface ServiceOption {
  readonly value: string;
  readonly label: string;
  readonly group: "Events" | "Branding & Print" | "Other";
}

/**
 * What the form offers in this deployment, in two groups that match the two ways into the
 * business: events, production and rentals, and branding & print. Every visible service is an
 * option. The Server Action validates against this same list, so a hidden or forged value can
 * never be chosen.
 */
export function getLeadServiceOptions(): ServiceOption[] {
  return [
    ...getServices("services").map((service) => ({
      value: service.slug,
      label: service.title,
      group:
        service.pillar === "branding-advertising"
          ? ("Branding & Print" as const)
          : ("Events" as const),
    })),
    { value: OTHER_SERVICE, label: "Something else / not sure yet", group: "Other" as const },
  ];
}

export function getLeadServiceLabels(): ReadonlyMap<string, string> {
  return new Map(getLeadServiceOptions().map((option) => [option.value, option.label]));
}

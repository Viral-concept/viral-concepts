import "server-only";

import { productCategories, productOptionValue } from "@/content/products";
import { getServices, getVisible } from "@/lib/content";

import { OTHER_SERVICE } from "./schema";

/** One option of the "What can we help with?" choice. */
export interface ServiceOption {
  readonly value: string;
  readonly label: string;
  readonly group: "Events" | "Branding & Print" | "Other";
}

const PRINT_SERVICE = "branding-printing";

/**
 * What the form offers in this deployment, in two groups that match the two ways into the
 * business: events & exhibitions (every visible event service line) and branding & print (each
 * product category, plus the branding & printing service for anything else). The Server Action
 * validates against this same list, so a hidden or forged value can never be chosen.
 */
export function getLeadServiceOptions(): ServiceOption[] {
  const services = getServices("services");
  const print = services.find((service) => service.slug === PRINT_SERVICE);
  return [
    ...services
      .filter((service) => service.slug !== PRINT_SERVICE)
      .map((service) => ({ value: service.slug, label: service.title, group: "Events" as const })),
    ...(print
      ? [
          ...getVisible(productCategories).map((category) => ({
            value: productOptionValue(category.id),
            label: category.title,
            group: "Branding & Print" as const,
          })),
          {
            value: print.slug,
            label: "Other branding & printing",
            group: "Branding & Print" as const,
          },
        ]
      : []),
    { value: OTHER_SERVICE, label: "Something else / not sure yet", group: "Other" as const },
  ];
}

export function getLeadServiceLabels(): ReadonlyMap<string, string> {
  return new Map(getLeadServiceOptions().map((option) => [option.value, option.label]));
}

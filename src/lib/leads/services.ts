import "server-only";

import { getServices } from "@/lib/content";

import { OTHER_SERVICE } from "./schema";

/** One option of the "What do you need?" select. */
export interface ServiceOption {
  readonly value: string;
  readonly label: string;
  readonly group: "Services" | "Digital Solutions" | "Other";
}

/**
 * Services the form offers in this deployment: every visible service plus "something else".
 * The Server Action validates against the same list, so a hidden service can never be chosen.
 */
export function getLeadServiceOptions(): ServiceOption[] {
  return [
    ...getServices("services").map((s) => ({
      value: s.slug,
      label: s.title,
      group: "Services" as const,
    })),
    ...getServices("digital-solutions").map((s) => ({
      value: s.slug,
      label: s.title,
      group: "Digital Solutions" as const,
    })),
    { value: OTHER_SERVICE, label: "Something else / not sure yet", group: "Other" as const },
  ];
}

export function getLeadServiceLabels(): ReadonlyMap<string, string> {
  return new Map(getLeadServiceOptions().map((option) => [option.value, option.label]));
}

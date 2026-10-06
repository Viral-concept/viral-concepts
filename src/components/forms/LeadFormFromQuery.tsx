"use client";

import { useSearchParams } from "next/navigation";

import { LeadForm, type LeadFormProps } from "./LeadForm";

/**
 * Pre-selects the service from `/contact?service=exhibitions` (every "Start a Project" link on
 * a service page uses it). Only values offered on the form are accepted.
 */
export function LeadFormFromQuery(props: Omit<LeadFormProps, "defaultService">) {
  const requested = useSearchParams().get("service");
  const known = props.services.some((option) => option.value === requested);
  return <LeadForm {...props} defaultService={known ? (requested ?? undefined) : undefined} />;
}

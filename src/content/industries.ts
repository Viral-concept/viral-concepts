import type { Industry } from "@/types/content";

import { companyProfile } from "./sources";

/**
 * Industries suggested by Company Profile imagery only (Discovery doc, section B).
 * A brand visible in a photo is not proof of a client relationship, so every industry is a
 * draft until the client validates it (checklist #24). The Industries page and nav item stay
 * hidden in production while none are publishable.
 */
export const industries = [
  {
    slug: "banking-finance",
    title: "Banking & Finance",
    summary: "Exhibition stands and career-fair production for banks.",
    status: "draft",
    verified: false,
    source: companyProfile(27),
  },
  {
    slug: "government",
    title: "Government",
    summary: "Forums, ceremonies and public events for government entities.",
    status: "draft",
    verified: false,
    source: companyProfile(29),
  },
  {
    slug: "automotive",
    title: "Automotive",
    summary: "Festive lighting and décor for car showrooms.",
    status: "draft",
    verified: false,
    source: companyProfile(24),
  },
  {
    slug: "sports",
    title: "Sports Events",
    summary: "Barrier branding, flags and fencing for races and sports events.",
    status: "draft",
    verified: false,
    source: companyProfile(25, 30),
  },
  {
    slug: "retail-malls",
    title: "Retail & Malls",
    summary: "Mall activations, seasonal décor and hoarding graphics.",
    status: "draft",
    verified: false,
    source: companyProfile(22, 30),
  },
] as const satisfies readonly Industry[];

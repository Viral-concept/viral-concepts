import type { Governed } from "@/types/content";

import { companyProfile, proposed } from "./sources";

/**
 * Page registry for pages whose existence depends on client input.
 *
 * Navigation, the footer, the sitemap and the page routes themselves all consult this registry
 * (through `isPageVisible` in src/lib/content.ts), so a page can never be linked while it is
 * missing its content. Core pages (home, services, digital solutions, contact) always exist and
 * are not listed. Projects and Industries are derived from their collections instead.
 */
export const pages = {
  /** Story, mission, vision and capabilities all come from the Company Profile (CP p.3–4). */
  about: {
    status: "live",
    verified: true,
    source: companyProfile(3, 4),
  },
  /** Needs a client-approved, web-optimised PDF (checklist #7). The supplied file is 19.8 MB. */
  companyProfile: {
    status: "draft",
    verified: false,
    source: companyProfile(1),
  },
  /** Requires the client's legal text or approval of a drafted policy (checklist #8). */
  privacyPolicy: {
    status: "draft",
    verified: false,
    source: proposed("Client legal text required (checklist #8)"),
  },
  terms: {
    status: "draft",
    verified: false,
    source: proposed("Client legal text required (checklist #8)"),
  },
} as const satisfies Record<string, Governed>;

export type PageKey = keyof typeof pages;

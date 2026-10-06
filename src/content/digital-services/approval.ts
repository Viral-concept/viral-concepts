import type { Governed } from "@/types/content";

import { ownerApproved } from "../sources";

/**
 * Publishing gate for the digital & AI offering.
 *
 * The Company Profile lists four digital services (CP p.23). The website owner briefed the
 * expanded offering — digital marketing, web & app development and AI & automation — and
 * approved it, with its page copy, for publication on 2026-10-06.
 *
 * Copy describes what each service is and how it is delivered. It claims no past results,
 * clients, rankings or numbers. To take an item off the site again, give it
 * `status: "proposed", verified: false, source: proposed("…")` instead of this gate.
 */
export const OWNER_APPROVED = {
  status: "live",
  verified: true,
  source: ownerApproved("2026-10-06", "Digital & AI offering approved by the website owner"),
} as const satisfies Governed;

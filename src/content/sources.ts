import type { ContentSource, IsoDate } from "@/types/content";

/** Cite the Company Profile PDF by page number(s). */
export function companyProfile(...pages: [number, ...number[]]): ContentSource {
  return { kind: "company-profile", pages };
}

/** Approved for publication by the website owner on the given date. */
export function ownerApproved(approvedOn: IsoDate, note?: string): ContentSource {
  return note === undefined
    ? { kind: "owner-approved", approvedOn }
    : { kind: "owner-approved", approvedOn, note };
}

/** A licensed Pexels photo: free for commercial use, no attribution required (pexels.com/license). */
export function pexels(
  pageUrl: `https://www.pexels.com/photo/${string}`,
  photographer: string,
): ContentSource {
  return { kind: "stock-photo", provider: "Pexels", pageUrl, photographer };
}

/** Our recommendation — not a company fact. Never publishable until approved. */
export function proposed(note?: string): ContentSource {
  return note === undefined ? { kind: "proposed" } : { kind: "proposed", note };
}

/** From the website template PDF. Kept only for traceability; never publishable. */
export function template(note?: string): ContentSource {
  return note === undefined ? { kind: "template" } : { kind: "template", note };
}

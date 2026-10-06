import type { Download, Fact } from "@/types/content";

import { media } from "./media";
import { companyProfile } from "./sources";

/**
 * /company-profile (Discovery doc, sections J and K).
 *
 * The supplied PDF is 19.8 MB, too heavy to offer as a download. A web-optimised version
 * (≤ 5 MB) must be approved by the client before it is published (checklist #7). Until then
 * `download` is null: the page stays hidden in production (see `pages.companyProfile`), and the
 * preview shows that the file is awaiting approval.
 *
 * To publish:
 *   1. Put the approved file at public/downloads/viral-concepts-company-profile.pdf.
 *   2. Fill `download` below (bytes and pages from the file) with a client-confirmed source.
 *   3. Set `pages.companyProfile` to live + verified. Tests check that the file exists, that its
 *      size matches, and that nothing unapproved sits in public/downloads.
 *
 * Never place an unapproved PDF in public/: everything there is served, linked or not.
 */
export const companyProfileDownload: Fact<Download> | null = null;

export const companyProfileContent = {
  eyebrow: "Company profile",
  title: "The Viral Concepts company profile",
  lead: "Our story, services, capabilities and selected work in one document — to read now or share with your team.",
  cover: media.companyProfileCover,
  /** What the profile covers, with its page ranges (CP table of contents, inferred from headings). */
  contents: [
    { title: "About us, vision and mission", pages: "2–4" },
    { title: "Our services at a glance", pages: "5–6" },
    { title: "Branding & printing, flags, signage and vehicle branding", pages: "7–15, 33" },
    { title: "Event production, rentals and entertainment", pages: "16–20" },
    { title: "Festive events & décor", pages: "21, 24" },
    { title: "Advertising & PR and digital marketing", pages: "22–23" },
    { title: "Events & exhibitions", pages: "25–26" },
    { title: "Selected work", pages: "27–32" },
    { title: "Our process to success", pages: "34" },
    { title: "Our reach and contact details", pages: "35" },
  ],
  source: companyProfile(1),
  seo: {
    title: "Company Profile (PDF)",
    description:
      "Download the Viral Concepts company profile: services, capabilities and selected work.",
  },
} as const;

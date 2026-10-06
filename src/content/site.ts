import type { Fact, SocialProfile } from "@/types/content";

import { companyProfile, proposed, template } from "./sources";

/**
 * Company-level facts. Values follow the approved Discovery & Architecture document:
 * where the Company Profile (CP) and the template conflict, the CP value is used and the
 * conflict is listed for client confirmation (document section M).
 */

export const site = {
  name: "Viral Concepts",

  /**
   * CP p.3: "Pioneering Viral Concepts Advertising LLC in 2014". Copy may state that history (it is
   * the CP's own sentence); what is unconfirmed is whether this is the legal entity today, so it
   * is not used as `legalName` (JSON-LD, legal pages) until the client confirms.
   */
  legalName: {
    value: "Viral Concepts Advertising LLC",
    status: "draft",
    verified: false,
    source: companyProfile(3),
  } satisfies Fact<string>,

  /** CP p.3: "today Viral Concepts Event Services is a One-Stop Shop…". */
  tradingName: {
    value: "Viral Concepts Event Services",
    status: "draft",
    verified: false,
    source: companyProfile(3),
  } satisfies Fact<string>,

  foundingYear: {
    value: 2014,
    status: "live",
    verified: true,
    source: companyProfile(3),
  } satisfies Fact<number>,

  /** Logo lockup tagline (CP p.1). */
  logoTagline: {
    value: "Built to Spread!",
    status: "live",
    verified: true,
    source: companyProfile(1),
  } satisfies Fact<string>,

  /** Proposed hero line from the brief/template. Needs client sign-off (checklist #9). */
  heroTagline: {
    value: "Built to Create. Built to Spread.",
    status: "proposed",
    verified: false,
    source: proposed("Brief and template wording; logo says 'Built to Spread!'"),
  } satisfies Fact<string>,

  /** Short description used for default metadata and the footer. Restates CP p.3. */
  description:
    "Dubai production house for events, exhibitions, branding, printing and fabrication since 2014, serving clients across the UAE, KSA and Qatar.",

  /** CP p.35: "Our reach: UAE-KSA-QATAR". ISO 3166-1 alpha-2 codes for schema.org. */
  reach: {
    value: [
      { code: "AE", name: "United Arab Emirates" },
      { code: "SA", name: "Saudi Arabia" },
      { code: "QA", name: "Qatar" },
    ],
    status: "live",
    verified: true,
    source: companyProfile(35),
  } satisfies Fact<readonly { readonly code: string; readonly name: string }[]>,

  contact: {
    /**
     * CP p.35. The template's contact page shows +971 55 406 9331 instead; the CP value is
     * the approved default until the client confirms (checklist #1).
     */
    phone: {
      value: { display: "+971 58 854 7620", e164: "+971588547620" },
      status: "live",
      verified: true,
      source: companyProfile(35),
    } satisfies Fact<{ readonly display: string; readonly e164: string }>,

    /** No WhatsApp number has been confirmed (checklist #2). The WhatsApp CTA stays hidden. */
    whatsapp: null as Fact<{ readonly display: string; readonly e164: string }> | null,

    /** CP p.35. Personal addresses from the template are not used (checklist #3). */
    email: {
      value: "desk@viralconcepts.co",
      status: "live",
      verified: true,
      source: companyProfile(35),
    } satisfies Fact<string>,

    /** Template only; the CP gives no address. Never publishable until confirmed (checklist #5). */
    address: {
      value: { locality: "Al Qusais", city: "Dubai", country: "AE" },
      status: "draft",
      verified: false,
      source: template("Template footer and contact page"),
    } satisfies Fact<{
      readonly locality: string;
      readonly city: string;
      readonly country: string;
    }>,

    /** Template only (checklist #14). */
    businessHours: {
      value: [
        { days: "Monday–Friday", hours: "08:00–18:00" },
        { days: "Saturday", hours: "09:00–15:00" },
        { days: "Sunday", hours: "Closed" },
      ],
      status: "draft",
      verified: false,
      source: template("Template contact page"),
    } satisfies Fact<readonly { readonly days: string; readonly hours: string }[]>,
  },

  /**
   * The CP shows Facebook, Instagram and LinkedIn icons but no URLs (checklist #16).
   * Profiles are added here once the client supplies the URLs.
   */
  socials: [] as readonly SocialProfile[],
} as const;

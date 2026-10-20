import type { Service } from "@/types/content";

import { workPhotos } from "../work-photos";
import { companyProfile } from "../sources";

/** Page copy restates CP p.3, 16, 21, 24. Hero photo: licensed stock that sets the scene (content/event-photos.ts). */
export const festiveMallDecor = {
  slug: "festive-mall-decor",
  vertical: "services",
  pillar: "events-experiences",
  title: "Festive & Mall Décor",
  summary:
    "Seasonal and themed décor for malls and venues — drapes, flags, flowers, balloons and lighting.",
  offerings: [
    {
      title: "Occasions",
      items: [
        "National Day",
        "Ramadan",
        "Eid",
        "Diwali",
        "Halloween",
        "Christmas",
        "New Year",
        "Theme-based décor",
      ],
    },
    {
      title: "Décor elements",
      items: ["Drapes", "Flags", "Flowers", "Balloons", "Lighting décor"],
    },
  ],
  relatedServiceSlugs: ["event-production-fabrication", "branding-printing", "advertising-pr"],
  seo: {
    title: "Festive & Mall Décor in Dubai",
    description:
      "Themed décor, lighting, drapes, flags and installations for malls and venues — Ramadan, Eid, National Day, Diwali and Christmas.",
    primaryKeyword: "mall decoration Dubai",
    secondaryKeywords: [
      "Ramadan decoration Dubai",
      "National Day decoration",
      "festive lighting UAE",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(21, 24),
  heroImage: workPhotos.showroomNationalDay,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(21, 24),
    intro: [
      "Make a lasting impression with premium event decoration — from drapes, flags, flowers and balloons to lighting décor. A brief can be as focused as festive lighting for a single façade or as broad as theming an entire venue.",
      "We create seasonal and theme-based décor for malls and venues, for National Day, Ramadan, Eid, Diwali, Halloween, Christmas and New Year. Printed and fabricated elements are produced in our Dubai production house, so every piece follows your theme.",
    ],
    highlights: [
      {
        id: "seasons",
        title: "Every season",
        body: "National Day, Ramadan, Eid, Diwali, Halloween, Christmas, New Year and themed décor.",
      },
      {
        id: "complete",
        title: "Complete décor",
        body: "Drapes, flags, flowers, balloons and lighting from one partner.",
      },
      {
        id: "made-in-dubai",
        title: "Made in Dubai",
        body: "Printed and fabricated elements produced in our own production house.",
      },
    ],
    cta: {
      title: "Planning seasonal décor?",
      lead: "Tell us the occasion and the space, and we’ll design the theme around it.",
    },
  },
} as const satisfies Service;

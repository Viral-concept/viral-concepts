import type { Service } from "@/types/content";

import { eventPhotos } from "../event-photos";
import { companyProfile } from "../sources";

/** Page copy restates CP p.7, 16, 17, 26. Hero photo: licensed stock that sets the scene (content/event-photos.ts). */
export const exhibitions = {
  slug: "exhibitions",
  vertical: "services",
  pillar: "events-experiences",
  title: "Exhibitions",
  summary:
    "Exhibition stands and kiosks designed, fabricated and set up — from shell scheme to double-decker.",
  offerings: [
    {
      title: "Stand formats",
      items: [
        "Designer exhibition stalls",
        "Shell scheme stalls",
        "Double-decker stands",
        "Portable exhibition stalls",
        "Fabricated kiosks",
        "Acrylic stands",
      ],
    },
    {
      title: "Scope",
      items: [
        "Stall design & setup",
        "Exhibition design & structure",
        "Production & fabrication",
        "AV setup",
        "Entertainment & event rentals",
      ],
    },
  ],
  relatedServiceSlugs: [
    "event-production-fabrication",
    "branding-printing",
    "event-rentals-entertainment",
  ],
  seo: {
    title: "Exhibition Stand Design & Build in Dubai",
    description:
      "Custom, shell-scheme, double-decker and portable exhibition stands, designed and fabricated in our Dubai production house.",
    primaryKeyword: "exhibition stand builder Dubai",
    h1: "Exhibition stands, designed and built in-house",
    secondaryKeywords: ["exhibition stand design", "shell scheme stand", "kiosk fabrication Dubai"],
  },
  status: "live",
  verified: true,
  source: companyProfile(17, 26),
  heroImage: eventPhotos.tradeShow,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(17, 26),
    intro: [
      "Whether you are taking a shell scheme space or planning a double-decker, we design, fabricate and set up exhibition stands for your brand — and look after the AV and rentals around them.",
      "Our exhibition scope covers stall design and setup, production and fabrication, AV setup, and entertainment and event rentals. Formats include designer stalls, shell scheme stalls, double-decker stands, portable stalls, fabricated kiosks and acrylic stands. Branding and printing are also available from our in-house large format printing facility.",
    ],
    highlights: [
      {
        id: "design-to-setup",
        title: "Design to setup",
        body: "Stall design, fabrication, AV setup and rentals handled by one team.",
      },
      {
        id: "formats",
        title: "Any stand format",
        body: "From shell scheme stalls and portable stalls to designer and double-decker stands.",
      },
      {
        id: "graphics",
        title: "Branding and printing",
        body: "Stand branding alongside our in-house large format printing services.",
      },
    ],
    cta: {
      title: "Taking part in an exhibition?",
      lead: "Send us the show, the space size and your goals — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

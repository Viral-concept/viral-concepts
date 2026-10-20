import type { Service } from "@/types/content";

import { eventPhotos } from "../event-photos";
import { companyProfile } from "../sources";

/** Page copy restates CP p.9, 22. Hero photo: licensed stock that sets the scene (content/event-photos.ts). */
export const advertisingPr = {
  slug: "advertising-pr",
  vertical: "services",
  pillar: "events-experiences",
  title: "Advertising & PR",
  summary:
    "Concepts, mall activations, promotions, staffing, logistics and outdoor media, managed end to end.",
  offerings: [
    {
      title: "Campaigns & activations",
      items: [
        "Ideation & concept building",
        "Periodic promotions",
        "Mall activations",
        "Production support",
        "Logistics & distribution",
      ],
    },
    {
      title: "Teams",
      items: [
        "Team sourcing & selection",
        "Training",
        "Team management & supervision",
        "Legal procedures",
      ],
    },
    {
      title: "Outdoor & large format media",
      items: [
        "Hoardings advertising",
        "Unipole advertising",
        "Wall & floor graphics",
        "Glass frosted graphics",
        "Event brandings",
      ],
    },
  ],
  relatedServiceSlugs: ["branding-printing", "festive-mall-decor", "event-rentals-entertainment"],
  seo: {
    title: "Advertising, Activations & PR in Dubai",
    description:
      "Concepts, mall activations, promotions, staffing, logistics and outdoor media — managed end to end by one team.",
    primaryKeyword: "mall activation Dubai",
    secondaryKeywords: [
      "brand activation UAE",
      "promotional staff Dubai",
      "hoarding advertising Dubai",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(9, 22),
  heroImage: eventPhotos.immersiveScreens,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(9, 22),
    intro: [
      "From the first idea to the last day of a campaign, we plan and run advertising and promotional activity on the ground — ideation and concept building, periodic promotions and mall activations.",
      "We source, select, train and supervise the teams behind your activation, take care of the legal procedures, logistics and distribution, and provide production support. Outdoor and large format media include hoardings, unipoles, wall and floor graphics and glass frosted graphics.",
    ],
    highlights: [
      {
        id: "concept",
        title: "Concept to activation",
        body: "Ideation and concept building, periodic promotions and mall activations.",
      },
      {
        id: "teams",
        title: "Teams managed for you",
        body: "Team sourcing and selection, training, management and supervision.",
      },
      {
        id: "outdoor",
        title: "Outdoor media",
        body: "Hoardings, unipoles, wall and floor graphics and glass frosted graphics.",
      },
    ],
    cta: {
      title: "Planning a promotion or activation?",
      lead: "Share the brief and we’ll build the concept, the team and the media around it.",
    },
  },
} as const satisfies Service;

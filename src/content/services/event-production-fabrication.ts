import type { Service } from "@/types/content";

import { eventPhotos } from "../event-photos";
import { companyProfile } from "../sources";

/** Page copy restates CP p.5, 16, 17, 25. Hero photo: licensed stock that sets the scene (content/event-photos.ts). */
export const eventProductionFabrication = {
  slug: "event-production-fabrication",
  vertical: "services",
  pillar: "events-experiences",
  title: "Event Production & Fabrication",
  summary:
    "Stages, trussing, AV, projection mapping and custom fabrication, built in our Dubai production house.",
  offerings: [
    {
      title: "Event types",
      items: [
        "Corporate events",
        "Live events",
        "Sports events",
        "Social events",
        "Kids events",
        "Bazaar nights",
      ],
    },
    {
      title: "Production",
      items: [
        "Stage design & trussing",
        "Audio visual setup",
        "3D mapping & projections",
        "Scaffolding",
        "Kiosks & display stands",
      ],
    },
  ],
  relatedServiceSlugs: ["event-rentals-entertainment", "exhibitions", "branding-printing"],
  seo: {
    title: "Event Production & Fabrication in Dubai",
    description:
      "Stages, trussing, AV, projection mapping and custom fabrication for corporate, sports, live and social events in Dubai and the UAE.",
    primaryKeyword: "event production company Dubai",
    secondaryKeywords: [
      "event fabrication Dubai",
      "stage and trussing Dubai",
      "3D projection mapping Dubai",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(5, 16, 17, 25),
  heroImage: eventPhotos.ledStage,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(5, 16, 17, 25),
    intro: [
      "Creative solutions are what make an event stand out. Our production team is built to deliver state-of-the-art event production within the timeline — from stage design and trussing to audio visual setup and 3D mapping and projections.",
      "Large format printing and fabrication happen in our own Dubai facility, backed by partner tie-ups, so stages, kiosks, display stands and branded structures are produced with consistent quality at competitive costs. We produce corporate, live, sports, social and kids events, as well as bazaar nights.",
    ],
    highlights: [
      {
        id: "in-house",
        title: "Produced in-house",
        body: "Fabrication and large format printing in our own facility keep quality and costs under control.",
      },
      {
        id: "timeline",
        title: "Within your timeline",
        body: "Our production team is built to deliver projects within the timeline.",
      },
      {
        id: "formats",
        title: "Every event format",
        body: "Corporate, live, sports, social and kids events, and bazaar nights.",
      },
    ],
    cta: { title: "Planning an event?", lead: "Share your brief and we’ll roll it out for you." },
  },
} as const satisfies Service;

import type { Service } from "@/types/content";

import { eventPhotos } from "../event-photos";
import { companyProfile } from "../sources";

/** Page copy restates CP p.17, 18, 19, 20. Hero photo: licensed stock that sets the scene (content/event-photos.ts). */
export const eventRentalsEntertainment = {
  slug: "event-rentals-entertainment",
  vertical: "services",
  pillar: "events-experiences",
  title: "Event Rentals & Entertainment",
  summary:
    "Tents, stages, AV, furniture, barriers, inflatables, climate control and event staff, supplied for your event.",
  offerings: [
    {
      title: "Structures & equipment",
      items: [
        "Audio visual equipment",
        "Stages",
        "Tents & Arabic tents",
        "Canopies",
        "Barriers",
        "Fences",
        "Portable ablutions",
        "Coolers & heaters",
      ],
    },
    {
      title: "Furniture & play",
      items: [
        "Tables & chairs",
        "Bean bags",
        "Kids area furniture",
        "Kids area fences",
        "Inflatables & bouncy castles",
        "Game booths",
      ],
    },
    {
      title: "Event staffing & entertainment",
      items: [
        "Event entertainment",
        "Emcees",
        "DJs",
        "Registration staff",
        "Hostesses",
        "Event support staff",
        "Skilled staff",
      ],
    },
  ],
  relatedServiceSlugs: ["event-production-fabrication", "exhibitions", "festive-mall-decor"],
  seo: {
    title: "Event Rentals, AV & Event Staff in Dubai",
    description:
      "Tents, canopies, stages, AV, barriers, furniture, inflatables, coolers and event staff — available to rent for events across the UAE.",
    primaryKeyword: "event rentals Dubai",
    secondaryKeywords: [
      "tent rental Dubai",
      "event barrier rental",
      "AV equipment rental Dubai",
      "event staff Dubai",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(17, 18, 19, 20),
  heroImage: eventPhotos.desertCamp,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(17, 18, 19, 20),
    intro: [
      "From tents and canopies to stages, furniture and climate control, we supply the equipment that turns a venue into an event space. Our rental range covers audio visual equipment, tents and Arabic tents, tables and chairs, bean bags, barriers and fences, portable ablutions, and coolers and heaters.",
      "For family and community events we also provide kids area furniture and fences, inflatables, bouncy castles and game booths — and the people to run the day, from emcees and DJs to registration staff, hostesses, event support staff and skilled staff.",
    ],
    highlights: [
      {
        id: "one-partner",
        title: "One rental partner",
        body: "Structures, furniture, AV, climate control and staffing from a single supplier.",
      },
      {
        id: "staff",
        title: "Staff for the day",
        body: "Emcees, DJs, hostesses, registration, event support and skilled staff.",
      },
      {
        id: "family",
        title: "Family-friendly options",
        body: "Kids area furniture and fences, inflatables, bouncy castles and game booths.",
      },
    ],
    cta: {
      title: "Need equipment or staff for an event?",
      lead: "Tell us the date, venue and guest numbers and we’ll put the list together.",
    },
  },
} as const satisfies Service;

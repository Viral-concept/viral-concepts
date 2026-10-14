import type { Faq } from "@/types/content";

import { companyProfile } from "./sources";

/**
 * FAQs restate Company Profile facts only. Operational policies (lead times, minimum orders,
 * pricing, payment terms) are not answered until the client provides them.
 * None promises prices, timings or results.
 */
export const faqs = [
  {
    id: "where-based",
    question: "Where is Viral Concepts based, and where do you work?",
    answer:
      "We run our production house in Dubai and deliver for clients across the UAE, Saudi Arabia and Qatar.",
    placements: ["home"],
    status: "live",
    verified: true,
    source: companyProfile(3, 35),
  },
  {
    id: "in-house-production",
    question: "Do you print and fabricate in-house?",
    answer:
      "Yes. We have an in-house large format printing and fabrication facility, with a large format digital print setup and a digital fabric print setup, supported by partner tie-ups.",
    placements: ["home", "service:branding-printing", "service:event-production-fabrication"],
    status: "live",
    verified: true,
    source: companyProfile(7, 16),
  },
  {
    id: "one-supplier",
    question: "Can one team handle branding, production and the event itself?",
    answer:
      "Yes. We cover design, printing, branding, fabrication, rentals, staffing and décor, so your event, exhibition or campaign can be delivered under one roof.",
    placements: ["home"],
    status: "live",
    verified: true,
    source: companyProfile(3, 18),
  },
  {
    id: "process",
    question: "How does a project with Viral Concepts work?",
    answer:
      "Our process has nine steps: coffee, analysis, design, proposal, approval, production, execution, delivery and post-sale service.",
    placements: ["home"],
    status: "live",
    verified: true,
    source: companyProfile(34),
  },
  {
    id: "exhibition-formats",
    question: "What types of exhibition stands do you build?",
    answer:
      "Designer stalls, shell scheme stalls, double-decker stands, portable stalls, fabricated kiosks and acrylic stands, including the AV setup and event rentals around them.",
    placements: ["service:exhibitions"],
    status: "live",
    verified: true,
    source: companyProfile(26),
  },
  {
    id: "event-types",
    question: "What kinds of events do you produce?",
    answer:
      "Corporate events, live events, sports events, social events, kids events and bazaar nights — with stage design and trussing, audio visual setup and 3D mapping and projections as each event needs.",
    placements: ["service:event-production-fabrication"],
    status: "live",
    verified: true,
    source: companyProfile(17, 25),
  },
  {
    id: "staff-and-equipment",
    question: "Can you provide event staff as well as equipment?",
    answer:
      "Yes. Alongside rentals we provide event entertainment, emcees, DJs, registration staff, hostesses, event support staff and skilled staff.",
    placements: ["service:event-rentals-entertainment"],
    status: "live",
    verified: true,
    source: companyProfile(18),
  },
  {
    id: "outdoor-rentals",
    question: "What can I rent for an outdoor event?",
    answer:
      "Tents and Arabic tents, canopies, stages, tables and chairs, bean bags, barriers and fences, portable ablutions, and coolers and heaters — plus kids area furniture, inflatables and game booths for family events.",
    placements: ["service:event-rentals-entertainment"],
    status: "live",
    verified: true,
    source: companyProfile(19, 20),
  },
  {
    id: "exhibition-setup",
    question: "Do you handle the setup at the venue?",
    answer:
      "Yes. Our exhibition scope includes stall design and setup, production and fabrication, AV setup, and entertainment and event rentals.",
    placements: ["service:exhibitions"],
    status: "live",
    verified: true,
    source: companyProfile(26),
  },
  {
    id: "festive-occasions",
    question: "Which occasions do you create décor for?",
    answer:
      "National Day, Ramadan, Eid, Diwali, Halloween, Christmas and New Year, as well as theme-based décor — using drapes, flags, flowers, balloons and lighting.",
    placements: ["service:festive-mall-decor"],
    status: "live",
    verified: true,
    source: companyProfile(21),
  },
  {
    id: "festive-printed-elements",
    question: "Are printed and fabricated décor pieces made in-house?",
    answer:
      "Yes. Printed and fabricated elements are produced in our Dubai production house, with its large format printing and fabrication facility.",
    placements: ["service:festive-mall-decor"],
    status: "live",
    verified: true,
    source: companyProfile(3, 16),
  },
  {
    id: "what-can-you-print",
    question: "What can you print and brand?",
    answer:
      "Everything from ID badges, invitations, stickers, brochures and business cards to banners, flags, backdrops, barrier and fence covers, signage, vehicle wraps, uniforms, caps, promotional gifts and large format billboards.",
    placements: ["service:branding-printing"],
    status: "live",
    verified: true,
    source: companyProfile(5, 7, 8, 10, 11, 12, 13, 14, 15, 33),
  },
  {
    id: "promotional-staff",
    question: "Do you provide staff for promotions and activations?",
    answer:
      "Yes. We handle team sourcing and selection, training, and team management and supervision, along with logistics, distribution and production support.",
    placements: ["service:advertising-pr"],
    status: "live",
    verified: true,
    source: companyProfile(22),
  },
  {
    id: "outdoor-media",
    question: "Which outdoor and large format media do you offer?",
    answer:
      "Hoardings advertising, unipole advertising, wall and floor graphics, glass frosted graphics and event brandings.",
    placements: ["service:advertising-pr"],
    status: "live",
    verified: true,
    source: companyProfile(9),
  },
] as const satisfies readonly Faq[];

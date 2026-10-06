import type { Governed, ImageAsset } from "@/types/content";

import { media } from "./media";
import { companyProfile } from "./sources";

/**
 * Homepage copy. Every statement restates the Company Profile (CP) on the cited pages; no
 * figures, clients or outcomes are added. Wording still needs client sign-off before launch
 * (checklist #26) — the facts behind it are already confirmed by the CP.
 */

export interface ProofPoint {
  readonly id: string;
  readonly label: string;
}

export interface FeaturedOffering extends Governed {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  /** Parent service page this card links to. */
  readonly serviceSlug: string;
  readonly image?: ImageAsset;
}

export interface Reason extends Governed {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export const homeContent = {
  hero: {
    eyebrow: "Events · Branding · Production · Advertising · Digital",
    /**
     * Headline lines. "Built to spread" is the logo tagline (CP p.1); the two lines before it
     * name the two divisions (events, CP p.6; digital, CP p.23). Wording: checklist #26.
     */
    headline: ["Live experiences.", "Digital momentum.", "Built to spread."],
    lead: "Events, exhibitions and branding — designed, printed and fabricated in our own Dubai production house — and the websites, apps and digital marketing that carry them further. Across the UAE, KSA and Qatar.",
    /** Ticker under the hero: service lines and specialities named in the Company Profile. */
    ticker: [
      "Event production",
      "Exhibition stands",
      "Stages & AV",
      "Large format printing",
      "Flags & banners",
      "Signage",
      "Festive & mall décor",
      "Event rentals",
      "Mall activations",
      "Websites & apps",
      "SEO & social media",
    ],
    /** The two divisions, each listing services from the Company Profile (CP p.6, p.23). */
    divisions: {
      events: {
        label: "Events & Production",
        summary: "We create experiences, not just events.",
        items: [
          "Event production",
          "Exhibitions",
          "Rentals & entertainment",
          "Festive décor",
          "Branding & printing",
        ],
      },
      digital: {
        label: "Digital Solutions",
        summary: "Websites, apps and marketing that keep the momentum going.",
        items: ["Websites", "Applications", "SEO", "Social media"],
      },
    },
    /** CP p.3 (2014), p.16 (in-house facility), p.35 (reach). */
    proofPoints: [
      { id: "since", label: "Since 2014" },
      { id: "in-house", label: "In-house print & fabrication" },
      { id: "reach", label: "UAE · KSA · Qatar" },
    ],
    image: media.barrierBrandingMall,
    secondaryImages: [media.exhibitionStandIlluminated, media.showroomFestiveLighting],
  },

  /** The events reel (featured offerings). Positioning line: checklist #26. */
  reel: {
    eyebrow: "Events & production",
    title: "We create experiences, not just events",
    intro:
      "From exhibition stands and stages to flags, signage and festive décor — designed, printed and fabricated in our Dubai production house.",
  },

  whoWeAre: {
    eyebrow: "Who we are",
    title: "Your events and branding partner, under one roof",
    /** CP p.3. */
    paragraphs: [
      "Viral Concepts began as Viral Concepts Advertising LLC in 2014. Today we are a one-stop shop for events and branding in the Middle East, with a production house in Dubai for design, print, branding, fabrication and décor.",
      "From textile and flag printing, banners and backdrops to signage, fabrication, AV rentals and event décor, we provide expert solutions and operational support for our clients’ events — all under one roof.",
    ],
    /** CP p.2: the approach line under the Riyadh skyline. */
    approach: ["Strategy", "Creative", "Innovation", "Production", "Reach"],
  },

  featuredOfferings: [
    {
      id: "exhibition-stands",
      title: "Exhibition stands",
      summary:
        "Designer, shell scheme, double-decker and portable stalls, designed and built in-house.",
      serviceSlug: "exhibitions",
      image: media.exhibitionStallDesigner,
      status: "live",
      verified: true,
      source: companyProfile(26),
    },
    {
      id: "barrier-branding",
      title: "Event & barrier branding",
      summary: "Barrier covers, fence branding and event brandings for races, venues and malls.",
      serviceSlug: "branding-printing",
      image: media.barrierBrandingMarathon,
      status: "live",
      verified: true,
      source: companyProfile(8, 9, 30),
    },
    {
      id: "stages-av",
      title: "Stages, trussing & AV",
      summary: "Stage design, trussing, audio visual equipment and 3D mapping and projections.",
      serviceSlug: "event-production-fabrication",
      image: media.avEquipmentSetup,
      status: "live",
      verified: true,
      source: companyProfile(17),
    },
    {
      id: "large-format",
      title: "Large format printing",
      summary:
        "Banners, backdrops, wall and floor graphics and billboards from our own print setup.",
      serviceSlug: "branding-printing",
      status: "live",
      verified: true,
      source: companyProfile(7, 9),
    },
    {
      id: "flags",
      title: "Flags",
      summary: "Blade, teardrop, L-shape, sail, wall-mounted, hoisting and festive flags.",
      serviceSlug: "branding-printing",
      status: "live",
      verified: true,
      source: companyProfile(11),
    },
    {
      id: "signage",
      title: "Signage",
      summary: "3D, acrylic, backlit and directional signage.",
      serviceSlug: "branding-printing",
      status: "live",
      verified: true,
      source: companyProfile(15),
    },
    {
      id: "festive-decor",
      title: "Festive & mall décor",
      summary: "National Day, Ramadan, Eid, Diwali, Christmas, New Year and theme-based décor.",
      serviceSlug: "festive-mall-decor",
      image: media.showroomFestiveLighting,
      status: "live",
      verified: true,
      source: companyProfile(21, 24),
    },
    {
      id: "event-rentals",
      title: "Event rentals",
      summary: "Tents, canopies, stages, furniture, barriers, inflatables, coolers and heaters.",
      serviceSlug: "event-rentals-entertainment",
      image: media.kidsOutdoorCinema,
      status: "live",
      verified: true,
      source: companyProfile(19, 20),
    },
  ] satisfies readonly FeaturedOffering[],

  reasons: [
    {
      id: "in-house",
      title: "In-house production",
      body: "Our own large format printing and fabrication facility, backed by partner tie-ups, means quality products and competitive costs.",
      status: "live",
      verified: true,
      source: companyProfile(16),
    },
    {
      id: "one-roof",
      title: "Everything under one roof",
      body: "Design, print, branding, fabrication, rentals, staffing and décor from a single partner for your event or campaign.",
      status: "live",
      verified: true,
      source: companyProfile(3, 18),
    },
    {
      id: "on-time",
      title: "Quality execution, on time",
      body: "Our production team is built to deliver projects within the timeline, with seamless support throughout.",
      status: "live",
      verified: true,
      source: companyProfile(4, 16),
    },
    {
      id: "tailored",
      title: "Tailored to your budget",
      body: "Personalised, tailored and budget-friendly solutions for every brief, large or small.",
      status: "live",
      verified: true,
      source: companyProfile(4, 7),
    },
  ] satisfies readonly Reason[],

  process: {
    eyebrow: "How we work",
    title: "Our process to success",
    intro: "Nine steps, from the first coffee to post-sale service.",
  },

  digital: {
    eyebrow: "Digital Solutions",
    title: "Take your brand beyond the physical world",
    /** CP p.23. */
    intro:
      "We offer complete digital marketing solutions for clients across the Gulf, including enterprise web solutions and mobility solutions.",
  },

  finalCta: {
    /** CP p.4: "Planning an Event? Or … participating in an Exhibition? We will roll it out for you!" */
    title: "Planning an event or taking part in an exhibition?",
    lead: "We’ll roll it out for you.",
  },
} as const;

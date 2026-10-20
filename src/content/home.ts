import type { Governed, ImageAsset } from "@/types/content";

import { eventPhotos } from "./event-photos";
import { workPhotos } from "./work-photos";
import { companyProfile, ownerApproved } from "./sources";

/**
 * Homepage copy for the events-first design. Facts restate the Company Profile (CP) on the cited
 * pages; no figures, clients or outcomes are added. Words wrapped in *asterisks* render as the
 * serif accent (see components/ui/Accent). Positioning lines were approved by the website
 * owner after the client's design review; wording still goes to the client with the rest of
 * the copy (checklist #26).
 */

export interface Reason extends Governed {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface HeroScene {
  readonly id: string;
  /** What kind of event the scene stands for (shown in the hero's scene index). */
  readonly label: string;
  readonly image: ImageAsset;
}

export interface ShowStep {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface ShowAct {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly image: ImageAsset;
  readonly steps: readonly ShowStep[];
}

/** One run of the manifesto: words, or a small inline photograph between them. */
export type ManifestoPart = string | { readonly image: ImageAsset };

const POSITIONING = ownerApproved("2026-10-07", "Events-first positioning (client design review)");

export const homeContent = {
  hero: {
    /** CP p.3 (production house, 2014). */
    eyebrow: "Events & branding production house · Dubai · Since 2014",
    /**
     * "A One-Stop Shop for all your Events & Branding needs … under one roof" (CP p.3). The
     * accented word is set in the serif.
     */
    headline: ["Events &", "*branding,*", "under one roof."],
    /** CP p.3, p.5–6 (service lines), p.16 (production house), p.35 (reach). */
    lead: "Corporate events, conferences, exhibitions and festive décor — and the flags, banners, signage and print that brand them. Designed, printed and built in our own Dubai production house, delivered across the UAE, KSA and Qatar.",
    /** The scenes the hero cycles through, one per kind of event. Photos: licensed stock. */
    /**
     * The three hero slides, in the order the client asked for: branded police barriers, flags,
     * tents. All three are the client's own photos (content/work-photos.ts).
     */
    scenes: [
      {
        id: "barriers",
        label: "Branded police barriers",
        image: workPhotos.brandedBarriersMarathon,
      },
      { id: "flags", label: "Flags", image: workPhotos.streetFlags },
      { id: "tents", label: "Tents", image: workPhotos.tentDusk },
    ] satisfies readonly HeroScene[],
    /** CP p.3, p.16, p.35. */
    credits: ["In-house design, print & fabrication", "UAE · KSA · Qatar"],
    source: POSITIONING,
  },

  /** The opening statement, read as you scroll (CP p.3, p.16). */
  manifesto: {
    eyebrow: "Who we are",
    parts: [
      "Since *2014* we have turned briefs into",
      { image: eventPhotos.galaHall },
      "events people *remember* and brands people notice — conferences, exhibitions, flags, signage",
      { image: eventPhotos.ramadanLanterns },
      "and festive décor, designed, printed and built in our own",
      { image: eventPhotos.welding },
      "Dubai production house.",
    ] satisfies readonly ManifestoPart[],
    /** CP p.3. */
    body: "Viral Concepts began as Viral Concepts Advertising LLC in 2014. Today we are a one-stop shop for events and branding in the Middle East — your event partner as well as your branding partner, with everything you need under one roof.",
  },

  /** The two ways into the business (CP p.3: "not only your branding partner but your Event partner"). */
  doors: {
    eyebrow: "How can we help?",
    title: "Two ways in. *One team* behind both.",
    events: {
      eyebrow: "Events & exhibitions",
      title: "Plan an *event*",
      body: "Corporate events, conferences, exhibition stands, activations and festive décor — concept, build, equipment and people, delivered as one project.",
    },
    print: {
      eyebrow: "Branding & print",
      title: "Order *branding*",
      body: "Flags, banners, backdrops, signage, large format, fabric, vehicle branding, print and gifts — produced in our own Dubai workshop.",
    },
  },

  productsPreview: {
    eyebrow: "Branding & print",
    title: "Printed, fabricated, *installed.*",
    intro:
      "No matter how large or small the job, we transform your key messages into visuals that speak to your audience.",
  },

  experiences: {
    eyebrow: "What we create",
    title: "Six kinds of *experience.* One production house.",
    intro:
      "Pick the occasion — we bring the concept, the build, the equipment and the people to run it.",
  },

  /** "Our Process to Success" (CP p.34), told as a show in five acts. */
  runOfShow: {
    eyebrow: "How a show comes together",
    title: "From first coffee to *final applause.*",
    intro:
      "The nine steps we follow on every brief, large or small — with one team accountable from start to finish.",
    acts: [
      {
        id: "imagine",
        label: "Act I",
        title: "Imagine",
        image: eventPhotos.planningTable,
        steps: [
          {
            id: "coffee",
            title: "Coffee",
            body: "We talk through your brief, in person or online.",
          },
          {
            id: "analysis",
            title: "Analysis",
            body: "We look at the scope, the audience and your goals.",
          },
          {
            id: "design",
            title: "Design",
            body: "We shape the concept, the visuals and the plan.",
          },
        ],
      },
      {
        id: "agree",
        label: "Act II",
        title: "Agree",
        image: eventPhotos.drawingsReview,
        steps: [
          {
            id: "proposal",
            title: "Proposal",
            body: "You receive a clear scope, design and budget to review.",
          },
          {
            id: "approval",
            title: "Approval",
            body: "You sign off, and the production schedule is locked.",
          },
        ],
      },
      {
        id: "build",
        label: "Act III",
        title: "Build",
        image: eventPhotos.welding,
        steps: [
          {
            id: "production",
            title: "Production",
            body: "Printing and fabrication in our own Dubai production house.",
          },
        ],
      },
      {
        id: "showtime",
        label: "Act IV",
        title: "Showtime",
        image: eventPhotos.soundDesk,
        steps: [
          {
            id: "execution",
            title: "Execution",
            body: "Our team installs and runs the setup on site.",
          },
          {
            id: "delivery",
            title: "Delivery",
            body: "Quality execution and timely delivery, ready for your guests.",
          },
        ],
      },
      {
        id: "encore",
        label: "Encore",
        title: "After the show",
        image: eventPhotos.applause,
        steps: [
          {
            id: "post-sale-service",
            title: "Post-Sale Service",
            body: "We stay in touch after the event, with follow-up and support.",
          },
        ],
      },
    ] satisfies readonly ShowAct[],
  },

  /** The in-house facility (CP p.16) and what it makes (CP p.3, p.7–17). */
  productionHouse: {
    eyebrow: "The production house",
    title: "Made in *our own* Dubai workshop.",
    body: "Our own large format printing and fabrication facility, backed by partner tie-ups, means quality products at competitive costs — and no hand-offs between the people who design your event and the people who build it.",
    verbs: ["Design", "Print", "Fabricate", "Install", "Run"],
    images: [eventPhotos.fabricPrinter, eventPhotos.cncRouter, eventPhotos.ledInstall],
    source: companyProfile(3, 16),
  },

  /** Kept for /about: the approach line under the Riyadh skyline (CP p.2). */
  whoWeAre: {
    approach: ["Strategy", "Creative", "Innovation", "Production", "Reach"],
  },

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

  finalCta: {
    /** CP p.4: "Planning an Event? Or … participating in an Exhibition? We will roll it out for you!" */
    title: "Planning an event or taking part in an exhibition?",
    lead: "We’ll roll it out for you.",
    picker: "What are you planning?",
    image: eventPhotos.emptyStage,
  },
} as const;

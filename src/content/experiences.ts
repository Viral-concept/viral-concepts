import type { Governed, ImageAsset } from "@/types/content";

import { eventPhotos } from "./event-photos";
import { ownerApproved } from "./sources";

/**
 * The kinds of event Viral Concepts creates — the heart of the events-first design (homepage
 * index, /services, the closing "what are you planning?" picker).
 *
 * Positioning approved by the website owner after the client's design review (events first,
 * branding & print alongside). Every capability named here restates the Company Profile: event types and
 * production (CP p.5, 16–17, 25), rentals and staffing (p.18–20), exhibitions (p.26),
 * activations (p.22) and festive décor (p.21, 24). No clients, venues or results are implied;
 * photos are licensed stock that sets the scene (content/event-photos.ts).
 */
export interface Experience extends Governed {
  readonly id: string;
  /** Short name used in lists and the enquiry picker. */
  readonly title: string;
  /** One sentence on what the experience involves. */
  readonly summary: string;
  /** Four things we deliver for it, from the Company Profile's service lists. */
  readonly includes: readonly string[];
  /** The service page that covers it. */
  readonly serviceSlug: string;
  readonly image: ImageAsset;
}

const POSITIONING = ownerApproved(
  "2026-10-07",
  "Events-first positioning after the client's design review; restates CP service lists",
);

export const experiences = [
  {
    id: "corporate-events",
    title: "Corporate events & gala nights",
    summary:
      "Corporate gatherings, brand events and celebrations — staged, lit and run with stage design, trussing, AV and 3D projections produced in-house.",
    includes: [
      "Stage design & trussing",
      "Audio visual setup",
      "3D mapping & projections",
      "Event décor",
    ],
    serviceSlug: "event-production-fabrication",
    image: eventPhotos.galaHall,
    status: "live",
    verified: true,
    source: POSITIONING,
  },
  {
    id: "conferences",
    title: "Conferences & forums",
    summary:
      "Conferences, forums and career fairs with the stage, the screens, the registration and the branding that keep a big day on schedule.",
    includes: [
      "Stages & AV",
      "Registration & hostesses",
      "Backdrops & entrance arches",
      "Flags & signage",
    ],
    serviceSlug: "event-production-fabrication",
    image: eventPhotos.conferenceAudience,
    status: "live",
    verified: true,
    source: POSITIONING,
  },
  {
    id: "exhibitions",
    title: "Exhibitions & stands",
    summary:
      "Designer, shell scheme, double-decker and portable stands — designed, fabricated and set up by our own team, with the AV and rentals around them.",
    includes: [
      "Stand design & setup",
      "Double-decker stands",
      "Fabricated kiosks",
      "AV & event rentals",
    ],
    serviceSlug: "exhibitions",
    image: eventPhotos.tradeShow,
    status: "live",
    verified: true,
    source: POSITIONING,
  },
  {
    id: "brand-activations",
    title: "Brand activations & promotions",
    summary:
      "Mall activations and promotions from the first idea to the last shift — the concept, the build, the team on the floor and the paperwork behind it.",
    includes: [
      "Ideation & concepts",
      "Mall activations",
      "Promotion teams",
      "Logistics & legal procedures",
    ],
    serviceSlug: "advertising-pr",
    image: eventPhotos.immersiveScreens,
    status: "live",
    verified: true,
    source: POSITIONING,
  },
  {
    id: "festive-decor",
    title: "Festive & seasonal décor",
    summary:
      "National Day, Ramadan, Eid, Diwali, Christmas and New Year — themed décor and lighting for malls, showrooms and venues.",
    includes: ["Theme-based décor", "Lighting décor", "Drapes & flags", "Flowers & balloons"],
    serviceSlug: "festive-mall-decor",
    image: eventPhotos.ramadanLanterns,
    status: "live",
    verified: true,
    source: POSITIONING,
  },
  {
    id: "live-community",
    title: "Live, sports & family events",
    summary:
      "Live shows, races, bazaar nights and kids events — with the tents, barriers, stages, inflatables, climate control and people to run them.",
    includes: [
      "Tents & Arabic tents",
      "Barriers & fencing",
      "Inflatables & kids areas",
      "Emcees, DJs & event staff",
    ],
    serviceSlug: "event-rentals-entertainment",
    image: eventPhotos.concertAerial,
    status: "live",
    verified: true,
    source: POSITIONING,
  },
] as const satisfies readonly Experience[];

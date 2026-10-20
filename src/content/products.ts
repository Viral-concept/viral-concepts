import type { Governed, ImageAsset } from "@/types/content";

import { eventPhotos } from "./event-photos";
import { companyProfile } from "./sources";
import { workPhotos } from "./work-photos";

/**
 * The branding & print catalogue: everything the production house prints and makes, grouped
 * the way buyers search for it. Every item is named in the Company Profile (pages cited per
 * category). No prices, sizes, minimum orders or turnaround times are published until the
 * client supplies them; each category asks for a quote instead.
 *
 * Photos are licensed stock that shows the kind of product (content/event-photos.ts), never
 * presented as the company's own jobs.
 */
export interface ProductCategory extends Governed {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly items: readonly string[];
  readonly image: ImageAsset;
  /** The service page that covers this category (and the enquiry option it pre-selects). */
  readonly serviceSlug: string;
}

export const productCategories = [
  {
    id: "flags",
    title: "Flags & flag poles",
    summary:
      "Printed flags for events, venues, forecourts and festive seasons — with the poles and bases to fly them.",
    items: [
      "Blade flags",
      "Teardrop flags",
      "L-shape flags",
      "Sail flags",
      "Curve top flags",
      "Wall mounted flags",
      "Hoisting flags",
      "Festive flags",
      "Flag poles",
    ],
    image: workPhotos.featherFlags,
    serviceSlug: "flags",
    status: "live",
    verified: true,
    source: companyProfile(5, 11),
  },
  {
    id: "banners",
    title: "Banners, roll-ups & pop-ups",
    summary: "Portable, fast-to-set-up banners for stands, lobbies, launches and roadshows.",
    items: [
      "Roll-up banners",
      "X-banners",
      "Pop-up stands",
      "Fabric pop-ups",
      "Hanging banners",
      "Fence banners",
      "Barrier banners",
    ],
    image: eventPhotos.blankBanner,
    serviceSlug: "print-solutions",
    status: "live",
    verified: true,
    source: companyProfile(5, 8, 12, 13),
  },
  {
    id: "backdrops",
    title: "Backdrops & display stands",
    summary:
      "Stage, photo-wall and press backdrops, and the displays that put products in front of people.",
    items: [
      "Fabric backdrops",
      "Wooden backdrops",
      "Pop-up backdrops",
      "Promotional display stands",
      "Acrylic stands",
      "Kiosks",
    ],
    image: eventPhotos.printRolls,
    serviceSlug: "print-solutions",
    status: "live",
    verified: true,
    source: companyProfile(5, 12, 17, 26),
  },
  {
    id: "signage",
    title: "Signage",
    summary: "Indoor and outdoor signs that guide, brand and light up a space.",
    items: [
      "3D signage",
      "Acrylic signage",
      "Backlit signage",
      "Directional signage",
      "Signboards",
    ],
    image: workPhotos.lightBoxEntrance,
    serviceSlug: "signage",
    status: "live",
    verified: true,
    source: companyProfile(5, 15),
  },
  {
    id: "large-format",
    title: "Large format & wall graphics",
    summary:
      "Big-surface branding printed on our own large format setup — from a shop window to a building hoarding.",
    items: [
      "Wall & floor graphics",
      "Hoardings",
      "Unipoles & billboards",
      "Glass frosted graphics",
      "Forex & foam boards",
      "Corrugated sheets",
      "Cut-outs",
    ],
    image: eventPhotos.fabricPrinter,
    serviceSlug: "print-solutions",
    status: "live",
    verified: true,
    source: companyProfile(5, 7, 9),
  },
  {
    id: "fabric",
    title: "Fabric solutions",
    summary:
      "Digital fabric printing for events outdoors and in — covers, fences, tents and canvas.",
    items: [
      "Barrier cover branding",
      "Fence branding",
      "Advertising tents",
      "Canvas printing",
      "Fabric printing",
    ],
    image: workPhotos.fenceCoversWhite,
    serviceSlug: "fabric-printing",
    status: "live",
    verified: true,
    source: companyProfile(7, 8),
  },
  {
    id: "vehicle",
    title: "Vehicle branding",
    summary: "Car wrapping and vehicle graphics that keep your brand moving around the city.",
    items: ["Car wrapping", "Vehicle branding", "Advertising graphics"],
    image: eventPhotos.carWrap,
    serviceSlug: "print-solutions",
    status: "live",
    verified: true,
    source: companyProfile(5, 7, 14),
  },
  {
    id: "print",
    title: "Print & stationery",
    summary: "Offset and digital print for the paper side of a brand and an event.",
    items: [
      "Business cards",
      "Brochures",
      "Catalogues",
      "Invitations",
      "ID badges",
      "Stickers",
      "Offset & digital printing",
    ],
    image: eventPhotos.printedStacks,
    serviceSlug: "print-solutions",
    status: "live",
    verified: true,
    source: companyProfile(5, 7),
  },
  {
    id: "apparel-gifts",
    title: "Apparel, gifts & giveaways",
    summary: "Branded uniforms, t-shirts, caps and corporate gifts, printed or embroidered.",
    items: [
      "Uniforms",
      "T-shirts & caps",
      "Embroidery",
      "Screen printing",
      "DTF / DTG printing",
      "Heat transfer & sublimation",
      "Promotional gifts & giveaways",
    ],
    image: workPhotos.giftSetBlue,
    serviceSlug: "corporate-gifts",
    status: "live",
    verified: true,
    source: companyProfile(7, 8, 10),
  },
] as const satisfies readonly ProductCategory[];

export const productsLanding = {
  eyebrow: "Branding & print",
  title: "Everything your brand *needs printed.*",
  /** CP p.7. */
  lead: "From ID badges, invitations and stickers to retail signage, car wrapping and large format billboards — printed and fabricated in our own Dubai production house, for jobs of every size.",
  seo: {
    title: "Printing, Flags, Signage & Branding in Dubai",
    description:
      "Flags, roll-ups, backdrops, signage, large format, fabric and vehicle branding, print and corporate gifts — produced in-house in Dubai.",
  },
  cta: {
    title: "Need something printed or branded?",
    lead: "Send the product, quantity and date — we’ll come back with a quote.",
  },
} as const;

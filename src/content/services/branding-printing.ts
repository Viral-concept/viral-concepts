import type { Service } from "@/types/content";

import { workPhotos } from "../work-photos";
import { companyProfile } from "../sources";

/** Page copy restates CP p.7, 8, 9, 10, 11, 12, 13, 14, 15. Hero photo: licensed stock that sets the scene (content/event-photos.ts). */
export const brandingPrinting = {
  slug: "branding-printing",
  vertical: "services",
  pillar: "branding-advertising",
  title: "Branding & Printing",
  summary:
    "In-house large format and digital fabric printing — from ID badges and banners to billboards and vehicle wraps.",
  offerings: [
    {
      title: "Printing",
      items: [
        "Large format printing",
        "Fabric printing",
        "Screen printing",
        "DTF / DTG printing",
        "Heat transfer & sublimation printing",
        "Embroidery",
        "Offset & digital printing",
      ],
    },
    {
      title: "Fabric solutions",
      items: [
        "Barrier cover branding",
        "Fence branding",
        "Fabric pop-ups",
        "Fabric backdrops",
        "Advertising tents",
        "Canvas",
        "Uniforms, T-shirts & caps",
      ],
    },
    {
      title: "Flags",
      items: [
        "L-shape flags",
        "Blade flags",
        "Teardrop flags",
        "Wall-mounted flags",
        "Curve-top flags",
        "Hoisting flags",
        "Sail flags",
        "Festive flags",
      ],
    },
    {
      title: "Banners, backdrops & displays",
      items: [
        "Roll-up banners",
        "X-banners",
        "Fence banners",
        "Barrier banners",
        "Wooden backdrops",
        "Pop-up displays",
      ],
    },
    {
      title: "Signage & vehicles",
      items: [
        "3D signage",
        "Acrylic signage",
        "Backlit signage",
        "Directional signage",
        "Vehicle branding",
      ],
    },
    {
      title: "Materials & print collateral",
      items: [
        "Forex sheets",
        "Foam board",
        "Acrylic",
        "Corrugated sheets",
        "Brochures & catalogues",
        "Business cards",
      ],
    },
    {
      title: "Gifts",
      items: ["Promotional gifts & giveaways"],
    },
  ],
  relatedServiceSlugs: ["flags", "fabric-printing", "print-solutions"],
  seo: {
    title: "Printing & Branding in Dubai — Large Format, Fabric, Signage",
    description:
      "In-house large format and fabric printing: banners, flags, backdrops, signage, vehicle wraps, uniforms and giveaways.",
    primaryKeyword: "printing and branding Dubai",
    secondaryKeywords: [
      "large format printing Dubai",
      "flag printing Dubai",
      "signage Dubai",
      "vehicle branding Dubai",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 33),
  heroImage: workPhotos.flagsSunset,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 33),
    intro: [
      "No matter how large or small the job, we transform your key messages into creative visuals that speak to your audience.",
      "From ID badges, invitations and stickers to retail signage, car wrapping, indoor and outdoor graphics and large format billboards, our large format digital print setup and digital fabric print setup cover it all. Need a logo printed on a product, or complete event branding from print to fabrication? We’ll be there at every step of the way.",
    ],
    highlights: [
      {
        id: "in-house",
        title: "Large format and fabric, in-house",
        body: "Our own large format digital print setup and digital fabric print setup.",
      },
      {
        id: "any-size",
        title: "Projects of every size",
        body: "We run projects of all sizes, with the finest quality and outstanding turnaround.",
      },
      {
        id: "print-to-fabrication",
        title: "Print to fabrication",
        body: "Complete event branding, from printed graphics to fabricated structures.",
      },
    ],
    cta: {
      title: "Need something printed or branded?",
      lead: "Tell us what, how many and by when — we’ll take it from there.",
    },
  },
} as const satisfies Service;

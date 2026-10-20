import type { Service } from "@/types/content";

import { eventPhotos } from "../event-photos";
import { companyProfile } from "../sources";
import { workPhotos } from "../work-photos";

/**
 * Dedicated branding & print service pages requested by the client (October 2026 feedback).
 * Each one restates a Branding & Printing section of the Company Profile: flags (CP p.11),
 * fabric solutions (p.7–8), large format and print solutions (p.5, 7, 9, 12–14), signage
 * (p.15) and gifts & giveaways (p.10). Photos are the client's own where supplied.
 */

export const flags = {
  slug: "flags",
  vertical: "services",
  pillar: "branding-advertising",
  title: "Flags",
  summary:
    "Blade, teardrop, L-shape, sail, wall-mounted, hoisting and festive flags — printed in-house, with poles and bases.",
  offerings: [
    {
      title: "Flag types",
      items: [
        "Blade flags",
        "Teardrop flags",
        "L-shape flags",
        "Sail flags",
        "Curve top flags",
        "Wall mounted flags",
        "Hoisting flags",
        "Festive flags",
      ],
    },
    { title: "Hardware", items: ["Flag poles", "Ground & water bases", "Street pole fittings"] },
  ],
  relatedServiceSlugs: ["fabric-printing", "police-barrier-rental", "print-solutions"],
  seo: {
    title: "Flag Printing in Dubai — Blade, Teardrop & Street Flags",
    description:
      "Blade, teardrop, L-shape, sail, wall-mounted, hoisting and festive flags printed in our Dubai print house, with poles and bases.",
    primaryKeyword: "flag printing Dubai",
    secondaryKeywords: ["feather flags Dubai", "teardrop flags UAE", "street pole flags"],
  },
  status: "live",
  verified: true,
  source: companyProfile(5, 11),
  heroImage: workPhotos.streetFlags,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(5, 11),
    intro: [
      "Flags are the fastest way to dress a road, a forecourt or an event site. We print and supply every common format — blade, teardrop, L-shape, sail and curve top flags for events and retail, wall-mounted and hoisting flags for buildings, and festive flags for National Day and seasonal campaigns.",
      "Flags are printed on fabric in our own production house and delivered with the poles, bases or street-pole fittings they need, and our team can install long flag lines along routes and avenues.",
    ],
    highlights: [
      {
        id: "formats",
        title: "Every flag format",
        body: "Blade, teardrop, L-shape, sail, curve top, wall-mounted, hoisting and festive flags.",
      },
      {
        id: "printed",
        title: "Printed in-house",
        body: "Digital fabric printing in our own facility for consistent colour across a full run.",
      },
      {
        id: "installed",
        title: "Poles and installation",
        body: "Supplied with poles and bases, and installed along routes when you need it.",
      },
    ],
    cta: {
      title: "Need flags for an event or campaign?",
      lead: "Send the flag type, quantity and artwork — we’ll quote the print and the hardware.",
    },
  },
} as const satisfies Service;

export const fabricPrinting = {
  slug: "fabric-printing",
  vertical: "services",
  pillar: "branding-advertising",
  title: "Fabric Printing",
  summary:
    "Digital fabric printing for barrier covers, fence wraps, backdrops, pop-ups, tents, canvas and branded apparel.",
  offerings: [
    {
      title: "Fabric solutions",
      items: [
        "Barrier cover branding",
        "Fence branding",
        "Fabric backdrops",
        "Fabric pop-ups",
        "Advertising tents",
        "Canvas printing",
      ],
    },
    {
      title: "Apparel & textiles",
      items: [
        "T-shirts, uniforms & caps",
        "Heat transfer & sublimation printing",
        "Screen printing",
        "DTF / DTG printing",
        "Embroidery",
      ],
    },
  ],
  relatedServiceSlugs: ["heras-fence-rental", "police-barrier-rental", "flags"],
  seo: {
    title: "Fabric Printing in Dubai — Covers, Backdrops & Apparel",
    description:
      "Digital fabric printing for barrier covers, fence wraps, backdrops, pop-ups, tents and canvas, plus printed and embroidered apparel.",
    primaryKeyword: "fabric printing Dubai",
    secondaryKeywords: [
      "sublimation printing Dubai",
      "barrier cover printing",
      "fabric backdrop printing",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(7, 8),
  heroImage: workPhotos.fenceCoversWhite,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(7, 8),
    intro: [
      "Fabric is how events carry a brand outdoors. Our digital fabric print setup produces barrier covers and fence wraps, fabric backdrops and pop-ups, advertising tents and canvas — light to transport, quick to install and bright in the sun.",
      "The same facility handles textiles: t-shirts, uniforms and caps with heat transfer and sublimation, screen printing, DTF and DTG printing, and embroidery, so the crew, the volunteers and the venue can all match.",
    ],
    highlights: [
      {
        id: "in-house",
        title: "Our own fabric setup",
        body: "Digital fabric printing in our Dubai production house, from one cover to a full route.",
      },
      {
        id: "event-ready",
        title: "Made for events",
        body: "Covers, wraps and backdrops sized to barriers, fences, frames and tents.",
      },
      {
        id: "apparel",
        title: "Apparel too",
        body: "Uniforms, t-shirts and caps printed or embroidered to match the event branding.",
      },
    ],
    cta: {
      title: "Have fabric to print?",
      lead: "Tell us what it’s for, the sizes and quantity — we’ll recommend the fabric and finish.",
    },
  },
} as const satisfies Service;

export const printSolutions = {
  slug: "print-solutions",
  vertical: "services",
  pillar: "branding-advertising",
  title: "Print Solutions",
  summary:
    "Large format printing, banners and roll-ups, backdrops and displays, wall and floor graphics, vehicle branding and business print.",
  offerings: [
    {
      title: "Large format",
      items: [
        "Large format printing",
        "Wall & floor graphics",
        "Hoardings & unipoles",
        "Glass frosted graphics",
        "Forex, foam & acrylic boards",
        "Corrugated sheets",
      ],
    },
    {
      title: "Banners & displays",
      items: [
        "Roll-up banners",
        "X-banners",
        "Hanging banners",
        "Pop-up stands",
        "Wooden & fabric backdrops",
        "Promotional display stands",
      ],
    },
    {
      title: "Vehicle & business print",
      items: [
        "Vehicle branding & car wrapping",
        "Business cards",
        "Brochures & catalogues",
        "Invitations & ID badges",
        "Stickers",
        "Offset & digital printing",
      ],
    },
  ],
  relatedServiceSlugs: ["signage", "fabric-printing", "branding-printing"],
  seo: {
    title: "Print Solutions in Dubai — Large Format, Banners & More",
    description:
      "Large format printing, roll-ups and banners, backdrops, wall and floor graphics, vehicle wraps and business print from our Dubai print house.",
    primaryKeyword: "large format printing Dubai",
    secondaryKeywords: [
      "roll up banner printing Dubai",
      "vehicle branding Dubai",
      "brochure printing UAE",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(5, 7, 9, 12, 13, 14),
  heroImage: eventPhotos.printRolls,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(5, 7, 9, 12, 13, 14),
    intro: [
      "No matter how large or small the job, we turn your key messages into visuals that speak to your audience. From ID badges, invitations and stickers to retail signage, car wrapping, indoor and outdoor graphics and large format billboards, it is printed on our own large format setup.",
      "We run projects of every size, from a single roll-up to a full event branding package of banners, backdrops, wall and floor graphics, hoardings and printed boards — produced, delivered and installed by one team.",
    ],
    highlights: [
      {
        id: "any-size",
        title: "Any size of job",
        body: "From one roll-up banner to a complete venue or campaign branding.",
      },
      {
        id: "large-format",
        title: "Large format in-house",
        body: "Our own large format digital print setup for quality and turnaround.",
      },
      {
        id: "installed",
        title: "Printed and installed",
        body: "Wall graphics, hoardings and vehicle wraps applied on site by our team.",
      },
    ],
    cta: {
      title: "Need something printed?",
      lead: "Send the item, size, quantity and deadline — and your artwork if it’s ready.",
    },
  },
} as const satisfies Service;

export const signage = {
  slug: "signage",
  vertical: "services",
  pillar: "branding-advertising",
  title: "Signage & Light Boxes",
  summary:
    "3D, acrylic, backlit and directional signage and illuminated light boxes for venues, events and retail.",
  offerings: [
    {
      title: "Signage",
      items: [
        "3D signage",
        "Acrylic signage",
        "Backlit signage",
        "Directional signage",
        "Signboards",
      ],
    },
    {
      title: "Light boxes",
      items: ["Illuminated light boxes", "Event entrance signs", "Wayfinding light boxes"],
    },
  ],
  relatedServiceSlugs: ["print-solutions", "event-production-fabrication", "exhibitions"],
  seo: {
    title: "Signage & Light Box Signs in Dubai",
    description:
      "3D, acrylic, backlit and directional signage and illuminated light boxes, designed, printed and fabricated in our Dubai production house.",
    primaryKeyword: "signage company Dubai",
    secondaryKeywords: ["light box signage Dubai", "3D signage UAE", "directional signage events"],
  },
  status: "live",
  verified: true,
  source: companyProfile(5, 15),
  heroImage: workPhotos.lightBoxEntrance,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(5, 15),
    intro: [
      "Good signage tells people where they are and where to go — and makes the brand impossible to miss. We design and produce 3D signage, acrylic signage, backlit signage, directional signage and signboards for venues, retail and offices.",
      "For events, our illuminated light boxes mark entrances, VIP and media areas and wayfinding after dark. Graphics are printed and frames fabricated in our own production house, then installed on site.",
    ],
    highlights: [
      {
        id: "types",
        title: "Every sign type",
        body: "3D, acrylic, backlit and directional signs and signboards.",
      },
      {
        id: "light-boxes",
        title: "Light boxes for events",
        body: "Illuminated signs for entrances, zones and wayfinding at night events.",
      },
      {
        id: "fabricated",
        title: "Fabricated in-house",
        body: "Printing and fabrication in our own facility, then installed by our team.",
      },
    ],
    cta: {
      title: "Need signage?",
      lead: "Tell us the sign type, sizes and where it will go — we’ll design and quote it.",
    },
  },
} as const satisfies Service;

export const corporateGifts = {
  slug: "corporate-gifts",
  vertical: "services",
  pillar: "branding-advertising",
  title: "Corporate Gifts & Giveaways",
  summary:
    "Branded gift sets, notebooks, pens, drinkware and giveaways for clients, staff, events and campaigns.",
  offerings: [
    {
      title: "Gifts",
      items: [
        "Corporate gift sets",
        "Notebooks & organisers",
        "Pens",
        "Flasks & drinkware",
        "Presentation boxes",
      ],
    },
    {
      title: "Giveaways & branding",
      items: ["Event giveaways", "Logo printing on products", "T-shirts & caps"],
    },
  ],
  relatedServiceSlugs: ["fabric-printing", "print-solutions", "advertising-pr"],
  seo: {
    title: "Corporate Gifts & Giveaways in Dubai",
    description:
      "Branded corporate gift sets, notebooks, pens, drinkware and event giveaways, with your logo printed — sourced and produced in Dubai.",
    primaryKeyword: "corporate gifts Dubai",
    secondaryKeywords: [
      "promotional giveaways UAE",
      "branded gift sets Dubai",
      "logo printed pens",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(7, 10),
  page: {
    status: "live",
    verified: true,
    source: companyProfile(7, 10),
    intro: [
      "Corporate gift giving is a serious business. As part of a well-considered programme it can establish or strengthen relationships, and it is a cost-effective way of recognising the people and activities that benefit your business.",
      "We supply branded gift sets, notebooks and organisers, pens, flasks and drinkware in presentation boxes, and giveaways for events and campaigns — with your logo printed on the product.",
    ],
    highlights: [
      {
        id: "sets",
        title: "Ready-made gift sets",
        body: "Notebook, pen and flask sets in presentation boxes for clients and staff.",
      },
      {
        id: "logo",
        title: "Your logo on it",
        body: "Logo printing on gifts and giveaways to match your brand.",
      },
      {
        id: "events",
        title: "Event giveaways",
        body: "Giveaways supplied with the rest of your event or campaign branding.",
      },
    ],
    cta: {
      title: "Looking for corporate gifts?",
      lead: "Tell us the occasion, quantity and budget — we’ll suggest gift sets and branding options.",
    },
  },
} as const satisfies Service;

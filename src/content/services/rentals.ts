import type { Service } from "@/types/content";

import { eventPhotos } from "../event-photos";
import { companyProfile, ownerApproved } from "../sources";
import { workPhotos } from "../work-photos";

/**
 * Dedicated rental service pages requested by the client (October 2026 feedback). Each rental
 * line is listed in the Company Profile under "Event Rental" (CP p.19–20) and "Fabric
 * Solutions" (CP p.8, barrier and fence branding); the client's own photos show the items.
 * Mojo barriers are not named in the CP: the page was requested by the client and its wording
 * awaits their review (owner-approved).
 */

export const furnitureRental = {
  slug: "furniture-rental",
  vertical: "services",
  pillar: "event-rentals",
  title: "Furniture Rental",
  summary:
    "Banquet and round tables, chairs, lounge sofas, bean bags and kids furniture — delivered, set up and collected for your event.",
  offerings: [
    {
      title: "Dining & banquet",
      items: ["Banquet tables", "Round tables", "Event chairs", "Table linen"],
    },
    {
      title: "Lounge & seating",
      items: [
        "Lounge sofas & armchairs",
        "Cubes & coffee tables",
        "Bean bags",
        "Theatre-style seating",
      ],
    },
    { title: "Family zones", items: ["Kids area furniture", "Kids area fences", "Game booths"] },
  ],
  relatedServiceSlugs: ["tent-rental", "event-rentals-entertainment", "festive-mall-decor"],
  seo: {
    title: "Event Furniture Rental in Dubai",
    description:
      "Banquet tables, round tables, chairs, lounge sofas, bean bags and kids furniture for rent — delivered and set up for events across the UAE.",
    primaryKeyword: "event furniture rental Dubai",
    secondaryKeywords: [
      "table and chair rental Dubai",
      "lounge furniture rental",
      "bean bag rental UAE",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(19, 20),
  heroImage: workPhotos.banquetTables,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(19, 20),
    intro: [
      "Seating decides how an event feels. We rent the furniture that turns an open space into a dinner, a lounge or a conference — banquet tables and round tables with linen, event chairs, white lounge sofas, armchairs and cubes, bean bags and theatre-style rows facing a stage.",
      "Furniture comes with the rest of your event rentals, from tents and canopies to coolers and heaters, so one team plans the layout, delivers it, sets it up and collects it afterwards. For family and community events we add kids area furniture, fences and game booths.",
    ],
    highlights: [
      {
        id: "layouts",
        title: "Any layout",
        body: "Banquet rows, round-table dinners, lounge corners or theatre seating for a stage programme.",
      },
      {
        id: "with-tents",
        title: "Rented with your tents",
        body: "Furniture, tents, canopies and climate control planned together, so everything fits the space.",
      },
      {
        id: "setup",
        title: "Set up and collected",
        body: "Our team delivers, arranges and collects the furniture for you.",
      },
    ],
    cta: {
      title: "Need furniture for an event?",
      lead: "Tell us the date, venue and guest numbers — we’ll put the layout and list together.",
    },
  },
} as const satisfies Service;

export const tentRental = {
  slug: "tent-rental",
  vertical: "services",
  pillar: "event-rentals",
  title: "Tent Rental",
  summary:
    "Peak and pagoda tents, marquees, Arabic majlis tents, canopies and branded gazebos for outdoor events of every size.",
  offerings: [
    {
      title: "Tents & structures",
      items: [
        "Peak & pagoda tents",
        "Marquee tents",
        "Tents & Arabic tents",
        "Canopies",
        "Branded pop-up gazebos",
      ],
    },
    {
      title: "Around the tent",
      items: [
        "Stages",
        "Tables & chairs",
        "Coolers & heaters",
        "Portable ablutions",
        "Tent branding & printing",
      ],
    },
  ],
  relatedServiceSlugs: ["furniture-rental", "police-barrier-rental", "event-rentals-entertainment"],
  seo: {
    title: "Tent Rental in Dubai — Marquees & Arabic Tents",
    description:
      "Peak, pagoda and marquee tents, Arabic majlis tents, canopies and branded gazebos for rent, with furniture, climate control and branding.",
    primaryKeyword: "tent rental Dubai",
    secondaryKeywords: ["marquee rental UAE", "Arabic tent rental", "pagoda tent hire Dubai"],
  },
  status: "live",
  verified: true,
  source: companyProfile(19, 20),
  heroImage: workPhotos.tentDusk,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(19, 20),
    intro: [
      "Outdoor events start with shelter. We supply tents and structures for media centres, registration and volunteer areas, VIP lounges, dinners and community events — peak and pagoda tents, larger marquees, traditional Arabic and majlis tents, canopies and branded pop-up gazebos.",
      "Because printing and fabrication happen in our own production house, tents can carry your branding, and we can fit them out with stages, tables and chairs, coolers and heaters, and portable ablutions from the same rental range.",
    ],
    highlights: [
      {
        id: "formats",
        title: "Every format",
        body: "From a single branded gazebo to a line of pagoda tents and full marquees.",
      },
      {
        id: "branded",
        title: "Branded in-house",
        body: "Tent fascias, walls and gazebos printed in our own large format facility.",
      },
      {
        id: "fitted-out",
        title: "Fitted out",
        body: "Furniture, stages, climate control and ablutions supplied with the tent.",
      },
    ],
    cta: {
      title: "Planning an outdoor event?",
      lead: "Share the site, dates and what each tent is for — we’ll propose the right structures.",
    },
  },
} as const satisfies Service;

export const herasFenceRental = {
  slug: "heras-fence-rental",
  vertical: "services",
  pillar: "event-rentals",
  title: "Heras Fence Rental",
  summary:
    "Temporary Heras fencing for event sites, festivals and hoardings — with full-colour printed fence wraps from our own print house.",
  offerings: [
    {
      title: "Fencing",
      items: ["Heras fence panels", "Event perimeters", "Back-of-house areas", "Kids area fences"],
    },
    {
      title: "Fence branding",
      items: [
        "Printed fence wraps",
        "Sponsor & wayfinding graphics",
        "Seasonal artwork",
        "Mall & site hoardings",
      ],
    },
  ],
  relatedServiceSlugs: ["police-barrier-rental", "fabric-printing", "tent-rental"],
  seo: {
    title: "Heras Fence Rental & Fence Branding in Dubai",
    description:
      "Temporary Heras fencing for events and sites, wrapped in full-colour printed fence covers produced in our Dubai print house.",
    primaryKeyword: "heras fence rental Dubai",
    secondaryKeywords: ["temporary fencing Dubai", "fence wrap printing", "event fencing UAE"],
  },
  status: "live",
  verified: true,
  source: companyProfile(8, 19, 20),
  heroImage: workPhotos.brandedFenceMarathon,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(8, 19, 20),
    intro: [
      "Temporary fencing defines an event site — it keeps the perimeter secure, screens back-of-house areas and guides people where they need to go. We rent Heras fence panels for festivals, races, community events and construction or mall hoardings.",
      "Plain fencing becomes a branding surface with our printed fence wraps: sponsor walls, wayfinding, seasonal artwork or full campaign graphics, printed on fabric in our own production house and installed on site by our team.",
    ],
    highlights: [
      {
        id: "secure",
        title: "Secure perimeters",
        body: "Fence lines for festival sites, race villages, back-of-house areas and kids zones.",
      },
      {
        id: "wraps",
        title: "Printed in-house",
        body: "Full-colour fence wraps produced on our own fabric printing setup.",
      },
      {
        id: "installed",
        title: "Installed for you",
        body: "Fencing and wraps delivered, installed and removed by our team.",
      },
    ],
    cta: {
      title: "Need fencing for a site or event?",
      lead: "Send the length of fence line, dates and artwork — we’ll quote the fencing and the wraps.",
    },
  },
} as const satisfies Service;

export const policeBarrierRental = {
  slug: "police-barrier-rental",
  vertical: "services",
  pillar: "event-rentals",
  title: "Police Barrier Rental",
  summary:
    "Steel crowd-control (police) barriers for races, queues and venues — with printed barrier covers that brand every metre.",
  offerings: [
    {
      title: "Barriers",
      items: [
        "Steel crowd-control barriers",
        "Race & route barriers",
        "Queue & entrance lines",
        "VIP & media zones",
      ],
    },
    {
      title: "Barrier branding",
      items: [
        "Printed barrier covers",
        "Sponsor & partner branding",
        "Themed & seasonal covers",
        "Wayfinding graphics",
      ],
    },
  ],
  relatedServiceSlugs: ["heras-fence-rental", "mojo-barrier-rental", "fabric-printing"],
  seo: {
    title: "Police Barrier Rental & Barrier Covers in Dubai",
    description:
      "Crowd-control police barriers for races, queues and venues, with branded barrier covers printed in-house — delivered and installed.",
    primaryKeyword: "police barrier rental Dubai",
    secondaryKeywords: [
      "crowd control barrier rental",
      "barrier cover printing",
      "event barriers UAE",
    ],
  },
  status: "live",
  verified: true,
  source: companyProfile(8, 19, 30),
  heroImage: workPhotos.brandedBarriersMarathon,
  page: {
    status: "live",
    verified: true,
    source: companyProfile(8, 19, 30),
    intro: [
      "Police barriers keep crowds safe and moving — along race routes and start and finish areas, at entrances and queues, and around VIP and media zones. We rent steel crowd-control barriers for sports events, festivals, public celebrations and venues.",
      "Every barrier can carry a printed cover. Barrier cover branding is one of our fabric solutions: sponsor and partner branding, themed artwork for malls and kids zones, or simple wayfinding, printed in our Dubai production house and fitted on site.",
    ],
    highlights: [
      {
        id: "routes",
        title: "Built for routes",
        body: "Barrier lines for marathons, races and long event routes.",
      },
      {
        id: "covers",
        title: "Branded covers",
        body: "Printed barrier covers turn crowd control into sponsor and event branding.",
      },
      {
        id: "one-team",
        title: "Barriers and print together",
        body: "One team supplies the barriers, prints the covers and installs both.",
      },
    ],
    cta: {
      title: "Need barriers for an event?",
      lead: "Tell us the route or area, the dates and whether you need branded covers.",
    },
  },
} as const satisfies Service;

export const mojoBarrierRental = {
  slug: "mojo-barrier-rental",
  vertical: "services",
  pillar: "event-rentals",
  title: "Mojo Barrier Rental",
  summary:
    "Front-of-stage mojo barriers for concerts, festivals and live shows — with event support staff to manage the crowd line.",
  offerings: [
    {
      title: "Barrier lines",
      items: ["Front-of-stage barriers", "Pit & photographer areas", "Crowd lines at live shows"],
    },
    {
      title: "With your event",
      items: ["Event support staff", "Stage & AV setup", "Barrier branding"],
    },
  ],
  relatedServiceSlugs: [
    "police-barrier-rental",
    "event-production-fabrication",
    "event-rentals-entertainment",
  ],
  seo: {
    title: "Mojo Barrier Rental for Concerts in Dubai",
    description:
      "Mojo (front-of-stage) barriers for concerts, festivals and live shows, supplied with stage, AV and event support staff in the UAE.",
    primaryKeyword: "mojo barrier rental Dubai",
    secondaryKeywords: ["stage barrier rental", "concert barrier hire UAE", "crowd barrier Dubai"],
  },
  status: "live",
  verified: true,
  source: ownerApproved("2026-10-20", "Requested by the client; wording to be confirmed"),
  heroImage: eventPhotos.concertAerial,
  page: {
    status: "live",
    verified: true,
    source: ownerApproved("2026-10-20", "Requested by the client; wording to be confirmed"),
    intro: [
      "At a live show the line between the stage and the crowd matters most. Mojo barriers are the heavy-duty, front-of-stage barriers used at concerts and festivals: they hold a crowd line and create a pit for security, medics and photographers.",
      "We supply mojo barriers with the rest of your live event production — stage design and trussing, audio visual setup and event support staff — so the barrier line, the stage and the team running it are planned together.",
    ],
    highlights: [
      {
        id: "front-of-stage",
        title: "Front-of-stage lines",
        body: "Barrier lines that hold the crowd and keep a working pit in front of the stage.",
      },
      {
        id: "production",
        title: "Planned with the stage",
        body: "Barriers, stage, trussing and AV coordinated by one production team.",
      },
      {
        id: "staff",
        title: "Staffed if needed",
        body: "Event support staff alongside the barriers on show day.",
      },
    ],
    cta: {
      title: "Planning a concert or live show?",
      lead: "Send the stage width, expected crowd and dates — we’ll plan the barrier line.",
    },
  },
} as const satisfies Service;

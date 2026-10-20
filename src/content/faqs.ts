import type { Faq } from "@/types/content";

import { companyProfile, ownerApproved } from "./sources";

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
  /* Dedicated rental and branding & print pages (client feedback, October 2026). */
  {
    id: "furniture-what",
    question: "What furniture can I rent?",
    answer:
      "Banquet and round tables, event chairs, lounge sofas, armchairs and cubes, bean bags, theatre-style seating, and kids area furniture, fences and game booths.",
    placements: ["service:furniture-rental"],
    status: "live",
    verified: true,
    source: companyProfile(19, 20),
  },
  {
    id: "furniture-with-tents",
    question: "Can furniture be rented together with tents and other equipment?",
    answer:
      "Yes. Furniture is part of our event rental range, alongside tents and Arabic tents, canopies, stages, barriers, coolers and heaters and portable ablutions, so one team plans and supplies everything.",
    placements: ["service:furniture-rental"],
    status: "live",
    verified: true,
    source: companyProfile(19, 20),
  },
  {
    id: "tent-types",
    question: "What types of tent do you rent?",
    answer:
      "Peak and pagoda tents, marquees, tents and Arabic tents, canopies and branded pop-up gazebos for media centres, registration, VIP areas, dinners and community events.",
    placements: ["service:tent-rental"],
    status: "live",
    verified: true,
    source: companyProfile(19, 20),
  },
  {
    id: "tent-branding",
    question: "Can our tents carry our branding?",
    answer:
      "Yes. Tent fascias, walls and gazebos can be printed in our own large format and fabric printing facility.",
    placements: ["service:tent-rental"],
    status: "live",
    verified: true,
    source: companyProfile(7, 8, 19),
  },
  {
    id: "heras-what",
    question: "What is Heras fencing used for at events?",
    answer:
      "Temporary Heras fence panels secure event perimeters, screen back-of-house areas, create kids zones and form site or mall hoardings.",
    placements: ["service:heras-fence-rental"],
    status: "live",
    verified: true,
    source: companyProfile(8, 19, 20),
  },
  {
    id: "heras-wraps",
    question: "Can you print and install fence wraps?",
    answer:
      "Yes. Fence branding is one of our fabric solutions: we print the wraps in-house and install them on the fencing.",
    placements: ["service:heras-fence-rental"],
    status: "live",
    verified: true,
    source: companyProfile(8),
  },
  {
    id: "barrier-uses",
    question: "Where are police barriers used?",
    answer:
      "Along race routes and start and finish areas, at entrances and queues, and around VIP and media zones at sports events, festivals and venues.",
    placements: ["service:police-barrier-rental"],
    status: "live",
    verified: true,
    source: companyProfile(19, 30),
  },
  {
    id: "barrier-covers",
    question: "Do you supply branded barrier covers?",
    answer:
      "Yes. Barrier cover branding is printed on fabric in our Dubai production house and fitted to the barriers on site.",
    placements: ["service:police-barrier-rental"],
    status: "live",
    verified: true,
    source: companyProfile(8, 30),
  },
  {
    id: "mojo-what",
    question: "What is a mojo barrier?",
    answer:
      "A heavy-duty front-of-stage barrier used at concerts and festivals to hold the crowd line and keep a working pit in front of the stage.",
    placements: ["service:mojo-barrier-rental"],
    status: "live",
    verified: true,
    source: ownerApproved("2026-10-20", "Requested by the client; wording to be confirmed"),
  },
  {
    id: "mojo-with-stage",
    question: "Can mojo barriers be supplied with the stage and AV?",
    answer:
      "Yes. We plan barrier lines together with stage design, trussing, audio visual setup and event support staff.",
    placements: ["service:mojo-barrier-rental"],
    status: "live",
    verified: true,
    source: companyProfile(17, 18),
  },
  {
    id: "flag-types",
    question: "Which flag types do you print?",
    answer:
      "L-shape, blade, teardrop, wall-mounted, curve top, hoisting, sail and festive flags, supplied with flag poles.",
    placements: ["service:flags"],
    status: "live",
    verified: true,
    source: companyProfile(11),
  },
  {
    id: "flags-events",
    question: "Do you print flags for events and festive seasons?",
    answer:
      "Yes — event flags for routes, forecourts and venues, and festive flags for occasions such as National Day.",
    placements: ["service:flags"],
    status: "live",
    verified: true,
    source: companyProfile(11, 21),
  },
  {
    id: "fabric-what",
    question: "What can you print on fabric?",
    answer:
      "Barrier covers, fence branding, fabric backdrops and pop-ups, advertising tents, canvas, flags, and t-shirts, uniforms and caps.",
    placements: ["service:fabric-printing"],
    status: "live",
    verified: true,
    source: companyProfile(7, 8),
  },
  {
    id: "fabric-apparel",
    question: "Which apparel printing methods do you offer?",
    answer:
      "Heat transfer and sublimation printing, screen printing, DTF and DTG printing, and embroidery.",
    placements: ["service:fabric-printing"],
    status: "live",
    verified: true,
    source: companyProfile(7),
  },
  {
    id: "print-range",
    question: "What do your print solutions cover?",
    answer:
      "Large format printing, banners and roll-ups, backdrops and displays, wall and floor graphics, hoardings and unipoles, forex, foam and acrylic boards, vehicle branding, and business print such as cards, brochures and catalogues.",
    placements: ["service:print-solutions"],
    status: "live",
    verified: true,
    source: companyProfile(5, 7, 9, 12, 13, 14),
  },
  {
    id: "print-sizes",
    question: "Do you take small print jobs as well as large ones?",
    answer:
      "Yes. We run projects of all sizes, from ID badges and stickers to large format billboards and complete event branding.",
    placements: ["service:print-solutions"],
    status: "live",
    verified: true,
    source: companyProfile(7),
  },
  {
    id: "signage-types",
    question: "Which types of signage do you make?",
    answer:
      "3D signage, acrylic signage, backlit signage, directional signage and signboards, plus illuminated light boxes for events.",
    placements: ["service:signage"],
    status: "live",
    verified: true,
    source: companyProfile(5, 15),
  },
  {
    id: "signage-install",
    question: "Do you install the signage?",
    answer:
      "Yes. Signs are printed and fabricated in our own production house and installed on site by our team.",
    placements: ["service:signage"],
    status: "live",
    verified: true,
    source: companyProfile(15, 16),
  },
  {
    id: "gifts-what",
    question: "What corporate gifts do you supply?",
    answer:
      "Branded gift sets, notebooks and organisers, pens, flasks and drinkware in presentation boxes, and giveaways for events and campaigns.",
    placements: ["service:corporate-gifts"],
    status: "live",
    verified: true,
    source: companyProfile(7, 10),
  },
  {
    id: "gifts-logo",
    question: "Can you print our logo on gifts?",
    answer:
      "Yes — if you need a logo printed on a product, we can do it as part of your gifts or giveaways.",
    placements: ["service:corporate-gifts"],
    status: "live",
    verified: true,
    source: companyProfile(7, 10),
  },
] as const satisfies readonly Faq[];

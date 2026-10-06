import type { Faq } from "@/types/content";

import { OWNER_APPROVED } from "./digital-services/approval";
import { companyProfile } from "./sources";

/**
 * FAQs restate Company Profile facts only. Operational policies (lead times, minimum orders,
 * pricing, payment terms) are not answered until the client provides them.
 * Digital answers that go beyond CP p.23 were approved with the digital offering
 * (`OWNER_APPROVED`, see digital-services/approval.ts). None promises prices, timings or results.
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
  /* Digital Solutions. Gulf-wide reach and the CP scope lists are CP p.23; the rest is approved. */
  {
    id: "digital-gulf",
    question: "Do you take on digital projects outside the UAE?",
    answer: "Yes. Our digital marketing solutions are offered to clients across the Gulf.",
    placements: [
      "service:web-development",
      "service:application-development",
      "service:seo",
      "service:social-media-management",
    ],
    status: "live",
    verified: true,
    source: companyProfile(23),
  },
  {
    id: "web-enterprise",
    question: "Do you work on enterprise web solutions as well as company websites?",
    answer:
      "Yes. Alongside website design and development, our digital marketing solutions include enterprise web solutions.",
    placements: ["service:web-development"],
    status: "live",
    verified: true,
    source: companyProfile(23),
  },
  {
    id: "web-brand-match",
    question: "Can our website match our event and print branding?",
    answer:
      "Yes. Because we also produce events, exhibitions and printed branding, your website can follow the same identity your audience already sees in person.",
    placements: ["service:web-development"],
    ...OWNER_APPROVED,
  },
  {
    id: "web-update-myself",
    question: "Will we be able to update the website ourselves?",
    answer:
      "Yes. We can connect your site to a content management system so your team can edit text, images and pages without touching code, and we train you on it at handover.",
    placements: ["service:web-development", "service:ecommerce-development"],
    ...OWNER_APPROVED,
  },
  {
    id: "app-mobility",
    question: "Do you develop mobile applications?",
    answer:
      "Yes. Application development and mobility solutions are part of the digital marketing solutions we offer.",
    placements: ["service:application-development"],
    status: "live",
    verified: true,
    source: companyProfile(23),
  },
  {
    id: "app-campaign",
    question: "Can an app support our event or promotion?",
    answer:
      "Yes. An app can be scoped around an event, a promotion or a campaign, alongside the activations, signage and print we produce for it.",
    placements: ["service:application-development"],
    ...OWNER_APPROVED,
  },
  {
    id: "app-both-stores",
    question: "Do you build for both iOS and Android?",
    answer:
      "Yes. We usually build one cross-platform app that is published to both the App Store and Google Play, and we handle the store submission for you.",
    placements: ["service:application-development"],
    ...OWNER_APPROVED,
  },
  {
    id: "seo-with-website",
    question: "Can SEO be planned together with a new website?",
    answer:
      "Yes. SEO works best when it is part of the website from the start — structure, page titles, speed and schema markup are all planned before launch.",
    placements: ["service:seo", "service:content-search-strategy"],
    ...OWNER_APPROVED,
  },
  {
    id: "seo-how-long",
    question: "How long does SEO take to show results?",
    answer:
      "It depends on your market, your website and your competitors. Technical fixes can help quickly, while new content and authority build over months, so we report on progress every month.",
    placements: ["service:seo"],
    ...OWNER_APPROVED,
  },
  {
    id: "seo-guarantee",
    question: "Can you guarantee a number one ranking on Google?",
    answer:
      "No one can honestly guarantee a ranking, because search engines decide them. What we can promise is a clear plan, careful work on the factors that matter and transparent reporting.",
    placements: ["service:seo", "service:content-search-strategy"],
    ...OWNER_APPROVED,
  },
  {
    id: "social-around-events",
    question: "Can you manage our social media around our events?",
    answer:
      "Yes. Social media management can cover the run-up to an event, the day itself and what follows, using the same identity as your event branding.",
    placements: ["service:social-media-management"],
    ...OWNER_APPROVED,
  },
  {
    id: "social-approval",
    question: "Do we approve posts before they go live?",
    answer:
      "Yes. You receive each month’s content calendar and designs for approval before anything is scheduled, and you can request changes at any point.",
    placements: ["service:social-media-management"],
    ...OWNER_APPROVED,
  },
  {
    id: "pm-ad-budget",
    question: "Is the advertising budget included in your fee?",
    answer:
      "No. The ad spend is paid directly to platforms such as Google and Meta, so you always see exactly where your budget goes. Our fee covers planning, setup, creative and optimisation.",
    placements: ["service:performance-marketing"],
    ...OWNER_APPROVED,
  },
  {
    id: "pm-which-platform",
    question: "Should we advertise on Google or on Meta?",
    answer:
      "Often both, for different jobs: Google reaches people actively searching, while Meta builds awareness and demand. We recommend a split based on your goals and test it with real data.",
    placements: ["service:performance-marketing"],
    ...OWNER_APPROVED,
  },
  {
    id: "css-geo",
    question: "What is AI search visibility (GEO)?",
    answer:
      "It means structuring your content so AI assistants and answer engines can understand your business and mention it when people ask questions, alongside classic search results.",
    placements: ["service:content-search-strategy"],
    ...OWNER_APPROVED,
  },
  {
    id: "ecom-payments",
    question: "Which payment methods can our store accept?",
    answer:
      "We integrate the payment gateway that suits your business, so customers can pay by card and other methods common in the UAE and the Gulf.",
    placements: ["service:ecommerce-development"],
    ...OWNER_APPROVED,
  },
  {
    id: "ecom-platform",
    question: "Do you build on Shopify or custom?",
    answer:
      "Both. Shopify or WooCommerce suits most stores; a custom storefront makes sense when you need special pricing, workflows or integrations. We recommend the option that fits your catalogue and growth.",
    placements: ["service:ecommerce-development"],
    ...OWNER_APPROVED,
  },
  {
    id: "cs-own-code",
    question: "Do we own the software you build?",
    answer:
      "Yes. The application, its code and its data belong to you, and we provide documentation so your team or another developer can work on it later.",
    placements: ["service:custom-software"],
    ...OWNER_APPROVED,
  },
  {
    id: "cs-existing-systems",
    question: "Can the software connect to systems we already use?",
    answer:
      "Yes. We integrate with CRMs, accounting, ERP, payment and messaging tools through their APIs, so data moves between systems without manual re-typing.",
    placements: ["service:custom-software", "service:ai-automation"],
    ...OWNER_APPROVED,
  },
  {
    id: "aia-which-tasks",
    question: "Which tasks can be automated?",
    answer:
      "Good candidates are repetitive, rule-based tasks: logging enquiries, updating your CRM, sending follow-ups, routing emails and extracting data from documents. We map your workflows to find them.",
    placements: ["service:ai-automation"],
    ...OWNER_APPROVED,
  },
  {
    id: "aia-replace-team",
    question: "Will automation replace our team?",
    answer:
      "No. Automation takes over repetitive tasks so your people can focus on clients and decisions. Wherever a person should check something, the workflow waits for their approval.",
    placements: ["service:ai-automation", "service:generative-ai"],
    ...OWNER_APPROVED,
  },
  {
    id: "aig-arabic",
    question: "Can the chatbot speak Arabic and English?",
    answer:
      "Yes. AI agents can hold conversations in Arabic and English and switch with the customer, using the answers and tone you approve.",
    placements: ["service:ai-agents"],
    ...OWNER_APPROVED,
  },
  {
    id: "aig-wrong-answer",
    question: "What if the chatbot does not know the answer?",
    answer:
      "It is set up to say so rather than guess, and to hand the conversation to your team with the details already collected. We review conversations regularly to fill any gaps.",
    placements: ["service:ai-agents"],
    ...OWNER_APPROVED,
  },
  {
    id: "gen-data-safe",
    question: "Is our data safe when we use generative AI?",
    answer:
      "We design integrations with access controls and choose providers and settings that do not use your business data to train public models, and we agree data rules with you before building.",
    placements: ["service:generative-ai", "service:ai-agents"],
    ...OWNER_APPROVED,
  },
  {
    id: "gen-start-small",
    question: "How do we start with generative AI?",
    answer:
      "With a short workshop to pick one or two high-value use cases, then a prototype on your own content. You decide whether to roll it out once you have seen it work.",
    placements: ["service:generative-ai"],
    ...OWNER_APPROVED,
  },
] as const satisfies readonly Faq[];

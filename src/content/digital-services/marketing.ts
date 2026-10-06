import type { Service } from "@/types/content";

import { OWNER_APPROVED } from "./approval";
import { digitalPhotos } from "./photos";

/** Digital marketing services beyond CP p.23, approved by the website owner (see ./approval.ts). */
const base = {
  vertical: "digital-solutions",
  pillar: "digital-technology",
  capability: "marketing",
} as const;

export const performanceMarketing = {
  ...base,
  slug: "performance-marketing",
  title: "Performance Marketing",
  summary: "Google Ads and Meta Ads campaigns planned, run and optimised against your goals.",
  offerings: [
    {
      title: "Channels",
      items: [
        "Google Search and Performance Max",
        "Meta Ads (Facebook & Instagram)",
        "YouTube and display",
      ],
    },
    {
      title: "Optimisation",
      items: [
        "Audience and keyword targeting",
        "Ad creative and A/B testing",
        "Landing page improvements",
      ],
    },
    {
      title: "Measurement",
      items: ["Conversion tracking", "Campaign dashboards", "Monthly reporting"],
    },
  ],
  relatedServiceSlugs: ["seo", "social-media-management", "content-search-strategy"],
  seo: {
    title: "Performance Marketing, Google & Meta Ads Dubai",
    description:
      "Google Ads and Meta Ads campaigns for Dubai and Gulf businesses — planned, tracked and optimised every week against your leads and sales goals.",
    primaryKeyword: "performance marketing agency Dubai",
    secondaryKeywords: ["Google Ads agency Dubai", "Meta ads agency Dubai"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Performance marketing puts your brand in front of people at the moment they are ready to act — searching on Google, scrolling Instagram, watching YouTube — and measures what every dirham brings back.",
      "We begin with tracking, because a campaign is only as good as its data. Once enquiries, calls and sales are measured properly, we build campaigns around your goals, write and design the ads, and set up landing pages that turn clicks into leads.",
      "Then we optimise every week: shifting budget to what works, testing new creative and cutting what does not. You get a clear dashboard and a monthly review of results and next steps.",
    ],
    highlights: [
      {
        id: "pm-tracking",
        title: "Tracking before spending",
        body: "Conversion tracking set up first, so every campaign decision is based on real enquiries and sales.",
      },
      {
        id: "pm-weekly",
        title: "Optimised every week",
        body: "Budgets, bids, audiences and creative reviewed weekly, not set and forgotten.",
      },
      {
        id: "pm-full-funnel",
        title: "Ads and landing pages together",
        body: "We improve the page people land on as well as the ad that brought them there.",
      },
    ],
    deliverables: [
      "Conversion tracking setup",
      "Campaign strategy and budget plan",
      "Search, social and video ads",
      "Landing page recommendations",
      "Live performance dashboard",
      "Monthly results review",
    ],
    steps: [
      { title: "Goals & tracking", body: "Targets agreed and conversions measured end to end." },
      { title: "Build", body: "Campaign structure, audiences, keywords and ad creative." },
      { title: "Launch & optimise", body: "Weekly tuning of budgets, bids, audiences and ads." },
      { title: "Report", body: "A clear dashboard and a monthly review of what to do next." },
    ],
    platforms: [
      "Google Ads",
      "Meta Ads",
      "YouTube Ads",
      "Google Analytics 4",
      "Google Tag Manager",
      "Looker Studio",
    ],
    photo: digitalPhotos.performanceMarketing,
    cta: {
      title: "Ready to turn ad spend into enquiries?",
      lead: "Tell us your goals and your budget — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

export const contentSearchStrategy = {
  ...base,
  slug: "content-search-strategy",
  title: "Content & Search Strategy",
  summary: "Local and technical SEO with a content plan, so the right buyers find you first.",
  offerings: [
    { title: "Search", items: ["Local SEO", "Technical SEO", "AI search visibility (GEO)"] },
    {
      title: "Content",
      items: ["Content strategy", "Content calendars", "Articles and landing pages"],
    },
  ],
  relatedServiceSlugs: ["seo", "performance-marketing", "web-development"],
  seo: {
    title: "Local SEO, Technical SEO & Content Strategy Dubai",
    description:
      "Local SEO, technical SEO, AI search visibility and content strategy for Dubai and Gulf businesses that want to be found first.",
    primaryKeyword: "local SEO Dubai",
    secondaryKeywords: ["technical SEO Dubai", "content strategy Dubai"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Search has changed. Buyers now find businesses through Google Maps, featured answers and AI assistants as well as the classic blue links. Content and search strategy makes sure your business shows up in all of them, with content worth reading when people arrive.",
      "We map the questions your customers ask at every stage, fix the technical issues holding your site back and strengthen your local presence across Dubai and the Gulf. Then we plan and produce the articles, guides and landing pages that answer those questions better than anyone else.",
      "The result is a content engine that keeps working: every new page adds to your visibility, and every month we review what is performing and where to go next.",
    ],
    highlights: [
      {
        id: "css-ai-search",
        title: "Ready for AI search",
        body: "Content structured so AI assistants and answer engines can understand and cite your business.",
      },
      {
        id: "css-local",
        title: "Local presence",
        body: "Maps, listings and location pages that help nearby customers choose you.",
      },
      {
        id: "css-calendar",
        title: "A plan, not random posts",
        body: "A content calendar built from real search demand and your sales priorities.",
      },
    ],
    deliverables: [
      "Search and content audit",
      "Topic and keyword map",
      "Local SEO setup",
      "Quarterly content calendar",
      "Articles and landing pages",
      "Monthly visibility report",
    ],
    steps: [
      { title: "Research", body: "Customer questions, search demand and competitor content." },
      { title: "Plan", body: "Topic map, priorities and a content calendar you approve." },
      { title: "Create & optimise", body: "Writing, on-page SEO and technical fixes." },
      { title: "Measure", body: "Visibility, traffic and enquiries tracked every month." },
    ],
    platforms: [
      "Google Search Console",
      "Google Business Profile",
      "Google Analytics 4",
      "Schema.org",
    ],
    photo: digitalPhotos.contentStrategy,
    cta: {
      title: "Want to be the answer your buyers find?",
      lead: "Tell us about your market and your goals — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

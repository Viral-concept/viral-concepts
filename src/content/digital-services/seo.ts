import type { Service } from "@/types/content";

import { OWNER_APPROVED } from "./approval";
import { digitalPhotos } from "./photos";

/** Service: CP p.23 ("SEO"). */
export const seo = {
  slug: "seo",
  vertical: "digital-solutions",
  pillar: "digital-technology",
  capability: "marketing",
  title: "SEO",
  summary: "Search engine optimisation that helps the right buyers find you on Google.",
  offerings: [
    {
      title: "Foundations",
      items: ["SEO audit", "Technical SEO", "Site structure and internal linking"],
    },
    {
      title: "Growth",
      items: ["Keyword research", "On-page optimisation", "Local SEO and Google Business Profile"],
    },
    { title: "Measurement", items: ["Rank and traffic tracking", "Monthly reporting"] },
  ],
  relatedServiceSlugs: ["content-search-strategy", "web-development", "performance-marketing"],
  seo: {
    title: "SEO Services in Dubai",
    description:
      "SEO for Dubai and Gulf businesses: technical fixes, keyword research, on-page and local optimisation, and clear monthly reporting.",
    primaryKeyword: "SEO services Dubai",
    secondaryKeywords: ["SEO company Dubai", "SEO agency UAE"],
    h1: "Search engine optimisation (SEO)",
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Every day, people in Dubai and across the Gulf search for exactly what you offer. SEO makes sure they find you — not a competitor — by making your website the clearest, fastest and most trusted answer to their search.",
      "We start with an audit of what search engines see today: technical issues, missing pages, weak titles and the keywords you could own. Then we fix the foundations, optimise the pages that matter and build out the content your buyers are looking for.",
      "SEO compounds over time, so we report on it plainly every month: what changed, what moved and what we will do next. It works best planned together with your website, content and social channels.",
    ],
    highlights: [
      {
        id: "seo-right-buyers",
        title: "Found by the right buyers",
        body: "We target searches that signal intent to buy, not just traffic for its own sake.",
      },
      {
        id: "seo-technical",
        title: "Technical first",
        body: "Speed, indexing, structure and schema fixed before we chase new keywords.",
      },
      {
        id: "seo-local",
        title: "Local visibility",
        body: "Google Business Profile and local pages that help nearby buyers find and call you.",
      },
      {
        id: "seo-reporting",
        title: "Plain-English reporting",
        body: "A monthly report on what moved, why, and the next actions — no jargon.",
      },
    ],
    deliverables: [
      "Technical SEO audit",
      "Keyword and competitor research",
      "On-page optimisation plan",
      "Local SEO and Google Business Profile",
      "Content recommendations",
      "Monthly performance report",
    ],
    steps: [
      { title: "Audit", body: "Technical health, content gaps and where competitors outrank you." },
      { title: "Strategy", body: "Keyword map and priorities agreed against your business goals." },
      { title: "Optimise", body: "Technical fixes, on-page work, local listings and new content." },
      { title: "Measure", body: "Monthly tracking and reporting, then the next round of work." },
    ],
    platforms: [
      "Google Search Console",
      "Google Analytics 4",
      "Google Business Profile",
      "Bing Webmaster Tools",
      "Schema.org",
    ],
    photo: digitalPhotos.seo,
    cta: {
      title: "Want more of the right people to find you?",
      lead: "Tell us about your business and your market — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

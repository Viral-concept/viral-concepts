import type { Service } from "@/types/content";

import { OWNER_APPROVED } from "./approval";
import { digitalPhotos } from "./photos";

/** Service: CP p.23 ("Social Media Management"). */
export const socialMediaManagement = {
  slug: "social-media-management",
  vertical: "digital-solutions",
  pillar: "digital-technology",
  capability: "marketing",
  title: "Social Media Management",
  summary: "Strategy, content and community management that keep your brand visible every week.",
  offerings: [
    {
      title: "Strategy",
      items: ["Channel strategy", "Content pillars and tone of voice", "Monthly content calendars"],
    },
    {
      title: "Content",
      items: ["Posts, carousels and stories", "Short-form video and reels", "Event coverage"],
    },
    {
      title: "Community",
      items: ["Publishing and scheduling", "Community management", "Monthly insights"],
    },
  ],
  relatedServiceSlugs: ["performance-marketing", "content-search-strategy", "advertising-pr"],
  seo: {
    title: "Social Media Management in Dubai",
    description:
      "Social media management for Dubai and Gulf brands: strategy, content calendars, reels, community management and monthly insights.",
    primaryKeyword: "social media management Dubai",
    secondaryKeywords: ["social media agency Dubai", "social media marketing UAE"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Your audience scrolls past hundreds of brands a day. Social media management gives them a reason to stop on yours — with a clear voice, content that looks like you, and a steady rhythm of posts, stories and reels.",
      "We plan each month around your goals and your calendar: launches, offers, exhibitions and events. Then we create the content, publish it at the right times, answer your community and report on what worked.",
      "Because we also produce events, exhibitions and branding, we can capture the moments your audience sees in person and turn them into content — before, during and after the day.",
    ],
    highlights: [
      {
        id: "social-rhythm",
        title: "A steady rhythm",
        body: "A planned monthly calendar, so your channels never go quiet between campaigns.",
      },
      {
        id: "social-on-brand",
        title: "Always on brand",
        body: "Content that follows the same identity as your events, print and signage.",
      },
      {
        id: "social-event-content",
        title: "Event moments, captured",
        body: "Coverage of your exhibitions and events, turned into posts, stories and reels.",
      },
    ],
    deliverables: [
      "Social media strategy",
      "Monthly content calendar",
      "Designed posts, carousels and stories",
      "Short-form video and reels",
      "Scheduling and community management",
      "Monthly insights report",
    ],
    steps: [
      { title: "Strategy", body: "Audience, channels, content pillars and tone of voice." },
      { title: "Create", body: "A month of designed posts, stories and reels for your approval." },
      { title: "Publish & engage", body: "Scheduled posting and replies to your community." },
      { title: "Review", body: "Monthly insights and a sharper plan for the next month." },
    ],
    platforms: ["Instagram", "TikTok", "LinkedIn", "Facebook", "YouTube", "Snapchat", "X"],
    photo: digitalPhotos.socialMedia,
    cta: {
      title: "Want your brand seen between events?",
      lead: "Tell us about your channels and your audience — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

import type { Service } from "@/types/content";

import { OWNER_APPROVED } from "./approval";
import { digitalPhotos } from "./photos";

/** Service: CP p.23 ("Application Development", "Mobility Solutions"). */
export const applicationDevelopment = {
  slug: "application-development",
  vertical: "digital-solutions",
  pillar: "digital-technology",
  capability: "build",
  title: "Application Development",
  summary: "Mobile apps and mobility solutions for iOS and Android, from first idea to launch.",
  offerings: [
    {
      title: "Apps",
      items: ["iOS and Android apps", "Cross-platform apps", "Event and campaign apps"],
    },
    {
      title: "Mobility solutions",
      items: ["Customer and loyalty apps", "Field and staff apps", "Admin dashboards and APIs"],
    },
  ],
  relatedServiceSlugs: ["web-development", "custom-software", "ai-agents"],
  seo: {
    title: "Mobile App Development in Dubai",
    description:
      "iOS and Android app development and mobility solutions for Dubai and Gulf businesses — from first idea and prototype to launch and support.",
    primaryKeyword: "app development Dubai",
    secondaryKeywords: ["mobile app development UAE", "app developers Dubai"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "A good app earns its place on someone’s home screen by doing one job really well. We help you find that job — booking, ordering, loyalty, event check-in or a tool for your own team — and build an app around it that people actually come back to.",
      "We start with the people who will use it: what they need, where they are and how often they will open it. From there we prototype the key screens, test them, and only then move into development, so the budget goes into the features that matter.",
      "Apps are built for iOS and Android, connected to the systems you already use, and launched with the store listings, analytics and support that keep them healthy after day one.",
    ],
    highlights: [
      {
        id: "app-user-first",
        title: "Designed around real users",
        body: "Prototypes are tested with the people who will use the app before a line of production code is written.",
      },
      {
        id: "app-both-platforms",
        title: "iOS and Android",
        body: "One project that reaches both app stores, without maintaining two separate products.",
      },
      {
        id: "app-connected",
        title: "Connected to your systems",
        body: "Apps that talk to your website, CRM, payments and back office through secure APIs.",
      },
    ],
    deliverables: [
      "Product scope and feature plan",
      "Clickable prototype",
      "App design system",
      "iOS and Android builds",
      "Admin panel and APIs",
      "App Store and Google Play launch",
    ],
    steps: [
      { title: "Scope", body: "Users, goals and the first version worth building." },
      { title: "Prototype", body: "Key screens designed and tested before development." },
      { title: "Develop", body: "Iterative builds you can try on your own phone as we go." },
      { title: "Launch & support", body: "Store submission, analytics, fixes and new features." },
    ],
    platforms: ["React Native", "Flutter", "iOS", "Android", "Firebase", "REST & GraphQL APIs"],
    photo: digitalPhotos.applicationDevelopment,
    cta: {
      title: "Have an app idea?",
      lead: "Tell us who it is for and what it should do — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

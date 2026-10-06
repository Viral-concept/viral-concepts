import type { Service } from "@/types/content";

import { OWNER_APPROVED } from "./approval";
import { digitalPhotos } from "./photos";

/** Service: CP p.23 (lists "Web Design & Development" twice; merged into one page). */
export const webDevelopment = {
  slug: "web-development",
  vertical: "digital-solutions",
  pillar: "digital-technology",
  capability: "build",
  title: "Website Design & Development",
  summary:
    "Fast, modern websites designed around your brand and built to turn visitors into enquiries.",
  offerings: [
    {
      title: "Design",
      items: [
        "UX and site structure",
        "UI design for desktop and mobile",
        "Brand-led art direction",
      ],
    },
    {
      title: "Development",
      items: [
        "Company and corporate websites",
        "Landing pages and microsites",
        "Enterprise web solutions",
      ],
    },
    {
      title: "After launch",
      items: ["Hosting and deployment setup", "Content updates", "Ongoing improvements"],
    },
  ],
  relatedServiceSlugs: ["seo", "ecommerce-development", "custom-software"],
  seo: {
    title: "Website Design & Development in Dubai",
    description:
      "Modern, fast, mobile-first websites for Dubai and Gulf businesses — designed around your brand and built to turn visitors into enquiries.",
    primaryKeyword: "website design Dubai",
    secondaryKeywords: ["web development company Dubai", "website development UAE"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Your website is often the first place a client meets your brand — before the stand, the event or the meeting. We design and build websites that make that first impression count: clear about what you do, quick on every phone, and easy for visitors to act on.",
      "Every project starts with structure. We plan the pages around the questions your buyers ask, write the journey towards an enquiry, then design an interface that carries your identity from print and events onto the screen.",
      "We build on a modern stack, so your site loads fast, ranks on clean foundations and stays simple for your team to update — from a focused company website to enterprise web solutions.",
    ],
    highlights: [
      {
        id: "web-one-brand",
        title: "One brand, online and offline",
        body: "Your website follows the same identity your audience sees on the stand, the banner and the backdrop.",
      },
      {
        id: "web-performance",
        title: "Built for speed",
        body: "Modern, lightweight builds that load quickly on mobile networks and score well on Core Web Vitals.",
      },
      {
        id: "web-conversion",
        title: "Designed to convert",
        body: "Clear journeys, strong calls to action and enquiry forms that make it easy to get in touch.",
      },
      {
        id: "web-seo-ready",
        title: "Search-ready from day one",
        body: "Clean structure, metadata and schema markup in place before launch, not added later.",
      },
    ],
    deliverables: [
      "Sitemap and page structure",
      "Desktop and mobile designs",
      "Responsive, accessible build",
      "Enquiry forms connected to your inbox",
      "On-page SEO and analytics setup",
      "Launch, hosting and handover",
    ],
    steps: [
      { title: "Discover", body: "Goals, audience, competitors and the content you already have." },
      { title: "Design", body: "Structure, wireframes and visual design for desktop and mobile." },
      { title: "Build", body: "Development, content, testing on real devices and speed tuning." },
      {
        title: "Launch & grow",
        body: "Go-live, analytics, and improvements based on how visitors use it.",
      },
    ],
    platforms: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel"],
    photo: digitalPhotos.webDevelopment,
    cta: {
      title: "Planning a new website?",
      lead: "Tell us what it needs to do — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

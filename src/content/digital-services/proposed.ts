import type { Governed, Service } from "@/types/content";

import { proposed } from "../sources";

/**
 * Expanded digital, development and AI services (checklist #27).
 *
 * None of these is in the Company Profile, so each is gated: visible with a review flag on
 * preview deployments, absent from production, navigation, sitemap and structured data until
 * the client confirms it. To publish a service, replace `...AWAITING_CONFIRMATION` in its entry
 * with `status: "live", verified: true, source: { kind: "client-confirmed", confirmedOn: "YYYY-MM-DD" }`.
 * (Tests reject a live entry without a client-confirmed source.)
 *
 * Copy describes what the service is; it makes no claims about past results, clients or numbers.
 */
const AWAITING_CONFIRMATION = {
  status: "proposed",
  verified: false,
  source: proposed("Expanded digital/AI offering — awaiting client confirmation (checklist #27)"),
} as const satisfies Governed;

const base = { vertical: "digital-solutions", pillar: "digital-technology" } as const;

export const proposedDigitalServices = [
  /* ------------------------------------------------------------ Marketing */
  {
    ...base,
    slug: "performance-marketing",
    capability: "marketing",
    title: "Performance Marketing",
    summary: "Google Ads and Meta Ads campaigns planned, run and measured against your goals.",
    offerings: [
      {
        title: "Channels",
        items: ["Google Ads", "Meta Ads (Facebook & Instagram)", "Performance marketing campaigns"],
      },
      { title: "Measurement", items: ["Conversion tracking", "Campaign reporting"] },
    ],
    relatedServiceSlugs: ["seo", "social-media-management", "content-search-strategy"],
    seo: {
      title: "Performance Marketing, Google & Meta Ads in Dubai",
      description:
        "Google Ads and Meta Ads campaign management for businesses in Dubai and across the Gulf.",
      primaryKeyword: "performance marketing agency Dubai",
      secondaryKeywords: ["Google Ads agency Dubai", "Meta ads agency Dubai"],
    },
    ...AWAITING_CONFIRMATION,
  },
  {
    ...base,
    slug: "content-search-strategy",
    capability: "marketing",
    title: "Content & Search Strategy",
    summary: "Local and technical SEO with a content plan, so the right buyers find you.",
    offerings: [
      { title: "Search", items: ["Local SEO", "Technical SEO", "AI search visibility (GEO)"] },
      { title: "Content", items: ["Content strategy", "Content calendars"] },
    ],
    relatedServiceSlugs: ["seo", "performance-marketing", "web-development"],
    seo: {
      title: "Local SEO, Technical SEO & Content Strategy in Dubai",
      description:
        "Local SEO, technical SEO and content strategy for businesses in Dubai and across the Gulf.",
      primaryKeyword: "local SEO Dubai",
      secondaryKeywords: ["technical SEO Dubai", "content strategy Dubai"],
    },
    ...AWAITING_CONFIRMATION,
  },

  /* -------------------------------------------------------- Web & product */
  {
    ...base,
    slug: "ecommerce-development",
    capability: "build",
    title: "E-Commerce Development",
    summary: "Online stores with secure checkout, built to sell and simple to manage.",
    offerings: [
      {
        title: "Scope",
        items: ["E-commerce websites", "Payment and checkout integration", "Product catalogues"],
      },
    ],
    relatedServiceSlugs: ["web-development", "performance-marketing", "custom-software"],
    seo: {
      title: "E-Commerce Website Development in Dubai",
      description:
        "E-commerce website development with secure checkout for businesses in Dubai and the Gulf.",
      primaryKeyword: "ecommerce website development Dubai",
      secondaryKeywords: [],
    },
    ...AWAITING_CONFIRMATION,
  },
  {
    ...base,
    slug: "custom-software",
    capability: "build",
    title: "Web Apps & Custom Software",
    summary: "Next.js and React web applications and custom software, built around how you work.",
    offerings: [
      {
        title: "Development",
        items: ["Next.js development", "React development", "Web applications"],
      },
      { title: "Integration", items: ["Custom software solutions", "API integrations"] },
    ],
    relatedServiceSlugs: ["web-development", "application-development", "ai-automation"],
    seo: {
      title: "Web App & Custom Software Development in Dubai",
      description:
        "Next.js and React web applications, custom software and API integrations for businesses in Dubai.",
      primaryKeyword: "custom software development Dubai",
      secondaryKeywords: ["Next.js development Dubai", "React development Dubai"],
    },
    ...AWAITING_CONFIRMATION,
  },

  /* ------------------------------------------------------- AI & automation */
  {
    ...base,
    slug: "ai-automation",
    capability: "ai",
    title: "AI & Workflow Automation",
    summary:
      "Automation that takes repetitive work off your team, from first enquiry to follow-up.",
    offerings: [
      {
        title: "Automation",
        items: [
          "AI-powered business automation",
          "Workflow automation",
          "AI-powered internal tools",
        ],
      },
      { title: "Sales", items: ["Intelligent lead qualification", "CRM automation"] },
    ],
    relatedServiceSlugs: ["ai-agents", "generative-ai", "custom-software"],
    seo: {
      title: "AI & Workflow Automation in Dubai",
      description:
        "AI-powered business and workflow automation, including lead qualification, for businesses in Dubai.",
      primaryKeyword: "AI automation Dubai",
      secondaryKeywords: ["workflow automation UAE", "lead qualification automation"],
    },
    ...AWAITING_CONFIRMATION,
  },
  {
    ...base,
    slug: "ai-agents",
    capability: "ai",
    title: "AI Agents & Chatbots",
    summary: "AI agents and chatbots that answer customers and support your team, day and night.",
    offerings: [
      { title: "Agents", items: ["AI agents", "Agentic AI workflows", "AI knowledge assistants"] },
      { title: "Customer-facing", items: ["AI chatbots", "AI customer support"] },
    ],
    relatedServiceSlugs: ["ai-automation", "generative-ai", "web-development"],
    seo: {
      title: "AI Agents & Chatbot Development in Dubai",
      description:
        "AI agents, chatbots and knowledge assistants for customer support and internal teams in Dubai.",
      primaryKeyword: "AI chatbot development Dubai",
      secondaryKeywords: ["AI agents Dubai", "agentic AI UAE"],
    },
    ...AWAITING_CONFIRMATION,
  },
  {
    ...base,
    slug: "generative-ai",
    capability: "ai",
    title: "Generative AI & Integrations",
    summary: "Generative AI connected to your systems, through custom integrations and APIs.",
    offerings: [
      {
        title: "Integration",
        items: ["Generative AI solutions", "Custom AI integrations", "API & AI integrations"],
      },
    ],
    relatedServiceSlugs: ["ai-agents", "ai-automation", "custom-software"],
    seo: {
      title: "Generative AI & AI Integration Services in Dubai",
      description:
        "Generative AI solutions and custom AI and API integrations for businesses in Dubai and the Gulf.",
      primaryKeyword: "generative AI Dubai",
      secondaryKeywords: ["AI integration services UAE"],
    },
    ...AWAITING_CONFIRMATION,
  },
] as const satisfies readonly Service[];

import type { Service } from "@/types/content";

import { OWNER_APPROVED } from "./approval";
import { digitalPhotos } from "./photos";

/** Web & product services beyond CP p.23, approved by the website owner (see ./approval.ts). */
const base = {
  vertical: "digital-solutions",
  pillar: "digital-technology",
  capability: "build",
} as const;

export const ecommerceDevelopment = {
  ...base,
  slug: "ecommerce-development",
  title: "E-Commerce Development",
  summary: "Online stores with secure checkout, built to sell and simple to manage.",
  offerings: [
    {
      title: "Store",
      items: ["E-commerce websites", "Product catalogues and search", "Mobile-first checkout"],
    },
    {
      title: "Integrations",
      items: ["Payment gateways", "Shipping and delivery", "Inventory and ERP connections"],
    },
    {
      title: "Growth",
      items: ["Product feeds for ads", "Abandoned-cart flows", "Store analytics"],
    },
  ],
  relatedServiceSlugs: ["web-development", "performance-marketing", "custom-software"],
  seo: {
    title: "E-Commerce Website Development in Dubai",
    description:
      "E-commerce websites for Dubai and Gulf brands — fast product pages, secure checkout, payment and delivery integrations, and easy store management.",
    primaryKeyword: "ecommerce website development Dubai",
    secondaryKeywords: ["online store development UAE", "Shopify developer Dubai"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "An online store has one job: make buying easy. We design and build e-commerce websites where products are easy to find, pages load fast on mobile and checkout takes as few taps as possible.",
      "Behind the storefront, we connect the pieces that make a store run — payment gateways, delivery partners, stock levels and your accounting or ERP — so orders flow through without manual re-typing.",
      "We set up the analytics and product feeds your marketing needs from day one, so the store is ready for Google Shopping and social campaigns as soon as it launches, and simple for your team to manage afterwards.",
    ],
    highlights: [
      {
        id: "ecom-checkout",
        title: "Checkout that converts",
        body: "Short, mobile-first checkout flows with the payment options Gulf shoppers expect.",
      },
      {
        id: "ecom-integrated",
        title: "Fully integrated",
        body: "Payments, delivery, stock and accounting connected so orders run without re-typing.",
      },
      {
        id: "ecom-marketing-ready",
        title: "Ready to advertise",
        body: "Product feeds and tracking prepared for Google Shopping and social ads from launch.",
      },
    ],
    deliverables: [
      "Store structure and catalogue plan",
      "Storefront and product page design",
      "Secure checkout and payments",
      "Delivery and stock integrations",
      "Analytics and product feeds",
      "Team training and handover",
    ],
    steps: [
      { title: "Plan", body: "Catalogue, customer journeys, payments and delivery options." },
      { title: "Design", body: "Storefront, product pages and checkout, mobile first." },
      {
        title: "Build & integrate",
        body: "Development and connections to payments, stock and delivery.",
      },
      {
        title: "Launch & grow",
        body: "Go-live, tracking, feeds and improvements from real orders.",
      },
    ],
    platforms: ["Shopify", "WooCommerce", "Next.js Commerce", "Stripe", "Google Merchant Center"],
    photo: digitalPhotos.ecommerce,
    cta: {
      title: "Ready to sell online?",
      lead: "Tell us about your products and your customers — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

export const customSoftware = {
  ...base,
  slug: "custom-software",
  title: "Web Apps & Custom Software",
  summary: "Next.js and React web applications and custom software, built around how you work.",
  offerings: [
    {
      title: "Development",
      items: ["Next.js development", "React development", "Web applications and portals"],
    },
    {
      title: "Integration",
      items: ["Custom software solutions", "API integrations", "Dashboards and internal tools"],
    },
  ],
  relatedServiceSlugs: ["web-development", "application-development", "ai-automation"],
  seo: {
    title: "Web App & Custom Software Development Dubai",
    description:
      "Next.js and React web applications, portals, dashboards and custom software with API integrations, built around how Dubai businesses work.",
    primaryKeyword: "custom software development Dubai",
    secondaryKeywords: ["Next.js development Dubai", "React development Dubai"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Off-the-shelf software rarely fits a growing business perfectly. When spreadsheets, copy-paste and workarounds start slowing your team down, a web application built around your own process can give that time back.",
      "We build customer portals, booking and quotation systems, dashboards and internal tools with Next.js and React — the same modern stack used by leading product teams — and connect them to the services you already rely on through secure APIs.",
      "Projects run in short, visible sprints. You see working software early, give feedback as we go, and end up with a product your team owns, with documentation and support to keep it growing.",
    ],
    highlights: [
      {
        id: "cs-your-process",
        title: "Built around your process",
        body: "Software shaped to how your team actually works, not the other way round.",
      },
      {
        id: "cs-modern-stack",
        title: "Modern, proven stack",
        body: "Next.js, React and TypeScript for applications that are fast, secure and maintainable.",
      },
      {
        id: "cs-sprints",
        title: "Working software early",
        body: "Short sprints with regular demos, so you can steer the product while it is built.",
      },
    ],
    deliverables: [
      "Workflow and requirements map",
      "Architecture and prototype",
      "Web application build",
      "API and system integrations",
      "Testing, security and deployment",
      "Documentation and support plan",
    ],
    steps: [
      { title: "Discover", body: "Map the workflow, users and systems the software must fit." },
      { title: "Architect", body: "Technical plan and a clickable prototype to validate it." },
      { title: "Build in sprints", body: "Regular releases with demos and your feedback." },
      { title: "Deploy & support", body: "Secure deployment, training and ongoing improvements." },
    ],
    platforms: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "REST & GraphQL APIs"],
    photo: digitalPhotos.customSoftware,
    cta: {
      title: "Got a process that needs its own software?",
      lead: "Tell us how your team works today — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

import type { Service } from "@/types/content";

import { OWNER_APPROVED } from "./approval";
import { digitalPhotos } from "./photos";

/** AI & automation services, approved by the website owner (see ./approval.ts). */
const base = {
  vertical: "digital-solutions",
  pillar: "digital-technology",
  capability: "ai",
} as const;

export const aiAutomation = {
  ...base,
  slug: "ai-automation",
  title: "AI & Workflow Automation",
  summary: "Automation that takes repetitive work off your team, from first enquiry to follow-up.",
  offerings: [
    {
      title: "Automation",
      items: ["AI-powered business automation", "Workflow automation", "AI-powered internal tools"],
    },
    {
      title: "Sales & operations",
      items: ["Intelligent lead qualification", "CRM automation", "Document and data processing"],
    },
  ],
  relatedServiceSlugs: ["ai-agents", "generative-ai", "custom-software"],
  seo: {
    title: "AI & Workflow Automation in Dubai",
    description:
      "AI-powered business and workflow automation for Dubai companies — lead qualification, CRM updates, follow-ups and internal tools that save hours.",
    primaryKeyword: "AI automation Dubai",
    secondaryKeywords: ["workflow automation UAE", "business process automation Dubai"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Most teams lose hours every week to the same small tasks: copying enquiries into a CRM, chasing follow-ups, sorting emails, re-typing data between systems. AI and workflow automation hands that work to software, so your people can spend their time on clients.",
      "We map how work moves through your business today, find the steps that are repetitive and rule-based, and automate them — using AI where judgement is needed, such as reading an enquiry, scoring a lead or summarising a document.",
      "Every automation is built with clear rules, a human in the loop where it matters and logs you can check, then monitored and improved as your business changes.",
    ],
    highlights: [
      {
        id: "aia-hours-back",
        title: "Hours back every week",
        body: "Repetitive copy-paste work moved from your team to reliable automated flows.",
      },
      {
        id: "aia-lead-scoring",
        title: "Faster, smarter follow-up",
        body: "New enquiries read, qualified and routed to the right person automatically.",
      },
      {
        id: "aia-human-loop",
        title: "You stay in control",
        body: "Approvals, alerts and logs wherever a person should check before something happens.",
      },
    ],
    deliverables: [
      "Process map and automation plan",
      "Lead capture and qualification flows",
      "CRM and email automation",
      "AI document and data processing",
      "Dashboards and alerts",
      "Monitoring and improvements",
    ],
    steps: [
      { title: "Map", body: "Walk through your workflows and pick the highest-value tasks." },
      { title: "Design", body: "Define triggers, rules, AI steps and human approvals." },
      { title: "Build & integrate", body: "Connect your forms, inbox, CRM and tools." },
      { title: "Monitor", body: "Logs, alerts and regular tuning as volumes grow." },
    ],
    platforms: [
      "n8n",
      "Make",
      "Zapier",
      "HubSpot",
      "Zoho CRM",
      "Google Workspace",
      "Microsoft 365",
    ],
    photo: digitalPhotos.aiAutomation,
    cta: {
      title: "Which task should never be done by hand again?",
      lead: "Tell us where your team loses time — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

export const aiAgents = {
  ...base,
  slug: "ai-agents",
  title: "AI Agents & Chatbots",
  summary: "AI agents and chatbots that answer customers and support your team, day and night.",
  offerings: [
    { title: "Agents", items: ["AI agents", "Agentic AI workflows", "AI knowledge assistants"] },
    {
      title: "Customer-facing",
      items: [
        "Website and WhatsApp chatbots",
        "AI customer support",
        "Arabic and English conversations",
      ],
    },
  ],
  relatedServiceSlugs: ["ai-automation", "generative-ai", "web-development"],
  seo: {
    title: "AI Agents & Chatbot Development in Dubai",
    description:
      "AI agents and chatbots for websites and WhatsApp that answer customers, qualify leads and support your team in Arabic and English, around the clock.",
    primaryKeyword: "AI chatbot development Dubai",
    secondaryKeywords: ["AI agents Dubai", "WhatsApp chatbot UAE"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Customers expect an answer the moment they ask — at midnight, on a weekend, in Arabic or English. AI agents and chatbots give them one, on your website, WhatsApp and other channels, while your team focuses on the conversations that need a person.",
      "We train each agent on your own information: services, prices you choose to share, FAQs, policies and documents. It answers questions, collects the details your team needs, books meetings and hands the conversation over to a person whenever it should.",
      "Inside your business, the same technology becomes a knowledge assistant: one place where staff can ask a question and get an answer drawn from your own documents and processes.",
    ],
    highlights: [
      {
        id: "aig-always-on",
        title: "Always on",
        body: "Instant answers for customers at any hour, on the channels they already use.",
      },
      {
        id: "aig-your-knowledge",
        title: "Trained on your business",
        body: "Answers drawn from your own services, FAQs and documents — not generic replies.",
      },
      {
        id: "aig-handover",
        title: "Smooth handover",
        body: "Clear rules for when the agent passes a conversation to your team, with full context.",
      },
    ],
    deliverables: [
      "Use cases and conversation design",
      "Knowledge base setup",
      "Website and WhatsApp chatbot",
      "Lead capture and booking",
      "Human handover rules",
      "Conversation review and tuning",
    ],
    steps: [
      { title: "Define", body: "Choose the questions and tasks the agent should handle." },
      { title: "Train", body: "Load your content and design the conversation flows." },
      { title: "Integrate", body: "Connect your website, WhatsApp, CRM and calendar." },
      { title: "Improve", body: "Review real conversations and refine answers regularly." },
    ],
    platforms: [
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "WhatsApp Business",
      "Website chat",
      "CRM integrations",
    ],
    photo: digitalPhotos.aiAgents,
    cta: {
      title: "Want every customer answered instantly?",
      lead: "Tell us what your customers ask most — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

export const generativeAi = {
  ...base,
  slug: "generative-ai",
  title: "Generative AI & Integrations",
  summary: "Generative AI connected to your systems, through custom integrations and APIs.",
  offerings: [
    {
      title: "Integration",
      items: ["Generative AI solutions", "Custom AI integrations", "API & AI integrations"],
    },
    {
      title: "Use cases",
      items: [
        "Content and proposal drafting",
        "Document search and summaries",
        "Image and copy variations",
      ],
    },
  ],
  relatedServiceSlugs: ["ai-agents", "ai-automation", "custom-software"],
  seo: {
    title: "Generative AI & AI Integration Services Dubai",
    description:
      "Generative AI solutions and custom AI integrations for Dubai and Gulf businesses — connected securely to your documents, systems and workflows.",
    primaryKeyword: "generative AI Dubai",
    secondaryKeywords: ["AI integration services UAE", "custom AI solutions Dubai"],
  },
  ...OWNER_APPROVED,
  page: {
    ...OWNER_APPROVED,
    intro: [
      "Generative AI can draft proposals, summarise long documents, answer questions about your data and produce first versions of copy and visuals in seconds. The value comes when it is connected to your own systems and shaped around real tasks.",
      "We run a short use-case workshop to find where generative AI will save the most time or open new possibilities, then build working prototypes you can try with your own content before anything is rolled out.",
      "Approved ideas become secure integrations: AI features inside your website, CRM, internal tools or apps, with access controls, data safeguards and guidelines so your team can use them confidently.",
    ],
    highlights: [
      {
        id: "gen-real-tasks",
        title: "Real tasks, not hype",
        body: "We start from the work your team does today and apply AI where it clearly helps.",
      },
      {
        id: "gen-prototype",
        title: "Prove it first",
        body: "Working prototypes on your own content before you commit to a full build.",
      },
      {
        id: "gen-secure",
        title: "Secure by design",
        body: "Access controls and data safeguards built in, with clear usage guidelines for staff.",
      },
    ],
    deliverables: [
      "Use-case workshop and roadmap",
      "Working prototype",
      "Custom AI integration",
      "Secure document search (RAG)",
      "Usage guidelines and guardrails",
      "Team onboarding",
    ],
    steps: [
      { title: "Workshop", body: "Find and rank the use cases worth building." },
      { title: "Prototype", body: "Test the idea quickly with your own content." },
      { title: "Integrate", body: "Build it into your tools with security and guardrails." },
      { title: "Roll out", body: "Train your team and measure the time saved." },
    ],
    platforms: ["OpenAI API", "Anthropic Claude", "Google Gemini", "Vector databases", "REST APIs"],
    photo: digitalPhotos.generativeAi,
    cta: {
      title: "Curious where AI could help your business?",
      lead: "Tell us about the work that takes longest — we’ll roll it out for you.",
    },
  },
} as const satisfies Service;

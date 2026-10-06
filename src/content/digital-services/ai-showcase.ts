import type { Governed } from "@/types/content";

import { OWNER_APPROVED } from "../digital-services/approval";

/**
 * The AI & Automation showcase (homepage and /digital-solutions), published with the AI
 * services under the website owner's approval (see digital-services/approval.ts).
 *
 * The chat and workflow are clearly labelled illustrations of how such a system works — not a
 * record of a real client conversation, and no numbers or results are claimed.
 */
export const aiShowcase = {
  ...OWNER_APPROVED,
  eyebrow: "AI & Automation",
  title: "Intelligence that works between your events",
  intro:
    "AI agents, chatbots and automated workflows that answer customers, qualify enquiries and keep your team’s tools in sync — designed around how your business already runs.",
  chat: {
    label: "Example conversation",
    caption: "An illustration of an AI enquiry assistant on a company website.",
    messages: [
      {
        from: "visitor",
        text: "We’re exhibiting at a trade show next month. Can you help with a stand?",
      },
      { from: "agent", text: "Of course. How big is your space, and what are the show dates?" },
      { from: "visitor", text: "6 × 9 metres, from 18 to 21 November." },
      {
        from: "agent",
        text: "Thank you. I’ve sent your brief to the exhibitions team — they’ll contact you shortly.",
      },
    ],
    outcome: "Enquiry qualified · added to CRM · team notified",
  },
  workflow: {
    label: "How an automated enquiry flows",
    steps: [
      "Enquiry arrives",
      "AI agent qualifies",
      "CRM updated",
      "Team notified",
      "Follow-up scheduled",
    ],
  },
  agents: [
    {
      id: "sales",
      title: "Sales assistant",
      body: "Answers new enquiries, asks the right questions and books meetings.",
    },
    {
      id: "support",
      title: "Customer support agent",
      body: "Handles common questions around the clock and hands over when it should.",
    },
    {
      id: "knowledge",
      title: "Knowledge assistant",
      body: "Gives your team answers drawn from your own documents and processes.",
    },
    {
      id: "operations",
      title: "Operations automation",
      body: "Moves information between your tools and flags what needs a person.",
    },
  ],
} as const satisfies Governed & Record<string, unknown>;

import type { ProcessStep } from "@/types/content";

/** "Our Process to Success" — the nine steps from the Company Profile (CP p.34). */
export const processSteps = [
  { id: "coffee", title: "Coffee" },
  { id: "analysis", title: "Analysis" },
  { id: "design", title: "Design" },
  { id: "proposal", title: "Proposal" },
  { id: "approval", title: "Approval" },
  { id: "production", title: "Production" },
  { id: "execution", title: "Execution" },
  { id: "delivery", title: "Delivery" },
  { id: "post-sale-service", title: "Post-Sale Service" },
] as const satisfies readonly ProcessStep[];

/** The step the Company Profile highlights in yellow. */
export const HIGHLIGHTED_PROCESS_STEP = "approval" satisfies (typeof processSteps)[number]["id"];

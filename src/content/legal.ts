import type { IsoDate } from "@/types/content";

/**
 * Legal pages. Their text must come from the client (or be a draft the client's adviser has
 * approved) — checklist #8. Until then `sections` is empty, the pages stay hidden in production
 * (see `pages.privacyPolicy` / `pages.terms`) and the preview shows what is missing.
 * A test refuses to publish a legal page without text and a "last updated" date.
 */
export interface LegalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface LegalDocument {
  readonly title: string;
  readonly description: string;
  readonly updatedOn?: IsoDate;
  readonly sections: readonly LegalSection[];
}

export const legalDocuments = {
  privacyPolicy: {
    title: "Privacy Policy",
    description: "How Viral Concepts collects, uses and protects personal information.",
    sections: [],
  },
  terms: {
    title: "Terms of Service",
    description: "The terms that apply to using the Viral Concepts website.",
    sections: [],
  },
} as const satisfies Record<"privacyPolicy" | "terms", LegalDocument>;

export type LegalKey = keyof typeof legalDocuments;

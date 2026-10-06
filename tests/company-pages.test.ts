import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { aboutContent } from "@/content/about";
import { companyProfileDownload } from "@/content/company-profile";
import { industries } from "@/content/industries";
import { industriesLanding } from "@/content/industries-landing";
import { pages } from "@/content/pages";
import { projects } from "@/content/projects";
import { isPublishable } from "@/lib/publishing";
import type { Industry, Project } from "@/types/content";

/** About, Industries and Company Profile (Stage 8). */
const PUBLIC_DIR = path.resolve(import.meta.dirname, "../public");
const DOWNLOADS_DIR = path.join(PUBLIC_DIR, "downloads");

/** Template-only claims the Discovery doc (section N) rules out. */
const TEMPLATE_ONLY = [
  /\bexcellence\b/i,
  /customer-centric/i,
  /\b11\+/,
  /\b500\+/,
  /98%/,
  /across the region/i,
  /lorem ipsum/i,
];

describe("about page", () => {
  it("restates the Company Profile only", () => {
    const text = JSON.stringify(aboutContent);
    for (const pattern of TEMPLATE_ONLY) {
      expect(text, String(pattern)).not.toMatch(pattern);
    }
    for (const statement of aboutContent.purpose) {
      expect(statement.source.kind, statement.id).toBe("company-profile");
    }
  });

  it("keeps the SEO title within 60 characters (used without the site suffix)", () => {
    expect(aboutContent.seo.title.length).toBeLessThanOrEqual(60);
    expect(aboutContent.seo.description.length).toBeLessThanOrEqual(160);
  });
});

describe("company profile download", () => {
  it("public/downloads holds only the approved, published file", () => {
    // Everything in public/ is served, linked or not, so an unapproved PDF must never sit there.
    const files = existsSync(DOWNLOADS_DIR)
      ? readdirSync(DOWNLOADS_DIR).filter((f) => !f.startsWith("."))
      : [];
    const approved =
      companyProfileDownload && isPublishable(companyProfileDownload)
        ? [path.basename(companyProfileDownload.value.href)]
        : [];
    expect(files.sort()).toEqual(approved);
  });

  it("a published download exists, matches its recorded size and stays under 5 MB", () => {
    if (!companyProfileDownload) return;
    const file = path.join(PUBLIC_DIR, companyProfileDownload.value.href);
    expect(existsSync(file)).toBe(true);
    const bytes = statSync(file).size;
    expect(bytes).toBe(companyProfileDownload.value.bytes);
    expect(bytes).toBeLessThanOrEqual(5 * 1_048_576);
  });

  it("the Company Profile page is published only with a published download", () => {
    if (isPublishable(pages.companyProfile)) {
      expect(companyProfileDownload && isPublishable(companyProfileDownload)).toBe(true);
    }
  });
});

describe("industries", () => {
  const allIndustries: readonly Industry[] = industries;
  const allProjects: readonly Project[] = projects;

  it("projects reference existing industries", () => {
    const slugs = new Set(allIndustries.map((i) => i.slug));
    for (const project of allProjects) {
      if (project.industrySlug) {
        expect(slugs.has(project.industrySlug), project.slug).toBe(true);
      }
    }
  });

  it("industry copy stays within SEO limits", () => {
    expect(industriesLanding.seo.description.length).toBeLessThanOrEqual(160);
    for (const industry of allIndustries) {
      expect(industry.summary.length, industry.slug).toBeLessThanOrEqual(120);
    }
  });
});

describe("legal pages", () => {
  it("are published only with the client's text and a last-updated date", async () => {
    const { legalDocuments } = await import("@/content/legal");
    for (const key of ["privacyPolicy", "terms"] as const) {
      if (isPublishable(pages[key])) {
        const doc: { sections: readonly unknown[]; updatedOn?: string } = legalDocuments[key];
        expect(doc.sections.length, key).toBeGreaterThan(0);
        expect(doc.updatedOn, key).toBeDefined();
      }
    }
  });
});

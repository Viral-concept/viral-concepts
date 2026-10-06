import { afterEach, describe, expect, it, vi } from "vitest";

import type { NavigationModel } from "@/types/navigation";

/**
 * Navigation must only link to pages that exist in the deployment's content mode.
 * The content layer reads the environment at import time, hence resetModules.
 */
async function navigationFor(mode: "production" | "preview"): Promise<NavigationModel> {
  vi.resetModules();
  vi.stubEnv("VERCEL_ENV", mode);
  const { getNavigation } = await import("@/lib/navigation");
  return getNavigation();
}

function allHrefs(model: NavigationModel): string[] {
  return [
    ...model.primary.flatMap((item) =>
      item.kind === "link"
        ? [item.href]
        : [item.overview.href, ...item.sections.flatMap((s) => s.links.map((l) => l.href))],
    ),
    ...model.footerColumns.flatMap((column) => column.links.map((l) => l.href)),
    ...model.legal.map((l) => l.href),
    model.cta.href,
  ];
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("navigation in production", () => {
  it("links only to pages that exist", async () => {
    const hrefs = allHrefs(await navigationFor("production"));
    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("/contact");
    expect(hrefs).toContain("/services/exhibitions");
    // The approved digital & AI offering: every service links to its own page.
    for (const page of [
      "/digital-solutions/seo",
      "/digital-solutions/web-development",
      "/digital-solutions/performance-marketing",
      "/digital-solutions/ai-agents",
      "/digital-solutions/generative-ai",
    ]) {
      expect(hrefs, page).toContain(page);
    }

    // Unconfirmed: draft projects/industries, unapproved PDF and legal text.
    for (const hidden of [
      "/digital-solutions#seo",
      "/projects",
      "/industries",
      "/company-profile",
      "/privacy-policy",
      "/terms",
    ]) {
      expect(hrefs, hidden).not.toContain(hidden);
    }
  });

  it("groups the digital menu by capability", async () => {
    const model = await navigationFor("production");
    const digital = model.primary.find((item) => item.id === "digital-solutions");
    expect(digital?.kind).toBe("menu");
    if (digital?.kind === "menu") {
      expect(digital.sections.map((section) => section.title)).toEqual([
        "Digital Marketing",
        "Web & App Development",
        "AI & Automation",
      ]);
    }
  });

  it("carries no review labels", async () => {
    const model = await navigationFor("production");
    expect(JSON.stringify(model)).not.toContain("reviewLabel");
  });

  it("uses only root-relative internal links", async () => {
    for (const href of allHrefs(await navigationFor("production"))) {
      // A path, optionally with an in-page anchor (/digital-solutions#seo).
      expect(href, href).toMatch(/^\/[a-z0-9\-/]*(#[a-z0-9-]+)?$/);
    }
  });
});

describe("navigation in preview", () => {
  it("shows unconfirmed pages for review", async () => {
    const model = await navigationFor("preview");
    const hrefs = allHrefs(model);
    expect(hrefs).toContain("/digital-solutions/ai-agents");
    // Draft projects and industries are reviewable in preview only.
    expect(hrefs).toContain("/projects");
    expect(hrefs).toContain("/industries");
  });
});

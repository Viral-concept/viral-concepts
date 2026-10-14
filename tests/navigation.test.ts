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
    // Both ways into the business: event services and the branding & print catalogue.
    for (const page of [
      "/services",
      "/services/branding-printing",
      "/products",
      "/products#flags",
    ]) {
      expect(hrefs, page).toContain(page);
    }
    // The digital agency is a separate business and website.
    expect(hrefs.some((href) => href.startsWith("/digital-solutions"))).toBe(false);

    // Unconfirmed: draft projects/industries, unapproved PDF and legal text.
    for (const hidden of [
      "/projects",
      "/industries",
      "/company-profile",
      "/privacy-policy",
      "/terms",
    ]) {
      expect(hrefs, hidden).not.toContain(hidden);
    }
  });

  it("leads with the events menu, then branding & print", async () => {
    const model = await navigationFor("production");
    expect(model.primary.slice(0, 2).map((item) => item.label)).toEqual([
      "Events",
      "Branding & Print",
    ]);
  });

  it("carries no review labels", async () => {
    const model = await navigationFor("production");
    expect(JSON.stringify(model)).not.toContain("reviewLabel");
  });

  it("uses only root-relative internal links", async () => {
    for (const href of allHrefs(await navigationFor("production"))) {
      // A path, optionally with an in-page anchor (/products#flags).
      expect(href, href).toMatch(/^\/[a-z0-9\-/]*(#[a-z0-9-]+)?$/);
    }
  });
});

describe("navigation in preview", () => {
  it("shows unconfirmed pages for review", async () => {
    const model = await navigationFor("preview");
    const hrefs = allHrefs(model);
    // Draft projects and industries are reviewable in preview only.
    expect(hrefs).toContain("/projects");
    expect(hrefs).toContain("/industries");
  });
});

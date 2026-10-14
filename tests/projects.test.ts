import { afterEach, describe, expect, it, vi } from "vitest";

import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { isProofImage, isPublishable } from "@/lib/publishing";
import type { Project } from "@/types/content";

/**
 * Portfolio rules (Discovery doc, section H). Every claim on a published project must be
 * confirmed, and nothing the client has not cleared may name them.
 */
const allProjects: readonly Project[] = projects;
const serviceSlugs = new Set<string>([...services].map((s) => s.slug));

function publicText(project: Project): string[] {
  return [
    project.title,
    project.summary,
    project.challenge,
    project.solution,
    project.execution,
    project.outcome,
    ...project.gallery.map((image) => image.alt),
  ].filter((text): text is string => text !== undefined);
}

describe("project records", () => {
  it("have unique slugs, at least one category, and credit only existing services", () => {
    const slugs = allProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const project of allProjects) {
      expect(project.categories.length, project.slug).toBeGreaterThan(0);
      for (const slug of project.serviceSlugs) {
        expect(serviceSlugs.has(slug), `${project.slug} → ${slug}`).toBe(true);
      }
    }
  });

  it("a published project has a summary and at least one approved project photo", () => {
    for (const project of allProjects.filter(isPublishable)) {
      expect(project.summary, project.slug).toBeDefined();
      expect(project.gallery.some(isProofImage), project.slug).toBe(true);
    }
  });

  it("a published project never names a client without written permission", () => {
    for (const project of allProjects.filter(isPublishable)) {
      const { client } = project;
      if (!client || client.permissionToName) continue;
      for (const text of publicText(project)) {
        expect(text.toLowerCase(), project.slug).not.toContain(client.name.toLowerCase());
      }
    }
  });
});

describe("project queries", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  async function contentFor(mode: "production" | "preview") {
    vi.resetModules();
    vi.stubEnv("VERCEL_ENV", mode);
    return import("@/lib/content");
  }

  it("hide every draft project in production, so the Projects page does not exist yet", async () => {
    const content = await contentFor("production");
    expect(content.getProjects()).toEqual(allProjects.filter(isPublishable));
    expect(content.hasProjectsPage()).toBe(allProjects.some(isPublishable));
  });

  it("rank related projects by shared categories and services, never the project itself", async () => {
    const content = await contentFor("preview");
    const project = content.getProject("ajman-bank-career-fair");
    expect(project).toBeDefined();
    if (!project) return;
    const related = content.getRelatedProjects(project, 3);
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.map((p) => p.slug)).not.toContain(project.slug);
    for (const other of related) {
      const shares =
        other.categories.some((c) => project.categories.includes(c)) ||
        other.serviceSlugs.some((s) => project.serviceSlugs.includes(s));
      expect(shares, other.slug).toBe(true);
    }
  });

  it("count only categories that have visible projects", async () => {
    const content = await contentFor("preview");
    for (const { category, count } of content.getProjectCategoryCounts()) {
      expect(count).toBe(
        content.getProjects().filter((p) => p.categories.includes(category)).length,
      );
      expect(count).toBeGreaterThan(0);
    }
  });
});

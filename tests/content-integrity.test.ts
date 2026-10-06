import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { digitalServices } from "@/content/digital-services";
import { faqs } from "@/content/faqs";
import { homeContent } from "@/content/home";
import { industries } from "@/content/industries";
import { media } from "@/content/media";
import { pillars } from "@/content/pillars";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { stats } from "@/content/stats";
import { testimonials } from "@/content/testimonials";
import { isPublishable } from "@/lib/publishing";
import type { Faq, Governed, Industry, Project, Service, Stat } from "@/types/content";

/**
 * Content invariants. These run in CI so a content edit that would publish placeholder text,
 * break an internal link or leak an unconfirmed claim fails before deployment.
 */

const PUBLIC_DIR = path.resolve(import.meta.dirname, "../public");
const INTERIM_DIR = path.resolve(import.meta.dirname, "../src/assets/interim");
const allServices: readonly Service[] = [...services, ...digitalServices];
const allProjects: readonly Project[] = projects;
const allIndustries: readonly Industry[] = industries;
const allFaqs: readonly Faq[] = faqs;
const allStats: readonly Stat[] = stats;

const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/i,
  /john doe/i,
  /example\.com/i,
  /\+1\s*\(?555/,
  /city,\s*country/i,
  /\bTODO\b/,
  /\bTBD\b/,
  /CLIENT INPUT REQUIRED/i,
  /CONFIRMATION REQUIRED/i,
];

function duplicates(values: readonly string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

describe("identifiers", () => {
  it("service slugs are unique across both verticals", () => {
    expect(duplicates(allServices.map((s) => s.slug))).toEqual([]);
  });

  it("project, industry, FAQ and stat identifiers are unique", () => {
    expect(duplicates(allProjects.map((p) => p.slug))).toEqual([]);
    expect(duplicates(allIndustries.map((i) => i.slug))).toEqual([]);
    expect(duplicates(allFaqs.map((f) => f.id))).toEqual([]);
    expect(duplicates(allStats.map((s) => s.id))).toEqual([]);
  });

  it("slugs are lowercase kebab-case", () => {
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    for (const slug of [...allServices, ...allProjects, ...allIndustries].map((i) => i.slug)) {
      expect(slug, slug).toMatch(slugPattern);
    }
  });
});

describe("references resolve", () => {
  const serviceSlugs = new Set(allServices.map((s) => s.slug));
  const pillarIds = new Set<string>(pillars.map((p) => p.id));
  const industrySlugs = new Set(allIndustries.map((i) => i.slug));

  it("related services, project services and FAQ placements point at real services", () => {
    for (const service of allServices) {
      expect(pillarIds.has(service.pillar), service.slug).toBe(true);
      for (const related of service.relatedServiceSlugs) {
        expect(serviceSlugs.has(related), `${service.slug} → ${related}`).toBe(true);
        expect(related, `${service.slug} relates to itself`).not.toBe(service.slug);
      }
    }
    for (const project of allProjects) {
      for (const slug of project.serviceSlugs) {
        expect(serviceSlugs.has(slug), `${project.slug} → ${slug}`).toBe(true);
      }
      if (project.industrySlug) expect(industrySlugs.has(project.industrySlug)).toBe(true);
    }
    for (const faq of allFaqs) {
      for (const placement of faq.placements) {
        if (placement.startsWith("service:")) {
          expect(serviceSlugs.has(placement.slice("service:".length)), faq.id).toBe(true);
        }
      }
    }
  });

  it("publishable services never link to unpublishable ones (no leaks via internal links)", () => {
    const publishable = new Set(allServices.filter(isPublishable).map((s) => s.slug));
    for (const service of allServices.filter(isPublishable)) {
      // Hidden targets are filtered at render time; this documents which links will be dropped.
      const hidden = service.relatedServiceSlugs.filter((slug) => !publishable.has(slug));
      expect(hidden, `${service.slug} relates to hidden services`).toEqual([]);
    }
  });
});

describe("publishing safety", () => {
  const governed: readonly (Governed & { readonly label: string })[] = [
    ...allServices.map((s) => ({ ...s, label: `service:${s.slug}` })),
    ...allProjects.map((p) => ({ ...p, label: `project:${p.slug}` })),
    ...allIndustries.map((i) => ({ ...i, label: `industry:${i.slug}` })),
    ...allFaqs.map((f) => ({ ...f, label: `faq:${f.id}` })),
    ...allStats.map((s) => ({ ...s, label: `stat:${s.id}` })),
    ...testimonials.map((t) => ({ ...t, label: `testimonial:${t.id}` })),
    { ...site.contact.phone, label: "contact:phone" },
    { ...site.contact.email, label: "contact:email" },
    { ...site.contact.address, label: "contact:address" },
    { ...site.contact.businessHours, label: "contact:hours" },
    { ...site.heroTagline, label: "site:heroTagline" },
  ];

  it("template-sourced content is never marked live", () => {
    for (const item of governed.filter((g) => g.source.kind === "template")) {
      expect(item.status, item.label).not.toBe("live");
    }
  });

  it("proposed-sourced content is never marked live or verified", () => {
    for (const item of governed.filter((g) => g.source.kind === "proposed")) {
      expect(item.status, item.label).not.toBe("live");
      expect(item.verified, item.label).toBe(false);
    }
  });

  it("publishable content contains no placeholder or review markers", () => {
    for (const item of governed.filter(isPublishable)) {
      const text = JSON.stringify(item);
      for (const pattern of PLACEHOLDER_PATTERNS) {
        expect(text, `${item.label} matches ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it("projects carry no client name without permission and no unverified outcome", () => {
    for (const project of allProjects.filter(isPublishable)) {
      if (project.client) expect(typeof project.client.permissionToName).toBe("boolean");
      if (project.outcome) expect(project.verified, project.slug).toBe(true);
    }
  });

  it("unapproved images never sit in public/ (everything there is served in production)", () => {
    for (const image of Object.values(media)) {
      if (!isPublishable(image)) expect(image.src, image.src).toMatch(/^\/preview-media\//);
    }
    expect(existsSync(path.join(PUBLIC_DIR, "images/interim"))).toBe(false);
  });

  it("interim (Company Profile) images are never publishable", () => {
    for (const image of Object.values(media)) {
      expect(isPublishable(image), image.src).toBe(false);
    }
  });

  it("every image file referenced in content exists", () => {
    const images = [...Object.values(media), ...allProjects.flatMap((p) => p.gallery)];
    for (const image of images) {
      const file = image.src.startsWith("/preview-media/")
        ? path.join(INTERIM_DIR, image.src.slice("/preview-media/".length))
        : path.join(PUBLIC_DIR, image.src);
      expect(existsSync(file), image.src).toBe(true);
    }
  });

  it("every image has alt text and intrinsic dimensions", () => {
    const images = [
      ...Object.values(media),
      ...allProjects.flatMap((p) => p.gallery),
      ...allServices.flatMap((s) => (s.heroImage ? [s.heroImage] : [])),
    ];
    for (const image of images) {
      expect(image.alt.trim().length, image.src).toBeGreaterThan(0);
      expect(image.width, image.src).toBeGreaterThan(0);
      expect(image.height, image.src).toBeGreaterThan(0);
    }
  });
});

describe("SEO fields", () => {
  it("publishable services have a title ≤ 60 and a description ≤ 160 characters", () => {
    for (const service of allServices.filter(isPublishable)) {
      expect(service.seo.title.length, service.slug).toBeLessThanOrEqual(60);
      expect(service.seo.description.length, service.slug).toBeLessThanOrEqual(160);
      expect(service.seo.primaryKeyword.length, service.slug).toBeGreaterThan(0);
    }
  });
});

describe("homepage content", () => {
  const serviceSlugs = new Set(allServices.map((s) => s.slug));

  it("featured offerings link to existing service pages", () => {
    for (const offering of homeContent.featuredOfferings) {
      expect(serviceSlugs.has(offering.serviceSlug), offering.id).toBe(true);
    }
  });

  it("homepage copy contains no placeholder or review markers", () => {
    const text = JSON.stringify(homeContent);
    for (const pattern of PLACEHOLDER_PATTERNS) {
      expect(text, String(pattern)).not.toMatch(pattern);
    }
  });

  it("offerings and reasons cite the Company Profile", () => {
    for (const item of [...homeContent.featuredOfferings, ...homeContent.reasons]) {
      expect(item.source.kind, item.id).toBe("company-profile");
    }
  });
});

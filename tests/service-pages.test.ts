import { describe, expect, it } from "vitest";

import { digitalServices } from "@/content/digital-services";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { isPublishable } from "@/lib/publishing";
import type { Faq, Service } from "@/types/content";

/**
 * Service pages must be substantial and unique: no thin pages, no copy reused across pages,
 * no duplicate titles or descriptions competing in search.
 */
const serviceLines: readonly Service[] = services;
const allServices: readonly Service[] = [...services, ...digitalServices];
const allFaqs: readonly Faq[] = faqs;

const words = (text: string) => text.trim().split(/\s+/).length;

describe("service page content", () => {
  const withPage = allServices.filter((s) => s.page !== undefined);

  it("every publishable service line has publishable page content", () => {
    for (const service of serviceLines.filter(isPublishable)) {
      expect(service.page, service.slug).toBeDefined();
      expect(service.page && isPublishable(service.page), service.slug).toBe(true);
    }
  });

  it("every page (live or draft) has content of a useful length", () => {
    expect(withPage.length).toBeGreaterThanOrEqual(10);
    for (const service of withPage) {
      const total = (service.page?.intro ?? []).reduce((sum, p) => sum + words(p), 0);
      expect(total, `${service.slug}: ${total} words`).toBeGreaterThanOrEqual(60);
      expect(total, `${service.slug}: ${total} words`).toBeLessThanOrEqual(260);
      expect(service.page?.highlights.length, service.slug).toBeGreaterThanOrEqual(3);
      expect(service.page?.cta.title.length, service.slug).toBeGreaterThan(0);
    }
  });

  it("every page has at least two of its own FAQs, publishable ones when the page is", () => {
    for (const service of withPage) {
      const placed = allFaqs.filter((faq) => faq.placements.includes(`service:${service.slug}`));
      expect(placed.length, service.slug).toBeGreaterThanOrEqual(2);
      if (service.page && isPublishable(service.page)) {
        expect(placed.filter(isPublishable).length, service.slug).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("only services that exist are referenced by FAQs", () => {
    const slugs = new Set(allServices.map((s) => s.slug));
    for (const faq of allFaqs) {
      for (const placement of faq.placements) {
        if (placement.startsWith("service:")) {
          expect(slugs.has(placement.slice("service:".length)), `${faq.id} → ${placement}`).toBe(
            true,
          );
        }
      }
    }
  });

  it("no intro paragraph or highlight is reused across services", () => {
    const paragraphs = withPage.flatMap((s) => s.page?.intro ?? []);
    expect(new Set(paragraphs).size).toBe(paragraphs.length);
    const highlights = withPage.flatMap((s) => (s.page?.highlights ?? []).map((h) => h.body));
    expect(new Set(highlights).size).toBe(highlights.length);
  });

  it("SEO titles and descriptions are unique across all service pages", () => {
    const titles = allServices.map((s) => s.seo.title);
    const descriptions = allServices.filter(isPublishable).map((s) => s.seo.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("a digital page is published only on explicit approval", () => {
    // CP p.23 only lists the digital services, so their page copy cannot rest on the Company
    // Profile: publishing one needs a client-confirmed or owner-approved source.
    for (const service of digitalServices) {
      if ("page" in service && isPublishable(service.page)) {
        expect(["client-confirmed", "owner-approved"], service.slug).toContain(
          service.page.source.kind,
        );
      }
    }
  });

  it("every digital page has deliverables, its own steps, platforms and a stock-licensed photo", () => {
    for (const service of digitalServices) {
      const { page } = service;
      expect(page.deliverables.length, service.slug).toBeGreaterThanOrEqual(4);
      expect(page.steps.length, service.slug).toBeGreaterThanOrEqual(3);
      expect(page.platforms.length, service.slug).toBeGreaterThanOrEqual(3);
      expect(page.photo.kind, service.slug).toBe("stock-photo");
      expect(page.photo.source.kind, service.slug).toBe("stock-photo");
      expect(page.photo.alt.length, service.slug).toBeGreaterThan(10);
    }
  });
});

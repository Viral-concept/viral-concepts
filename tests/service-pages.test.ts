import { describe, expect, it } from "vitest";

import { productCategories } from "@/content/products";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { isPublishable } from "@/lib/publishing";
import type { Faq, Service } from "@/types/content";

/**
 * Service pages must be substantial and unique: no thin pages, no copy reused across pages,
 * no duplicate titles or descriptions competing in search.
 */
const serviceLines: readonly Service[] = services;
const allServices: readonly Service[] = services;
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
    expect(withPage.length).toBe(services.length);
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

  it("every event service page has a licensed hero photo", () => {
    for (const service of services) {
      expect(service.heroImage?.kind, service.slug).toBe("stock-photo");
      expect(service.heroImage?.alt.length ?? 0, service.slug).toBeGreaterThan(10);
    }
  });

  it("every product category is named in the Company Profile and has products", () => {
    for (const category of productCategories) {
      expect(category.source.kind, category.id).toBe("company-profile");
      expect(category.items.length, category.id).toBeGreaterThanOrEqual(3);
      expect(category.image.kind, category.id).toBe("stock-photo");
    }
  });
});

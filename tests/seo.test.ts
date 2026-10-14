import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Search-facing output: sitemap, robots and structured data. Each module reads the deployment
 * environment at import time, so every case loads a fresh copy with its own environment.
 */
async function load(mode: "production" | "preview") {
  vi.resetModules();
  vi.stubEnv("VERCEL_ENV", mode);
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.viralconcepts.co");
  return {
    paths: (await import("@/lib/sitemap-paths")).getSitemapPaths(),
    robots: (await import("@/app/robots")).default(),
    sitemap: (await import("@/app/sitemap")).default(),
    data: await import("@/lib/structured-data"),
    content: await import("@/lib/content"),
  };
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("sitemap", () => {
  it("lists exactly the published pages in production, as absolute URLs", async () => {
    const { paths, sitemap } = await load("production");
    expect(paths).toEqual([
      "/",
      "/about",
      "/services",
      "/services/event-production-fabrication",
      "/services/event-rentals-entertainment",
      "/services/exhibitions",
      "/services/festive-mall-decor",
      "/services/branding-printing",
      "/services/advertising-pr",
      "/products",
      "/contact",
    ]);
    for (const entry of sitemap) {
      expect(entry.url).toMatch(/^https:\/\/www\.viralconcepts\.co(\/|$)/);
      expect(entry.lastModified).toBeUndefined();
    }
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("never lists drafts in production, but does in preview", async () => {
    const production = (await load("production")).paths;
    const preview = (await load("preview")).paths;
    for (const draft of ["/projects", "/industries", "/company-profile"]) {
      expect(production).not.toContain(draft);
      expect(preview).toContain(draft);
    }
  });
});

describe("robots.txt", () => {
  it("invites crawlers only on the production deployment", async () => {
    const production = (await load("production")).robots;
    expect(production.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(production.sitemap).toBe("https://www.viralconcepts.co/sitemap.xml");

    const preview = (await load("preview")).robots;
    expect(preview.rules).toEqual({ userAgent: "*", disallow: "/" });
    expect(preview.sitemap).toBeUndefined();
  });
});

describe("structured data", () => {
  it("describes the company with published facts only", async () => {
    const { data } = await load("production");
    const org = data.organizationJsonLd();
    expect(org["@type"]).toBe("Organization"); // no confirmed address → not a LocalBusiness
    expect(org).not.toHaveProperty("address");
    expect(org).not.toHaveProperty("legalName"); // legal entity name unconfirmed
    expect(org).not.toHaveProperty("sameAs"); // no confirmed social profiles
    expect(org).not.toHaveProperty("aggregateRating");
    expect(org.foundingDate).toBe("2014");
    expect(org.telephone).toBe("+971588547620");
    expect(org.email).toBe("desk@viralconcepts.co");
  });

  it("builds breadcrumbs with absolute URLs in order", async () => {
    const { data } = await load("production");
    const crumbs = data.breadcrumbJsonLd([
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
    ]);
    expect(crumbs.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.viralconcepts.co" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.viralconcepts.co/services",
      },
    ]);
  });

  it("lists a service's Company Profile offerings and links it to the company", async () => {
    const { data, content } = await load("production");
    const service = content.getServicePage("services", "exhibitions");
    expect(service).toBeDefined();
    if (!service) return;
    const json = data.serviceJsonLd(service);
    expect(json.url).toBe("https://www.viralconcepts.co/services/exhibitions");
    expect(json.provider).toEqual({ "@id": "https://www.viralconcepts.co/#organization" });
    const offered = JSON.stringify(json.hasOfferCatalog);
    for (const item of service.offerings.flatMap((group) => group.items)) {
      expect(offered).toContain(item);
    }
  });

  it("marks up exactly the FAQs it is given", async () => {
    const { data, content } = await load("production");
    const faqs = content.getFaqs("home");
    const json = data.faqJsonLd(faqs) as { mainEntity: unknown[] };
    expect(json.mainEntity).toHaveLength(faqs.length);
  });

  it("cannot be broken out of its script tag", async () => {
    const { data } = await load("production");
    const out = data.serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out)).toEqual({ name: "</script><script>alert(1)</script>" });
  });
});

import { describe, expect, it } from "vitest";

import { buildMetadata } from "@/lib/metadata";

describe("buildMetadata", () => {
  it("sets a page-specific canonical, Open Graph URL and Twitter card", () => {
    const meta = buildMetadata({
      title: "Exhibitions",
      description: "Exhibition stands built in Dubai.",
      path: "/services/exhibitions",
    });
    expect(meta.title).toBe("Exhibitions");
    expect(meta.alternates?.canonical).toBe("/services/exhibitions");
    expect(meta.openGraph?.url).toBe("/services/exhibitions");
    expect(meta.robots).toBeUndefined();
  });

  it("supports absolute titles and per-page noindex", () => {
    const meta = buildMetadata({
      title: "Viral Concepts",
      absoluteTitle: true,
      description: "Home",
      path: "/",
      noindex: true,
    });
    expect(meta.title).toEqual({ absolute: "Viral Concepts" });
    expect(meta.robots).toEqual({ index: false, follow: true });
  });
});

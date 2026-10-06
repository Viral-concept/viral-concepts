import { describe, expect, it } from "vitest";

import { assignTones } from "@/lib/section-tones";

describe("assignTones", () => {
  it("alternates light and surface, keeping fixed tones", () => {
    const result = assignTones([
      { key: "a" },
      { key: "band", fixedTone: "brand" },
      { key: "b" },
      { key: "c" },
      { key: "cta", fixedTone: "dark" },
    ]);
    expect(result.map((r) => r.tone)).toEqual(["light", "brand", "surface", "light", "dark"]);
  });

  it("never gives two adjacent alternating sections the same tone when some are omitted", () => {
    const tones = assignTones([{ key: "a" }, { key: "c" }, { key: "e" }], "surface").map(
      (r) => r.tone,
    );
    for (let i = 1; i < tones.length; i++) expect(tones[i]).not.toBe(tones[i - 1]);
  });
});

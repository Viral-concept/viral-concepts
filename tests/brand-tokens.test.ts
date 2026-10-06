import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { brandColors } from "@/config/brand";

/** Keeps the TypeScript palette (OG images, viewport) in sync with the CSS tokens. */
describe("brand tokens", () => {
  const css = readFileSync(
    path.resolve(import.meta.dirname, "../src/app/globals.css"),
    "utf8",
  ).toLowerCase();

  it("every brand colour is defined as a CSS token", () => {
    for (const [name, hex] of Object.entries(brandColors)) {
      expect(css, `${name} ${hex}`).toContain(hex.toLowerCase());
    }
  });
});

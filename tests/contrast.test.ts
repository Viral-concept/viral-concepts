import { describe, expect, it } from "vitest";

import { brandColors } from "@/config/brand";

/**
 * WCAG 2.2 contrast for the colour pairings the components actually use.
 * AA: 4.5:1 for body text, 3:1 for large text, icons, borders and focus indicators.
 */
function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
}

const c = brandColors;

const textPairs: readonly [string, string, string][] = [
  ["body text on white", c.ink, c.white],
  ["body text on surface", c.ink, c.surface],
  ["muted text on white", c.muted, c.white],
  ["muted text on surface", c.muted, c.surface],
  ["link/eyebrow teal-600 on white", c.teal600, c.white],
  ["teal-800 text on white", c.teal800, c.white],
  ["primary CTA: ink on yellow", c.ink, c.yellow400],
  ["white on teal-800 (brand sections)", c.white, c.teal800],
  ["white on ink (dark sections)", c.white, c.ink],
  ["cyan eyebrow on ink", c.cyan400, c.ink],
  ["cyan-300 text on teal-800 (dark panels)", c.cyan300, c.teal800],
  ["cyan-300 text on ink (footer)", c.cyan300, c.ink],
  ["error text on white", c.danger, c.white],
];

const nonTextPairs: readonly [string, string, string][] = [
  ["focus ring teal-600 on white", c.teal600, c.white],
  ["focus ring teal-600 on surface", c.teal600, c.surface],
  ["focus ring cyan on teal-800", c.cyan400, c.teal800],
  ["focus ring cyan on ink", c.cyan400, c.ink],
  ["secondary button border teal-600 on white", c.teal600, c.white],
];

describe("colour contrast (WCAG 2.2 AA)", () => {
  it.each(textPairs)("%s ≥ 4.5:1", (_label, fg, bg) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(nonTextPairs)("%s ≥ 3:1", (_label, fg, bg) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(3);
  });

  it("documents the pairings that must never be used for text", () => {
    expect(contrast(c.cyan400, c.white)).toBeLessThan(4.5);
    expect(contrast(c.yellow400, c.white)).toBeLessThan(4.5);
    expect(contrast(c.cyan400, c.teal800)).toBeLessThan(4.5);
  });
});

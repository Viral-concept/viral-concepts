import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Guards the design system: components may only use brand tokens. Tailwind's default palette,
 * radii and shadows are removed in globals.css, so these classes would silently render nothing.
 */
const SRC = path.resolve(import.meta.dirname, "../src");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(tsx|ts)$/.test(entry) ? [full] : [];
  });
}

const REMOVED_UTILITIES =
  /\b(?:rounded-(?:xs|sm|md|lg|xl|2xl|3xl|4xl)|shadow-(?:2xs|xs|sm|md|lg|xl|2xl)|(?:text|bg|border|from|to|via|ring|outline|fill|stroke|divide|decoration|placeholder)-(?:gray|slate|zinc|neutral|stone|red|orange|amber|lime|green|emerald|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black)(?:-\d+)?)\b/;

/** Raw hex colours belong only in the brand palette module (and globals.css). */
const RAW_HEX = /["'`]#[0-9a-fA-F]{3,8}["'`]/;
const HEX_ALLOWED = new Set([path.join(SRC, "config/brand.ts")]);

describe("design token usage", () => {
  const files = sourceFiles(SRC);

  it("uses no Tailwind default palette, radius or shadow utilities", () => {
    const offenders = files.filter((file) => REMOVED_UTILITIES.test(readFileSync(file, "utf8")));
    expect(offenders.map((f) => path.relative(SRC, f))).toEqual([]);
  });

  it("uses no raw hex colours outside the brand palette", () => {
    const offenders = files
      .filter((file) => !HEX_ALLOWED.has(file))
      .filter((file) => RAW_HEX.test(readFileSync(file, "utf8")));
    expect(offenders.map((f) => path.relative(SRC, f))).toEqual([]);
  });

  it("keeps cyan-400 for icons and decoration; small text on dark panels uses cyan-300", () => {
    // cyan-400 on teal-800 is 4.3:1 — fine for icons (3:1), too low for small text (4.5:1).
    const TEXT_HINTS = /\b(?:text-eyebrow|text-(?:xs|sm|base|lg)|uppercase|font-semibold)\b/;
    for (const file of files) {
      for (const match of readFileSync(file, "utf8").matchAll(/className=["`{][^"`}]*/g)) {
        const classes = match[0];
        if (/\btext-cyan-400(?!\/)/.test(classes) && TEXT_HINTS.test(classes)) {
          expect.fail(`${path.relative(SRC, file)}: cyan-400 used for text: ${classes}`);
        }
      }
    }
  });

  it("never passes display utilities to Button/ButtonLink (wrap instead)", () => {
    const displayOnButton =
      /<(?:Button|ButtonLink)\b[^>]*className="[^"]*(?<![\w-])(?:[a-z0-9]+:)?(?:hidden|block|inline|inline-flex|flex|grid|contents)(?![\w-])/;
    const offenders = files.filter((file) => displayOnButton.test(readFileSync(file, "utf8")));
    expect(offenders.map((f) => path.relative(SRC, f))).toEqual([]);
  });
});

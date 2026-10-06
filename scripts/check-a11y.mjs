/* eslint-disable no-console -- CLI script: console output is its interface. */
// Accessibility audit (WCAG 2.2 A/AA rules of axe-core) against a running build.
// Checks every page in the sitemap at phone and desktop widths, plus the interactive states a
// static scan never sees: open mobile menu, open desktop dropdown, form errors, open lightbox.
//
//   npx next build && npx next start -p 3000
//   npm run qa:a11y -- http://localhost:3000
//
// Needs a Chromium: `npx playwright install chromium`, or set CHROMIUM_PATH to an existing one.

import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const WIDTHS = [390, 1280];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const failures = [];

async function audit(page, label) {
  // Reveal animations would otherwise leave content mid-fade while axe measures contrast.
  await page.emulateMedia({ reducedMotion: "reduce" });
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  for (const violation of violations) {
    failures.push(
      `${label}: [${violation.impact}] ${violation.id} — ${violation.help}\n` +
        violation.nodes
          .slice(0, 3)
          .map((node) => `    ${node.target.join(" ")}`)
          .join("\n"),
    );
  }
  return violations.length;
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  ([, loc]) => new URL(loc).pathname.replace(/\/$/, "") || "/",
);

let checks = 0;
for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: "load" });
    await audit(page, `${path} @${width}`);
    checks += 1;
  }

  // Interactive states.
  await page.goto(`${base}/`, { waitUntil: "load" });
  if (width < 1280) {
    await page.click('header button[aria-haspopup="dialog"]');
    await page.waitForTimeout(300);
    await audit(page, `mobile menu open @${width}`);
  } else {
    await page.click('header nav button[aria-expanded="false"]');
    await page.waitForTimeout(300);
    await audit(page, `desktop dropdown open @${width}`);
  }
  checks += 1;

  if (paths.includes("/contact")) {
    await page.goto(`${base}/contact`, { waitUntil: "load" });
    const submit = page.locator('main button[type="submit"]');
    if ((await submit.count()) > 0) {
      await submit.click();
      await page.waitForTimeout(300);
      await audit(page, `contact form errors @${width}`);
      checks += 1;
    }
  }

  const project = paths.find((p) => p.startsWith("/projects/"));
  if (project) {
    await page.goto(base + project, { waitUntil: "load" });
    const thumb = page.locator('main button[aria-haspopup="dialog"]').first();
    if ((await thumb.count()) > 0) {
      await thumb.click();
      await page.waitForTimeout(300);
      await audit(page, `project lightbox open @${width}`);
      checks += 1;
    }
  }
  await context.close();
}

await browser.close();
console.log(
  `Ran ${checks} axe audits (${paths.length} pages × ${WIDTHS.length} widths, plus states).`,
);
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("No WCAG 2.2 A/AA violations found by axe.");

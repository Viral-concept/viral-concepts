/* eslint-disable no-console -- CLI script: console output is its interface. */
// Production content and SEO audit. Crawls a running production build (as Googlebot) and fails
// if any page shows preview-only content (review flags, proposed placeholders, interim photos),
// links to a page that does not exist, or has broken search metadata: a missing or duplicate
// title or description, a canonical that is not the page itself, no social image, invalid
// JSON-LD — or if the sitemap lists a page that is missing or was not reachable by links.
//
//   npx next build && npx next start -p 3000
//   npm run qa:leaks -- http://localhost:3000 [--allow-missing=/about,/contact]
//
// `--allow-missing` lists routes that are linked but not built yet (stages still in progress).

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) ?? "http://localhost:3000").replace(/\/$/, "");
const allowMissing = new Set(
  (args.find((a) => a.startsWith("--allow-missing="))?.split("=")[1] ?? "")
    .split(",")
    .filter(Boolean),
);

/** Text that must never reach a production page. */
const MARKERS = [
  "not live",
  "PROPOSED SERVICE",
  "CLIENT CONFIRMATION REQUIRED",
  "Preview build",
  "Needed before publishing",
  "Test mode: enquiries are logged",
  "/preview-media/",
];

/** Search engines get metadata in <head>; Next.js may stream it later for ordinary browsers. */
const HEADERS = {
  "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
};
const titles = new Map();
const descriptions = new Map();

function attr(html, pattern) {
  return html.match(pattern)?.[1]?.replaceAll("&amp;", "&");
}

function checkSeo(path, html) {
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (!title) problems.push(`${path}: no <title>`);
  else if (titles.has(title)) problems.push(`${path}: same title as ${titles.get(title)}`);
  else titles.set(title, path);
  if (!description) problems.push(`${path}: no meta description`);
  else if (description.length > 160) problems.push(`${path}: description over 160 characters`);
  else if (descriptions.has(description))
    problems.push(`${path}: same description as ${descriptions.get(description)}`);
  else descriptions.set(description, path);
  if (!canonical || (new URL(canonical).pathname.replace(/\/$/, "") || "/") !== path) {
    problems.push(`${path}: canonical ${canonical ?? "missing"} is not this page`);
  }
  if (!ogImage) problems.push(`${path}: no og:image`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      problems.push(`${path}: invalid JSON-LD`);
    }
  }
}

const queue = ["/"];
const seen = new Set(queue);
const problems = [];
const missing = new Set();

while (queue.length > 0) {
  const path = queue.shift();
  const response = await fetch(base + path, { redirect: "manual", headers: HEADERS });
  if (response.status === 404) {
    if (!allowMissing.has(path)) missing.add(path);
    continue;
  }
  if (!response.headers.get("content-type")?.includes("text/html")) continue;
  const html = await response.text();

  for (const marker of MARKERS) {
    if (html.includes(marker)) problems.push(`${path}: contains "${marker}"`);
  }
  checkSeo(path, html);

  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (href.startsWith("/_next/") || /\.(png|ico|jpg|webp|avif|svg|pdf)$/.test(href)) continue;
    if (!seen.has(href)) {
      seen.add(href);
      queue.push(href);
    }
  }
}

for (const path of missing) problems.push(`${path}: linked but returns 404`);

// Every sitemap entry must be a live page that the crawl also reached through links.
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  ([, loc]) => new URL(loc).pathname.replace(/\/$/, "") || "/",
);
if (listed.length === 0) problems.push("sitemap.xml lists no pages");
const pages = new Set(titles.values());
for (const path of listed) {
  if (!pages.has(path))
    problems.push(`sitemap lists ${path}, which the crawl did not reach as a page`);
}
for (const path of pages) {
  if (!listed.includes(path)) problems.push(`${path} is a page but missing from sitemap.xml`);
}

console.log(`Checked ${seen.size} internal URLs and ${listed.length} sitemap entries on ${base}.`);
if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("No preview-only content, no broken links, and search metadata is complete.");

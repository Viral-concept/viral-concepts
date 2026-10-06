# Viral Concepts — website

Corporate website for Viral Concepts (Dubai). Built with Next.js App Router, TypeScript (strict),
Tailwind CSS v4 and statically generated pages, deployed on Vercel.

The approved product and technical specification is the **Viral Concepts — Website Discovery &
Architecture** document. The client's Company Profile PDF is the factual source of truth; the
website template PDF is a visual reference only.

## Getting started

Requires Node.js 20.9 or newer (`.nvmrc` pins 22). Open the folder in VS Code and accept the
recommended extensions (ESLint, Prettier, Tailwind CSS, Vitest); formatting runs on save.

```bash
npm install
cp .env.example .env.local    # optional locally: without keys the form shows phone and email
npm run dev                   # http://localhost:3000
```

| Script              | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Development server                                              |
| `npm run build`     | Production build (static generation)                            |
| `npm run start`     | Serve the production build                                      |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)             |
| `npm run typecheck` | Generate route types, then `tsc --noEmit`                       |
| `npm run test`      | Unit and content-integrity tests (Vitest)                       |
| `npm run format`    | Prettier (with Tailwind class sorting)                          |
| `npm run check`     | lint + typecheck + test + format check — run before every push  |
| `npm run qa:leaks`  | Crawl a running build: no drafts, no broken links, complete SEO |
| `npm run qa:a11y`   | axe-core WCAG 2.2 A/AA audit of every page and key states       |

**Review drafts locally:** `CONTENT_PREVIEW=true npm run build && CONTENT_PREVIEW=true npm run start`. The form works without keys if you add `LEAD_FORM_MODE=test`.

**Going live:** see [`LAUNCH-CHECKLIST.md`](./LAUNCH-CHECKLIST.md).

## Architecture

```
src/
  app/            Routes, root layout, error/not-found boundaries, icons
  components/     ui/ (primitives) · cards/ · sections/ · forms/ · layout/ · seo/ (Stage 10)
  config/         env.public.ts · env.server.ts (server-only) · brand.ts
  content/        Typed content: site, services, digital-services, projects, industries,
                  faqs, stats, testimonials, process, pillars, taxonomy, brand-assets
  lib/            content.ts (query layer) · publishing.ts (rules) · routes.ts ·
                  metadata.ts · logger.ts
  types/          content.ts — the content model
  assets/fonts/   Self-hosted variable fonts (SIL OFL)
tests/            Publishing rules, content integrity, env modes, metadata, token sync,
                  colour contrast, design-token usage
```

### Design system

Tokens live in `src/app/globals.css` (`@theme`). Tailwind's default palette, radii and shadows
are removed, so only brand values exist; `tests/design-tokens.test.ts` fails on default
utilities or raw hex colours, and `tests/contrast.test.ts` enforces WCAG AA for every colour
pairing components use.

| Token group | Utilities                                                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colour      | `ink` `teal-800` `teal-600` `teal-500` `cyan-400` `cyan-300` `teal-200` `yellow-400` `navy` `night` `night-soft` `surface` `muted` `line` `line-strong` `tint` `danger` |
| Type        | `text-hero` `text-display` `text-h1` `text-h2` `text-h3` `text-lead` `text-body` `text-eyebrow` `text-button` (fluid, 360→1280px)                                       |
| Layout      | `max-w-content` (1280) · `max-w-wide` (1440) · `max-w-prose` (768)                                                                                                      |
| Shape       | `rounded-input` (6) · `rounded-card` (12) · `rounded-media` (20) · `shadow-card` · `shadow-raised`                                                                      |
| Motion      | `--ease-brand`, `--duration-fast/base/slow/reveal`, `reveal` family, `line-rise`, `enter-up`, `parallax` — see _Motion system_ below                                    |
| Motifs      | `bg-hex-grid(-dark)`, `clip-hexagon`, `<Diamond>`, `<TitleRule>`, `<TricolourBar>`, `<HexWatermark>`                                                                    |

Components (`src/components`):

- **ui/** — `Button` / `ButtonLink` (primary · secondary · inverse · quiet · quietInverse),
  `AppLink`, `Container`, `Section`, `SectionHeader`, `Badge`, `ReviewFlag`, `Accordion`
  (native `<details>`, no JS), `Breadcrumbs`, `Icon`, `Logo`, `StatCounter` (client),
  `BrandMotifs`
- **cards/** — `ServiceCard`, `PillarCard`, `ProjectCard`
- **sections/** — `ProcessSteps`
- **forms/** — `Field`, `Input`, `Textarea`, `Select` (labels, hints and errors wired by id)

Rules: components own their colours and padding through variants; `className` is for layout
only (no class-merging library). Interactive behaviour lives in small client leaves; everything
else is a Server Component. Review every component with real content at `/design-system`
(preview builds only — production returns 404).

### Motion system

The premium layer is CSS-first; JavaScript only decides _when_, never animates frames.

| Piece                                                                                       | What it does                                                                                                                                                                                                              | Where                                                   |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `reveal` (+ `reveal-scale`, `reveal-left`, `reveal-right`, `reveal-clip`, `reveal-stagger`) | Fade/slide/scale/clip in once when scrolled into view. `RevealController` (one IntersectionObserver) adds `is-in`; content on screen at load is never hidden; without JS or with reduced motion nothing is hidden.        | `globals.css`, `components/motion/RevealController.tsx` |
| `line-rise`, `enter-up`                                                                     | Hero headline and intro entrances on load (`--rv-i` staggers).                                                                                                                                                            | `globals.css`                                           |
| Header                                                                                      | Transparent over dark heroes (`data-hero="dark"`), turning frosted as you scroll (scroll-driven `@property --hdr`); solid elsewhere. Active-page underline, CTA micro-interactions, animated mobile menu.                 | `Header.tsx`, `globals.css`                             |
| `SpreadNetwork`                                                                             | "Built to spread": a hex-lattice network that grows from one point, with ripples and sparks. Static SVG in three layers + HTML sparks moved with transform/opacity only (compositor), so it never repaints while looping. | `components/motion/SpreadNetwork.tsx`                   |
| `Aurora`, `StageLights`, `InterfaceMock`, `Marquee`                                         | Ambient glows, stage-light art for event cards, abstract website/app mock-up, ticker. Decorative, `aria-hidden`.                                                                                                          | `components/motion/`                                    |
| `Rail`                                                                                      | Horizontal snap carousel: swipe, drag, arrow buttons, keyboard. Never auto-scrolls.                                                                                                                                       | `components/motion/Rail.tsx`                            |
| `ScrollHighlight`, process rail, footer wordmark, `parallax`                                | Scroll-linked effects via CSS `animation-timeline` inside `@supports`; static elsewhere.                                                                                                                                  | `globals.css`                                           |

Rules: animate only `transform`/`translate`/`scale`/`opacity` for anything that loops; mark
looping roots with `data-ambient` so they pause off screen; every effect has a
`prefers-reduced-motion` fallback; nothing essential depends on animation.

### Navigation and layout

- `src/lib/navigation.ts` builds one navigation model from the content layer; the header, the
  mobile menu and the footer all render it, so they can never disagree.
- Optional pages are governed in `src/content/pages.ts` (About, Company Profile, Privacy, Terms);
  Projects and Industries appear once their collections have visible items. Nothing is linked
  before it exists.
- Header: sticky; transparent over dark heroes and frosted once you scroll (solid on other pages); full navigation from 1280px, menu button below. Dropdowns follow the
  WAI-ARIA disclosure pattern (click/Enter, Escape returns focus, outside click and focus-out
  close). Panel links are server-rendered, so they are in the HTML for crawlers.
- Mobile menu: native modal `<dialog>` (focus containment, Escape, inert background); page scroll
  is locked with CSS.
- Mobile action bar (below 768px): Call and WhatsApp tiles when those numbers are confirmed, plus
  Start a Project. Server-rendered; the body reserves its height, including the iOS safe area.
- `Button`/`ButtonLink` set their own `display`; never pass `hidden`/`md:inline-flex` to them —
  wrap them instead (a test enforces this).

### Homepage

`src/app/page.tsx` composes the homepage from `src/content/home.ts` (copy traced to Company
Profile pages) and the content layer. Order: dark hero with the two division "doors" (Events &
Production, Digital Solutions) → facts ticker/counters (or confirmed stats) → who we are →
pillars → projects → experience reel (event offerings in a rail) → why us → process → digital
band → AI & automation showcase (preview only until #27) → industries → testimonials → FAQ → CTA.
The hero headline and reel copy are new and need copy approval (#26). Sections with no visible content (stats, projects,
industries, testimonials) are left out entirely, and `assignTones()` alternates the
backgrounds of whatever remains, so hiding a section never leaves two same-coloured neighbours.

Interim photos (`public/images/interim/`, registered in `src/content/media.ts`) are low-resolution
extracts from the Company Profile. They are drafts: visible only in preview builds with a review
flag; production falls back to brand panels. Replace each entry with the client's original photo
and set it to `live` + `verified` + `client-confirmed` once approved.

### Service pages

- `src/content/services/` holds one file per service plus `index.ts`, which exports the ordered list.
  Each service carries `page` (intro, highlights, CTA copy). A service without `page` can never be published.
- `src/app/services/page.tsx` is the landing page: services are grouped by pillar, followed by a capability index.
- `src/app/services/[slug]/page.tsx` renders every publishable service statically through
  `src/components/templates/ServicePage.tsx`. `dynamicParams = false`, so any other slug returns 404.
- The template is shared with `/digital-solutions/[slug]` (Stage 6). Its order is: hero → overview →
  what we provide → why it matters → related projects → process → FAQ → related services → CTA.
  `PageBlocks` drops any section without content.
- `seo.h1` overrides the page heading when the keyword map calls for a different one.
- `src/lib/contact-actions.ts` builds the secondary CTA: WhatsApp when confirmed, otherwise Call,
  otherwise nothing.
- `tests/service-pages.test.ts` blocks thin pages (intro under 60 words), duplicate intros or
  titles, broken related-service links, and published services without page content.

### Digital Solutions

- `src/content/digital-services/` holds one file per digital service. The four in the Company Profile (CP p.23) are web, apps, SEO and social; seven proposed services sit in `proposed.ts` (performance marketing, content & search strategy, e-commerce, web apps & custom software, AI & workflow automation, AI agents & chatbots, generative AI & integrations).
- Each digital service has a `capability` (`marketing`, `build`, `ai`). `/digital-solutions` shows one section per capability; the AI capability is presented by `AiShowcase` (example conversation, automated-enquiry flow, agent types) from `src/content/ai-showcase.ts`, which is gated with the AI services.
- A service and its page copy are gated separately (`ServicePageContent extends Governed`). CP p.23 only lists the four services, so their page copy is our draft (`DRAFT_DIGITAL_COPY`). It is visible in preview for client review; in production those pages return 404.
- `/digital-solutions` lists every visible digital service as a card with `id={slug}`.
- `getServiceHref()` in `src/lib/content.ts` builds every service link on the site (menus, footer, cards). It returns the service's page when that page exists, otherwise its landing anchor, e.g. `/digital-solutions#seo`. A link can never point at a missing page.
- To publish a digital page once the client approves its copy, replace `...DRAFT_DIGITAL_COPY` in that service's `page` with a `client-confirmed` source. A test rejects digital page copy that is live without one.

### Projects

- `src/content/projects.ts` holds the project candidates found in the Company Profile. All are drafts until the client confirms each field and gives permission.
- `/projects` and `/projects/[slug]` exist only when at least one project is visible. In production they currently return 404, and the menu omits them.
- **Filtering:** `?category=` is applied in the browser by `ProjectFilter`. It adds a CSS rule over the server-rendered grid, so the page stays static with one canonical URL. Without JavaScript, every project stays visible.
- **Case study pages:** `ProjectPage` renders only the fields that are filled in. The client is named only when `permissionToName` is true. A test also blocks a published title or text that names a client without permission.
- **Gallery:** `ProjectGallery` is a native `<dialog>` lightbox, about 1 KB of JavaScript.
- **Review notes:** `editorialNote` is shown in preview builds as "Needed before publishing", so the client can see what is missing. `qa:leaks` fails if that note appears in production.
- **Publishing a project:** fill in the confirmed fields and add approved photos (`kind: "project-photo"`, live, client-confirmed). Then set the project to `live` + `verified` with a `client-confirmed` source. Tests require a summary and at least one approved photo.

### About, Industries and Company Profile

- **`/about`** (`src/content/about.ts`): the story, vision and mission, capabilities and reasons, all restating CP p.2–4. Template-only content is left out and a test enforces it: the values list, "11+ years", stock photos and team members.
- **`/industries`**: one card per client-validated industry. A card links to `/projects?industry=…` when that industry has published projects. The page returns 404 while no industry is published.
- **Project filter:** `/projects` filters by category or by industry. Only one filter applies at a time, and category wins if both are in the URL.
- **`/company-profile`**: shows the cover, the download with its size and page count, and what's inside.
  - The download is a plain `<a download>`. A `next/link` would prefetch the PDF.
  - The page stays hidden until the client approves a web-optimised PDF. Publishing steps are in `src/content/company-profile.ts`.
  - Never put an unapproved PDF in `public/`, because everything there is served. A test fails if `public/downloads` holds any file that is not the approved, published one.

### Contact page and lead form

`/contact` has a brief form and the confirmed contact channels: phone and email (CP p.35). The address and hours come only from the template, so they stay hidden until the client confirms them.

**How a submission is handled** (`src/lib/leads/handle-lead.ts`, every branch unit-tested):

1. **Browser:** `zod/mini` validation with the shared schema (`src/lib/leads/schema.ts`), for instant feedback.
2. **Server Action** (`src/app/contact/actions.ts`): the same schema again, plus checks in this order:
   - **Honeypot:** if filled, the action pretends success and sends nothing.
   - **Service:** must be one the site offers. Forged or hidden values are rejected.
   - **Rate limit:** per IP and per email address, counted on valid submissions only. In-memory and best effort; see "Rate limiting" below.
   - **Turnstile:** the token is verified with Cloudflare using the secret key (action `lead`).
   - **Email:** sent to `LEAD_TO_EMAIL` through the Resend REST API, with the visitor as reply-to. All visitor input is HTML-escaped.
   - **Confirmation:** sent to the visitor when `LEAD_AUTO_REPLY` is on. It says the enquiry arrived and promises no response time.
3. **Result:** a typed result for the form.
   - Success shows an inline confirmation.
   - Failure shows an error summary and keeps everything the visitor typed.
   - The form also works as a plain post before JavaScript loads.

**Secrets and privacy:**

- Keys are read on the server only. A build check confirms they never reach `.next/static`.
- Logs record outcomes only: the service, and whether a phone was given. They never record the visitor's name, email, phone or message.

**Setup (client accounts needed):**

- **Resend:** verify the sending domain `viralconcepts.co` (DNS records). Then set `RESEND_API_KEY`, `LEAD_FROM_EMAIL` (e.g. `Viral Concepts Website <website@viralconcepts.co>`) and `LEAD_TO_EMAIL` (comma-separated).
- **Cloudflare Turnstile:** add a widget for the site's domains. Then set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
- **When keys are missing:** the page shows phone and email instead of the form (a "disabled" state). The site never shows a form that cannot send.

**Rate limiting:** add a Vercel Firewall rule (Project → Firewall → Configure → New rule):

- If _Method_ equals `POST` (on any path), then _Rate limit_, for example 10 requests per 10 minutes per IP.
- Why any path: Next.js accepts a Server Action call posted to any page URL (it is routed by the `Next-Action` header), so a rule on `/contact` alone can be sidestepped. The site has no other POST endpoints.
- Action: _Too Many Requests_.
- Check the limits available on your Vercel plan.

**Local QA without keys:** run `LEAD_FORM_MODE=test`. It skips Turnstile and logs the enquiry instead of emailing it. It is refused on the Vercel production deployment.

**Stage 11 (CSP):** allow `https://challenges.cloudflare.com` in `script-src` and `frame-src`.

### SEO

Every search-facing file is built from the content layer, so in production it contains only published content.

- **Metadata:** `buildMetadata()` gives each page a unique title, a description, a canonical URL, and Open Graph and Twitter fields. Only the Vercel production deployment is indexable; previews and local builds are `noindex` and `robots.txt` disallows everything.
- **`/sitemap.xml`** (`src/lib/sitemap-paths.ts`): lists exactly the pages that exist. There is no `lastModified`, `changefreq` or `priority`, because there are no real per-page dates and invented ones are worse than none.
- **`/robots.txt`:** allows crawling and points to the sitemap on production; disallows everything elsewhere.
- **JSON-LD** (`src/lib/structured-data.ts`):
  - Sitewide: `Organization` and `WebSite`.
  - Every inner page: `BreadcrumbList`, from the same items as the visible breadcrumb.
  - Service pages: `Service`, with an `OfferCatalog` of the Company Profile sub-services.
  - Pages with FAQs: `FAQPage`, for exactly the visible questions.
  - Published case studies: `CreativeWork`.
  - Left out on purpose: ratings, reviews and social profiles. The organization becomes a `LocalBusiness` with an address only once the client confirms one. `legalName` appears once the legal entity is confirmed.
  - The payload escapes `<`, so it can never break out of its `<script>` tag.
- **Social cards:** `opengraph-image.tsx` files (1200×630) use the shared renderer `src/lib/og/render.tsx` with the brand fonts (static TTF instances in `src/assets/og`). They are text only: no photo is approved for publication yet, and a social card must not show an unapproved image. All cards are prerendered at build time.
- **`/manifest.webmanifest`:** the name, colours and badge icons.
- **Audit:** `npm run qa:leaks -- <url>` also checks every crawled page as Googlebot:
  - title present and unique, description present, unique and ≤ 160 characters
  - canonical points at the page itself, `og:image` present, JSON-LD parses
  - the sitemap and the crawlable pages match exactly

**After launch (client accounts):**

- Verify the domain in Google Search Console and Bing Webmaster Tools, then submit `https://www.viralconcepts.co/sitemap.xml`.
- Confirm the canonical host: `www` or the bare domain (checklist).

### Security headers and performance

**Headers** (`src/config/security-headers.ts`, unit-tested): every response carries a Content-Security-Policy, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Cross-Origin-Opener-Policy`, `Permissions-Policy` and HSTS.

**Why the CSP allows inline scripts:**

- A nonce-based CSP would make every page render on each request, giving up static, CDN-cached pages.
- Next.js's hash-based alternative (SRI) is still experimental.
- So `script-src` allows `'self'`, `'unsafe-inline'` (Next.js's own bootstrap) and Cloudflare Turnstile, and nothing else. Every other source type is locked to the site itself; framing, plugins and foreign form targets are blocked.
- Revisit when SRI is stable.
- The Vercel toolbar origins are added on preview deployments only.

**Accessibility:** `npm run qa:a11y -- <url>` runs the axe-core WCAG 2.2 A/AA rules on every sitemap page at 390 px and 1280 px. It also covers the interactive states: open mobile menu, open dropdown, form errors and lightbox. Locally it needs a Chromium: run `npx playwright install chromium`, or set `CHROMIUM_PATH`.

**Contrast:**

- Small cyan text on teal-800 uses the derived `cyan-300` token (5.5:1). `cyan-400` is for icons there.
- A test fails if `cyan-400` is used for small text.
- The scroll reveal moves content but never fades it, so text is never shown at reduced contrast or hidden from LCP measurement.

**Lighthouse (mobile, simulated slow 4G, local production build):**

| Category       | Result          |
| -------------- | --------------- |
| Performance    | 91–98           |
| Accessibility  | 100             |
| Best Practices | 100             |
| CLS            | 0               |
| Simulated LCP  | 2.3–3.0 s       |
| Observed LCP   | about 0.2–0.3 s |

- SEO scores 69 locally only because local builds are `noindex` by design.
- The simulated LCP includes the fixed Next.js/React runtime (about 175 KB gzip), which loads alongside the first paint.
- After launch, confirm real-user Core Web Vitals with Vercel Speed Insights or Search Console.

**Not adopted:**

- **`typedRoutes`:** every link is already built through `src/lib/routes.ts` and `getServiceHref()`, and `qa:leaks` verifies every link on the built site.
- **`experimental.inlineCss`:** measured no gain.

### Production content audit

`npm run qa:leaks -- <url>` crawls a running production build. It fails on any review flag, proposed placeholder, preview banner or interim photo, and on any internal link that returns 404.

Pass `--allow-missing=/about,/contact` while those routes are still being built.

### Performance budget

The Next.js 16 / React 19 runtime is a fixed baseline of about 175 KB gzip on every App Router
page. The budget therefore applies to **app-owned** JavaScript: ≤ 30 KB gzip per route on top
of the baseline. Today most routes add about 10 KB (navigation, `RevealController`, `Rail`,
`StatCounter`); Contact adds the form (about 30 KB). `StatCounter` and the form load only where used.

### Content safety (read this before editing content)

Every content item carries a publishing gate:

```ts
status: "live" | "proposed" | "draft";
verified: boolean;
source: { kind: "company-profile"; pages } | { kind: "client-confirmed"; confirmedOn }
      | { kind: "template" } | { kind: "proposed" };
```

- `isPublishable()` (`src/lib/publishing.ts`) is the only production gate: **live + verified +
  trusted source** (Company Profile or client-confirmed). Template and proposed sources can never
  be published.
- Pages, navigation, sitemap and internal links read content **only** through
  `src/lib/content.ts`, which applies the deployment's content mode. Importing raw arrays from
  `src/content/*` in a page bypasses the gate and fails review.
- Unknown facts are left `undefined`. Never fill a field with a plausible value.
- `tests/content-integrity.test.ts` fails the build pipeline if publishable content contains
  placeholder text, broken references, or unverified claims.

To publish something after the client confirms it: set `status: "live"`, `verified: true` and
`source: { kind: "client-confirmed", confirmedOn: "YYYY-MM-DD", note: "…" }`.

### Content mode and indexing

| Deployment                             | Content shown                        | Indexing |
| -------------------------------------- | ------------------------------------ | -------- |
| Vercel production                      | Publishable only                     | index    |
| Vercel preview                         | + proposed/draft, with review banner | noindex  |
| Local / other hosts (default)          | Publishable only                     | noindex  |
| Local with `CONTENT_PREVIEW`           | + proposed/draft, with review banner | noindex  |
| Other hosts with `SITE_INDEXABLE=true` | Publishable only                     | index    |

`CONTENT_PREVIEW` is ignored on the Vercel production deployment.

### Environment variables

See `.env.example`. Public values live in `src/config/env.public.ts`; secrets are only read in
`src/config/env.server.ts`, which imports `server-only` so it can never reach a browser bundle.
Lead-form secrets are validated lazily: if they are missing, the form is disabled with a server
log entry rather than breaking the static build.

### Images

Images will live under `public/images/{brand,services,projects,industries}/` with meaningful
file names, and are registered in content as `ImageAsset` (alt text, intrinsic size, `kind`).
Only publishable `project-photo` images may be presented as proof of delivered work; renders,
mock-ups and illustrations must be labelled as such.

### Fonts

Inter (body) and Outfit (headings) are self-hosted variable fonts loaded with
`next/font/local` — about 80 KB in total, no build-time dependency on a font CDN. Brand font
names are still to be confirmed by the client.

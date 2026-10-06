# Launch checklist — viralconcepts.co

Numbers in brackets (#n) refer to the client confirmation checklist in the approved
_Website Discovery & Architecture_ document (section L).

The site is built so that nothing unconfirmed can go live by accident. Every item below either
switches on content that is already built (a one-line change in `src/content/…`) or sets up an
account. `README.md` explains how to publish each kind of content.

## 1. Before launch (blocking)

### Client confirmations

- [ ] **Copy approval (#26)** for everything live in production: homepage, About, Services and the six service pages, the Digital Solutions overview, and Contact. Facts come from the Company Profile; the wording needs sign-off.
      New in the premium redesign: the homepage headline ("Live experiences. Digital momentum. Built to spread."), hero intro, division summaries and the reel title "We create experiences, not just events" (`src/content/home.ts`).
- [ ] **Phone number (#1).** The site uses +971 58 854 7620 (CP p.35). The CP's vehicle-branding mock-up (p.14) shows 058 664 1020, and the template shows +971 55 406 9331. Which is correct?
- [ ] **Lead recipients (#4).** Who receives website enquiries? This sets `LEAD_TO_EMAIL`.
- [ ] **Auto-reply wording.** Approve the confirmation email text in `src/lib/leads/email.ts`.
- [ ] **Privacy policy (#8).** The form collects personal data, so publish a privacy policy before launch (strongly recommended). Terms of service can follow.
- [ ] **Canonical domain (#32).** Choose `www.viralconcepts.co` (the current setting) or `viralconcepts.co`. The CP also prints "WWW.VIRALCONCEPT.COM" (p.14), which needs correcting in the PDF.
- [ ] **Brand colours (#13).** Confirm the hex values, which were sampled from the colour sheet.
- [ ] **Hero tagline (#9).** "Built to Spread!" (logo, live now) or "Built to Create. Built to Spread." (proposed).

### Accounts and configuration

- [ ] **Vercel project** under the client's or agency's account (#32). Import the repository; the framework preset is Next.js.
- [ ] **Environment variables** for Production and Preview (see `.env.example`):
  - `NEXT_PUBLIC_SITE_URL`
  - `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`
  - `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - optional: `LEAD_AUTO_REPLY`
- [ ] **Resend.** Verify the sending domain `viralconcepts.co` (DNS records). Use a sender such as `Viral Concepts Website <website@viralconcepts.co>`.
- [ ] **Cloudflare Turnstile.** Create a widget for the production domain (and the preview domain if previews should send).
- [ ] **Vercel Firewall rule.** Rate-limit `POST` requests on any path, e.g. 10 per 10 minutes per IP (see README, "Rate limiting").
- [ ] **Vercel Deployment Protection** for preview deployments. Previews show drafts, including client names that have no permission yet.
- [ ] **Domain.** Point DNS to Vercel and confirm HTTPS and the `www` / bare-domain redirect.

### Final checks on the production deployment

- [ ] Send a real enquiry from the live site. Confirm the team email arrives with the right reply-to, and that the visitor gets the confirmation.
- [ ] `npm run qa:leaks -- https://www.viralconcepts.co` passes.
- [ ] `npm run qa:a11y -- https://www.viralconcepts.co` passes.
- [ ] `robots.txt` allows crawling, every page is `index, follow`, and `/sitemap.xml` lists the live pages.

## 2. After launch

- [ ] **Search engines.** Verify the domain in Google Search Console and Bing Webmaster Tools, then submit `/sitemap.xml`.
- [ ] **Real-user performance.** Turn on Vercel Speed Insights (optional) or watch Core Web Vitals in Search Console.
- [ ] **Lead-form monitoring.** Watch the logs for `lead-form` errors (delivery failures and rate limits) for the first weeks.
- [ ] **Google Business Profile (#15).** Once the address is confirmed.

## 3. Content that is built and waiting for client input

| Content                                                                                                                                                                                                                                          | What switches it on                                                                                                                                                   | Where                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Projects page and case studies                                                                                                                                                                                                                   | Per project: facts, permission to name the client, original photos (#20–22, #25). Ramadan Tent/Bazaar: built or renders only? "Police Barrier" page: split by client. | `src/content/projects.ts`                                |
| Industries page                                                                                                                                                                                                                                  | Industries actually served (#24)                                                                                                                                      | `src/content/industries.ts`                              |
| Company Profile download                                                                                                                                                                                                                         | Approve the web-optimised PDF (4.7 MB, supplied separately) after fixing CP p.33 (stationery mock-up with third-party/dummy contact details) and p.14 (#7)            | `src/content/company-profile.ts`, `src/content/pages.ts` |
| Digital service pages (Web, Apps, SEO, Social)                                                                                                                                                                                                   | Approve the drafted page copy (#26, #27)                                                                                                                              | `src/content/digital-services/*`                         |
| Proposed digital services: Performance Marketing (Google & Meta Ads), Content & Search Strategy (local/technical SEO, GEO), E-Commerce, Web Apps & Custom Software, AI & Workflow Automation, AI Agents & Chatbots, Generative AI & Integrations | Decide which are offered and approve the drafted summaries (#27). Each is a one-line switch.                                                                          | `src/content/digital-services/proposed.ts`               |
| AI & automation showcase (example conversation, enquiry flow, agent types)                                                                                                                                                                       | Goes live with the AI services (#27); approve the example wording                                                                                                     | `src/content/ai-showcase.ts`                             |
| "Physical meets digital" section                                                                                                                                                                                                                 | Approve as capabilities                                                                                                                                               | `src/content/digital-landing.ts`                         |
| Statistics (300+ clients, 400+ projects, …)                                                                                                                                                                                                      | Confirm current figures (#6)                                                                                                                                          | `src/content/stats.ts`                                   |
| Address, hours, WhatsApp, social profiles                                                                                                                                                                                                        | Confirm each (#2, #5, #14, #16). JSON-LD becomes LocalBusiness once an address exists.                                                                                | `src/content/site.ts`                                    |
| Legal and trading names in schema and footer                                                                                                                                                                                                     | #10                                                                                                                                                                   | `src/content/site.ts`                                    |
| Photos (hero, services, About, facility)                                                                                                                                                                                                         | Original high-resolution photos (#21)                                                                                                                                 | `src/content/media.ts`                                   |
| Testimonials, client logos                                                                                                                                                                                                                       | Quote, name, role, company and written permission (#22, #23)                                                                                                          | `src/content/testimonials.ts`                            |

Not planned unless requested: values (#12), team (#17), certifications and awards (#18, #19),
GA4 or Meta Pixel, which would need a consent banner (#31), Arabic version (#33).

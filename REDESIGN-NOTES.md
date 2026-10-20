# Viral Concepts — redesign notes (October 2026)

## Strategy

- **Scope:** Viral Concepts only. The digital marketing agency is now a separate business and website.
  - All digital pages, content, navigation, form options and components have been removed.
  - `/digital-solutions` and `/digital-solutions/*` redirect permanently (308) to the homepage, so old links never return a 404.
- **Positioning:** the Company Profile's own words, _"a One-Stop Shop for all your Events & Branding needs … under one roof"_ (CP p.3). The homepage headline is "Events & branding, under one roof."
- **Two ways in:** the site follows the two ways customers actually buy.
  1. **Plan an event:** a consultative brief covering events, conferences, exhibitions, activations and festive décor (`/services`).
  2. **Order branding & print:** a product quote for flags, banners, backdrops, signage, large format, fabric, vehicle branding, print, apparel and gifts (`/products`).
  - Every product category has a "Get a quote" link. It opens the form with that category already selected (`/contact?service=print:flags`).
- **Differentiator:** the in-house production house (design → print → fabricate → install → run) and the Company Profile's nine-step process, told as a "run of show".

## Research summary

We reviewed premium peers in the UAE/GCC (Electra, DXB Live, HOX, Emerald, Eventum Premo, Sela, Triumfo, Strokes, Efficient Advertising) and in the USA/UK (Jack Morton, PRG, Imagination, Freeman, Skyline, Quadrant2Design, Hollywood Monster, Display Wizard, Signs Express).

What we adopted:

- **Two doors:** separate "plan an event" and "order print" paths, as Freeman does.
- **Product-level quote links:** each print category has its own call to action, as Hollywood Monster and Efficient Advertising do.
- **The workshop as proof:** the production house is shown as evidence of quality.
- **Clean, consistent facts:** many local sites show broken counters, contradictory stats or dead links. This site has none.
- **One-tap "what are you planning?" picker** in the closing call to action.

What we deliberately did not copy:

- Unverified "award-winning" claims.
- Invented stats, client logos or testimonials.

## Missing from the client (the site already supports each one)

| Need                                                                          | Where it goes                                       |
| ----------------------------------------------------------------------------- | --------------------------------------------------- |
| Real event and production photos/video (the strongest upgrade)                | `src/content/event-photos.ts`, `media.ts`, projects |
| Approval to publish CP stats (300+ clients, 400+ projects)                    | `src/content/stats.ts`                              |
| Project details and client permission (Ajman Bank Career Fair, etc.)          | `src/content/projects.ts`                           |
| Client logos and testimonials with permission                                 | `src/content/testimonials.ts`                       |
| WhatsApp number (CP p.14 also shows 058 664 1020 — confirm which is correct)  | `src/content/site.ts`                               |
| Office address and hours, trade licence, social media URLs                    | `src/content/site.ts`                               |
| Prices, turnaround times and minimum quantities for print products (optional) | `src/content/products.ts`                           |
| Approved web-size Company Profile PDF                                         | `src/content/company-profile.ts`                    |
| Arabic version (expected by government buyers)                                | future phase                                        |

## Client feedback update (20 October 2026)

- Footer: the large closing "Viral Concepts" wordmark has been removed. The logo, columns, contact details and copyright line are unchanged.
- Services: there are now 16 service pages, all generated from `src/content/services/*` by one template (`/services/[slug]`). `/services` lists them in three groups.
- Client photos: optimised client photos live in `public/images/work/` and are registered in `src/content/work-photos.ts`.
- Homepage hero: the slides run in this order: branded police barriers → flags → tents.
- WhatsApp: a floating button appears on every page. The number is set in `src/content/site.ts` (`whatsapp`), which currently uses the main CP number.

Still needed from the client:

| Need                                                                                  | Where it goes                           |
| ------------------------------------------------------------------------------------- | --------------------------------------- |
| Confirm the WhatsApp number (+971 58 854 7620, or 058 664 1020?) is WhatsApp Business | `src/content/site.ts`                   |
| Mojo barrier photos, and confirmed wording for the Mojo page                          | `work-photos.ts`, `services/rentals.ts` |
| Print solutions photos (banners, roll-ups, stickers, vehicle wraps)                   | `work-photos.ts`, `service-scenes.ts`   |
| Higher-resolution corporate gift photos (the current ones are 640px)                  | `work-photos.ts`                        |
| Photos for event production, exhibitions and advertising/PR (still stock)             | `service-scenes.ts`                     |
| Whether the copyright line should keep the company name                               | `src/components/layout/Footer.tsx`      |

## Stock photography

The photos are licensed Pexels stock. Every one is listed with its Pexels page in `src/content/event-photos.ts`; please review them visually before launch. They set the scene for each service and are never captioned as the company's own work.

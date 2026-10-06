import type { Project } from "@/types/content";

import { media } from "./media";
import { companyProfile } from "./sources";

/**
 * Project candidates identified in the Company Profile (Discovery doc, section H).
 *
 * All are drafts: the CP shows names and photos but no client permission, year, venue or
 * scope. Unknown fields are left undefined — never filled with plausible values. Interim
 * galleries use only photos printed on the same CP page as the project (see content/media.ts)
 * until original high-resolution photos are supplied (checklist #20–21).
 */
export const projects = [
  {
    slug: "ajman-bank-career-fair",
    title: "Ajman Bank Career Fair",
    // Named in the CP, but no permission to name them on the website yet (checklist #22).
    // Until permission is given, the published title must not name the bank (a test enforces it).
    client: { name: "Ajman Bank", permissionToName: false },
    categories: ["exhibitions", "production"],
    serviceSlugs: ["exhibitions", "event-production-fabrication", "branding-printing"],
    industrySlug: "banking-finance",
    gallery: [],
    featured: true,
    status: "draft",
    verified: false,
    source: companyProfile(27),
    editorialNote: "Need year, venue, city, scope and permission to name Ajman Bank.",
  },
  {
    slug: "ajman-career-fair",
    title: "Ajman Career Fair",
    categories: ["events", "branding"],
    serviceSlugs: ["event-production-fabrication", "branding-printing", "exhibitions"],
    gallery: [],
    featured: true,
    status: "draft",
    verified: false,
    source: companyProfile(28),
    editorialNote:
      "Registration counters, entrance arch, flags, step-and-repeat. Need year, venue, organiser, permission.",
  },
  {
    slug: "government-hr-forum-ajman",
    title: "Government HR Forum, Ajman",
    categories: ["events", "production"],
    serviceSlugs: ["event-production-fabrication", "branding-printing"],
    industrySlug: "government",
    gallery: [],
    featured: false,
    status: "draft",
    verified: false,
    source: companyProfile(29),
    editorialNote:
      "Labelled 'Ajman Career Fair' in the CP but shows the annual government forum. Confirm it is a separate project, its name and year.",
  },
  {
    slug: "event-barrier-branding",
    title: "Event Barrier Branding",
    categories: ["branding", "events"],
    serviceSlugs: ["branding-printing", "event-rentals-entertainment"],
    gallery: [media.barrierBrandingMarathon, media.barrierBrandingMall],
    featured: true,
    status: "draft",
    verified: false,
    source: companyProfile(30),
    editorialNote:
      "CP 'Police Barrier' page mixes several clients (marathon, ADNEC, The Galleria, sportswear brand). Split into separate projects once each client is confirmed.",
  },
  {
    slug: "showroom-festive-lighting",
    title: "Showroom Festive Lighting",
    categories: ["festive-decor"],
    serviceSlugs: ["festive-mall-decor"],
    industrySlug: "automotive",
    gallery: [media.showroomFestiveLighting],
    featured: false,
    status: "draft",
    verified: false,
    source: companyProfile(24),
    editorialNote: "Automotive showrooms. Need the client (dealer group), occasion and year.",
  },
  {
    slug: "ramadan-tent",
    title: "Ramadan Tent",
    categories: ["festive-decor", "events"],
    serviceSlugs: ["festive-mall-decor", "event-rentals-entertainment"],
    gallery: [],
    featured: false,
    status: "draft",
    verified: false,
    source: companyProfile(31),
    editorialNote:
      "CP shows 3D renders only. Confirm whether it was built; if not, present as concept design.",
  },
  {
    slug: "ramadan-bazaar",
    title: "Ramadan Bazaar",
    categories: ["festive-decor", "events"],
    serviceSlugs: ["festive-mall-decor", "event-production-fabrication"],
    gallery: [],
    featured: false,
    status: "draft",
    verified: false,
    source: companyProfile(32),
    editorialNote: "CP shows 3D renders only. Confirm whether it was built, client and year.",
  },
] as const satisfies readonly Project[];

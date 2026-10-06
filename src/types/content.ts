/**
 * Content model for the Viral Concepts website.
 *
 * Every piece of business content carries a publishing gate (status + verified + source).
 * Pages, navigation, sitemap and internal links must read content through
 * `src/lib/publishing.ts` — never filter on these fields by hand.
 */

/**
 * How the current deployment treats unconfirmed content.
 * - production: only publishable content is rendered.
 * - preview: proposed/draft content is rendered with a review banner (never indexed).
 */
export type ContentMode = "production" | "preview";

/** Lifecycle of a content item. Only `live` items can reach production. */
export type ContentStatus = "live" | "proposed" | "draft";

/**
 * Where a fact came from. Traceability is mandatory so an editor can always answer
 * "who said this is true?".
 *
 * - `company-profile`: the client's Company Profile PDF (factual source of truth), with page numbers.
 * - `client-confirmed`: confirmed in writing by the client after discovery.
 * - `owner-approved`: approved for publication by the website owner (who briefs the build for the
 *   client), with the date. Used for the expanded digital & AI offering and its page copy.
 * - `stock-photo`: a licensed stock photograph (provider, page and photographer recorded).
 *   Illustrative only — never presented as the company's own work, team or premises.
 * - `template`: the website template PDF. Visual reference only — never publishable.
 * - `proposed`: our recommendation, not a company fact. Never publishable until approved.
 */
export type ContentSource =
  | { readonly kind: "company-profile"; readonly pages: readonly number[]; readonly note?: string }
  | { readonly kind: "client-confirmed"; readonly confirmedOn: IsoDate; readonly note?: string }
  | { readonly kind: "owner-approved"; readonly approvedOn: IsoDate; readonly note?: string }
  | {
      readonly kind: "stock-photo";
      readonly provider: "Pexels";
      readonly pageUrl: `https://www.pexels.com/photo/${string}`;
      readonly photographer: string;
    }
  | { readonly kind: "template"; readonly note?: string }
  | { readonly kind: "proposed"; readonly note?: string };

/** ISO calendar date, e.g. "2026-10-02". */
export type IsoDate = `${number}-${number}-${number}`;

/** Publishing gate shared by every governed content item. */
export interface Governed {
  readonly status: ContentStatus;
  /** True only when the client (or the Company Profile) stands behind the content as published. */
  readonly verified: boolean;
  readonly source: ContentSource;
}

/** A single governed value, e.g. a phone number or a statistic. */
export interface Fact<T> extends Governed {
  readonly value: T;
}

/* -------------------------------------------------------------------------- */
/* Media                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * What an image actually shows. Only `project-photo` may be presented as evidence of
 * delivered work; renders, mock-ups, illustrations and stock photos must never be.
 */
export type ImageKind =
  "project-photo" | "render" | "mockup" | "illustration" | "brand" | "stock-photo";

export interface ImageAsset extends Governed {
  /**
   * Path under /public, e.g. "/images/projects/ajman-bank-career-fair/stand-front.avif", a
   * preview-only interim photo served by /preview-media (never present in production), or a
   * licensed stock photo on the Pexels CDN (allowed in next.config.ts `images.remotePatterns`).
   */
  readonly src:
    `/images/${string}` | `/preview-media/${string}` | `https://images.pexels.com/photos/${string}`;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly kind: ImageKind;
}

/* -------------------------------------------------------------------------- */
/* SEO                                                                         */
/* -------------------------------------------------------------------------- */

export interface SeoFields {
  /** Page <title> without the site suffix. Target ≤ 60 characters including the suffix. */
  readonly title: string;
  /** Meta description. Target ≤ 155 characters. */
  readonly description: string;
  readonly primaryKeyword: string;
  readonly secondaryKeywords: readonly string[];
  /** Page h1 when it should differ from the menu title (keyword map, section J). */
  readonly h1?: string;
}

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export type PillarId = "events-experiences" | "branding-advertising" | "digital-technology";

export interface Pillar {
  readonly id: PillarId;
  readonly title: string;
  readonly summary: string;
}

/** The two service verticals map to the two URL roots: /services and /digital-solutions. */
export type ServiceVertical = "services" | "digital-solutions";

/** How digital services are grouped on the site. */
export type DigitalCapability = "marketing" | "build" | "ai";

export interface OfferingGroup {
  readonly title: string;
  readonly items: readonly string[];
}

/** A short benefit statement on a service page ("why it matters"). */
export interface ServiceHighlight {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

/**
 * Long-form content for a service's own page, with its own publishing gate.
 *
 * The service (a fact: "we offer SEO") and its page copy (claims about how it is delivered)
 * are governed separately. A source-backed service can therefore be listed while its page copy
 * is still a draft awaiting the client; the page itself exists only once both are visible.
 * Copy that restates the Company Profile cites it; copy we drafted beyond it is `proposed`.
 */
export interface ServicePageContent extends Governed {
  /** 2–3 paragraphs, roughly 120–220 words in total, unique to this service. */
  readonly intro: readonly string[];
  readonly highlights: readonly ServiceHighlight[];
  readonly cta: { readonly title: string; readonly lead: string };
  /** "What you get": concrete deliverables, shown as a checklist. */
  readonly deliverables?: readonly string[];
  /** How this service runs, step by step. Replaces the company-wide process on the page. */
  readonly steps?: readonly ServiceStep[];
  /** Platforms and technologies the service works with (names only — no partner claims). */
  readonly platforms?: readonly string[];
  /** Supporting photo beside the overview. Illustrative; never shown as delivered work. */
  readonly photo?: ImageAsset;
}

export interface ServiceStep {
  readonly title: string;
  readonly body: string;
}

export interface Service extends Governed {
  readonly slug: string;
  readonly vertical: ServiceVertical;
  readonly pillar: PillarId;
  /** Digital services only: which capability group they belong to. */
  readonly capability?: DigitalCapability;
  /** Full name used in H1s and cards. */
  readonly title: string;
  /** One-line value statement for cards and menus. */
  readonly summary: string;
  /** Sub-services grouped for display. Every item must be traceable to `source`. */
  readonly offerings: readonly OfferingGroup[];
  readonly relatedServiceSlugs: readonly string[];
  readonly seo: SeoFields;
  readonly heroImage?: ImageAsset;
  /** Required before a service page can be published (a test enforces it). */
  readonly page?: ServicePageContent;
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type ProjectCategory =
  | "events"
  | "exhibitions"
  | "branding"
  | "production"
  | "festive-decor"
  | "advertising"
  | "digital";

export interface ProjectClient {
  readonly name: string;
  /** Written permission to name the client publicly. Without it the name is never rendered. */
  readonly permissionToName: boolean;
}

export interface Project extends Governed {
  readonly slug: string;
  readonly title: string;
  readonly categories: readonly ProjectCategory[];
  readonly serviceSlugs: readonly string[];
  readonly industrySlug?: string;
  readonly client?: ProjectClient;
  readonly location?: string;
  readonly year?: number;
  readonly summary?: string;
  readonly challenge?: string;
  readonly solution?: string;
  readonly execution?: string;
  /** Only verified, client-approved outcomes. Never inferred. */
  readonly outcome?: string;
  readonly gallery: readonly ImageAsset[];
  readonly featured: boolean;
  /**
   * What is still needed from the client before the project can be published. Shown only in
   * preview builds (as a review note for the client); never in production.
   */
  readonly editorialNote?: string;
}

/* -------------------------------------------------------------------------- */
/* Supporting collections                                                      */
/* -------------------------------------------------------------------------- */

export interface Industry extends Governed {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
}

/** Where an FAQ is shown. "home" or a service slug. */
export type FaqPlacement = "home" | `service:${string}`;

export interface Faq extends Governed {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly placements: readonly FaqPlacement[];
}

export interface Stat extends Governed {
  readonly id: string;
  readonly value: number;
  readonly suffix: "" | "+" | "%";
  readonly label: string;
}

export interface Testimonial extends Governed {
  readonly id: string;
  readonly quote: string;
  readonly personName: string;
  readonly personRole: string;
  readonly company: string;
  readonly permissionToPublish: boolean;
}

export interface ProcessStep {
  readonly id: string;
  readonly title: string;
}

/** A downloadable file served from /public/downloads (e.g. the company profile PDF). */
export interface Download {
  readonly href: `/downloads/${string}.pdf`;
  /** File size in bytes, shown next to the download button. */
  readonly bytes: number;
  readonly pages: number;
  readonly updatedOn: IsoDate;
}

export type SocialNetwork = "facebook" | "instagram" | "linkedin" | "x" | "youtube" | "tiktok";

export interface SocialProfile extends Governed {
  readonly network: SocialNetwork;
  readonly url: `https://${string}`;
}

import type { Service } from "@/types/content";

/**
 * The single source of URL paths. Components, the sitemap, breadcrumbs and JSON-LD all
 * build links through these helpers, so a route can never drift between places.
 *
 * Paths have no trailing slash (Next.js default).
 */
export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  digitalSolutions: "/digital-solutions",
  projects: "/projects",
  industries: "/industries",
  companyProfile: "/company-profile",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
} as const;

export type StaticRoute = (typeof routes)[keyof typeof routes];

/** /services/[slug] or /digital-solutions/[slug], depending on the service's vertical. */
export function serviceRoute(service: Pick<Service, "slug" | "vertical">): string {
  return `/${service.vertical}/${service.slug}`;
}

export function projectRoute(slug: string): string {
  return `${routes.projects}/${slug}`;
}

/** Contact page with a service pre-selected in the enquiry form. */
export function contactRouteForService(serviceSlug: string): string {
  return `${routes.contact}?service=${encodeURIComponent(serviceSlug)}`;
}

/** Join a path onto the canonical origin. */
export function absoluteUrl(origin: string, path: string): string {
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return path === "/" ? origin : `${origin}${normalisedPath}`;
}

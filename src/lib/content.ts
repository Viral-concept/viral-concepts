import "server-only";

import { contentMode } from "@/config/env.server";
import { companyProfileDownload } from "@/content/company-profile";
import { faqs } from "@/content/faqs";
import { industries } from "@/content/industries";
import { type PageKey, pages } from "@/content/pages";
import { pillars } from "@/content/pillars";
import { serviceScenes } from "@/content/service-scenes";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { stats } from "@/content/stats";
import { projectCategoryLabels } from "@/content/taxonomy";
import { testimonials } from "@/content/testimonials";
import { filterVisible, isServicePageVisible, isVisible } from "@/lib/publishing";
import { routes, serviceRoute } from "@/lib/routes";
import type {
  ContentMode,
  Download,
  Faq,
  FaqPlacement,
  Fact,
  Governed,
  ImageAsset,
  Industry,
  Pillar,
  Project,
  ProjectCategory,
  Service,
  ServicePageContent,
  ServiceVertical,
  SocialProfile,
  Stat,
  Testimonial,
} from "@/types/content";

/**
 * Content query layer.
 *
 * Every page, layout, sitemap and metadata function reads content through these functions,
 * which apply the deployment's content mode. Importing raw content arrays elsewhere is a
 * review-blocking mistake: it bypasses the publishing gate.
 */

export function getContentMode(): ContentMode {
  return contentMode;
}

// Widen the `as const` content to the model types at the boundary.
const allServices: readonly Service[] = services;
const allProjects: readonly Project[] = projects;
const allIndustries: readonly Industry[] = industries;
const allFaqs: readonly Faq[] = faqs;
const allStats: readonly Stat[] = stats;
const allPillars: readonly Pillar[] = pillars;

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export function getServices(vertical?: ServiceVertical): Service[] {
  const scoped = vertical ? allServices.filter((s) => s.vertical === vertical) : allServices;
  return filterVisible(scoped, contentMode);
}

export function getService(vertical: ServiceVertical, slug: string): Service | undefined {
  const service = allServices.find((s) => s.vertical === vertical && s.slug === slug);
  return service && isVisible(service, contentMode) ? service : undefined;
}

export type ServiceWithPage = Service & { readonly page: ServicePageContent };

function hasPage(service: Service): service is ServiceWithPage {
  return isServicePageVisible(service, contentMode);
}

/** Whether this service has its own page in this deployment. */
export function hasServicePage(service: Service): boolean {
  return hasPage(service);
}

const verticalLanding = {
  services: routes.services,
} as const satisfies Record<ServiceVertical, string>;

/**
 * Where a link to a service goes. Every service link on the site (menus, footer, cards) is built
 * here: the service's own page when it exists, otherwise the service's entry on its vertical's
 * landing page (`/services#exhibitions`). A link can therefore never point at a missing page.
 */
export function getServiceHref(service: Service): string {
  return hasPage(service)
    ? serviceRoute(service)
    : `${verticalLanding[service.vertical]}#${service.slug}`;
}

/** Services in a vertical that can have their own page (visible and with page content). */
export function getServicePages(vertical: ServiceVertical): ServiceWithPage[] {
  return getServices(vertical).filter(hasPage);
}

/** A visible service with page content, or undefined (the route then returns 404). */
export function getServicePage(
  vertical: ServiceVertical,
  slug: string,
): ServiceWithPage | undefined {
  const service = getService(vertical, slug);
  return service && hasPage(service) ? service : undefined;
}

/** Related services across both verticals; hidden services are dropped, never linked. */
export function getRelatedServices(service: Service): Service[] {
  const visible = getServices();
  return service.relatedServiceSlugs
    .map((slug) => visible.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Service => candidate !== undefined);
}

export interface PillarWithServices extends Pillar {
  readonly services: Service[];
}

/** Pillars with their visible services; pillars with none are omitted. */
export function getPillarsWithServices(): PillarWithServices[] {
  const visible = getServices();
  return allPillars
    .map((pillar) => ({ ...pillar, services: visible.filter((s) => s.pillar === pillar.id) }))
    .filter((pillar) => pillar.services.length > 0);
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export function getProjects(): Project[] {
  return filterVisible(allProjects, contentMode);
}

export function getProject(slug: string): Project | undefined {
  const project = allProjects.find((p) => p.slug === slug);
  return project && isVisible(project, contentMode) ? project : undefined;
}

export function getFeaturedProjects(limit: number): Project[] {
  return getProjects()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProjectsForService(serviceSlug: string): Project[] {
  return getProjects().filter((p) => p.serviceSlugs.includes(serviceSlug));
}

/**
 * Other visible projects, ranked by how much they share with this one (categories count
 * double, services once). Projects with nothing in common are left out.
 */
export function getRelatedProjects(project: Project, limit: number): Project[] {
  const score = (other: Project) =>
    other.categories.filter((c) => project.categories.includes(c)).length * 2 +
    other.serviceSlugs.filter((s) => project.serviceSlugs.includes(s)).length;
  return getProjects()
    .filter((other) => other.slug !== project.slug)
    .map((other) => ({ other, score: score(other) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ other }) => other);
}

/** Categories used by at least one visible project, in taxonomy order, with counts. */
export function getProjectCategoryCounts(): { category: ProjectCategory; count: number }[] {
  const visible = getProjects();
  return (Object.keys(projectCategoryLabels) as ProjectCategory[])
    .map((category) => ({
      category,
      count: visible.filter((p) => p.categories.includes(category)).length,
    }))
    .filter(({ count }) => count > 0);
}

/** Visible industries that at least one visible project belongs to, with counts. */
export function getProjectIndustryCounts(): { industry: Industry; count: number }[] {
  const visible = getProjects();
  return getIndustries()
    .map((industry) => ({
      industry,
      count: visible.filter((p) => p.industrySlug === industry.slug).length,
    }))
    .filter(({ count }) => count > 0);
}

/** Services credited on a project that are visible in this deployment. */
export function getProjectServices(project: Project): Service[] {
  const visible = getServices();
  return project.serviceSlugs
    .map((slug) => visible.find((service) => service.slug === slug))
    .filter((service): service is Service => service !== undefined);
}

/** Project photos visible in this deployment (drafts only in preview). */
export function getProjectGallery(project: Project): ImageAsset[] {
  return project.gallery.filter((image) => isVisible(image, contentMode));
}

/** The client's name only when written permission to name them exists. */
export function getPublicClientName(project: Project): string | undefined {
  return project.client?.permissionToName ? project.client.name : undefined;
}

/* -------------------------------------------------------------------------- */
/* Supporting collections                                                      */
/* -------------------------------------------------------------------------- */

export function getIndustries(): Industry[] {
  return filterVisible(allIndustries, contentMode);
}

export function getFaqs(placement: FaqPlacement): Faq[] {
  return filterVisible(allFaqs, contentMode).filter((faq) => faq.placements.includes(placement));
}

export function getStats(): Stat[] {
  return filterVisible(allStats, contentMode);
}

export function getTestimonials(): Testimonial[] {
  return filterVisible(testimonials, contentMode).filter((t) => t.permissionToPublish);
}

/* -------------------------------------------------------------------------- */
/* Pages                                                                       */
/* -------------------------------------------------------------------------- */

/** Whether an optional page exists in this deployment (see src/content/pages.ts). */
export function isPageVisible(key: PageKey): boolean {
  return isVisible(pages[key], contentMode);
}

/** The Projects index exists once at least one project is visible. */
export function hasProjectsPage(): boolean {
  return getProjects().length > 0;
}

/** The Industries page exists once at least one industry is visible. */
export function hasIndustriesPage(): boolean {
  return getIndustries().length > 0;
}

/* -------------------------------------------------------------------------- */
/* Company facts                                                               */
/* -------------------------------------------------------------------------- */

function visibleFact<T>(fact: Fact<T> | null): Fact<T> | undefined {
  return fact && isVisible(fact, contentMode) ? fact : undefined;
}

/** The company profile PDF, once the client has approved a web-optimised file. */
export function getCompanyProfileDownload(): Fact<Download> | undefined {
  return visibleFact(companyProfileDownload);
}

/** Company facts that may be shown in this deployment (each is optional by design). */
export function getCompanyFacts() {
  return {
    foundingYear: visibleFact(site.foundingYear)?.value,
    reach: visibleFact(site.reach)?.value ?? [],
  } as const;
}

/** Contact channels that may be shown in this deployment. Missing keys must not render. */
export function getContactChannels() {
  const { contact } = site;
  return {
    phone: visibleFact(contact.phone),
    whatsapp: visibleFact(contact.whatsapp),
    email: visibleFact(contact.email),
    address: visibleFact(contact.address),
    businessHours: visibleFact(contact.businessHours),
  } as const;
}

export function getSocialProfiles(): SocialProfile[] {
  return filterVisible(site.socials, contentMode);
}

/* -------------------------------------------------------------------------- */
/* Generic                                                                     */
/* -------------------------------------------------------------------------- */

/** Visible items of any governed list (e.g. page copy blocks) in this deployment. */
export function getVisible<T extends Governed>(items: readonly T[]): T[] {
  return filterVisible(items, contentMode);
}

/* -------------------------------------------------------------------------- */
/* Images                                                                      */
/* -------------------------------------------------------------------------- */

/** The image if it may be shown in this deployment (drafts appear only in preview). */
export function getVisibleImage(image: ImageAsset | undefined): ImageAsset | undefined {
  return image && isVisible(image, contentMode) ? image : undefined;
}

/**
 * The first image that may represent delivered work: a project photo that is visible in this
 * deployment. In production that means publishable; in preview, drafts are allowed (flagged).
 */
export function getCoverImage(images: readonly ImageAsset[]): ImageAsset | undefined {
  return images.find((image) => image.kind === "project-photo" && isVisible(image, contentMode));
}

/** Hero tagline: the proposed line only where visible, otherwise the confirmed logo tagline. */
export function getHeroTagline(): Fact<string> {
  return visibleFact(site.heroTagline) ?? site.logoTagline;
}

/**
 * Service photography. The card/hero photo is the service's hero image, or its first scene when
 * it has none. The gallery is the client's own photos of delivered work beyond the three shown
 * beside the page story — stock photos never appear in it.
 */
export function getServiceScenes(service: Service): ImageAsset[] {
  return (serviceScenes[service.slug] ?? []).flatMap((image) => {
    const visible = getVisibleImage(image);
    return visible ? [visible] : [];
  });
}

export function getServiceCardImage(service: Service): ImageAsset | undefined {
  return getVisibleImage(service.heroImage) ?? getServiceScenes(service)[0];
}

export function getServiceGallery(service: Service): ImageAsset[] {
  return getServiceScenes(service)
    .slice(3)
    .filter((image) => image.kind === "project-photo");
}

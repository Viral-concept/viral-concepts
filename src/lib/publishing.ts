import type { ContentMode, ContentSource, Governed, ImageAsset } from "@/types/content";

/**
 * Publishing rules. Pure functions with no environment access so they are trivially testable.
 * The server-only query layer (`src/lib/content.ts`) binds them to the deployment's content mode.
 */

/** Sources that may stand behind published content. Template and proposed sources never can. */
export function isTrustedSource(source: ContentSource): boolean {
  return (
    source.kind === "company-profile" ||
    source.kind === "client-confirmed" ||
    source.kind === "owner-approved" ||
    source.kind === "stock-photo"
  );
}

/**
 * The single production gate: live, verified and backed by a trusted source.
 * Everything that reaches the public site, the sitemap, navigation or internal links passes this.
 */
export function isPublishable(item: Governed): boolean {
  return item.status === "live" && item.verified && isTrustedSource(item.source);
}

/**
 * Visibility for a given content mode.
 * - production: only publishable content.
 * - preview: also proposed and draft content (rendered with a review banner), but never
 *   template-sourced placeholders, which must not appear anywhere.
 */
export function isVisible(item: Governed, mode: ContentMode): boolean {
  if (mode === "production") return isPublishable(item);
  return item.source.kind !== "template";
}

/**
 * A service has its own page only when the service and its page copy are both visible.
 * Every link to /services/[slug] is built on this rule.
 */
export function isServicePageVisible(
  service: Governed & { readonly page?: Governed },
  mode: ContentMode,
): boolean {
  return service.page !== undefined && isVisible(service, mode) && isVisible(service.page, mode);
}

/** True when a visible item is not yet publishable and must carry a "not live" banner. */
export function needsReviewBanner(item: Governed): boolean {
  return !isPublishable(item);
}

const REVIEW_LABELS = {
  proposed: "Proposed · not live",
  draft: "Draft · not live",
  live: "Unverified · not live",
} as const;

/** Review badge text for an unpublishable item, or undefined when it is publishable. */
export function reviewLabel(item: Governed): string | undefined {
  return needsReviewBanner(item) ? REVIEW_LABELS[item.status] : undefined;
}

/** Filter a collection by visibility, preserving order and readonly-ness. */
export function filterVisible<T extends Governed>(items: readonly T[], mode: ContentMode): T[] {
  return items.filter((item) => isVisible(item, mode));
}

/**
 * Only publishable photos of delivered work count as proof. Renders, mock-ups and
 * illustrations may be shown as such, but never as evidence of a completed project.
 */
export function isProofImage(image: ImageAsset): boolean {
  return isPublishable(image) && image.kind === "project-photo";
}

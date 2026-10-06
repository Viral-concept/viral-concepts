import type { Metadata } from "next";

import { site } from "@/content/site";

/**
 * Page-level metadata builder. The root layout provides `metadataBase`, the title template
 * and the deployment-wide robots policy; pages describe themselves through this helper so
 * every page gets a canonical URL, Open Graph and Twitter fields in the same shape.
 */

export const SITE_TITLE_TEMPLATE = `%s | ${site.name}`;
export const DEFAULT_TITLE = `${site.name} – Events, Branding & Production in Dubai`;
export const OG_LOCALE = "en_AE";

interface PageMetadataInput {
  /** Title without the site suffix; the root template appends it. */
  readonly title: string;
  /** Use the title as-is, without the site suffix (homepage). */
  readonly absoluteTitle?: boolean;
  readonly description: string;
  /** Root-relative path of the canonical URL, e.g. "/services/exhibitions". */
  readonly path: string;
  /** Exclude this page from search even on the production deployment. */
  readonly noindex?: boolean;
}

export function buildMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  noindex = false,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: OG_LOCALE,
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

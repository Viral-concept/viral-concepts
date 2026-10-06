import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/env.public";
import { absoluteUrl } from "@/lib/routes";
import { getSitemapPaths } from "@/lib/sitemap-paths";

/**
 * /sitemap.xml. No lastModified, changeFrequency or priority: the site has no real
 * per-page edit dates yet, and invented ones are worse than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapPaths().map((path) => ({ url: absoluteUrl(siteUrl, path) }));
}

import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/env.public";
import { isIndexable } from "@/config/env.server";

/**
 * /robots.txt. Only the production deployment invites crawlers; previews and local builds
 * shut them out entirely (the pages also carry noindex).
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

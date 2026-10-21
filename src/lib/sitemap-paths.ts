import "server-only";

import {
  getProjects,
  getServicePages,
  hasIndustriesPage,
  hasProjectsPage,
  isPageVisible,
} from "@/lib/content";
import { projectRoute, routes, serviceRoute } from "@/lib/routes";

/**
 * Every page that exists in this deployment, in navigation order. The sitemap is built from
 * the same content queries as the pages themselves, so it can never list a hidden page.
 */
export function getSitemapPaths(): string[] {
  return [
    routes.home,
    ...(isPageVisible("about") ? [routes.about] : []),
    routes.services,
    ...getServicePages("services").map(serviceRoute),
    routes.products,
    routes.gallery,
    ...(hasProjectsPage()
      ? [routes.projects, ...getProjects().map((project) => projectRoute(project.slug))]
      : []),
    ...(hasIndustriesPage() ? [routes.industries] : []),
    ...(isPageVisible("companyProfile") ? [routes.companyProfile] : []),
    routes.contact,
    ...(isPageVisible("privacyPolicy") ? [routes.privacyPolicy] : []),
    ...(isPageVisible("terms") ? [routes.terms] : []),
  ];
}

import { notFound } from "next/navigation";

import { projectsLanding } from "@/content/projects-landing";
import { hasProjectsPage } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = `Viral Concepts — ${projectsLanding.title}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** No card for a page that does not exist in this deployment. */
export default function Image() {
  if (!hasProjectsPage()) notFound();
  return renderOgImage({ eyebrow: "Projects", title: projectsLanding.title });
}

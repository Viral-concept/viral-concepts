import { notFound } from "next/navigation";

import { industriesLanding } from "@/content/industries-landing";
import { hasIndustriesPage } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = `Viral Concepts — ${industriesLanding.title}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** No card for a page that does not exist in this deployment. */
export default function Image() {
  if (!hasIndustriesPage()) notFound();
  return renderOgImage({ eyebrow: "Industries", title: industriesLanding.title });
}

import { notFound } from "next/navigation";

import { companyProfileContent } from "@/content/company-profile";
import { isPageVisible } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = `Viral Concepts — ${companyProfileContent.title}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** No card for a page that does not exist in this deployment. */
export default function Image() {
  if (!isPageVisible("companyProfile")) notFound();
  return renderOgImage({ eyebrow: "Company profile", title: companyProfileContent.title });
}

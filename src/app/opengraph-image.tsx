import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

/** Default social card; every route without its own card inherits this one. */
export const alt = "Viral Concepts — events, branding and production in Dubai";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Events · Branding · Production · Advertising · Digital",
    title: "Events, branding and production, under one roof",
  });
}

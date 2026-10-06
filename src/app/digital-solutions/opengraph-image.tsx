import { digitalLanding } from "@/content/digital-landing";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = `Viral Concepts — ${digitalLanding.title}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ eyebrow: "Digital Solutions", title: digitalLanding.title });
}

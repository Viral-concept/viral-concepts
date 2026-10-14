import { plainText } from "@/components/ui/Accent";
import { servicesLanding } from "@/content/services-landing";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = `Viral Concepts — ${plainText(servicesLanding.title)}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ eyebrow: "Our services", title: plainText(servicesLanding.title) });
}

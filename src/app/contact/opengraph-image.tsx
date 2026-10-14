import { contactContent } from "@/content/contact";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = `Viral Concepts — ${contactContent.title.replace(/\*/g, "")}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ eyebrow: "Contact", title: contactContent.title });
}

import { plainText } from "@/components/ui/Accent";
import { aboutContent } from "@/content/about";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = `Viral Concepts — ${plainText(aboutContent.hero.title)}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "About Viral Concepts",
    title: plainText(aboutContent.hero.title),
  });
}

import { getServicePage, getServicePages } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = "Viral Concepts service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const dynamicParams = false;

/** Rendered at build time for the same slugs as the page. */
export function generateStaticParams() {
  return getServicePages("digital-solutions").map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServicePage("digital-solutions", slug);
  return renderOgImage({
    eyebrow: "Digital Solutions",
    title: service ? (service.seo.h1 ?? service.title) : "Viral Concepts",
  });
}

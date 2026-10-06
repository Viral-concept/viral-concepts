import { projectCategoryLabels } from "@/content/taxonomy";
import { getProject, getProjects } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og/render";

export const alt = "Viral Concepts project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const dynamicParams = false;

/** Rendered at build time for the same slugs as the page. */
export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project
      ? `Project · ${project.categories.map((c) => projectCategoryLabels[c]).join(" · ")}`
      : "Projects",
    title: project?.title ?? "Viral Concepts",
  });
}

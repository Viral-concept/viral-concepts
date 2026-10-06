import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectPage } from "@/components/templates/ProjectPage";
import { projectCategoryLabels } from "@/content/taxonomy";
import { getProject, getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { projectRoute } from "@/lib/routes";

/** /projects/[slug]. Only projects visible in this deployment are generated; others 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const categories = project.categories.map((c) => projectCategoryLabels[c].toLowerCase());
  return buildMetadata({
    title: project.title,
    // A published project always has a summary (tests enforce it); the fallback states only
    // what the project record itself says.
    description:
      project.summary ??
      `${project.title}: a ${categories.join(" and ")} project by Viral Concepts.`,
    path: projectRoute(project.slug),
  });
}

export default async function ProjectRoute({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}

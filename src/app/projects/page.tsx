import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProjectCard } from "@/components/cards/ProjectCard";
import { FilterChips, type FilterGroup } from "@/components/projects/FilterChips";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { projectsLanding } from "@/content/projects-landing";
import { projectCategoryLabels } from "@/content/taxonomy";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import {
  getProjectCategoryCounts,
  getProjectIndustryCounts,
  getProjects,
  hasProjectsPage,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { routes } from "@/lib/routes";

export const metadata = buildMetadata({
  title: projectsLanding.seo.title,
  description: projectsLanding.seo.description,
  path: routes.projects,
});

const GRID_ID = "project-grid";

/**
 * /projects (Discovery doc, section H): hero → category filter → grid → CTA.
 *
 * The page is static. `?category=` and `?industry=` views are filtered in the browser (see ProjectFilter) and
 * all share this page's canonical URL, so search engines index one page, not one per filter.
 * The page exists only while at least one project is visible in this deployment.
 */
export default function ProjectsPage() {
  if (!hasProjectsPage()) notFound();

  const projects = getProjects();
  const groups: FilterGroup[] = [
    {
      param: "category" as const,
      title: "Category",
      options: getProjectCategoryCounts().map(({ category, count }) => ({
        value: category,
        label: projectCategoryLabels[category],
        count,
      })),
    },
    {
      param: "industry" as const,
      title: "Industry",
      options: getProjectIndustryCounts().map(({ industry, count }) => ({
        value: industry.slug,
        label: industry.title,
        count,
      })),
    },
  ].filter((group) => group.options.length > 0);
  // Filtering is worth offering only when it can narrow the list.
  const showFilters = groups.some((group) => group.options.length > 1) || groups.length > 1;
  const secondary = getSecondaryContactAction();
  const filterProps = { basePath: routes.projects, groups, total: projects.length };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Projects", href: routes.projects },
        ]}
        eyebrow={projectsLanding.eyebrow}
        title={projectsLanding.title}
        lead={projectsLanding.lead}
      />

      <Section tone="light" labelledBy="projects-grid-title">
        <h2 id="projects-grid-title" className="sr-only">
          All projects
        </h2>
        {showFilters ? (
          <nav aria-label="Filter projects" className="flex flex-col gap-4">
            <Suspense
              fallback={
                <>
                  <FilterChips {...filterProps} />
                  <p className="text-sm text-muted">
                    Showing all {projects.length} {projects.length === 1 ? "project" : "projects"}
                  </p>
                </>
              }
            >
              <ProjectFilter {...filterProps} gridId={GRID_ID} />
            </Suspense>
          </nav>
        ) : null}
        <ul id={GRID_ID} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <li
              key={project.slug}
              data-category={project.categories.join(" ")}
              data-industry={project.industrySlug}
            >
              <ProjectCard project={project} eager={i === 0} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={projectsLanding.cta.title}
        lead={projectsLanding.cta.lead}
        primary={{ label: "Start Your Project", href: PRIMARY_CTA.href }}
        {...(secondary ? { secondary } : {})}
      />
    </>
  );
}

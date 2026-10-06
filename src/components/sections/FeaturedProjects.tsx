import { ProjectCard } from "@/components/cards/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/**
 * Selected projects. Rendered only when projects are visible; the "view all" link appears only
 * when the Projects page exists.
 */
interface FeaturedProjectsProps {
  readonly tone: SectionTone;
  readonly projects: readonly Project[];
  readonly allProjectsHref?: string;
  readonly title?: string;
}

export function FeaturedProjects({
  tone,
  projects,
  allProjectsHref,
  title = "Selected work",
}: FeaturedProjectsProps) {
  return (
    <Section tone={tone} labelledBy="featured-projects-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader id="featured-projects-title" eyebrow="Projects" title={title} />
        {allProjectsHref ? (
          <ButtonLink
            href={allProjectsHref}
            variant="quiet"
            className="shrink-0 self-start md:self-auto"
          >
            View all projects
          </ButtonLink>
        ) : null}
      </div>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug} className="reveal">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

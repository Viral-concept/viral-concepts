import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { HexWatermark } from "@/components/ui/BrandMotifs";
import { Icon } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { projectCategoryLabels } from "@/content/taxonomy";
import { getCoverImage, getPublicClientName } from "@/lib/content";
import { cx } from "@/lib/cx";
import { projectRoute } from "@/lib/routes";
import type { Project } from "@/types/content";

/**
 * Portfolio card. The cover is a project photo visible in this deployment (publishable in
 * production; flagged drafts in preview); without one the card shows a branded panel rather
 * than a stock or placeholder photo. Client name, location and
 * year appear only when known (and, for the client, only with permission to name them).
 */
interface ProjectCardProps {
  readonly project: Project;
  readonly headingLevel?: 2 | 3;
  /** Load the cover immediately (only for a card above the fold on first paint). */
  readonly eager?: boolean;
  readonly className?: string;
}

export function ProjectCard({
  project,
  headingLevel = 3,
  eager = false,
  className,
}: ProjectCardProps) {
  const Heading = `h${headingLevel}` as const;
  const cover = getCoverImage(project.gallery);
  const clientName = getPublicClientName(project);
  const primaryCategory = project.categories[0];
  const meta = [project.location, project.year?.toString()].filter(
    (value): value is string => value !== undefined,
  );

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card",
        "transition-[box-shadow,translate] duration-(--duration-base) ease-(--ease-brand) hover:-translate-y-0.5 hover:shadow-raised",
        "has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-teal-600",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-teal-800">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            className="size-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-brand) group-hover:scale-104"
          />
        ) : (
          // No verified photo yet: a decorative brand panel, never a stand-in photo.
          <div
            aria-hidden="true"
            className="relative isolate size-full bg-hex-grid-dark text-cyan-400/25"
          >
            <HexWatermark className="top-1/2 left-1/2 w-2/5 -translate-x-1/2 -translate-y-1/2" />
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {primaryCategory ? (
            <Badge tone="inverse">{projectCategoryLabels[primaryCategory]}</Badge>
          ) : null}
          <ReviewFlag item={project} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {clientName ? <p className="text-sm font-semibold text-teal-600">{clientName}</p> : null}
        <Heading className="text-h3 text-ink">
          <Link
            href={projectRoute(project.slug)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </Heading>
        {project.summary ? <p className="text-muted">{project.summary}</p> : null}
        {meta.length > 0 ? (
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            {project.location ? (
              <span className="inline-flex items-center gap-1.5">
                <Icon name="map-pin" className="size-4" />
                {project.location}
              </span>
            ) : null}
            {project.year ? <span>{project.year}</span> : null}
          </p>
        ) : null}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-teal-800"
        >
          View project
          <Icon
            name="arrow-right"
            className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}

import Link from "next/link";

import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projectCategoryLabels } from "@/content/taxonomy";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import {
  getCoverImage,
  getProjectGallery,
  getProjectServices,
  getPublicClientName,
  getRelatedProjects,
  getServiceHref,
} from "@/lib/content";
import { PRIMARY_CTA } from "@/lib/navigation";
import { needsReviewBanner, reviewLabel } from "@/lib/publishing";
import { projectJsonLd } from "@/lib/structured-data";
import { projectRoute, routes } from "@/lib/routes";
import type { Project } from "@/types/content";

/**
 * Project case study (Discovery doc, section H): hero → at a glance + story → gallery →
 * related projects → CTA.
 *
 * Every field is optional and nothing is filled in: a row, story part or section without
 * confirmed content is simply not rendered. The client is named only with written permission,
 * and the outcome appears only because the whole project is verified before publishing.
 */
interface ProjectPageProps {
  readonly project: Project;
}

const STORY = [
  { key: "challenge", title: "The brief" },
  { key: "solution", title: "What we delivered" },
  { key: "execution", title: "How it came together" },
  { key: "outcome", title: "Outcome" },
] as const satisfies readonly { key: keyof Project; title: string }[];

export function ProjectPage({ project }: ProjectPageProps) {
  const cover = getCoverImage(project.gallery);
  const gallery = getProjectGallery(project);
  const services = getProjectServices(project);
  const related = getRelatedProjects(project, 3);
  const clientName = getPublicClientName(project);
  const secondary = getSecondaryContactAction();
  const categories = project.categories.map((c) => projectCategoryLabels[c]);
  const story = STORY.flatMap(({ key, title }) => {
    const body = project[key];
    return body ? [{ key, title, body }] : [];
  });
  // What the client still has to supply. Preview builds only: a draft is never in production.
  const reviewNote = needsReviewBanner(project) ? project.editorialNote : undefined;

  const facts = [
    clientName && { term: "Client", detail: clientName },
    project.location && { term: "Location", detail: project.location },
    project.year && { term: "Year", detail: String(project.year) },
    categories.length > 0 && { term: "Category", detail: categories.join(", ") },
  ].filter((fact): fact is { term: string; detail: string } => Boolean(fact));

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Projects", href: routes.projects },
          { label: project.title, href: projectRoute(project.slug) },
        ]}
        eyebrow={categories.join(" · ")}
        title={project.title}
        {...(project.summary ? { lead: project.summary } : {})}
        reviewItem={project}
        {...(cover ? { image: cover } : {})}
        actions={
          <ButtonLink href={PRIMARY_CTA.href} size="lg" icon="arrow-right">
            {PRIMARY_CTA.label}
          </ButtonLink>
        }
      />

      <PageBlocks
        blocks={[
          {
            key: "details",
            render: (tone) => (
              <Section tone={tone} labelledBy="project-glance-title">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <aside className="flex flex-col gap-6 self-start rounded-card border border-line bg-white p-6 shadow-card lg:col-span-4">
                    <h2 id="project-glance-title" className="text-h3 text-ink">
                      At a glance
                    </h2>
                    {facts.length > 0 ? (
                      <dl className="flex flex-col gap-4">
                        {facts.map((fact) => (
                          <div key={fact.term} className="flex flex-col gap-1">
                            <dt className="text-eyebrow text-teal-600 uppercase">{fact.term}</dt>
                            <dd className="text-ink">{fact.detail}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                    {services.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        <h3 className="text-eyebrow text-teal-600 uppercase">Services provided</h3>
                        <ul className="flex flex-wrap gap-2">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={getServiceHref(service)}
                                className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-semibold text-teal-800 hover:border-teal-600"
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </aside>

                  <div className="flex flex-col gap-10 lg:col-span-8">
                    {reviewNote ? (
                      <div className="flex flex-col gap-3 rounded-card border-2 border-yellow-400 bg-white p-6">
                        <Badge tone="review" className="self-start">
                          Needed before publishing
                        </Badge>
                        <p className="text-ink">{reviewNote}</p>
                      </div>
                    ) : null}
                    {story.map((part) => (
                      <div key={part.key} className="flex flex-col gap-4">
                        <h2 className="text-h3 text-ink">{part.title}</h2>
                        <p className="text-lead text-muted">{part.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            ),
          },
          gallery.length > 0 && {
            key: "gallery",
            render: (tone) => (
              <Section tone={tone} labelledBy="project-gallery-title">
                <SectionHeader
                  id="project-gallery-title"
                  eyebrow="Gallery"
                  title="Project photos"
                />
                <div className="mt-10">
                  <ProjectGallery
                    title={project.title}
                    images={gallery.map((image) => {
                      const label = reviewLabel(image);
                      return {
                        src: image.src,
                        alt: image.alt,
                        width: image.width,
                        height: image.height,
                        ...(label ? { reviewLabel: label } : {}),
                      };
                    })}
                  />
                </div>
              </Section>
            ),
          },
          related.length > 0 && {
            key: "related",
            render: (tone) => (
              <FeaturedProjects
                tone={tone}
                projects={related}
                title="Related projects"
                allProjectsHref={routes.projects}
              />
            ),
          },
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                title="Planning something similar?"
                lead="Tell us about your event, exhibition or campaign — we’ll roll it out for you."
                primary={{ label: "Start Your Project", href: PRIMARY_CTA.href }}
                {...(secondary ? { secondary } : {})}
              />
            ),
          },
        ]}
      />
    </>
  );
}

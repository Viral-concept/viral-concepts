import { notFound } from "next/navigation";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { AppLink } from "@/components/ui/AppLink";
import { Icon } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { industriesLanding } from "@/content/industries-landing";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import {
  getIndustries,
  getProjectIndustryCounts,
  hasIndustriesPage,
  hasProjectsPage,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { routes } from "@/lib/routes";

export const metadata = buildMetadata({
  title: industriesLanding.seo.title,
  description: industriesLanding.seo.description,
  path: routes.industries,
});

/**
 * /industries: one card per client-validated industry, linking to its projects
 * (`/projects?industry=…`) when any are published. Exists only while an industry is visible.
 */
export default function IndustriesPage() {
  if (!hasIndustriesPage()) notFound();

  const industries = getIndustries();
  const counts = new Map(
    hasProjectsPage()
      ? getProjectIndustryCounts().map(({ industry, count }) => [industry.slug, count])
      : [],
  );
  const secondary = getSecondaryContactAction();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Industries", href: routes.industries },
        ]}
        eyebrow={industriesLanding.eyebrow}
        title={industriesLanding.title}
        lead={industriesLanding.lead}
      />

      <Section tone="light" labelledBy="industries-list-title">
        <h2 id="industries-list-title" className="sr-only">
          Industries
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const count = counts.get(industry.slug) ?? 0;
            return (
              <li
                key={industry.slug}
                id={industry.slug}
                className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-card reveal"
              >
                <span aria-hidden="true" className="h-1 w-12 rounded-full bg-cyan-400" />
                <ReviewFlag item={industry} className="self-start" />
                <h3 className="text-h3 text-ink">{industry.title}</h3>
                <p className="text-muted">{industry.summary}</p>
                {count > 0 ? (
                  <AppLink
                    href={`${routes.projects}?industry=${industry.slug}`}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-600"
                  >
                    {count === 1 ? "View the project" : `View ${count} projects`}
                    <Icon name="arrow-right" className="size-4" />
                  </AppLink>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaBand
        title={industriesLanding.cta.title}
        lead={industriesLanding.cta.lead}
        primary={{ label: "Start Your Project", href: PRIMARY_CTA.href }}
        {...(secondary ? { secondary } : {})}
      />
    </>
  );
}

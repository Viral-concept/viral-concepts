import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureList } from "@/components/sections/FeatureList";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  ServiceDeliverables,
  ServiceOverview,
  ServicePlatforms,
  ServiceSteps,
} from "@/components/sections/DigitalServiceSections";
import { CAPABILITY_META } from "@/components/sections/home/DigitalBand";
import { OfferingGroups } from "@/components/sections/OfferingGroups";
import { PageBlocks, type PageBlock } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceVisual, hasServiceVisual } from "@/components/visuals/ServiceVisual";
import {
  getContactChannels,
  getFaqs,
  getProjectsForService,
  getRelatedServices,
  getVisibleImage,
  hasProjectsPage,
  type ServiceWithPage,
} from "@/lib/content";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import { needsReviewBanner } from "@/lib/publishing";
import { serviceJsonLd } from "@/lib/structured-data";
import { contactRouteForService, routes, serviceRoute } from "@/lib/routes";
import type { SectionTone } from "@/types/ui";

/**
 * Template for every service page (/services/[slug] and /digital-solutions/[slug]).
 *
 * Structure (Discovery doc, section F): hero → introduction → what we provide → why it matters
 * → related projects → process → FAQ → related services → CTA. Each page differs by content:
 * its own copy, offerings, highlights, FAQs, projects and cross-links. Sections without content
 * are omitted.
 *
 * Digital service pages add agency-style sections from their page content: an animated
 * illustration in the hero, a supporting photo beside the overview, "what you get", their own
 * delivery steps (instead of the company-wide process) and the platforms they work with.
 */
interface ServicePageProps {
  readonly service: ServiceWithPage;
  readonly parent: { readonly label: string; readonly href: string };
}

export function ServicePage({ service, parent }: ServicePageProps) {
  const { page } = service;
  const heroImage = getVisibleImage(service.heroImage);
  const photo = getVisibleImage(page.photo);
  const projects = getProjectsForService(service.slug).slice(0, 3);
  const faqs = getFaqs(`service:${service.slug}`);
  const related = getRelatedServices(service);
  const { phone } = getContactChannels();
  const secondary = getSecondaryContactAction();
  const enquiryHref = contactRouteForService(service.slug);
  const capability = service.capability ? CAPABILITY_META[service.capability] : undefined;
  // A single offering that just repeats the service name ("SEO" → "Search engine optimisation")
  // adds nothing, so the section needs at least two items to earn its place.
  const offeringCount = service.offerings.reduce((sum, group) => sum + group.items.length, 0);
  const overviewTitle = `${service.title} in Dubai`;
  // Digital pages with their own delivery steps use the agency layout; service lines keep
  // the original order with the company-wide process.
  const agencyLayout = (page.steps?.length ?? 0) > 0;

  const highlights: PageBlock | false = page.highlights.length > 0 && {
    key: "highlights",
    render: (tone) => (
      <FeatureList
        tone={tone}
        id="highlights"
        eyebrow="Why it matters"
        title="Why work with us"
        items={page.highlights}
      />
    ),
  };
  const relatedProjects: PageBlock | false = projects.length > 0 && {
    key: "projects",
    render: (tone) => (
      <FeaturedProjects
        tone={tone}
        projects={projects}
        title="Related projects"
        {...(hasProjectsPage() ? { allProjectsHref: routes.projects } : {})}
      />
    ),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          parent,
          { label: service.title, href: serviceRoute(service) },
        ]}
        eyebrow={capability?.title ?? parent.label}
        title={service.seo.h1 ?? service.title}
        lead={service.summary}
        reviewItem={needsReviewBanner(service) ? service : page}
        {...(heroImage ? { image: heroImage } : {})}
        {...(!heroImage && hasServiceVisual(service.slug)
          ? { visual: <ServiceVisual slug={service.slug} /> }
          : {})}
        actions={
          <>
            <ButtonLink href={enquiryHref} size="lg" icon="arrow-right">
              Start a Project
            </ButtonLink>
            {phone ? (
              <ButtonLink
                href={`tel:${phone.value.e164}`}
                size="lg"
                variant="inverse"
                leadingIcon="phone"
              >
                {phone.value.display}
              </ButtonLink>
            ) : null}
          </>
        }
      />

      <PageBlocks
        blocks={[
          {
            key: "intro",
            render: (tone) =>
              photo ? (
                <ServiceOverview
                  tone={tone}
                  title={overviewTitle}
                  intro={page.intro}
                  photo={photo}
                  badge={{
                    icon: capability?.icon ?? "spark",
                    label: capability?.title ?? parent.label,
                  }}
                />
              ) : (
                <Section tone={tone} labelledBy="intro-title">
                  <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                    <SectionHeader
                      id="intro-title"
                      eyebrow="Overview"
                      title={overviewTitle}
                      className="lg:col-span-5"
                    />
                    <div className="flex flex-col gap-5 text-lead text-muted lg:col-span-7">
                      {page.intro.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </Section>
              ),
          },
          offeringCount >= 2 && {
            key: "offerings",
            render: (tone) => (
              <OfferingGroups tone={tone} serviceTitle={service.title} groups={service.offerings} />
            ),
          },
          ...(agencyLayout
            ? [
                page.deliverables &&
                  page.deliverables.length > 0 && {
                    key: "deliverables",
                    fixedTone: "night" as const,
                    render: (tone: SectionTone) => (
                      <ServiceDeliverables
                        tone={tone}
                        serviceTitle={service.title}
                        items={page.deliverables ?? []}
                      />
                    ),
                  },
                {
                  key: "steps",
                  render: (tone: SectionTone) => (
                    <ServiceSteps tone={tone} steps={page.steps ?? []} />
                  ),
                },
                highlights,
                page.platforms &&
                  page.platforms.length > 0 && {
                    key: "platforms",
                    render: (tone: SectionTone) => (
                      <ServicePlatforms tone={tone} platforms={page.platforms ?? []} />
                    ),
                  },
                relatedProjects,
              ]
            : [
                highlights,
                relatedProjects,
                {
                  key: "process",
                  render: (tone: SectionTone) => (
                    <ProcessSection
                      tone={tone}
                      eyebrow="How we work"
                      title="From brief to delivery"
                      intro="Nine steps, from the first coffee to post-sale service."
                      cta={{ label: "Start a Project", href: enquiryHref }}
                    />
                  ),
                },
              ]),
          faqs.length > 0 && {
            key: "faq",
            render: (tone) => (
              <FaqSection tone={tone} faqs={faqs} title={`${service.title}: common questions`} />
            ),
          },
          related.length > 0 && {
            key: "related",
            render: (tone) => <RelatedServices tone={tone} services={related} />,
          },
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                title={page.cta.title}
                lead={page.cta.lead}
                primary={{ label: "Start Your Project", href: enquiryHref }}
                {...(secondary ? { secondary } : {})}
              />
            ),
          },
        ]}
      />
    </>
  );
}

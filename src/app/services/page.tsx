import { ServiceCard } from "@/components/cards/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { ExperienceIndex, type ExperienceItem } from "@/components/sections/home/ExperienceIndex";
import { ProductionHouse } from "@/components/sections/home/ProductionHouse";
import { RunOfShow } from "@/components/sections/home/RunOfShow";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/content/about";
import { eventPhotos } from "@/content/event-photos";
import { experiences } from "@/content/experiences";
import { homeContent } from "@/content/home";
import { HIGHLIGHTED_PROCESS_STEP } from "@/content/process";
import { servicesLanding } from "@/content/services-landing";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import {
  getPillarsWithServices,
  getService,
  getServiceCardImage,
  getServiceHref,
  getServices,
  getVisible,
  getVisibleImage,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { contactRouteForService, routes } from "@/lib/routes";
import type { SectionTone } from "@/types/ui";

export const metadata = buildMetadata({
  title: servicesLanding.seo.title,
  description: servicesLanding.seo.description,
  path: routes.services,
});

function present<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * /services — everything we create: hero → the experiences index → the six service lines →
 * the production house → run of show → finale with the picker.
 */
export default function ServicesPage() {
  const services = getServices("services");
  const pillars = getPillarsWithServices();
  const secondary = getSecondaryContactAction();
  const { runOfShow, productionHouse } = homeContent;

  const items: ExperienceItem[] = getVisible(experiences)
    .map((experience) => {
      const service = getService("services", experience.serviceSlug);
      const image = getVisibleImage(experience.image);
      if (!service || !image) return undefined;
      return {
        id: experience.id,
        title: experience.title,
        summary: experience.summary,
        includes: experience.includes,
        href: getServiceHref(service),
        image: { src: image.src, width: image.width, height: image.height },
      };
    })
    .filter(present);

  const acts = runOfShow.acts
    .map((act) => {
      const image = getVisibleImage(act.image);
      return image ? { ...act, image: { src: image.src } } : undefined;
    })
    .filter(present);

  const picker = [
    ...getVisible(experiences)
      .filter((experience) => getService("services", experience.serviceSlug))
      .map((experience) => ({
        label: experience.title,
        href: contactRouteForService(experience.serviceSlug),
      })),
    { label: "Something else", href: routes.contact },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Services", href: routes.services },
        ]}
        eyebrow="Our services"
        title={servicesLanding.title}
        lead={servicesLanding.lead}
        image={eventPhotos.concertAerial}
        credits={pillars.map((pillar) => `${pillar.title} · ${pillar.services.length}`)}
        actions={
          <>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" icon="arrow-right">
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href="#all-services" size="lg" variant="inverse">
              View all services
            </ButtonLink>
          </>
        }
      />
      <PageBlocks
        blocks={[
          {
            key: "all-services",
            fixedTone: "surface",
            render: (tone: SectionTone) => (
              <Section tone={tone} labelledBy="all-services-title" id="all-services">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <SectionHeader
                    id="all-services-title"
                    eyebrow="All services"
                    title={`${services.length} services, *one team.*`}
                    intro="From the stage to the last printed flag — every part of your event comes from the same house."
                    className="reveal"
                  />
                  <nav aria-label="Service groups" className="reveal">
                    <ul className="flex flex-wrap gap-2">
                      {pillars.map((pillar) => (
                        <li key={pillar.id}>
                          <a
                            href={`#${pillar.id}`}
                            className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-teal-800 hover:bg-tint"
                          >
                            {pillar.title}
                            <span className="ml-2 text-muted">{pillar.services.length}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="mt-14 flex flex-col gap-16">
                  {pillars.map((pillar) => (
                    <section
                      key={pillar.id}
                      id={pillar.id}
                      aria-labelledby={`${pillar.id}-title`}
                      className="scroll-mt-28"
                    >
                      <div className="mb-8 flex flex-col gap-2 border-t border-line-strong pt-8 md:flex-row md:items-baseline md:justify-between md:gap-10">
                        <h3 id={`${pillar.id}-title`} className="text-h2 text-ink">
                          {pillar.title}
                        </h3>
                        <p className="max-w-xl text-muted">{pillar.summary}</p>
                      </div>
                      <ul className="grid gap-6 reveal-stagger md:grid-cols-2 lg:grid-cols-3">
                        {pillar.services.map((service) => (
                          <li key={service.slug} className="reveal">
                            <ServiceCard
                              service={service}
                              highlights={3}
                              headingLevel={4}
                              image={getServiceCardImage(service)}
                            />
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </Section>
            ),
          },
          items.length > 0 && {
            key: "experiences",
            fixedTone: "night",
            render: (tone: SectionTone) => (
              <Section tone={tone} labelledBy="experiences-title" id="experiences">
                <SectionHeader
                  id="experiences-title"
                  eyebrow={homeContent.experiences.eyebrow}
                  title={homeContent.experiences.title}
                  intro={homeContent.experiences.intro}
                  size="statement"
                  inverse
                  className="mb-14 reveal"
                />
                <ExperienceIndex items={items} />
              </Section>
            ),
          },
          {
            key: "production-house",
            render: (tone: SectionTone) => (
              <ProductionHouse
                tone={tone}
                eyebrow={productionHouse.eyebrow}
                title={productionHouse.title}
                body={productionHouse.body}
                verbs={productionHouse.verbs}
                images={productionHouse.images.map(getVisibleImage).filter(present)}
                capabilities={aboutContent.capabilities.items}
              />
            ),
          },
          acts.length > 0 && {
            key: "run-of-show",
            fixedTone: "night",
            render: (tone: SectionTone) => (
              <Section tone={tone} spacing="none" container={false} labelledBy="run-of-show-title">
                <RunOfShow
                  acts={acts}
                  highlight={HIGHLIGHTED_PROCESS_STEP}
                  header={
                    <SectionHeader
                      id="run-of-show-title"
                      eyebrow={runOfShow.eyebrow}
                      title={runOfShow.title}
                      intro={runOfShow.intro}
                      size="statement"
                      inverse
                    />
                  }
                />
              </Section>
            ),
          },
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                title={servicesLanding.cta.title}
                lead={servicesLanding.cta.lead}
                primary={{ label: "Plan your event", href: PRIMARY_CTA.href }}
                picker={{ label: homeContent.finalCta.picker, options: picker }}
                {...(secondary ? { secondary } : {})}
              />
            ),
          },
        ]}
      />
    </>
  );
}

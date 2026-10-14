import { notFound } from "next/navigation";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { EventOfferings, ServiceStory } from "@/components/sections/EventServiceSections";
import { BuiltToDeliver } from "@/components/sections/home/BuiltToDeliver";
import { IndustriesStrip } from "@/components/sections/IndustriesStrip";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { ButtonLink } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/content/about";
import { eventPhotos } from "@/content/event-photos";
import { homeContent } from "@/content/home";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import {
  getVisibleImage,
  getIndustries,
  getServices,
  getStats,
  getVisible,
  hasIndustriesPage,
  isPageVisible,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { routes } from "@/lib/routes";

export const metadata = buildMetadata({
  title: aboutContent.seo.title,
  absoluteTitle: true,
  description: aboutContent.seo.description,
  path: routes.about,
});

/**
 * /about: hero → story → vision & mission → what we do → why us → stats → process →
 * industries → CTA. Sections whose content is not confirmed (stats, industries) drop out.
 */
export default function AboutPage() {
  if (!isPageVisible("about")) notFound();

  const { hero, story, purpose, capabilities, cta } = aboutContent;
  const statements = getVisible(purpose);
  const reasons = getVisible(homeContent.reasons);
  const stats = getStats();
  const industries = getIndustries();
  const serviceLines = getServices("services");
  const secondary = getSecondaryContactAction();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "About", href: routes.about },
        ]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        image={eventPhotos.dubaiSkyline}
        credits={story.facts.map((fact) => `${fact.label}: ${fact.value}`)}
        actions={
          <>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" icon="arrow-right">
              {PRIMARY_CTA.label}
            </ButtonLink>
            {isPageVisible("companyProfile") ? (
              <ButtonLink
                href={routes.companyProfile}
                size="lg"
                variant="inverse"
                leadingIcon="download"
              >
                Company Profile
              </ButtonLink>
            ) : null}
          </>
        }
      />

      <PageBlocks
        blocks={[
          {
            key: "story",
            fixedTone: "surface",
            render: (tone) => (
              <ServiceStory
                tone={tone}
                eyebrow={story.eyebrow}
                title={story.title}
                intro={story.paragraphs}
                images={[eventPhotos.planningTable, eventPhotos.welding, eventPhotos.galaHall]
                  .map(getVisibleImage)
                  .filter((image) => image !== undefined)}
              />
            ),
          },
          statements.length > 0 && {
            key: "purpose",
            render: (tone) => (
              <Section tone={tone} labelledBy="purpose-title">
                <SectionHeader
                  id="purpose-title"
                  eyebrow="Why we exist"
                  title="Vision *and* mission"
                />
                <ul className="mt-12 grid border-t border-line-strong md:grid-cols-2">
                  {statements.map((statement, index) => (
                    <li
                      key={statement.id}
                      className={
                        index === 0
                          ? "flex flex-col gap-5 border-b border-line-strong py-10 reveal md:border-r md:pr-10"
                          : "flex flex-col gap-5 border-b border-line-strong py-10 reveal md:pl-10"
                      }
                    >
                      <ReviewFlag item={statement} className="self-start" />
                      <h3 className="text-eyebrow text-teal-800 uppercase">{statement.label}</h3>
                      <p className="text-statement text-[clamp(1.5rem,1.1rem+1.3vw,2.25rem)] text-ink">
                        {statement.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </Section>
            ),
          },
          {
            key: "capabilities",
            fixedTone: "night",
            render: (tone) => (
              <EventOfferings
                tone={tone}
                serviceTitle={capabilities.eyebrow}
                groups={[{ title: capabilities.title, items: capabilities.items }]}
              />
            ),
          },
          serviceLines.length > 0 && {
            key: "service-lines",
            render: (tone) => (
              <Section tone={tone} labelledBy="service-lines-title">
                <SectionHeader
                  id="service-lines-title"
                  eyebrow="Our service lines"
                  title="Six service lines, *one team.*"
                />
                <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {serviceLines.map((service) => (
                    <li key={service.slug} className="reveal">
                      <ServiceCard
                        service={service}
                        highlights={0}
                        image={getVisibleImage(service.heroImage)}
                      />
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
                  <ButtonLink href={routes.services} variant="quiet">
                    Events & exhibitions
                  </ButtonLink>
                  <ButtonLink href={routes.products} variant="quiet">
                    Branding & print products
                  </ButtonLink>
                </div>
              </Section>
            ),
          },
          reasons.length > 0 && {
            key: "reasons",
            render: (tone) => (
              <BuiltToDeliver
                tone={tone}
                eyebrow="Why Viral Concepts"
                title="Built to *deliver.*"
                reasons={reasons}
              />
            ),
          },
          stats.length > 0 && {
            key: "stats",
            fixedTone: "brand",
            render: () => <StatsBand stats={stats} />,
          },
          {
            key: "process",
            render: (tone) => (
              <ProcessSection tone={tone} {...homeContent.process} cta={PRIMARY_CTA} />
            ),
          },
          industries.length > 0 && {
            key: "industries",
            render: (tone) => (
              <IndustriesStrip
                tone={tone}
                industries={industries}
                {...(hasIndustriesPage() ? { industriesHref: routes.industries } : {})}
              />
            ),
          },
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                title={cta.title}
                lead={cta.lead}
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

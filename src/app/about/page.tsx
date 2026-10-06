import { notFound } from "next/navigation";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureList } from "@/components/sections/FeatureList";
import { WhoWeAre } from "@/components/sections/home/WhoWeAre";
import { IndustriesStrip } from "@/components/sections/IndustriesStrip";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/content/about";
import { homeContent } from "@/content/home";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import {
  getCompanyFacts,
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
  const hasDigital = getServices("digital-solutions").length > 0;
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
            render: (tone) => (
              <WhoWeAre
                tone={tone}
                eyebrow={story.eyebrow}
                title={story.title}
                paragraphs={story.paragraphs}
                approach={homeContent.whoWeAre.approach}
                foundingYear={getCompanyFacts().foundingYear}
                facts={story.facts}
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
                  title="Vision and mission"
                />
                <ul className="mt-12 grid gap-6 md:grid-cols-2">
                  {statements.map((statement) => (
                    <li
                      key={statement.id}
                      className="flex flex-col gap-4 rounded-card border border-line bg-white p-8 shadow-card reveal"
                    >
                      <ReviewFlag item={statement} className="self-start" />
                      <h3 className="text-eyebrow text-teal-600 uppercase">{statement.label}</h3>
                      <p className="font-display text-h3 leading-snug text-ink">{statement.text}</p>
                    </li>
                  ))}
                </ul>
              </Section>
            ),
          },
          {
            key: "capabilities",
            render: (tone) => (
              <Section tone={tone} labelledBy="capabilities-title">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className="flex flex-col gap-6 lg:col-span-5">
                    <SectionHeader
                      id="capabilities-title"
                      eyebrow={capabilities.eyebrow}
                      title={capabilities.title}
                      intro={capabilities.intro}
                    />
                    <div className="flex flex-wrap gap-3">
                      <ButtonLink href={routes.services} variant="quiet">
                        All services
                      </ButtonLink>
                      {hasDigital ? (
                        <ButtonLink href={routes.digitalSolutions} variant="quiet">
                          Digital Solutions
                        </ButtonLink>
                      ) : null}
                    </div>
                  </div>
                  <ul className="flex flex-wrap content-start gap-2 lg:col-span-7">
                    {capabilities.items.map((item) => (
                      <li key={item}>
                        <Badge tone="outline">{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                {serviceLines.length > 0 ? (
                  <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {serviceLines.map((service) => (
                      <li key={service.slug} className="reveal">
                        <ServiceCard service={service} highlights={0} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Section>
            ),
          },
          reasons.length > 0 && {
            key: "reasons",
            render: (tone) => (
              <FeatureList
                tone={tone}
                id="about-reasons"
                eyebrow="Why Viral Concepts"
                title="What working with us looks like"
                items={reasons}
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

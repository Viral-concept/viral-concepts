import { ServiceCard } from "@/components/cards/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { AiShowcase } from "@/components/sections/AiShowcase";
import { FeatureList } from "@/components/sections/FeatureList";
import { CAPABILITY_META, CAPABILITY_ORDER } from "@/components/sections/home/DigitalBand";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { aiShowcase } from "@/content/ai-showcase";
import { digitalBridge, digitalLanding } from "@/content/digital-landing";
import { homeContent } from "@/content/home";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import { getServices, getVisible, getVisibleImage, hasServicePage } from "@/lib/content";
import { cx } from "@/lib/cx";
import { buildMetadata } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import type { DigitalCapability } from "@/types/content";
import type { SectionTone } from "@/types/ui";

export const metadata = buildMetadata({
  title: digitalLanding.seo.title,
  description: digitalLanding.seo.description,
  path: routes.digitalSolutions,
});

/** Where each capability's section starts (the AI capability is presented by AiShowcase). */
const ANCHORS: Record<DigitalCapability, string> = {
  marketing: "capability-marketing",
  build: "capability-build",
  ai: "ai-showcase-title",
};

/**
 * /digital-solutions (Discovery doc, section G), laid out like a digital agency's services
 * page: hero → capability strip (be found · convert · scale) → one section per capability
 * with photo cards → AI & Automation showcase → physical-meets-digital bridge → process → CTA.
 * Capabilities and services appear only when visible in this deployment.
 *
 * Every visible digital service has a card with `id={slug}`, so menu and footer anchors
 * (`/digital-solutions#seo`) always land on it; cards link to the service's own page.
 */
export default function DigitalSolutionsPage() {
  const services = getServices("digital-solutions");
  const [bridge] = getVisible([digitalBridge]);
  const [aiBlock] = getVisible([aiShowcase]);
  const groups = CAPABILITY_ORDER.map((capability) => ({
    capability,
    services: services.filter((service) => service.capability === capability),
  })).filter((group) => group.services.length > 0);
  const aiServices = groups.find((group) => group.capability === "ai")?.services ?? [];
  const secondary = getSecondaryContactAction();
  const enquiryHref = PRIMARY_CTA.href;
  const strip = digitalLanding.pillars.filter((pillar) =>
    groups.some((group) => group.capability === pillar.id),
  );

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Digital Solutions", href: routes.digitalSolutions },
        ]}
        eyebrow={digitalLanding.eyebrow}
        title={digitalLanding.title}
        lead={digitalLanding.lead}
        visual={<ServiceVisual slug="digital-solutions" />}
        actions={
          <>
            <ButtonLink href={enquiryHref} size="lg" icon="arrow-right">
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href={`#${ANCHORS.marketing}`} size="lg" variant="inverse">
              Explore services
            </ButtonLink>
          </>
        }
      />

      {/* Capability strip: the three things the digital team does, each jumping to its section. */}
      {strip.length > 1 ? (
        <nav aria-label="Digital capabilities" className="relative z-10 -mt-10 sm:-mt-12">
          <Container>
            <ul
              className={cx(
                "grid gap-3 rounded-media border border-line bg-white p-3 shadow-raised",
                strip.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
              )}
            >
              {strip.map((pillar, index) => {
                const meta = CAPABILITY_META[pillar.id];
                return (
                  <li key={pillar.id}>
                    <a
                      href={`#${ANCHORS[pillar.id]}`}
                      className="group flex h-full items-center gap-4 rounded-card p-4 transition-colors hover:bg-surface"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-teal-800 text-yellow-400 transition-[rotate,background-color,color] duration-(--duration-slow) ease-(--ease-brand) group-hover:-rotate-6 group-hover:bg-yellow-400 group-hover:text-ink">
                        <Icon name={meta.icon} className="size-5" />
                      </span>
                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className="text-eyebrow text-teal-600 uppercase">
                          {String(index + 1).padStart(2, "0")} · {pillar.label}
                        </span>
                        <span className="font-display text-lg font-semibold text-ink">
                          {meta.title}
                        </span>
                        <span className="text-sm text-muted">{pillar.body}</span>
                      </span>
                      <Icon
                        name="arrow-right"
                        className="size-5 text-teal-800 transition-transform duration-(--duration-base) group-hover:translate-x-1"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      ) : null}

      <PageBlocks
        blocks={[
          ...groups
            .filter((group) => group.capability !== "ai")
            .map((group) => ({
              key: group.capability,
              render: (tone: SectionTone) => {
                const meta = CAPABILITY_META[group.capability];
                const headingId = ANCHORS[group.capability];
                return (
                  <Section tone={tone} labelledBy={headingId}>
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                      <div className="flex flex-col gap-5 self-start reveal lg:sticky lg:top-28 lg:col-span-4">
                        <span className="grid size-14 place-items-center rounded-full bg-teal-800 text-yellow-400">
                          <Icon name={meta.icon} className="size-6" />
                        </span>
                        <h2 id={headingId} className="text-h2 text-ink">
                          {meta.title}
                        </h2>
                        <p className="text-lead text-muted">{meta.blurb}</p>
                        <div>
                          <ButtonLink href={enquiryHref} variant="secondary" icon="arrow-right">
                            Talk to us about it
                          </ButtonLink>
                        </div>
                      </div>
                      <ul className="grid gap-5 reveal-stagger sm:grid-cols-2 lg:col-span-8">
                        {group.services.map((service) => (
                          <li key={service.slug} className="reveal">
                            <ServiceCard
                              id={service.slug}
                              service={service}
                              highlights={3}
                              image={getVisibleImage(service.page?.photo)}
                              {...(hasServicePage(service) ? {} : { href: null })}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>
                );
              },
            })),
          aiBlock && {
            key: "ai",
            fixedTone: "night" as const,
            render: () => <AiShowcase showcase={aiBlock} services={aiServices} anchored />,
          },
          bridge && {
            key: "bridge",
            render: (tone) => (
              <FeatureList
                tone={tone}
                id="digital-bridge"
                eyebrow={bridge.eyebrow}
                title={bridge.title}
                items={bridge.items}
                reviewItem={bridge}
              />
            ),
          },
          {
            key: "process",
            render: (tone) => (
              <ProcessSection
                tone={tone}
                {...homeContent.process}
                cta={{ label: PRIMARY_CTA.label, href: enquiryHref }}
              />
            ),
          },
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                title={digitalLanding.cta.title}
                lead={digitalLanding.cta.lead}
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

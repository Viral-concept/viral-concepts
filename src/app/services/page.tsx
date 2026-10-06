import { CapabilityIndex } from "@/components/sections/CapabilityIndex";
import { CtaBand } from "@/components/sections/CtaBand";
import { DigitalBand } from "@/components/sections/home/DigitalBand";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { PillarServices } from "@/components/sections/PillarServices";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ButtonLink } from "@/components/ui/Button";
import { homeContent } from "@/content/home";
import { servicesLanding } from "@/content/services-landing";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import { getPillarsWithServices, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { routes } from "@/lib/routes";
import type { SectionTone } from "@/types/ui";

export const metadata = buildMetadata({
  title: servicesLanding.seo.title,
  description: servicesLanding.seo.description,
  path: routes.services,
});

export default function ServicesPage() {
  const pillars = getPillarsWithServices().filter((p) => p.id !== "digital-technology");
  const services = getServices("services");
  const digital = getServices("digital-solutions");
  const secondary = getSecondaryContactAction();

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
        actions={
          <ButtonLink href={PRIMARY_CTA.href} size="lg" icon="arrow-right">
            {PRIMARY_CTA.label}
          </ButtonLink>
        }
      />
      <PageBlocks
        blocks={[
          ...pillars.map((pillar) => ({
            key: pillar.id,
            render: (tone: SectionTone) => <PillarServices tone={tone} pillar={pillar} />,
          })),
          {
            key: "capabilities",
            render: (tone) => <CapabilityIndex tone={tone} services={services} />,
          },
          {
            key: "process",
            render: (tone) => (
              <ProcessSection tone={tone} {...homeContent.process} cta={PRIMARY_CTA} />
            ),
          },
          digital.length > 0 && {
            key: "digital",
            fixedTone: "night",
            render: () => (
              <DigitalBand
                {...homeContent.digital}
                services={digital}
                href={routes.digitalSolutions}
              />
            ),
          },
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                title={servicesLanding.cta.title}
                lead={servicesLanding.cta.lead}
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

import { ServiceCard } from "@/components/cards/ServiceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PillarWithServices } from "@/lib/content";
import type { SectionTone } from "@/types/ui";

/** One pillar's services as cards (Services landing page). */
interface PillarServicesProps {
  readonly tone: SectionTone;
  readonly pillar: PillarWithServices;
}

export function PillarServices({ tone, pillar }: PillarServicesProps) {
  const headingId = `pillar-services-${pillar.id}`;
  return (
    <Section tone={tone} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow="Service line"
        title={pillar.title}
        intro={pillar.summary}
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pillar.services.map((service) => (
          <li key={service.slug} className="reveal">
            {/* id: the landing anchor that service links fall back to (see getServiceHref). */}
            <ServiceCard id={service.slug} service={service} highlights={4} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

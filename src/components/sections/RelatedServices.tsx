import { ServiceCard } from "@/components/cards/ServiceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getVisibleImage } from "@/lib/content";
import type { Service } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/** Cross-links between services. Only visible services are passed in, so nothing hidden is linked. */
interface RelatedServicesProps {
  readonly tone: SectionTone;
  readonly services: readonly Service[];
  readonly title?: string;
}

export function RelatedServices({
  tone,
  services,
  title = "Related services",
}: RelatedServicesProps) {
  return (
    <Section tone={tone} labelledBy="related-services-title">
      <SectionHeader id="related-services-title" eyebrow="Often combined" title={title} />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="reveal">
            <ServiceCard service={service} image={getVisibleImage(service.heroImage)} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

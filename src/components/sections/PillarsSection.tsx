import { PillarCard } from "@/components/cards/PillarCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { PillarWithServices } from "@/lib/content";
import { routes } from "@/lib/routes";
import type { SectionTone } from "@/types/ui";

/** The three business pillars with their services (homepage and /services). */
interface PillarsSectionProps {
  readonly tone: SectionTone;
  readonly pillars: readonly PillarWithServices[];
  readonly title?: string;
  readonly intro?: string;
}

export function PillarsSection({
  tone,
  pillars,
  title = "What we do",
  intro = "Three connected disciplines, so one partner can take your idea from concept to production to reach.",
}: PillarsSectionProps) {
  return (
    <Section tone={tone} labelledBy="pillars-title">
      <SectionHeader id="pillars-title" eyebrow="Our services" title={title} intro={intro} />
      <div className="mt-12 grid gap-6 reveal-stagger lg:grid-cols-3">
        {pillars.map((pillar, index) => (
          <div key={pillar.id} className="reveal reveal-scale">
            <PillarCard
              pillar={pillar}
              services={pillar.services}
              index={index + 1}
              cta={
                pillar.id === "digital-technology"
                  ? { label: "Explore Digital Solutions", href: routes.digitalSolutions }
                  : { label: "Explore services", href: routes.services }
              }
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

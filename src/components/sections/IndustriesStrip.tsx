import { ButtonLink } from "@/components/ui/Button";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Industry } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/** Industries served. Rendered only for client-validated industries (drafts in preview). */
interface IndustriesStripProps {
  readonly tone: SectionTone;
  readonly industries: readonly Industry[];
  readonly industriesHref?: string;
}

export function IndustriesStrip({ tone, industries, industriesHref }: IndustriesStripProps) {
  return (
    <Section tone={tone} labelledBy="industries-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader id="industries-title" eyebrow="Industries" title="Who we work with" />
        {industriesHref ? (
          <ButtonLink
            href={industriesHref}
            variant="quiet"
            className="shrink-0 self-start md:self-auto"
          >
            All industries
          </ButtonLink>
        ) : null}
      </div>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {industries.map((industry) => (
          <li
            key={industry.slug}
            className="flex flex-col gap-2 rounded-card border border-line bg-white p-5 reveal"
          >
            <ReviewFlag item={industry} className="self-start" />
            <h3 className="font-sans text-lg font-semibold text-ink">{industry.title}</h3>
            <p className="text-sm text-muted">{industry.summary}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

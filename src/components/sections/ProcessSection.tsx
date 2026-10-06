import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SectionTone } from "@/types/ui";

import { ProcessSteps } from "./ProcessSteps";

/** The nine-step process with a contextual call to action. */
interface ProcessSectionProps {
  readonly tone: SectionTone;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly cta: { readonly label: string; readonly href: string };
}

export function ProcessSection({ tone, eyebrow, title, intro, cta }: ProcessSectionProps) {
  return (
    <Section tone={tone} labelledBy="process-title">
      <SectionHeader id="process-title" eyebrow={eyebrow} title={title} intro={intro} />
      <ProcessSteps className="mt-12" />
      <div className="mt-10">
        <ButtonLink href={cta.href} icon="arrow-right">
          {cta.label}
        </ButtonLink>
      </div>
    </Section>
  );
}

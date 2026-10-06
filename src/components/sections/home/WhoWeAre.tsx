import { Aurora } from "@/components/motion/Aurora";
import { ScrollHighlight } from "@/components/motion/ScrollHighlight";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SectionTone } from "@/types/ui";

/**
 * Short company story (CP p.3) with the founding year and the Company Profile's approach line
 * (Strategy → Creative → Innovation → Production → Reach, CP p.2).
 */
interface WhoWeAreProps {
  readonly tone: SectionTone;
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly approach: readonly string[];
  /** Omitted if the founding year is not published. */
  readonly foundingYear?: number | undefined;
  /** Extra one-line facts for the aside (About page), each from the Company Profile. */
  readonly facts?: readonly { readonly label: string; readonly value: string }[];
  readonly aboutHref?: string;
}

export function WhoWeAre({
  tone,
  eyebrow,
  title,
  paragraphs,
  approach,
  foundingYear,
  facts = [],
  aboutHref,
}: WhoWeAreProps) {
  return (
    <Section tone={tone} labelledBy="who-we-are-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <SectionHeader id="who-we-are-title" eyebrow={eyebrow} title={title} />
          {paragraphs.map((paragraph, index) =>
            index === 0 ? (
              <ScrollHighlight
                key={paragraph}
                text={paragraph}
                className="font-display text-h3 leading-snug font-medium text-ink"
              />
            ) : (
              <p key={paragraph} className="max-w-prose text-muted">
                {paragraph}
              </p>
            ),
          )}
          {aboutHref ? (
            <ButtonLink href={aboutHref} variant="quiet" className="self-start">
              More about Viral Concepts
            </ButtonLink>
          ) : null}
        </div>

        <aside
          aria-label="At a glance"
          className="relative isolate flex flex-col gap-8 self-start overflow-hidden rounded-card bg-night p-8 text-white shadow-raised reveal reveal-scale sm:p-10 lg:col-span-5"
          data-tone="dark"
        >
          <Aurora grid={false} />
          {foundingYear ? (
            <div>
              <p className="font-display text-6xl leading-none font-bold text-yellow-400">
                {foundingYear}
              </p>
              <p className="mt-2 text-white/85">
                The year Viral Concepts Advertising LLC was founded
              </p>
            </div>
          ) : null}
          {facts.length > 0 ? (
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="text-eyebrow text-cyan-300 uppercase">{fact.label}</dt>
                  <dd className="font-semibold text-white">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="flex flex-col gap-3">
            <p className="text-eyebrow text-cyan-300 uppercase">Our approach</p>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
              {approach.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/30 px-3.5 py-1.5 text-sm font-semibold">
                    {step}
                  </span>
                  {index < approach.length - 1 ? (
                    <Icon name="arrow-right" className="size-4 text-cyan-400" />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </Section>
  );
}

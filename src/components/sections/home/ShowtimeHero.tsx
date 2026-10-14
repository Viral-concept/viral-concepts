import type { CSSProperties } from "react";

import { HeroScenes, type Scene } from "@/components/motion/HeroScenes";
import { Accent } from "@/components/ui/Accent";
import { ButtonLink } from "@/components/ui/Button";
import { cx } from "@/lib/cx";

/**
 * Homepage hero — "Showtime". A full-screen stage: event photographs cross-fade behind a
 * poster-scale headline (the Company Profile's own line, "We create experiences, not just
 * events"), with the lead, two calls to action and a scene index along the bottom edge.
 * The header floats over it (data-hero="dark").
 */
interface ShowtimeHeroProps {
  readonly eyebrow: string;
  readonly headline: readonly string[];
  readonly lead: string;
  readonly scenes: readonly Scene[];
  readonly credits: readonly string[];
  readonly primaryCta: { readonly label: string; readonly href: string };
  readonly secondaryCta: { readonly label: string; readonly href: string };
}

export function ShowtimeHero({
  eyebrow,
  headline,
  lead,
  scenes,
  credits,
  primaryCta,
  secondaryCta,
}: ShowtimeHeroProps) {
  return (
    <section
      aria-labelledby="home-hero-title"
      data-hero="dark"
      data-tone="dark"
      className="relative isolate -mt-(--header-h) bg-stage text-white"
    >
      <HeroScenes scenes={scenes}>
        <div className="mx-auto flex w-full max-w-content flex-1 flex-col justify-end gap-8 px-4 pt-24 pb-8 sm:px-6 sm:pt-28 lg:gap-8 lg:px-8 lg:pb-10">
          <p className="flex enter-up items-center gap-3 text-eyebrow text-white/85 uppercase">
            <span aria-hidden="true" className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-yellow-400/70 motion-reduce:hidden" />
              <span className="relative size-2.5 rounded-full bg-yellow-400" />
            </span>
            {eyebrow}
          </p>

          <h1 id="home-hero-title" className="text-hero">
            {headline.map((line, index) => (
              <span
                key={line}
                className={cx(
                  "block overflow-hidden pt-[0.04em] pb-[0.1em]",
                  // The accent line steps in, like a second voice.
                  index === 1 && "pl-[0.6em] sm:pl-[1.6em]",
                )}
              >
                <span className="line-rise" style={{ "--rv-i": index } as CSSProperties}>
                  <Accent text={line} />
                </span>
              </span>
            ))}
          </h1>

          <div
            className="flex enter-up flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
            style={{ "--rv-i": 3 } as CSSProperties}
          >
            <div className="flex max-w-xl flex-col gap-5">
              <p className="text-lead text-white/85">{lead}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-white/75">
                {credits.map((credit) => (
                  <li key={credit} className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="h-px w-4 bg-yellow-400" />
                    {credit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href={primaryCta.href} size="lg" icon="arrow-right">
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} size="lg" variant="inverse">
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </HeroScenes>
    </section>
  );
}

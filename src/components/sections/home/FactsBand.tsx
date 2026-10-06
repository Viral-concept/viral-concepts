import type { CSSProperties } from "react";

import { Marquee } from "@/components/motion/Marquee";
import { Container } from "@/components/ui/Container";
import { StatCounter } from "@/components/ui/StatCounter";

/**
 * A slim dark band under the hero: a ticker of what the company does, then a row of figures
 * that count up as they come into view. Every figure is derived from published content
 * (number of service lines, countries, process steps), never from the unconfirmed statistics
 * (those appear in StatsBand once the client confirms them).
 */
export interface Fact {
  readonly value: number;
  readonly suffix?: string;
  readonly label: string;
}

interface FactsBandProps {
  readonly ticker: readonly string[];
  readonly facts: readonly Fact[];
  readonly since?: number | undefined;
}

export function FactsBand({ ticker, facts, since }: FactsBandProps) {
  return (
    <section
      aria-labelledby="facts-title"
      data-tone="dark"
      className="relative isolate border-t border-white/10 bg-night text-white"
    >
      <h2 id="facts-title" className="sr-only">
        Viral Concepts at a glance
      </h2>
      <Marquee
        items={ticker}
        label="What we do"
        className="border-b border-white/10 py-5 font-display text-xl font-semibold text-white/90 sm:text-2xl"
      />
      <Container>
        <ul className="grid grid-cols-2 divide-white/10 py-10 sm:py-12 lg:grid-cols-4 lg:divide-x">
          {since ? (
            <li className="py-4 reveal lg:px-8 lg:first:pl-0">
              <div className="flex flex-col gap-1">
                <p className="font-display text-5xl leading-none font-bold text-yellow-400 tabular-nums sm:text-6xl">
                  {since}
                </p>
                <p className="text-white/80">Building brands since</p>
              </div>
            </li>
          ) : null}
          {facts.map((fact, index) => (
            <li
              key={fact.label}
              className="py-4 reveal lg:px-8 lg:first:pl-0"
              style={{ "--rv-i": index + 1 } as CSSProperties}
            >
              <StatCounter
                value={fact.value}
                suffix={fact.suffix ?? ""}
                label={fact.label}
                inverse
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

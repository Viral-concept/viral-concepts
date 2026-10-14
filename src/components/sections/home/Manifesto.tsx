import Image from "next/image";
import type { ReactNode } from "react";

import { Section } from "@/components/ui/Section";
import type { ManifestoPart } from "@/content/home";
import { cx } from "@/lib/cx";
import type { SectionTone } from "@/types/ui";

/**
 * The opening statement: one editorial sentence in the serif, read as you scroll (each word
 * inks in on its own view timeline — `scroll-highlight`), with small photographs set inline
 * between the words. Below it, the company's short story and four plain facts.
 */
export interface Fact {
  readonly value: string;
  readonly label: string;
}

interface ManifestoProps {
  readonly tone: SectionTone;
  readonly eyebrow: string;
  readonly parts: readonly ManifestoPart[];
  readonly body: string;
  readonly facts: readonly Fact[];
}

function words(text: string, keyPrefix: string): ReactNode[] {
  return text.split(" ").map((word, index) => {
    const accent = /^\*.*\*[,.;:!?—-]*$/.test(word);
    const clean = word.replace(/\*/g, "");
    return <span key={`${keyPrefix}-${index}`}>{accent ? <em>{clean}</em> : clean} </span>;
  });
}

export function Manifesto({ tone, eyebrow, parts, body, facts }: ManifestoProps) {
  return (
    <Section tone={tone} labelledBy="manifesto-title" className="overflow-hidden">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2
          id="manifesto-title"
          className="flex items-center gap-3 self-start text-eyebrow text-teal-800 uppercase lg:col-span-2 lg:pt-4"
        >
          <span aria-hidden="true" className="h-px w-8 bg-teal-800" />
          {eyebrow}
        </h2>

        <div className="flex flex-col gap-14 lg:col-span-10">
          <p className="scroll-highlight text-statement text-ink">
            {parts.map((part, index) =>
              typeof part === "string" ? (
                words(part, String(index))
              ) : (
                <span key={index}>
                  <span aria-hidden="true" className="pill-media align-middle">
                    <Image
                      src={part.image.src}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </span>{" "}
                </span>
              ),
            )}
          </p>

          <div className="grid gap-10 border-t border-line-strong pt-10 md:grid-cols-12 md:gap-8">
            <p className="text-lead text-muted reveal md:col-span-5">{body}</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 reveal-stagger md:col-span-7 md:grid-cols-4">
              {facts.map((fact, index) => (
                <div key={fact.label} className="flex flex-col gap-2 reveal">
                  <dt className="order-2 text-sm leading-snug text-muted">{fact.label}</dt>
                  <dd
                    className={cx(
                      "order-1 font-display text-5xl leading-none font-extrabold tracking-tight [font-stretch:72%] lg:text-6xl",
                      index === 0 ? "text-teal-800" : "text-ink",
                    )}
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}

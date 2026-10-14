import Image from "next/image";
import type { CSSProperties } from "react";

import { Accent } from "@/components/ui/Accent";
import { Section } from "@/components/ui/Section";
import type { ImageAsset } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/**
 * The differentiator: Viral Concepts builds what it designs, in its own Dubai production house.
 * A statement and the five verbs of the job — lit one after another like cue lights — beside a
 * collage of the workshop, with everything the house makes running underneath.
 */
interface ProductionHouseProps {
  readonly tone: SectionTone;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly verbs: readonly string[];
  readonly images: readonly ImageAsset[];
  readonly capabilities: readonly string[];
}

const LABELS = ["Print", "Fabricate", "AV & light"];

export function ProductionHouse({
  tone,
  eyebrow,
  title,
  body,
  verbs,
  images,
  capabilities,
}: ProductionHouseProps) {
  const [tall, ...rest] = images;
  return (
    <Section
      tone={tone}
      labelledBy="production-house-title"
      container={false}
      className="overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-content gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="flex flex-col gap-8 lg:col-span-5 lg:py-6">
          <p className="flex items-center gap-3 text-eyebrow text-teal-800 uppercase reveal">
            <span aria-hidden="true" className="h-px w-8 bg-teal-800" />
            {eyebrow}
          </p>
          <h2 id="production-house-title" className="text-h1 text-ink reveal">
            <Accent text={title} />
          </h2>
          <p className="max-w-xl text-lead text-muted reveal">{body}</p>
          <ol
            data-ambient=""
            className="mt-2 flex flex-col border-t border-line-strong"
            aria-label="What happens in the production house"
          >
            {verbs.map((verb, index) => (
              <li
                key={verb}
                className="cue-word flex items-baseline justify-between gap-6 border-b border-line-strong py-2"
                style={{ "--cue-i": index, "--cue-n": verbs.length } as CSSProperties}
              >
                <span className="cue-text font-display text-[clamp(2.25rem,1.5rem+2.6vw,3.75rem)] leading-none font-extrabold uppercase [font-stretch:72%]">
                  {verb}
                </span>
                <span className="font-display text-xs font-semibold text-muted [font-stretch:125%]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div aria-hidden="true" className="grid grid-cols-2 gap-4 lg:col-span-7 lg:gap-5">
          {tall ? (
            <figure className="relative row-span-2 min-h-[24rem] overflow-hidden rounded-media bg-night-soft reveal reveal-curtain sm:min-h-[34rem]">
              <Image
                src={tall.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-stage/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                {LABELS[0]}
              </figcaption>
            </figure>
          ) : null}
          {rest.map((image, index) => (
            <figure
              key={image.src}
              className="relative aspect-[4/3] overflow-hidden rounded-media bg-night-soft reveal reveal-curtain"
              style={{ "--rv-i": index + 1 } as CSSProperties}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-stage/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                {LABELS[index + 1]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Everything the house makes (CP p.3), running underneath. */}
      <div className="mt-20 border-y border-line-strong py-6 lg:mt-24" data-ambient="">
        <div
          className="overflow-hidden fade-edges-x"
          role="region"
          aria-label="What we make in-house"
        >
          <div className="marquee-track marquee-slow">
            {[false, true].map((copy) => (
              <ul
                key={String(copy)}
                aria-hidden={copy || undefined}
                className="flex shrink-0 items-center"
              >
                {capabilities.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-8 pr-8 font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-none font-extrabold whitespace-nowrap uppercase [font-stretch:72%]"
                  >
                    <span
                      className={
                        index % 2 === 1
                          ? "text-outline [--outline-color:var(--color-teal-800)]"
                          : "text-ink"
                      }
                    >
                      {item}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-block size-2.5 rotate-45 bg-yellow-400"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

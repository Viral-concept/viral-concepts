import Image from "next/image";
import type { CSSProperties } from "react";

import { Accent } from "@/components/ui/Accent";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cx } from "@/lib/cx";
import type { ImageAsset, OfferingGroup } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/**
 * Sections for the event service pages (the core business), image-led and editorial:
 * the story beside a staggered photo collage, then everything delivered as a poster-scale list.
 */

/* -------------------------------------------------------------------------- */
/* Story + collage                                                             */
/* -------------------------------------------------------------------------- */

interface ServiceStoryProps {
  readonly tone: SectionTone;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: readonly string[];
  readonly images: readonly ImageAsset[];
}

export function ServiceStory({ tone, eyebrow, title, intro, images }: ServiceStoryProps) {
  const [first, ...rest] = intro;
  return (
    <Section tone={tone} labelledBy="intro-title" className="overflow-hidden">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <SectionHeader id="intro-title" eyebrow={eyebrow} title={title} className="reveal" />
          {first ? (
            <p className="text-statement text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] text-ink reveal">
              {first}
            </p>
          ) : null}
          {rest.map((paragraph) => (
            <p key={paragraph} className="text-lead text-muted reveal">
              {paragraph}
            </p>
          ))}
        </div>
        {images.length > 0 ? (
          <div
            aria-hidden="true"
            className="grid grid-cols-2 gap-4 self-start lg:col-span-6 lg:gap-5"
          >
            {images.slice(0, 3).map((image, index) => (
              <figure
                key={image.src}
                className={cx(
                  "relative overflow-hidden rounded-media bg-night-soft reveal reveal-curtain",
                  index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]",
                  index === 2 && "translate-y-10",
                )}
                style={{ "--rv-i": index } as CSSProperties}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 45vw, 100vw"
                      : "(min-width: 1024px) 22vw, 50vw"
                  }
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* What we deliver                                                             */
/* -------------------------------------------------------------------------- */

interface EventOfferingsProps {
  readonly tone: SectionTone;
  readonly serviceTitle: string;
  readonly groups: readonly OfferingGroup[];
}

export function EventOfferings({ tone, serviceTitle, groups }: EventOfferingsProps) {
  const offsets = groups.map((_, index) =>
    groups.slice(0, index).reduce((sum, group) => sum + group.items.length, 0),
  );
  return (
    <Section tone={tone} labelledBy="offerings-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-6 self-start lg:sticky lg:top-28 lg:col-span-4">
          <SectionHeader
            id="offerings-title"
            eyebrow={serviceTitle}
            title="What we *deliver.*"
            size="statement"
            inverse
            className="reveal"
          />
          <p className="text-white/75 reveal">
            Everything below is designed, produced or supplied by our own team — one partner, one
            point of contact.
          </p>
        </div>
        <div className="flex flex-col gap-14 lg:col-span-8">
          {groups.map((group, groupIndex) => (
            <div key={group.title} className="flex flex-col gap-5">
              <h3 className="flex items-center gap-3 text-eyebrow text-yellow-400 uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-yellow-400" />
                {group.title}
              </h3>
              <ul className="grid border-t border-white/15 sm:grid-cols-2 sm:gap-x-8">
                {group.items.map((item, itemIndex) => {
                  const count = (offsets[groupIndex] ?? 0) + itemIndex + 1;
                  return (
                    <li
                      key={item}
                      className="group flex items-baseline gap-4 border-b border-white/15 py-4 reveal"
                    >
                      <span className="w-7 shrink-0 font-display text-xs font-semibold text-white/50 [font-stretch:125%]">
                        {String(count).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] leading-tight font-bold text-white [font-stretch:85%] transition-[color,translate] duration-(--duration-slow) ease-(--ease-brand) group-hover:translate-x-1 group-hover:text-yellow-400">
                        <Accent text={item} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/**
 * The interactive index of experiences (the core of the homepage and /services).
 *
 * Large screens: a list of poster-scale titles on the left; hovering or focusing one lights it
 * and wipes its photograph, summary and inclusions into the frame on the right.
 * Small screens: each experience is a card with its own photograph.
 * Every title is a link to the service page that covers it.
 */
export interface ExperienceItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly includes: readonly string[];
  readonly href: string;
  readonly image: { readonly src: string; readonly width: number; readonly height: number };
}

export function ExperienceIndex({ items }: { readonly items: readonly ExperienceItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <ol className="xp-list flex flex-col lg:col-span-7">
        {items.map((item, index) => (
          <li
            key={item.id}
            data-active={index === active ? "" : undefined}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className="xp-item group relative border-t border-white/15 last:border-b"
          >
            {/* Phones and tablets: the photograph sits with its title. */}
            <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-card bg-night-soft lg:hidden">
              <Image
                src={item.image.src}
                alt=""
                fill
                sizes="(min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 opacity-70 shade-floor" />
            </div>

            <Link
              href={item.href}
              className="flex items-start gap-5 py-6 outline-offset-4 lg:items-center lg:py-7"
            >
              <span className="w-8 shrink-0 pt-2 font-display text-xs font-semibold text-yellow-400 [font-stretch:125%] lg:pt-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-3">
                <h3 className="xp-title text-[clamp(1.75rem,1.1rem+3.2vw,4.25rem)] leading-[0.92] font-extrabold text-white uppercase [font-stretch:72%] group-data-active:text-yellow-400">
                  {item.title}
                </h3>
                <span className="text-white/75 lg:sr-only">{item.summary}</span>
              </span>
              <span
                aria-hidden="true"
                className="mt-1 grid size-12 shrink-0 place-items-center rounded-full border border-white/25 text-white transition-[background-color,border-color,color,rotate] duration-(--duration-slow) ease-(--ease-brand) group-hover:-rotate-45 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-ink group-data-active:border-yellow-400 lg:mt-0"
              >
                <Icon name="arrow-right" className="size-5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Large screens: the frame that shows the lit experience. */}
      <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 flex flex-col gap-6">
          <div className="xp-frame relative aspect-[4/5] overflow-hidden rounded-media bg-night-soft">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="xp-media"
                data-active={index === active ? "" : undefined}
              >
                <Image
                  src={item.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1440px) 560px, 40vw"
                  className="object-cover"
                />
              </div>
            ))}
            <span className="pointer-events-none absolute inset-0 z-10 opacity-80 shade-floor" />
            <span className="absolute top-5 left-5 z-10 rounded-full border border-white/25 bg-stage/60 px-3 py-1.5 font-display text-xs font-semibold text-white [font-stretch:125%] backdrop-blur-sm">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            {current ? (
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-7">
                <p className="text-white/90">{current.summary}</p>
                <ul className="flex flex-wrap gap-2">
                  {current.includes.map((include) => (
                    <li
                      key={include}
                      className={cx(
                        "rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm",
                      )}
                    >
                      {include}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

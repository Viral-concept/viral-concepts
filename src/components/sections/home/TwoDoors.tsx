import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Accent } from "@/components/ui/Accent";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { cx } from "@/lib/cx";
import type { SectionTone } from "@/types/ui";

/**
 * "How can we help?" — the two ways into the business, side by side: plan an event (a
 * consultative brief) or order branding & print (a product quote). On large screens the door
 * you point at opens wider; each door lists what is behind it and has two clear actions.
 */
export interface Door {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly items: readonly { readonly label: string; readonly href: string }[];
  readonly image: { readonly src: string };
  readonly primary: { readonly label: string; readonly href: string };
  readonly secondary: { readonly label: string; readonly href: string };
}

interface TwoDoorsProps {
  readonly tone: SectionTone;
  readonly eyebrow: string;
  readonly title: string;
  readonly doors: readonly Door[];
}

export function TwoDoors({ tone, eyebrow, title, doors }: TwoDoorsProps) {
  const dark = tone === "dark" || tone === "night" || tone === "brand";
  return (
    <Section tone={tone} labelledBy="doors-title">
      <div className="mb-12 flex max-w-3xl flex-col gap-5 lg:mb-14">
        <p
          className={cx(
            "flex items-center gap-3 text-eyebrow uppercase reveal",
            dark ? "text-yellow-400" : "text-teal-800",
          )}
        >
          <span
            aria-hidden="true"
            className={cx("h-px w-8", dark ? "bg-yellow-400" : "bg-teal-800")}
          />
          {eyebrow}
        </p>
        <h2 id="doors-title" className={cx("text-h1 reveal", dark ? "text-white" : "text-ink")}>
          <Accent text={title} />
        </h2>
      </div>

      <ul className="flex flex-col gap-5 lg:min-h-[40rem] lg:flex-row">
        {doors.map((door, index) => (
          <li
            key={door.id}
            data-tone="dark"
            className="door group relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-media border border-white/12 bg-night-soft reveal lg:min-h-0 lg:flex-1"
            style={{ "--rv-i": index } as CSSProperties}
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <Image
                src={door.image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover opacity-80 transition-[scale,opacity] duration-[1400ms] ease-(--ease-brand) group-hover:scale-105 group-hover:opacity-95"
              />
              <span className="absolute inset-0 shade-floor" />
              <span className="absolute inset-0 bg-stage/30 transition-opacity duration-(--duration-slow) group-hover:opacity-0" />
            </div>

            <div className="flex flex-col gap-5 p-6 sm:p-9 lg:p-10">
              <p className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.22em] text-yellow-400 uppercase [font-stretch:125%]">
                {String(index + 1).padStart(2, "0")} · {door.eyebrow}
              </p>
              <h3 className="text-[clamp(2.5rem,1.6rem+3vw,4.5rem)] leading-[0.9] font-extrabold text-white uppercase [font-stretch:72%]">
                <Accent text={door.title} />
              </h3>
              <p className="max-w-lg text-white/85">{door.body}</p>
              <ul className="flex max-w-xl flex-wrap gap-2">
                {door.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="relative z-10 inline-flex min-h-9 items-center rounded-full border border-white/25 bg-stage/40 px-3.5 text-sm text-white backdrop-blur-sm transition-colors hover:border-yellow-400 hover:text-yellow-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                <Link
                  href={door.primary.href}
                  className="btn-shine inline-flex min-h-13 items-center gap-2 rounded-full bg-yellow-400 px-7 font-semibold text-ink shadow-card transition-[translate,box-shadow] hover:-translate-y-px hover:shadow-raised"
                >
                  {door.primary.label}
                  <Icon name="arrow-right" className="size-4.5" />
                </Link>
                <Link
                  href={door.secondary.href}
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline-offset-4 hover:underline"
                >
                  {door.secondary.label}
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Aurora } from "@/components/motion/Aurora";
import { SpreadNetwork } from "@/components/motion/SpreadNetwork";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { cx } from "@/lib/cx";
import type { ImageAsset } from "@/types/content";

/**
 * Homepage hero: a dark, cinematic stage for the two halves of the business.
 *
 * - Headline lines rise into place on load (CSS); the third line is the logo tagline.
 * - Behind them, the SpreadNetwork grows outward from one point — "built to spread".
 * - Two division "doors" (Events & Production, Digital Solutions) lead into each side.
 * With an approved photo, it appears in the signature hexagon over the network; without one
 * (the production state today) the network is the visual. The header floats over this hero.
 */
export interface Division {
  readonly label: string;
  readonly summary: string;
  readonly items: readonly string[];
  readonly href: string;
  readonly tone: "events" | "digital";
}

interface HomeHeroProps {
  readonly eyebrow: string;
  readonly headline: readonly string[];
  readonly lead: string;
  readonly proofPoints: readonly { readonly id: string; readonly label: string }[];
  readonly image?: ImageAsset;
  readonly divisions: readonly Division[];
  readonly primaryCta: { readonly label: string; readonly href: string };
  readonly secondaryCta: { readonly label: string; readonly href: string };
}

function DivisionDoor({
  division,
  index,
}: {
  readonly division: Division;
  readonly index: number;
}) {
  const events = division.tone === "events";
  return (
    <li className="enter-up" style={{ "--rv-i": 4 + index } as CSSProperties}>
      <article
        className={cx(
          "group glow-border relative isolate flex h-full flex-col gap-4 overflow-hidden rounded-card border border-white/12 bg-white/[0.04] p-6 outline-yellow-400 backdrop-blur-md has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 sm:p-7",
          "transition-[background-color,translate] duration-(--duration-slow) ease-(--ease-brand) hover:-translate-y-1 hover:bg-white/[0.07]",
        )}
      >
        {/* Light that follows the division colour, brightening on hover. */}
        <span
          aria-hidden="true"
          className={cx(
            "absolute -top-24 -right-24 -z-10 size-64 rounded-full opacity-60 transition-opacity duration-(--duration-slow) group-hover:opacity-100",
            events ? "glow-yellow" : "glow-cyan",
          )}
        />
        <div className="flex items-center justify-between gap-4">
          <p className={cx("text-eyebrow uppercase", events ? "text-yellow-400" : "text-cyan-300")}>
            {String(index + 1).padStart(2, "0")} · {events ? "Division one" : "Division two"}
          </p>
          <span className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-[background-color,border-color,rotate] duration-(--duration-slow) ease-(--ease-brand) group-hover:-rotate-45 group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-ink">
            <Icon name="arrow-right" className="size-4.5" />
          </span>
        </div>
        <h2 className="text-h2 text-white">
          <Link
            href={division.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {division.label}
          </Link>
        </h2>
        <p className="text-white/75">{division.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-2 text-sm text-white/85">
          {division.items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cx("size-1.5 rotate-45", events ? "bg-yellow-400" : "bg-cyan-400")}
              />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

export function HomeHero({
  eyebrow,
  headline,
  lead,
  proofPoints,
  image,
  divisions,
  primaryCta,
  secondaryCta,
}: HomeHeroProps) {
  const last = headline.length - 1;

  return (
    <section
      aria-labelledby="home-hero-title"
      data-hero="dark"
      data-tone="dark"
      className="relative isolate under-header overflow-hidden bg-night text-white"
    >
      <Aurora />

      {/* The network: right-hand stage on desktop, a faint backdrop behind the text on phones. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 w-full opacity-35 lg:w-[62%] lg:opacity-100"
      >
        <SpreadNetwork className="size-full" />
      </div>

      <Container className="relative flex flex-col gap-14 pt-14 pb-12 sm:pt-20 lg:min-h-[min(92svh,60rem)] lg:pt-24 lg:pb-16">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-7 lg:col-span-8">
            <p className="enter-up text-eyebrow text-cyan-300 uppercase">{eyebrow}</p>
            <h1 id="home-hero-title" className="text-hero">
              {headline.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.06em] lg:whitespace-nowrap">
                  <span
                    className={cx("line-rise", index === last ? "text-yellow-400" : "text-white")}
                    style={{ "--rv-i": index } as CSSProperties}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p
              className="max-w-2xl enter-up text-lead text-white/80"
              style={{ "--rv-i": 1 } as CSSProperties}
            >
              {lead}
            </p>
            <div className="flex enter-up flex-wrap gap-3" style={{ "--rv-i": 2 } as CSSProperties}>
              <ButtonLink href={primaryCta.href} size="lg" icon="arrow-right">
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} size="lg" variant="inverse">
                {secondaryCta.label}
              </ButtonLink>
            </div>
            <ul
              className="flex enter-up flex-wrap gap-x-6 gap-y-2 text-sm text-white/75"
              style={{ "--rv-i": 3 } as CSSProperties}
              aria-label="At a glance"
            >
              {proofPoints.map((point) => (
                <li key={point.id} className="flex items-center gap-2">
                  <Icon name="check" className="size-4 text-cyan-400" />
                  {point.label}
                </li>
              ))}
            </ul>
          </div>

          {image ? (
            <figure
              className="relative mx-auto w-full max-w-md enter-up lg:col-span-4 lg:max-w-none"
              style={{ "--rv-i": 2 } as CSSProperties}
            >
              <div className="relative aspect-hexagon w-full overflow-hidden bg-night-soft clip-hexagon">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 32vw, (min-width: 448px) 448px, 100vw"
                  className="size-full object-cover"
                />
              </div>
              <ReviewFlag item={image} className="absolute top-4 left-1/2 -translate-x-1/2" />
            </figure>
          ) : null}
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {divisions.map((division, index) => (
            <DivisionDoor key={division.label} division={division} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

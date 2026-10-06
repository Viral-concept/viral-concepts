import Image from "next/image";
import { Aurora } from "@/components/motion/Aurora";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cx } from "@/lib/cx";
import type { ImageAsset, ServiceStep } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/**
 * Agency-style sections for the digital service pages: overview with a supporting photo,
 * "what you get", a service-specific process and the platforms the service works with.
 * Each renders only when the service page has that content (see ServicePageContent).
 */

const isDark = (tone: SectionTone) => tone === "dark" || tone === "brand" || tone === "night";

/* -------------------------------------------------------------------------- */
/* Overview + photo                                                            */
/* -------------------------------------------------------------------------- */

interface ServiceOverviewProps {
  readonly tone: SectionTone;
  readonly title: string;
  readonly intro: readonly string[];
  readonly photo: ImageAsset;
  readonly badge: { readonly icon: IconName; readonly label: string };
}

export function ServiceOverview({ tone, title, intro, photo, badge }: ServiceOverviewProps) {
  return (
    <Section tone={tone} labelledBy="intro-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <SectionHeader id="intro-title" eyebrow="Overview" title={title} className="reveal" />
          <div className="flex flex-col gap-5 text-lead text-muted reveal-stagger">
            {intro.map((paragraph, index) => (
              <p key={paragraph} className={cx("reveal", index === 0 && "text-ink")}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <figure className="relative reveal reveal-scale lg:col-span-6">
          {/* Offset brand frame behind the photo. */}
          <span
            aria-hidden="true"
            className="absolute -inset-3 -z-10 hidden translate-x-4 translate-y-4 rounded-media border-2 border-yellow-400/70 lg:block"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-night-soft shadow-raised lg:aspect-[5/6]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-(--ease-brand) hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-night/80 to-transparent"
            />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-night/80 px-4 py-2 text-sm font-semibold text-white">
              <Icon name={badge.icon} className="size-4 text-yellow-400" />
              {badge.label}
            </span>
          </div>
        </figure>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* What you get                                                                */
/* -------------------------------------------------------------------------- */

interface ServiceDeliverablesProps {
  readonly tone: SectionTone;
  readonly serviceTitle: string;
  readonly items: readonly string[];
}

export function ServiceDeliverables({ tone, serviceTitle, items }: ServiceDeliverablesProps) {
  const dark = isDark(tone);
  return (
    <Section tone={tone} labelledBy="deliverables-title" className="overflow-hidden">
      {dark ? <Aurora tone="digital" /> : null}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeader
          id="deliverables-title"
          eyebrow="What you get"
          title={`Everything included in ${serviceTitle}`}
          intro="A clear scope from the start, so you know exactly what is delivered."
          inverse={dark}
          className="reveal lg:col-span-4"
        />
        <ul className="grid gap-4 reveal-stagger sm:grid-cols-2 lg:col-span-8">
          {items.map((item, index) => (
            <li
              key={item}
              className={cx(
                "group glow-border relative flex items-center gap-4 rounded-media border p-5 reveal",
                "transition-[translate,background-color] duration-(--duration-slow) ease-(--ease-brand) hover:-translate-y-1",
                dark
                  ? "border-white/12 bg-white/[0.04] hover:bg-white/[0.07]"
                  : "border-line bg-white shadow-card",
              )}
            >
              <span
                className={cx(
                  "grid size-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition-colors duration-(--duration-slow)",
                  dark
                    ? "bg-cyan-400/15 text-cyan-300 group-hover:bg-yellow-400 group-hover:text-ink"
                    : "bg-tint text-teal-800 group-hover:bg-yellow-400 group-hover:text-ink",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={cx("font-semibold", dark ? "text-white" : "text-ink")}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* How we deliver                                                              */
/* -------------------------------------------------------------------------- */

interface ServiceStepsProps {
  readonly tone: SectionTone;
  readonly steps: readonly ServiceStep[];
}

export function ServiceSteps({ tone, steps }: ServiceStepsProps) {
  return (
    <Section tone={tone} labelledBy="service-steps-title">
      <SectionHeader
        id="service-steps-title"
        eyebrow="How we deliver"
        title="From brief to results"
        className="reveal"
      />
      <ol className="relative mt-12 grid gap-8 reveal-stagger md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Connecting line behind the step numbers (large screens). */}
        <li
          aria-hidden="true"
          className="pointer-events-none absolute top-7 right-[12%] left-0 hidden h-px bg-linear-to-r from-yellow-400 via-cyan-400 to-line-strong lg:block"
        />
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col gap-4 reveal">
            <span
              className={cx(
                "relative grid size-14 place-items-center rounded-full font-display text-lg font-bold ring-8",
                index === 0 ? "bg-yellow-400 text-ink" : "bg-teal-800 text-white",
                tone === "surface" ? "ring-surface" : "ring-white",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-h3 text-ink">{step.title}</h3>
            <p className="text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Platforms                                                                   */
/* -------------------------------------------------------------------------- */

interface ServicePlatformsProps {
  readonly tone: SectionTone;
  readonly platforms: readonly string[];
}

export function ServicePlatforms({ tone, platforms }: ServicePlatformsProps) {
  const dark = isDark(tone);
  return (
    <Section tone={tone} spacing="compact" labelledBy="platforms-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        <h2
          id="platforms-title"
          className={cx(
            "shrink-0 text-eyebrow uppercase",
            dark ? "text-cyan-300" : "text-teal-600",
          )}
        >
          Platforms &amp; technologies
        </h2>
        <ul className="flex flex-wrap gap-2.5 reveal-stagger">
          {platforms.map((platform) => (
            <li
              key={platform}
              className={cx(
                "inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold reveal",
                dark ? "border-white/20 text-white" : "border-line-strong bg-white text-ink",
              )}
            >
              {platform}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

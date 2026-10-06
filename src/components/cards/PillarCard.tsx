import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { cx } from "@/lib/cx";
import { getServiceHref } from "@/lib/content";
import type { Pillar, Service } from "@/types/content";

/**
 * One of the three homepage pillars, listing its services as links. Unlike ServiceCard it
 * contains several links, so it is not a stretched-link card.
 */
interface PillarCardProps {
  readonly pillar: Pillar;
  readonly services: readonly Service[];
  /** Position label, e.g. "01". */
  readonly index: number;
  readonly cta: { readonly label: string; readonly href: string };
  readonly className?: string;
}

export function PillarCard({ pillar, services, index, cta, className }: PillarCardProps) {
  const headingId = `pillar-${pillar.id}`;
  return (
    <article
      aria-labelledby={headingId}
      data-tone="dark"
      className={cx(
        "group/pillar glow-border relative isolate flex h-full flex-col gap-6 overflow-hidden rounded-media bg-night p-7 text-white sm:p-9",
        "transition-[translate,box-shadow] duration-(--duration-slow) ease-(--ease-brand) hover:-translate-y-1.5 hover:shadow-raised",
        className,
      )}
    >
      {/* Corner light in the pillar's accent, brightening on hover. */}
      <span
        aria-hidden="true"
        className={cx(
          "absolute -top-32 -right-32 -z-10 size-80 rounded-full opacity-70 transition-opacity duration-(--duration-slow) group-hover/pillar:opacity-100",
          index === 3 ? "glow-cyan" : index === 1 ? "glow-yellow" : "glow-teal",
        )}
      />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-hairline-grid opacity-60" />
      <p
        aria-hidden="true"
        className="font-display text-7xl leading-none font-bold text-transparent [-webkit-text-stroke:1.5px_var(--color-cyan-400)]"
      >
        {String(index).padStart(2, "0")}
      </p>
      <div className="flex flex-col gap-3">
        <h3 id={headingId} className="text-h3 text-white">
          {pillar.title}
        </h3>
        <p className="text-white/85">{pillar.summary}</p>
      </div>
      <ul className="flex flex-col divide-y divide-white/12 border-y border-white/12">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={getServiceHref(service)}
              className="group flex min-h-12 items-center justify-between gap-4 py-2 font-medium text-white/90 transition-colors hover:text-yellow-400"
            >
              <span className="flex flex-wrap items-center gap-2">
                {service.title}
                <ReviewFlag item={service} />
              </span>
              <Icon
                name="arrow-right"
                className="size-4 shrink-0 transition-transform duration-(--duration-fast) group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
      <ButtonLink href={cta.href} variant="quietInverse" className="mt-auto self-start">
        {cta.label}
      </ButtonLink>
    </article>
  );
}

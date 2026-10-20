import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { cx } from "@/lib/cx";
import { getServiceHref, hasServicePage } from "@/lib/content";
import { needsReviewBanner } from "@/lib/publishing";
import type { ImageAsset, Service } from "@/types/content";

/**
 * Service teaser. The whole card is clickable through a single link on the title (stretched
 * with ::after), so screen readers hear one link named after the service — not a card full of
 * nested links. With `href={null}` it renders as a plain, unlinked card (used on a landing page
 * for a service that has no page of its own yet).
 */
const LINKED_CARD = [
  "transition-[box-shadow,translate,border-color,background-color] duration-(--duration-slow) ease-(--ease-brand)",
  "hover:-translate-y-1 hover:shadow-raised",
  // Keyboard focus on the stretched link outlines the whole card.
  "has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3",
].join(" ");

interface ServiceCardProps {
  readonly service: Service;
  /** Number of offering highlights to list (0 to hide). */
  readonly highlights?: number;
  readonly headingLevel?: 2 | 3 | 4;
  /** Defaults to the service's link target; `null` renders an unlinked card. */
  readonly href?: string | null;
  readonly id?: string;
  /** `dark` for cards on night/dark sections. */
  readonly tone?: "light" | "dark";
  /** Optional photo across the top of the card (decorative: the title names the card). */
  readonly image?: ImageAsset | undefined;
  readonly className?: string;
}

export function ServiceCard({
  service,
  highlights = 3,
  headingLevel = 3,
  href = getServiceHref(service),
  id,
  tone = "light",
  image,
  className,
}: ServiceCardProps) {
  const dark = tone === "dark";
  const Heading = `h${headingLevel}` as const;
  const allItems = service.offerings.flatMap((group) => group.items);
  // A single item only restates the service name ("SEO" → "Search engine optimisation").
  const items = allItems.length >= 2 ? allItems.slice(0, highlights) : [];

  return (
    <article
      id={id}
      className={cx(
        "group glow-border relative flex h-full flex-col gap-4 overflow-hidden rounded-media border p-6 sm:p-7",
        dark
          ? "border-white/12 bg-white/[0.04] text-white outline-yellow-400 hover:bg-white/[0.07]"
          : "border-line bg-white shadow-card outline-teal-600",
        // Arriving from a menu link to this card's anchor highlights it.
        "target:border-teal-600",
        href !== null && LINKED_CARD,
        className,
      )}
    >
      {image ? (
        <div className="relative -mx-6 -mt-6 mb-1 aspect-[16/9] overflow-hidden bg-night-soft sm:-mx-7 sm:-mt-7">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-(--ease-brand) group-hover:scale-106"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-night/45 to-transparent"
          />
        </div>
      ) : null}
      {/* Accent bar that runs the full width on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-25 bg-linear-to-r from-cyan-400 to-yellow-400 transition-[scale] duration-(--duration-slow) ease-(--ease-brand) group-hover:scale-x-100"
      />
      {/* A live service whose page copy is still a draft is flagged too (preview only). */}
      <ReviewFlag
        item={
          // Only a page that exists in this deployment can be flagged; in production a draft
          // page does not exist, so the card falls back to the (publishable) service.
          !needsReviewBanner(service) && service.page && hasServicePage(service)
            ? service.page
            : service
        }
        className="self-start"
      />
      <Heading className={cx("text-h3", dark ? "text-white" : "text-ink")}>
        {href === null ? (
          service.title
        ) : (
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {service.title}
          </Link>
        )}
      </Heading>
      <p className={dark ? "text-white/75" : "text-muted"}>{service.summary}</p>
      {items.length > 0 ? (
        <ul className={cx("flex flex-col gap-2 text-sm", dark ? "text-white/90" : "text-ink")}>
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Icon
                name="check"
                className={cx("mt-0.5 size-4 shrink-0", dark ? "text-cyan-400" : "text-teal-600")}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {href === null ? null : (
        <span
          aria-hidden="true"
          className={cx(
            "mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold",
            dark ? "text-cyan-300" : "text-teal-800",
          )}
        >
          Explore service
          <Icon
            name="arrow-right"
            className="size-4 transition-transform duration-(--duration-base) ease-(--ease-brand) group-hover:translate-x-1.5"
          />
        </span>
      )}
    </article>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Aurora } from "@/components/motion/Aurora";
import { SpreadNetwork } from "@/components/motion/SpreadNetwork";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import type { Governed, ImageAsset } from "@/types/content";

/**
 * Hero for inner pages (services, digital, projects, about …): breadcrumbs, the page's single
 * h1, a lead sentence and actions. With a visible photo — or a `visual` (the animated
 * illustrations on digital service pages) — it becomes a two-column layout; with neither, the
 * text stands alone over the brand network.
 */
interface PageHeroProps {
  readonly breadcrumbs: readonly BreadcrumbItem[];
  readonly eyebrow?: string;
  readonly title: string;
  /** Omitted when the subject has no confirmed summary yet (never a placeholder). */
  readonly lead?: string;
  readonly actions?: ReactNode;
  readonly image?: ImageAsset;
  /** Decorative illustration for the right-hand column, used when there is no photo. */
  readonly visual?: ReactNode;
  /** Shows a review badge in preview builds when the page's subject is not yet publishable. */
  readonly reviewItem?: Governed;
}

export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  actions,
  image,
  visual,
  reviewItem,
}: PageHeroProps) {
  const media = image ? "photo" : visual ? "visual" : undefined;
  return (
    <section
      aria-labelledby="page-title"
      data-hero="dark"
      data-tone="dark"
      className="relative isolate under-header overflow-hidden bg-night text-white"
    >
      {/* The visible trail and its BreadcrumbList markup come from the same items. */}
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Aurora />
      {media ? null : (
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 opacity-70 lg:block"
        >
          <SpreadNetwork className="size-full" />
        </div>
      )}
      <Container className="grid items-center gap-10 pt-12 pb-14 sm:pt-16 sm:pb-20 lg:grid-cols-12 lg:gap-12 lg:pt-24 lg:pb-28">
        <div
          className={
            media
              ? "flex flex-col gap-6 lg:col-span-7"
              : "flex max-w-3xl flex-col gap-6 lg:col-span-8"
          }
        >
          <Breadcrumbs items={breadcrumbs} inverse className="enter-up" />
          {reviewItem ? <ReviewFlag item={reviewItem} className="self-start" /> : null}
          {eyebrow ? (
            <p className="enter-up text-eyebrow text-cyan-300 uppercase [--rv-i:1]">{eyebrow}</p>
          ) : null}
          <h1 id="page-title" className="text-display text-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="line-rise">{title}</span>
            </span>
          </h1>
          {lead ? (
            <p className="max-w-2xl enter-up text-lead text-white/80 [--rv-i:2]">{lead}</p>
          ) : null}
          {actions ? (
            <div className="flex enter-up flex-wrap gap-3 [--rv-i:3]">{actions}</div>
          ) : null}
        </div>
        {image ? (
          <figure className="relative enter-up [--rv-i:2] lg:col-span-5">
            <div className="relative aspect-4/3 overflow-hidden rounded-media border border-white/12 bg-night-soft shadow-raised">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                className="size-full object-cover"
              />
            </div>
            <ReviewFlag item={image} className="absolute top-4 left-4" />
          </figure>
        ) : visual ? (
          <div className="mx-auto w-full max-w-md enter-up [--rv-i:3] lg:col-span-5 lg:max-w-none">
            {visual}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

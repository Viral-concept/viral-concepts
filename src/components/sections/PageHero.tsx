import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Aurora } from "@/components/motion/Aurora";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accent } from "@/components/ui/Accent";
import { Container } from "@/components/ui/Container";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import type { Governed, ImageAsset } from "@/types/content";

/**
 * Hero for inner pages: breadcrumbs, the page's single h1 (poster type; *asterisks* mark the
 * serif accent), a lead and actions. Three stages:
 *
 * - photo: the photograph fills the stage, cinematic shade and grain over it, text along the
 *   bottom edge (event services, about, contact);
 * - visual: two columns with a supplied illustration;
 * - neither: a dark stage with sweeping beams.
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
  /** Small facts along the bottom of a photo hero (e.g. what a service includes). */
  readonly credits?: readonly string[];
}

function Copy({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  actions,
  reviewItem,
}: Pick<PageHeroProps, "breadcrumbs" | "eyebrow" | "title" | "lead" | "actions" | "reviewItem">) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} inverse className="enter-up" />
      {reviewItem ? <ReviewFlag item={reviewItem} className="self-start" /> : null}
      {eyebrow ? (
        <p className="flex enter-up items-center gap-3 text-eyebrow text-yellow-400 uppercase [--rv-i:1]">
          <span aria-hidden="true" className="h-px w-8 bg-yellow-400" />
          {eyebrow}
        </p>
      ) : null}
      <h1 id="page-title" className="text-display text-white">
        <span className="block overflow-hidden pt-[0.04em] pb-[0.1em]">
          <span className="line-rise">
            <Accent text={title} />
          </span>
        </span>
      </h1>
      {lead ? (
        <p className="max-w-2xl enter-up text-lead text-white/85 [--rv-i:2]">{lead}</p>
      ) : null}
      {actions ? <div className="flex enter-up flex-wrap gap-3 [--rv-i:3]">{actions}</div> : null}
    </>
  );
}

export function PageHero(props: PageHeroProps) {
  const { breadcrumbs, image, visual, credits } = props;

  if (image) {
    return (
      <section
        aria-labelledby="page-title"
        data-hero="dark"
        data-tone="dark"
        className="relative isolate -mt-(--header-h) flex min-h-[min(88svh,56rem)] flex-col overflow-hidden bg-stage text-white"
      >
        <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="hero-still object-cover"
          />
          <div className="absolute inset-0 shade-cinema" />
          <span className="hero-beam left-[62%]" />
          <div className="grain absolute inset-0" />
        </div>
        <Container className="flex flex-1 flex-col justify-end gap-6 pt-32 pb-12 sm:pb-16 lg:pt-40 lg:pb-20">
          <div className="flex max-w-5xl flex-col gap-6">
            <Copy {...props} />
          </div>
          {credits && credits.length > 0 ? (
            <ul className="mt-4 flex enter-up flex-wrap gap-2 border-t border-white/15 pt-6 [--rv-i:4]">
              {credits.map((credit) => (
                <li
                  key={credit}
                  className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-sm text-white/85 backdrop-blur-sm"
                >
                  {credit}
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
        <ReviewFlag item={image} className="absolute right-4 bottom-4" />
      </section>
    );
  }

  return (
    <section
      aria-labelledby="page-title"
      data-hero="dark"
      data-tone="dark"
      className="relative isolate under-header overflow-hidden bg-night text-white"
    >
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Aurora />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <span className="hero-beam left-[10%]" />
        <span className="hero-beam hero-beam-cool left-[64%]" />
        <div className="grain absolute inset-0" />
      </div>
      <Container className="grid items-center gap-10 pt-12 pb-14 sm:pt-16 sm:pb-20 lg:grid-cols-12 lg:gap-12 lg:pt-24 lg:pb-28">
        <div
          className={
            visual
              ? "flex flex-col gap-6 lg:col-span-7"
              : "flex max-w-4xl flex-col gap-6 lg:col-span-10"
          }
        >
          <Copy {...props} />
        </div>
        {visual ? (
          <div className="mx-auto w-full max-w-md enter-up [--rv-i:3] lg:col-span-5 lg:max-w-none">
            {visual}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

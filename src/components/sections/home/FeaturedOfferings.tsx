import Image from "next/image";
import Link from "next/link";

import { Aurora } from "@/components/motion/Aurora";
import { Rail } from "@/components/motion/Rail";
import { StageLights } from "@/components/motion/StageLights";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { FeaturedOffering } from "@/content/home";
import type { ImageAsset } from "@/types/content";

/**
 * The events side of the business as a cinematic, swipeable reel: one tall card per featured
 * service, each linking to its service page.
 *
 * Cards show photos only when every card has one (a reel where some cards have photos looks
 * unfinished). Until approved photos exist, each card carries StageLights — stage beams that
 * sway and open up on hover — so the reel still feels like a live show, not a placeholder.
 */
export interface OfferingWithImage {
  readonly offering: FeaturedOffering;
  readonly href: string;
  readonly image?: ImageAsset;
}

interface FeaturedOfferingsProps {
  readonly items: readonly OfferingWithImage[];
  readonly allServicesHref: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
}

const HUES = ["warm", "mixed", "cool"] as const;

export function FeaturedOfferings({
  items,
  allServicesHref,
  eyebrow,
  title,
  intro,
}: FeaturedOfferingsProps) {
  const withImages = items.every((item) => item.image !== undefined);

  return (
    <Section tone="night" labelledBy="featured-offerings-title" className="overflow-hidden">
      <Aurora tone="events" />
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          id="featured-offerings-title"
          inverse
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          className="reveal"
        />
        <div className="shrink-0">
          <ButtonLink href={allServicesHref} variant="inverse" icon="arrow-right">
            All services
          </ButtonLink>
        </div>
      </div>

      <div className="mt-12 -mr-4 sm:-mr-6 lg:-mr-8">
        <Rail
          label={title}
          inverse
          className="gap-4 pr-4 pb-2 reveal-stagger sm:gap-5 sm:pr-6 lg:pr-8"
        >
          {items.map(({ offering, href, image }, index) => (
            <li
              key={offering.id}
              className="w-[82%] shrink-0 snap-start reveal reveal-right sm:w-[46%] lg:w-[31%] xl:w-[26%]"
            >
              <article className="group glow-border relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-media border border-white/10 bg-night-soft outline-yellow-400 has-[a:focus-visible]:outline-3 has-[a:focus-visible]:-outline-offset-3">
                <div className="absolute inset-0 -z-10">
                  {withImages && image ? (
                    <>
                      <Image
                        src={image.src}
                        alt=""
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
                        className="size-full object-cover transition-transform duration-[1200ms] ease-(--ease-brand) group-hover:scale-106"
                      />
                      <ReviewFlag item={image} className="absolute top-4 left-4" />
                    </>
                  ) : (
                    <StageLights hue={HUES[index % HUES.length]} variant={index} />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-night via-night/70 to-transparent" />
                </div>

                <div className="flex flex-col gap-3 p-6 sm:p-7">
                  <p className="font-display text-sm font-semibold tracking-[0.2em] text-yellow-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-h3 text-white">
                    <Link
                      href={href}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {offering.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-white/80 transition-[translate] duration-(--duration-slow) ease-(--ease-brand)">
                    {offering.summary}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"
                  >
                    Explore
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-(--duration-base) group-hover:translate-x-1.5"
                    />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </Rail>
      </div>
    </Section>
  );
}

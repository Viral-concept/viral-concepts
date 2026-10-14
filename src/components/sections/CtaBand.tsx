import Image from "next/image";
import Link from "next/link";

import { Accent } from "@/components/ui/Accent";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { IconName } from "@/components/ui/Icon";
import { Icon } from "@/components/ui/Icon";
import { eventPhotos } from "@/content/event-photos";
import type { ImageAsset } from "@/types/content";

/**
 * The closing call to action on every major page — "the finale": a full-bleed stage
 * photograph, a poster-scale question and the actions. With `picker`, visitors can say what
 * they are planning in one tap (each option opens the brief form with that service chosen).
 */
export interface CtaAction {
  readonly label: string;
  readonly href: string;
  readonly icon?: IconName;
}

interface CtaBandProps {
  /** Small label above the title. */
  readonly eyebrow?: string;
  readonly title: string;
  readonly lead: string;
  readonly primary: CtaAction;
  readonly secondary?: CtaAction;
  /** Background photograph; defaults to the empty, lit stage. */
  readonly image?: ImageAsset;
  readonly picker?: { readonly label: string; readonly options: readonly CtaAction[] };
}

export function CtaBand({
  eyebrow = "Your stage is waiting",
  title,
  lead,
  primary,
  secondary,
  image,
  picker,
}: CtaBandProps) {
  const photo = image ?? eventPhotos.emptyStage;
  return (
    <section
      aria-labelledby="cta-title"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-stage text-white"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          className="parallax object-cover opacity-70 [--parallax:40px]"
        />
        <div className="absolute inset-0 shade-cinema" />
        <div className="grain absolute inset-0" />
      </div>

      <Container className="flex flex-col gap-12 py-24 sm:py-28 lg:py-36">
        <div className="flex max-w-5xl flex-col gap-6">
          <p className="flex items-center gap-3 text-eyebrow text-yellow-400 uppercase reveal">
            <span aria-hidden="true" className="h-px w-8 bg-yellow-400" />
            {eyebrow}
          </p>
          <h2 id="cta-title" className="text-display text-white reveal [--rv-i:1]">
            <Accent text={title} />
          </h2>
          <p className="font-serif text-statement text-yellow-400 italic reveal [--rv-i:2]">
            {lead}
          </p>
        </div>

        {picker ? (
          <div className="flex flex-col gap-4 reveal [--rv-i:3]">
            <p className="text-sm font-semibold text-white/80">{picker.label}</p>
            <ul className="flex flex-wrap gap-2.5">
              {picker.options.map((option) => (
                <li key={option.href + option.label}>
                  <Link
                    href={option.href}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-yellow-400 hover:bg-yellow-400 hover:text-ink"
                  >
                    {option.label}
                    <Icon
                      name="arrow-up-right"
                      className="size-4 transition-transform duration-(--duration-base) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 reveal [--rv-i:4]">
          <ButtonLink href={primary.href} size="lg" icon="arrow-right">
            {primary.label}
          </ButtonLink>
          {secondary ? (
            <ButtonLink
              href={secondary.href}
              size="lg"
              variant="inverse"
              {...(secondary.icon ? { leadingIcon: secondary.icon } : {})}
            >
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

import Link from "next/link";

import { Aurora } from "@/components/motion/Aurora";
import { InterfaceMock } from "@/components/motion/InterfaceMock";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getServiceHref } from "@/lib/content";
import type { DigitalCapability, Service } from "@/types/content";

/**
 * The digital side of the business on the homepage: capability groups (marketing; web & apps;
 * AI & automation once confirmed) beside an animated website-and-app composition. Same brand
 * system as the events side — cooler light, same typography — so it reads as one company.
 */
export const CAPABILITY_META: Record<
  DigitalCapability,
  { readonly title: string; readonly icon: IconName; readonly blurb: string }
> = {
  marketing: {
    title: "Digital Marketing",
    icon: "chart",
    blurb: "Search, social and campaigns that keep your brand visible.",
  },
  build: {
    title: "Web & App Development",
    icon: "code",
    blurb: "Websites and applications, designed and built to perform.",
  },
  ai: {
    title: "AI & Automation",
    icon: "spark",
    blurb: "Agents, chatbots and workflows that work around the clock.",
  },
};

export const CAPABILITY_ORDER: readonly DigitalCapability[] = ["marketing", "build", "ai"];

interface DigitalBandProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly services: readonly Service[];
  readonly href: string;
}

export function DigitalBand({ eyebrow, title, intro, services, href }: DigitalBandProps) {
  const groups = CAPABILITY_ORDER.map((capability) => ({
    capability,
    services: services.filter((service) => service.capability === capability),
  })).filter((group) => group.services.length > 0);
  const hasAi = groups.some((group) => group.capability === "ai");

  return (
    <Section tone="night" labelledBy="digital-band-title" className="overflow-hidden">
      <Aurora tone="digital" />
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-6">
          <SectionHeader
            id="digital-band-title"
            inverse
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            className="reveal"
          />
          <ul className="flex flex-col gap-3 reveal-stagger">
            {groups.map(({ capability, services: list }) => {
              const meta = CAPABILITY_META[capability];
              return (
                <li
                  key={capability}
                  className="group rounded-media border border-white/10 bg-white/[0.03] p-5 reveal transition-colors duration-(--duration-slow) reveal-left hover:border-white/25 hover:bg-white/[0.06] sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cyan-400/15 text-cyan-300 transition-[background-color,color,rotate] duration-(--duration-slow) ease-(--ease-brand) group-hover:-rotate-6 group-hover:bg-yellow-400 group-hover:text-ink">
                      <Icon name={meta.icon} className="size-5" />
                    </span>
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="text-h3 text-white">{meta.title}</h3>
                      <p className="text-sm text-white/75">{meta.blurb}</p>
                      <ul className="mt-1 flex flex-wrap gap-2">
                        {list.map((service) => (
                          <li key={service.slug} className="flex flex-wrap items-center gap-2">
                            <Link
                              href={getServiceHref(service)}
                              className="inline-flex min-h-9 items-center rounded-full border border-white/20 px-3.5 text-sm whitespace-nowrap text-white/90 transition-colors hover:border-yellow-400 hover:text-yellow-400"
                            >
                              {service.title}
                            </Link>
                            <ReviewFlag item={service} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="reveal">
            <ButtonLink href={href} icon="arrow-right">
              Explore Digital Solutions
            </ButtonLink>
          </div>
        </div>
        <div className="reveal reveal-scale lg:col-span-6">
          <InterfaceMock withChat={hasAi} />
        </div>
      </div>
    </Section>
  );
}

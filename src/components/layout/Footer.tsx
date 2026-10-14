import Link from "next/link";
import type { ReactNode } from "react";

import { AppLink } from "@/components/ui/AppLink";
import { ButtonLink } from "@/components/ui/Button";
import { TricolourBar } from "@/components/ui/BrandMotifs";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { getCompanyFacts, getContactChannels, getSocialProfiles } from "@/lib/content";
import { getNavigation } from "@/lib/navigation";
import { routes } from "@/lib/routes";

/**
 * Site footer (Server Component, no JavaScript). Every link comes from the navigation model
 * and every contact detail from the content layer, so unconfirmed facts (address, hours,
 * socials, legal pages) appear automatically once the client confirms them.
 */

const socialLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X",
  youtube: "YouTube",
  tiktok: "TikTok",
} as const;

function ContactLine({
  icon,
  href,
  children,
}: {
  readonly icon: IconName;
  readonly href?: string;
  readonly children: ReactNode;
}) {
  const content = (
    <>
      <Icon name={icon} className="size-5 shrink-0 text-cyan-400" />
      <span>{children}</span>
    </>
  );
  return (
    <li>
      {href ? (
        <AppLink
          href={href}
          className="flex min-h-11 items-center gap-3 hover:text-white hover:underline"
        >
          {content}
        </AppLink>
      ) : (
        <span className="flex gap-3">{content}</span>
      )}
    </li>
  );
}

export function Footer() {
  const navigation = getNavigation();
  const { phone, email, address, businessHours } = getContactChannels();
  const socials = getSocialProfiles();
  const { foundingYear, reach: countries } = getCompanyFacts();
  const reach = countries.map((country) => country.name).join(" · ");
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="relative isolate overflow-hidden bg-stage text-white/80">
      {/* A soft light behind the columns, in the brand's cyan. Decorative. */}
      <span
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full opacity-40 glow-teal"
      />
      {/* Opening line: one more invitation before the links. */}
      <Container className="flex flex-col gap-6 border-b border-white/12 pt-20 pb-14 md:flex-row md:items-end md:justify-between lg:pt-24">
        <p className="max-w-3xl font-display text-[clamp(2.25rem,1.2rem+4vw,4.5rem)] leading-[0.92] font-extrabold text-white uppercase [font-stretch:72%]">
          Have an event <em className="accent text-yellow-400">in mind?</em>
        </p>
        <div className="shrink-0">
          <ButtonLink href={navigation.cta.href} size="lg" icon="arrow-right">
            {navigation.cta.label}
          </ButtonLink>
        </div>
      </Container>
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Link href={routes.home} aria-label="Viral Concepts — home" className="self-start">
            <Logo variant="white" className="h-10" />
          </Link>
          <p className="max-w-sm">{site.description}</p>
          <p className="text-sm text-white/70">
            {[foundingYear ? `Since ${foundingYear}` : null, reach || null]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {socials.length > 0 ? (
            <ul className="flex gap-3" aria-label="Social media">
              {socials.map((profile) => (
                <li key={profile.network}>
                  <AppLink
                    href={profile.url}
                    className="inline-flex min-h-11 items-center rounded-input border border-white/25 px-4 text-sm font-semibold text-white hover:border-white"
                  >
                    {socialLabels[profile.network]}
                  </AppLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-5 lg:gap-6"
        >
          {navigation.footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h2 className="text-eyebrow text-yellow-400 uppercase">{column.title}</h2>
              <ul className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-9 items-center py-1 text-sm leading-snug hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-4 lg:col-span-3">
          <h2 className="text-eyebrow text-yellow-400 uppercase">Contact</h2>
          <ul className="flex flex-col gap-1 text-sm">
            {phone ? (
              <ContactLine icon="phone" href={`tel:${phone.value.e164}`}>
                {phone.value.display}
              </ContactLine>
            ) : null}
            {email ? (
              <ContactLine icon="mail" href={`mailto:${email.value}`}>
                {email.value}
              </ContactLine>
            ) : null}
            {address ? (
              <ContactLine icon="map-pin">
                {address.value.locality}, {address.value.city}
              </ContactLine>
            ) : null}
            {businessHours ? (
              <ContactLine icon="clock">
                {businessHours.value.map((entry) => (
                  <span key={entry.days} className="block">
                    {entry.days}: {entry.hours}
                  </span>
                ))}
              </ContactLine>
            ) : null}
          </ul>
        </div>
      </Container>

      {/* Closing wordmark: outlined, it fills with brand light as the page ends. */}
      <div
        aria-hidden="true"
        className="mx-auto w-full max-w-content overflow-hidden px-4 pb-4 select-none sm:px-6 lg:px-8"
      >
        <p className="footer-wordmark">{site.name}</p>
      </div>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navigation.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#top"
                className="group inline-flex min-h-11 items-center gap-2 font-semibold text-white hover:text-yellow-400"
              >
                Back to top
                <span className="grid size-8 place-items-center rounded-full border border-white/25 transition-[translate,border-color] duration-(--duration-base) ease-(--ease-brand) group-hover:-translate-y-0.5 group-hover:border-yellow-400">
                  <Icon name="arrow-right" className="size-4 -rotate-90" />
                </span>
              </a>
            </li>
          </ul>
        </Container>
      </div>
      <TricolourBar />
    </footer>
  );
}

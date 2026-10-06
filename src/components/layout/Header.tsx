import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { getContactChannels } from "@/lib/content";
import { getNavigation } from "@/lib/navigation";
import { routes } from "@/lib/routes";

import { MobileNav } from "./MobileNav";
import { NavDisclosure } from "./NavDisclosure";
import { NavLink } from "./NavLink";
import { NavPanel } from "./NavPanel";

/**
 * Site header (Server Component). Sticky; over a dark hero it starts transparent with light text
 * and becomes frosted white glass within the first 140px of scroll (CSS scroll timeline,
 * `site-header` in globals.css). Elsewhere, and in browsers without scroll timelines, it is solid.
 *
 * - ≥ 1280px: full navigation with dropdown panels and the primary CTA.
 * - < 1280px: logo, CTA (from 768px) and the menu button; below 768px the mobile action bar carries the
 *   CTA on phones.
 */
export function Header() {
  const navigation = getNavigation();
  const { phone } = getContactChannels();

  return (
    <header className="sticky top-0 z-40 site-header">
      <Container className="flex h-16 items-center justify-between gap-6 xl:h-20">
        <Link href={routes.home} aria-label="Viral Concepts — home" className="relative shrink-0">
          {/* Colour logo once solid; white logo while transparent over a dark hero. */}
          <Logo eager className="h-8 hdr-logo-dark xl:h-9" />
          <Logo
            eager
            variant="white"
            className="absolute inset-0 h-8 hdr-logo-light xl:h-9"
            decorative
          />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navigation.primary.map((item) => (
              <li key={item.id}>
                {item.kind === "link" ? (
                  <NavLink
                    href={item.href}
                    className="nav-underline inline-flex min-h-11 items-center rounded-input px-3 text-button font-medium hdr-fg"
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <NavDisclosure
                    label={item.label}
                    activeHrefs={[
                      item.overview.href,
                      ...item.sections.flatMap((s) => s.links.map((l) => l.href)),
                    ]}
                  >
                    <NavPanel item={item} cta={navigation.cta} />
                  </NavDisclosure>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Responsive visibility lives on a wrapper: buttons own their display value. */}
          <div className="hidden md:block">
            <ButtonLink href={navigation.cta.href} icon="arrow-right">
              {navigation.cta.label}
            </ButtonLink>
          </div>
          <MobileNav items={navigation.primary} cta={navigation.cta} phone={phone?.value} />
        </div>
      </Container>
    </header>
  );
}

import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import type { NavItem, NavLink as NavLinkModel } from "@/types/navigation";

/**
 * Contents of a desktop dropdown. Server-rendered and passed into NavDisclosure as children,
 * so none of these links add client JavaScript.
 */
type MenuItem = Extract<NavItem, { kind: "menu" }>;

function PanelLink({ link }: { readonly link: NavLinkModel }) {
  return (
    <Link
      href={link.href}
      className="group flex flex-col gap-1 rounded-input p-3 transition-colors hover:bg-surface"
    >
      <span className="flex flex-wrap items-center gap-2 font-semibold text-ink group-hover:text-teal-800">
        {link.label}
        {link.reviewLabel ? <Badge tone="review">{link.reviewLabel}</Badge> : null}
      </span>
      {link.description ? <span className="text-sm text-muted">{link.description}</span> : null}
    </Link>
  );
}

export function NavPanel({ item, cta }: { readonly item: MenuItem; readonly cta: NavLinkModel }) {
  const mega = item.layout === "mega";
  return (
    <Container className="grid gap-8 py-8 xl:grid-cols-12">
      <div className="flex flex-col gap-4 rounded-card bg-surface p-6 xl:col-span-4">
        <Link
          href={item.overview.href}
          className="group inline-flex items-center gap-2 font-display text-h3 text-ink hover:text-teal-800"
        >
          {item.overview.label}
          <Icon
            name="arrow-right"
            className="size-5 transition-transform duration-(--duration-fast) group-hover:translate-x-1"
          />
        </Link>
        {item.overview.description ? (
          <p className="text-muted">{item.overview.description}</p>
        ) : null}
        <ButtonLink href={cta.href} className="mt-auto self-start" icon="arrow-right">
          {cta.label}
        </ButtonLink>
      </div>
      <div
        className={cx(
          "grid gap-x-6 gap-y-8 xl:col-span-8",
          mega ? (item.sections.length >= 3 ? "grid-cols-3" : "grid-cols-2") : "grid-cols-1",
        )}
      >
        {item.sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <p className="px-3 text-eyebrow text-teal-600 uppercase">{section.title}</p>
            <ul className={cx("grid gap-1", !mega && "grid-cols-2")}>
              {section.links.map((link) => (
                <li key={link.href}>
                  <PanelLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}

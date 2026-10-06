"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import type { NavItem, NavLink as NavLinkModel } from "@/types/navigation";

import { NavLink } from "./NavLink";

/**
 * Mobile and tablet menu (below 1280px) built on a native modal <dialog>:
 * the browser provides the focus trap, Escape to close, an inert background and focus return.
 * Page scroll is locked with CSS (html:has(dialog[data-mobile-nav][open]) in globals.css).
 */
interface MobileNavProps {
  readonly items: readonly NavItem[];
  readonly cta: NavLinkModel;
  readonly phone?: { readonly display: string; readonly e164: string };
}

function MobileSubLink({ link }: { readonly link: NavLinkModel }) {
  return (
    <NavLink
      href={link.href}
      exact
      className="flex min-h-11 flex-wrap items-center gap-2 rounded-input px-3 text-muted hover:bg-surface aria-[current=page]:font-semibold aria-[current=page]:text-teal-800"
    >
      {link.label}
      {link.reviewLabel ? <Badge tone="review">{link.reviewLabel}</Badge> : null}
    </NavLink>
  );
}

/** Desktop navigation takes over from this width (Tailwind `xl`). */
const DESKTOP_QUERY = "(min-width: 80rem)";

export function MobileNav({ items, cta, phone }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const pathname = usePathname();

  // Close after navigation and when the viewport grows to the desktop layout.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
        className="grid size-11 place-items-center rounded-input hdr-fg xl:hidden"
      >
        <Icon name="menu" className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        data-mobile-nav
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        // Choosing a link closes the menu even when it points at the current page.
        onClickCapture={(event) => {
          if ((event.target as Element).closest("a")) dialogRef.current?.close();
        }}
        className="mobile-nav fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-white p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="flex min-h-full flex-col">
          <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
            <Logo className="h-8" />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="grid size-11 place-items-center rounded-input hover:bg-surface"
            >
              <Icon name="close" className="size-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 px-4 py-4 sm:px-6">
            <ul className="flex flex-col divide-y divide-line">
              {items.map((item) =>
                item.kind === "link" ? (
                  <li key={item.id}>
                    <NavLink
                      href={item.href}
                      className="flex min-h-14 items-center text-lg font-semibold aria-[current=page]:text-teal-600"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ) : (
                  <li key={item.id}>
                    <details className="group">
                      <summary className="flex min-h-14 list-none items-center justify-between text-lg font-semibold">
                        {item.label}
                        <Icon
                          name="chevron-down"
                          className="size-5 transition-transform duration-(--duration-fast) group-open:rotate-180"
                        />
                      </summary>
                      <div className="flex flex-col gap-4 pb-4">
                        <MobileSubLink link={item.overview} />
                        {item.sections.map((section) => (
                          <div key={section.title} className="flex flex-col gap-1">
                            {item.sections.length > 1 ? (
                              <p className="px-3 text-eyebrow text-teal-600 uppercase">
                                {section.title}
                              </p>
                            ) : null}
                            <ul className="flex flex-col gap-1">
                              {section.links.map((link) => (
                                <li key={link.href}>
                                  <MobileSubLink link={link} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="sticky bottom-0 flex flex-col gap-3 border-t border-line bg-white px-4 pt-4 pb-safe sm:px-6">
            <ButtonLink href={cta.href} size="lg" icon="arrow-right">
              {cta.label}
            </ButtonLink>
            {phone ? (
              <ButtonLink href={`tel:${phone.e164}`} variant="secondary" leadingIcon="phone">
                Call {phone.display}
              </ButtonLink>
            ) : null}
            <span aria-hidden="true" className="h-1" />
          </div>
        </div>
      </dialog>
    </>
  );
}

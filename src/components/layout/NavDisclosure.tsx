"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { isActivePath } from "@/lib/active-path";
import { cx } from "@/lib/cx";

/**
 * Desktop dropdown using the disclosure pattern (a button that shows/hides a region of links).
 * This is the WAI-ARIA recommendation for site navigation — not role="menu", which is meant
 * for application menus and changes keyboard expectations.
 *
 * Opens on click/Enter/Space (works the same for mouse, touch and keyboard). Closes on Escape
 * (returning focus to the button), on a click outside, when focus leaves, when a link inside is
 * chosen, and on navigation. The panel's links are server-rendered children, so they are in the
 * HTML for crawlers even while hidden.
 */
interface NavDisclosureProps {
  readonly label: string;
  /** Section roots that mark this menu as the current section, e.g. ["/services"]. */
  readonly activeHrefs: readonly string[];
  readonly children: ReactNode;
}

export function NavDisclosure({ label, activeHrefs, children }: NavDisclosureProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const active = activeHrefs.some((href) => isActivePath(pathname, href));

  // Close after navigation (state derived from the pathname, no effect needed).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      onBlur={(event) => {
        // Tabbing out of the button + panel closes it. (A null relatedTarget means focus went
        // nowhere, e.g. a click on panel padding — the outside-click handler covers real exits.)
        const next = event.relatedTarget;
        if (next && !rootRef.current?.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cx(
          "group nav-underline inline-flex min-h-11 items-center gap-1.5 rounded-input px-3 text-button font-medium hdr-fg",
          active && "font-semibold",
        )}
      >
        {label}
        <Icon
          name="chevron-down"
          className={cx(
            "size-4 transition-transform duration-(--duration-fast)",
            open && "rotate-180",
          )}
        />
      </button>
      {/* Positioned against the sticky header, so the panel spans the full header width. */}
      <div
        id={panelId}
        hidden={!open}
        // Choosing a link closes the panel even when it points at the current page.
        onClickCapture={(event) => {
          if ((event.target as Element).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-full border-t border-line bg-white shadow-raised"
      >
        {children}
      </div>
    </div>
  );
}

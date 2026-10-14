"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { isActivePath } from "@/lib/active-path";

/**
 * Navigation link that marks the current section with aria-current, which also drives the
 * active style (`aria-[current=page]:` utilities). Only the active-state lookup needs the
 * client; the link itself is a normal next/link.
 */
interface NavLinkProps {
  readonly href: string;
  readonly className?: string;
  readonly children: ReactNode;
  /** Exact match only (for overview links whose children are separate entries). */
  readonly exact?: boolean;
}

export function NavLink({ href, className, children, exact = false }: NavLinkProps) {
  const pathname = usePathname();
  // An in-page anchor (/products#flags) is a section of a page, never the current page.
  const active = !href.includes("#") && (exact ? pathname === href : isActivePath(pathname, href));
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={className}>
      {children}
    </Link>
  );
}

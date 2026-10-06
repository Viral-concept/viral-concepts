import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * One link component for the whole site:
 * - root-relative paths ("/services") → next/link (client navigation + prefetch)
 * - tel:, mailto: and in-page anchors → plain <a>
 * - other absolute URLs → <a> opening in a new tab, with safe rel attributes and a
 *   screen-reader hint
 */

export interface AppLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> {
  readonly href: string;
  readonly children: ReactNode;
}

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function isSameDocumentOrProtocol(href: string): boolean {
  return href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:");
}

export function AppLink({ href, children, ...rest }: AppLinkProps) {
  if (isInternal(href)) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  if (isSameDocumentOrProtocol(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

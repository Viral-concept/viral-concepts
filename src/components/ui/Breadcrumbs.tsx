import { cx } from "@/lib/cx";

import { AppLink } from "./AppLink";
import { Icon } from "./Icon";

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is generated from the same
 * `items` in the SEO stage, so the two cannot disagree.
 * The last item is the current page: rendered as text with aria-current, not as a link.
 */
export interface BreadcrumbItem {
  readonly label: string;
  readonly href: string;
}

interface BreadcrumbsProps {
  readonly items: readonly BreadcrumbItem[];
  readonly inverse?: boolean;
  readonly className?: string;
}

export function Breadcrumbs({ items, inverse = false, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cx(
          "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm",
          inverse ? "text-white/80" : "text-muted",
        )}
      >
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isCurrent ? (
                <span
                  aria-current="page"
                  className={cx("font-medium", inverse ? "text-white" : "text-ink")}
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <AppLink
                    href={item.href}
                    className="inline-flex min-h-6 items-center underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </AppLink>
                  <Icon name="chevron-right" className="size-3.5 opacity-60" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

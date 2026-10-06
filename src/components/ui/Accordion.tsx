import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import { Icon } from "./Icon";

/**
 * Disclosure list built on native <details>/<summary>:
 * - keyboard and screen-reader support come from the browser
 * - works without JavaScript, ships none
 * - collapsed answers stay in the HTML, so search engines and in-page search can read them
 *   (Chrome/Edge/Firefox auto-open a <details> when find-in-page matches inside it)
 *
 * `name` groups items so only one stays open at a time where supported.
 *
 * Titles are plain text, not headings: <summary> behaves as a button, whose children are
 * presentational, so a heading inside it would lose its role anyway.
 */
export interface AccordionItem {
  readonly id: string;
  readonly title: string;
  readonly content: ReactNode;
  /** Shown beside the title, e.g. a preview review flag. */
  readonly badge?: ReactNode;
}

interface AccordionProps {
  readonly items: readonly AccordionItem[];
  /** Only one item open at a time. */
  readonly exclusive?: boolean;
  readonly groupName?: string;
  readonly className?: string;
}

export function Accordion({
  items,
  exclusive = false,
  groupName = "accordion",
  className,
}: AccordionProps) {
  return (
    <div className={cx("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.id} name={exclusive ? groupName : undefined} className="group">
          <summary className="flex min-h-14 list-none items-center justify-between gap-6 py-4 text-left">
            <span className="flex flex-col items-start gap-2">
              {item.badge}
              <span className="text-lg leading-snug font-semibold text-ink">{item.title}</span>
            </span>
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-tint text-teal-800 transition-transform duration-(--duration-base) ease-(--ease-brand) group-open:rotate-45"
            >
              <Icon name="plus" className="size-4.5" />
            </span>
          </summary>
          <div className="max-w-prose pb-6 text-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

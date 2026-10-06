import type { CSSProperties } from "react";

import { cx } from "@/lib/cx";

/**
 * Infinite ticker (CSS only). The list is rendered twice; the copy is hidden from assistive
 * technology so screen readers hear each item once. Pauses on hover; static with reduced motion.
 */
interface MarqueeProps {
  readonly items: readonly string[];
  readonly label: string;
  readonly className?: string;
  /** Seconds per full loop. */
  readonly duration?: number;
}

function Row({
  items,
  hidden = false,
}: {
  readonly items: readonly string[];
  readonly hidden?: boolean;
}) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 pr-8 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden="true" className="inline-block size-2 rotate-45 bg-yellow-400" />
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ items, label, className, duration = 48 }: MarqueeProps) {
  return (
    <div
      role="region"
      aria-label={label}
      data-ambient=""
      className={cx("overflow-hidden fade-edges-x", className)}
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <Row items={items} />
        <Row items={items} hidden />
      </div>
    </div>
  );
}

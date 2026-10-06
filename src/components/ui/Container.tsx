import type { ElementType, ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * Horizontal page frame. Gutters: 16px mobile, 24px tablet, 32px desktop.
 * - content (1280px): default for page sections
 * - wide (1440px): full-bleed-feeling media grids
 * - prose (768px): long-form text
 */
export type ContainerSize = "content" | "wide" | "prose";

const widths: Record<ContainerSize, string> = {
  content: "max-w-content",
  wide: "max-w-wide",
  prose: "max-w-prose",
};

interface ContainerProps {
  readonly children: ReactNode;
  readonly size?: ContainerSize;
  readonly as?: ElementType;
  readonly className?: string;
}

export function Container({
  children,
  size = "content",
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag className={cx("mx-auto w-full px-4 sm:px-6 lg:px-8", widths[size], className)}>
      {children}
    </Tag>
  );
}

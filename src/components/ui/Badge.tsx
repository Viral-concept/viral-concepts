import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * Small label for categories, locations and service tags.
 * - neutral: teal text on tint (light backgrounds)
 * - outline: bordered, for chips in dense lists
 * - inverse: on images or dark backgrounds
 * - review:  marks content that is visible only in preview builds
 */
export type BadgeTone = "neutral" | "outline" | "inverse" | "review";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-tint text-teal-800",
  outline: "border border-line-strong bg-white text-teal-800",
  inverse: "bg-ink/75 text-white backdrop-blur-sm",
  review: "bg-yellow-400 text-ink",
};

interface BadgeProps {
  readonly children: ReactNode;
  readonly tone?: BadgeTone;
  readonly className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs leading-tight font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

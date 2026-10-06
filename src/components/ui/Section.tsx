import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { SectionTone } from "@/types/ui";

import { Container, type ContainerSize } from "./Container";

/**
 * Page section with consistent vertical rhythm and background tone.
 * `data-tone` lets descendants adapt (e.g. focus ring colour on dark backgrounds).
 *
 * Pass `labelledBy` with the id of the section's heading so assistive technology exposes the
 * section as a named region.
 */
export type { SectionTone };
export type SectionSpacing = "default" | "compact" | "none";

const tones: Record<SectionTone, string> = {
  light: "bg-white text-ink",
  surface: "bg-surface text-ink",
  dark: "bg-ink text-white",
  brand: "bg-teal-800 text-white",
  night: "bg-night text-white",
};

const spacing: Record<SectionSpacing, string> = {
  default: "py-16 sm:py-20 lg:py-28",
  compact: "py-12 sm:py-14 lg:py-16",
  none: "",
};

interface SectionProps {
  readonly children: ReactNode;
  readonly tone?: SectionTone;
  readonly spacing?: SectionSpacing;
  readonly container?: ContainerSize | false;
  readonly labelledBy?: string;
  readonly id?: string;
  /** Decorative hexagon grid behind the content. */
  readonly pattern?: boolean;
  readonly className?: string;
}

export function Section({
  children,
  tone = "light",
  spacing: space = "default",
  container = "content",
  labelledBy,
  id,
  pattern = false,
  className,
}: SectionProps) {
  const isDark = tone === "dark" || tone === "brand" || tone === "night";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={isDark ? "dark" : "light"}
      className={cx(
        "relative isolate",
        tones[tone],
        spacing[space],
        pattern && (isDark ? "bg-hex-grid-dark" : "bg-hex-grid"),
        className,
      )}
    >
      {container === false ? children : <Container size={container}>{children}</Container>}
    </section>
  );
}

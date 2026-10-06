import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import { Diamond } from "./BrandMotifs";

/**
 * Eyebrow + title (+ yellow diamond) + intro, the standard opening of every section.
 *
 * `level` keeps the heading hierarchy correct: pages own exactly one h1 (usually in their
 * hero), and every section header below it is an h2 unless nested.
 */
interface SectionHeaderProps {
  readonly title: ReactNode;
  readonly id?: string;
  readonly eyebrow?: string;
  readonly intro?: ReactNode;
  readonly level?: 1 | 2 | 3;
  readonly align?: "start" | "center";
  /** Light text for dark/brand sections. */
  readonly inverse?: boolean;
  readonly className?: string;
}

const titleSize = { 1: "text-h1", 2: "text-h2", 3: "text-h3" } as const;

export function SectionHeader({
  title,
  id,
  eyebrow,
  intro,
  level = 2,
  align = "start",
  inverse = false,
  className,
}: SectionHeaderProps) {
  const Heading = `h${level}` as const;
  const centered = align === "center";

  return (
    <header
      className={cx(
        "flex max-w-3xl flex-col gap-4",
        centered && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cx(
            "font-sans text-eyebrow uppercase",
            inverse ? "text-cyan-300" : "text-teal-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className={cx(titleSize[level], inverse ? "text-white" : "text-ink")}>
        {title}
        <Diamond className="ml-[0.12em]" />
      </Heading>
      {intro ? (
        <div className={cx("text-lead", inverse ? "text-white/85" : "text-muted")}>{intro}</div>
      ) : null}
    </header>
  );
}

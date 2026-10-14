import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import { Accent } from "./Accent";

/**
 * Eyebrow + title + intro, the standard opening of every section.
 *
 * - The eyebrow is the expanded "ticket stub" label with a short rule before it.
 * - String titles may mark accent words with *asterisks* (rendered in the serif italic).
 * - `size="statement"` sets the title in the condensed poster style (text-h1) instead of the
 *   sentence-case section title (text-h2).
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
  readonly size?: "title" | "statement";
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
  size = "title",
  inverse = false,
  className,
}: SectionHeaderProps) {
  const Heading = `h${level}` as const;
  const centered = align === "center";

  return (
    <header
      className={cx(
        "flex max-w-3xl flex-col gap-5",
        centered && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cx(
            "flex items-center gap-3 text-eyebrow uppercase",
            inverse ? "text-yellow-400" : "text-teal-800",
          )}
        >
          <span
            aria-hidden="true"
            className={cx("h-px w-8", inverse ? "bg-yellow-400" : "bg-teal-800")}
          />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cx(
          size === "statement" ? "text-h1" : titleSize[level],
          inverse ? "text-white" : "text-ink",
        )}
      >
        {typeof title === "string" ? <Accent text={title} /> : title}
      </Heading>
      {intro ? (
        <div className={cx("text-lead", inverse ? "text-white/80" : "text-muted")}>{intro}</div>
      ) : null}
    </header>
  );
}

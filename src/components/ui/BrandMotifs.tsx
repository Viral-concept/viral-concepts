import { cx } from "@/lib/cx";

/**
 * Graphic devices from the Company Profile, used sparingly and always decoratively.
 */

/** Yellow diamond used as the "full stop" after section titles. */
export function Diamond({ className }: { readonly className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("inline-block size-[0.32em] rotate-45 bg-yellow-400 align-baseline", className)}
    />
  );
}

/** Short cyan rule under titles, echoing the underline bars in the Company Profile. */
export function TitleRule({ className }: { readonly className?: string }) {
  return (
    <span aria-hidden="true" className={cx("block h-1 w-16 rounded-full bg-cyan-400", className)} />
  );
}

/** Three-colour bar (ink / cyan / yellow) that closes every Company Profile page. */
export function TricolourBar({ className }: { readonly className?: string }) {
  return (
    <div aria-hidden="true" className={cx("grid h-1.5 grid-cols-3", className)}>
      <span className="bg-ink" />
      <span className="bg-cyan-400" />
      <span className="bg-yellow-400" />
    </div>
  );
}

/** Large outlined hexagon used as a faint watermark behind hero or CTA content. */
export function HexWatermark({ className }: { readonly className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 115.5"
      className={cx("pointer-events-none absolute -z-10", className)}
    >
      <path
        d="M50 2 98 29.9v55.7L50 113.5 2 85.6V29.9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}

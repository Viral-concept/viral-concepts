import { cx } from "@/lib/cx";

/**
 * A statement whose words darken from muted to ink as they scroll up the screen — reading
 * paced by scrolling. CSS scroll-driven (each word on its own view timeline); browsers without
 * support, reduced-motion users and crawlers get the plain sentence. Both the start colour
 * (muted, 6.4:1) and the end colour pass WCAG AA, so no state is ever hard to read.
 */
export function ScrollHighlight({
  text,
  className,
}: {
  readonly text: string;
  readonly className?: string;
}) {
  const words = text.split(" ");
  return (
    <p className={cx("scroll-highlight", className)}>
      {words.map((word, index) => (
        <span key={index}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

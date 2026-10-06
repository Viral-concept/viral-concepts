import { cx } from "@/lib/cx";

/**
 * Ambient light for dark sections: soft brand-coloured glows drifting slowly (transform-only,
 * compositor-friendly) and a hairline grid. Decorative; sits behind content.
 * `tone` biases the colour: events (warm yellow), digital (cool cyan) or both.
 */
interface AuroraProps {
  readonly tone?: "both" | "events" | "digital";
  readonly grid?: boolean;
  readonly className?: string;
}

export function Aurora({ tone = "both", grid = true, className }: AuroraProps) {
  return (
    <div
      aria-hidden="true"
      data-ambient=""
      className={cx("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {tone !== "events" ? (
        <div className="aurora-glow -top-1/4 -right-1/5 size-[46rem] max-w-none glow-cyan" />
      ) : null}
      <div className="aurora-glow top-1/3 -left-1/4 size-[40rem] max-w-none aurora-glow-b glow-teal" />
      {tone !== "digital" ? (
        <div className="aurora-glow right-1/4 -bottom-1/3 size-[34rem] max-w-none glow-yellow" />
      ) : null}
      {grid ? <div className="absolute inset-0 bg-hairline-grid" /> : null}
    </div>
  );
}

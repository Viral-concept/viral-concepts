import { type CSSProperties, useId } from "react";

import { cx } from "@/lib/cx";

/**
 * Event-energy artwork for cards that have no approved photo yet: three stage-light beams over
 * a lit floor. Beams sway gently and widen when the card is hovered (CSS, transform-only).
 * `hue` picks the light colour; `variant` changes the beam angles so a row of cards is varied.
 */
interface StageLightsProps {
  readonly hue?: "warm" | "cool" | "mixed";
  readonly variant?: number;
  readonly className?: string;
}

const HUES = {
  warm: ["var(--color-yellow-400)", "var(--color-yellow-400)", "var(--color-cyan-300)"],
  cool: ["var(--color-cyan-400)", "var(--color-cyan-300)", "var(--color-teal-500)"],
  mixed: ["var(--color-cyan-400)", "var(--color-yellow-400)", "var(--color-cyan-300)"],
} as const;

export function StageLights({ hue = "mixed", variant = 0, className }: StageLightsProps) {
  const uid = useId().replace(/:/g, "");
  const colors = HUES[hue];
  const angles = [
    [-18, 4, 22],
    [-26, -6, 14],
    [-12, 10, 28],
  ][variant % 3] ?? [-18, 4, 22];
  const xs = [22, 50, 78];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-ambient=""
      viewBox="0 0 100 75"
      preserveAspectRatio="xMidYMid slice"
      className={cx("stage-lights size-full", className)}
    >
      <defs>
        {colors.map((color, i) => (
          <linearGradient key={i} id={`${uid}-b${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.85" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        ))}
        <radialGradient id={`${uid}-floor`} cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor={colors[1]} stopOpacity="0.35" />
          <stop offset="100%" stopColor={colors[1]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="75" fill={`url(#${uid}-floor)`} />
      {xs.map((x, i) => (
        <g
          key={i}
          className="stage-beam"
          style={
            {
              "--beam": `${angles[i]}deg`,
              "--beam-i": i,
              transformOrigin: `${x}% 0`,
            } as CSSProperties
          }
        >
          <polygon
            points={`${x - 1.2},0 ${x + 1.2},0 ${x + 13},75 ${x - 13},75`}
            fill={`url(#${uid}-b${i})`}
            style={{ mixBlendMode: "screen" }}
          />
          <circle cx={x} cy="1" r="1.6" fill={colors[i]} />
        </g>
      ))}
    </svg>
  );
}

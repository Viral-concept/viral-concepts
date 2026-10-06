"use client";

import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/cx";

/**
 * Animated statistic.
 *
 * The final value is server-rendered, so search engines, no-JS visitors, print and screen
 * readers always get the real number. The counter is only reset to zero when it comes within
 * ARM_MARGIN of the viewport (so the reset is never seen and the page never shows zeros at
 * rest), then counts up once it is visible. Never animates with prefers-reduced-motion.
 * The animated digits are aria-hidden; a visually hidden copy carries the accessible text.
 */
interface StatCounterProps {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly inverse?: boolean;
}

const DURATION_MS = 1400;
const ARM_MARGIN = "0px 0px 240px 0px";
const formatter = new Intl.NumberFormat("en");

export function StatCounter({ value, suffix, label, inverse = false }: StatCounterProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: show the final value, no animation.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const visible = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        visible.disconnect();
        animate();
      },
      { threshold: 0.6 },
    );

    const approaching = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        approaching.disconnect();
        setDisplay(0);
        visible.observe(node);
      },
      { rootMargin: ARM_MARGIN },
    );
    approaching.observe(node);

    return () => {
      approaching.disconnect();
      visible.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="flex flex-col gap-1">
      <p
        ref={ref}
        className={cx(
          "font-display text-5xl leading-none font-bold tabular-nums sm:text-6xl",
          inverse ? "text-white" : "text-teal-800",
        )}
      >
        <span aria-hidden="true">
          {formatter.format(display)}
          {suffix}
        </span>
        <span className="sr-only">
          {formatter.format(value)}
          {suffix} {label}
        </span>
      </p>
      <p aria-hidden="true" className={inverse ? "text-white/85" : "text-muted"}>
        {label}
      </p>
    </div>
  );
}

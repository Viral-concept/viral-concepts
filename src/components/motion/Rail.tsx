"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/**
 * Horizontal card rail with scroll snapping: swipe on touch, trackpad or Shift+wheel on desktop,
 * drag with the mouse, arrow buttons, and keyboard (the rail is focusable; ←/→ scroll it).
 * Native scrolling does the work — the script only adds buttons and mouse dragging, and it
 * never moves on its own. Without JavaScript the rail still scrolls.
 */
interface RailProps {
  readonly label: string;
  readonly children: ReactNode;
  /** Classes for the list (gap, padding). Items set their own widths. */
  readonly className?: string;
  /** Buttons on dark backgrounds. */
  readonly inverse?: boolean;
}

export function Rail({ label, children, className, inverse = false }: RailProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const page = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  const button = cx(
    "grid size-12 place-items-center rounded-full border transition-[background-color,border-color,opacity] duration-(--duration-base) disabled:cursor-default disabled:opacity-35",
    inverse
      ? "border-white/30 text-white hover:enabled:border-white hover:enabled:bg-white/10"
      : "border-line-strong text-ink hover:enabled:border-teal-600 hover:enabled:bg-tint",
  );

  return (
    <div className="flex flex-col gap-6">
      <ul
        ref={ref}
        tabIndex={0}
        aria-label={label}
        className={cx(
          "scrollbar-none flex snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain sm:scroll-px-6 lg:scroll-px-8",
          "cursor-grab active:cursor-grabbing",
          className,
        )}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || !ref.current) return;
          drag.current = { x: event.clientX, left: ref.current.scrollLeft, moved: false };
          ref.current.style.scrollSnapType = "none";
        }}
        onPointerMove={(event) => {
          const state = drag.current;
          if (!state || !ref.current) return;
          const dx = event.clientX - state.x;
          if (Math.abs(dx) > 4) state.moved = true;
          ref.current.scrollLeft = state.left - dx;
        }}
        onPointerUp={() => {
          if (ref.current) ref.current.style.scrollSnapType = "";
          window.setTimeout(() => (drag.current = null), 0);
        }}
        onPointerLeave={() => {
          if (!drag.current || !ref.current) return;
          ref.current.style.scrollSnapType = "";
          drag.current = null;
        }}
        // A drag must not count as a click on the card underneath.
        onClickCapture={(event) => {
          if (drag.current?.moved) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        {children}
      </ul>
      <div className="flex items-center justify-end gap-3">
        <button type="button" className={button} onClick={() => page(-1)} disabled={edges.start}>
          <Icon name="chevron-left" className="size-5" />
          <span className="sr-only">Previous</span>
        </button>
        <button type="button" className={button} onClick={() => page(1)} disabled={edges.end}>
          <Icon name="chevron-right" className="size-5" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}

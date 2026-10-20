"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/**
 * The homepage hero's stage: full-screen photographs ("scenes") that cross-fade with a slow
 * camera drift, stage beams, film grain and a soft spotlight that follows the pointer. The
 * hero's text is passed in as children and rendered on top.
 *
 * - The first scene is the LCP image and loads eagerly; later scenes load one step ahead,
 *   after the page has loaded, so they never compete with the first paint.
 * - The sequence pauses while the hero is off screen or the tab is hidden, starts paused
 *   with reduced motion, and always has a visible pause/play control (WCAG 2.2.2).
 * - The scene index lets visitors jump to a scene; the photos themselves are decorative
 *   (the index names what each one shows).
 */
export interface Scene {
  readonly id: string;
  readonly label: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

interface HeroScenesProps {
  readonly scenes: readonly Scene[];
  readonly children: ReactNode;
  /** Milliseconds each scene stays on screen. */
  readonly interval?: number;
}

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(callback: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function HeroScenes({ scenes, children, interval = 6500 }: HeroScenesProps) {
  const [active, setActive] = useState(0);
  // null: follow the visitor's motion preference (reduced motion starts paused).
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  const userPaused = userChoice ?? reduced;
  const [ready, setReady] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const count = scenes.length;
  const paused = userPaused || !onScreen || !tabVisible;

  // Later scenes wait for the page to finish loading.
  useEffect(() => {
    const start = () => setReady(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 600);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry?.isIntersecting ?? true),
      {
        threshold: 0.05,
      },
    );
    observer.observe(element);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || !ready || count < 2) return;
    const id = window.setTimeout(() => setActive((index) => (index + 1) % count), interval);
    return () => window.clearTimeout(id);
  }, [active, paused, ready, count, interval]);

  // Spotlight follows the pointer (fine pointers only), throttled to one update per frame.
  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const element = rootRef.current;
    if (!element) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--spot-x", `${clientX - rect.left}px`);
      element.style.setProperty("--spot-y", `${clientY - rect.top}px`);
      element.style.setProperty("--spot-o", "1");
    });
  }, []);
  const onPointerLeave = useCallback(() => {
    rootRef.current?.style.setProperty("--spot-o", "0");
  }, []);

  const current = scenes[active];

  return (
    <div
      ref={rootRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-scenes-paused={paused ? "" : undefined}
      data-ambient=""
      className="relative isolate flex min-h-svh flex-col"
      style={{ "--scene-ms": `${interval}ms` } as CSSProperties}
    >
      {/* Scenes */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden bg-stage">
        {scenes.map((scene, index) => {
          const load =
            index === 0 || (ready && (index <= active + 1 || index === (active + 1) % count));
          return (
            <div key={scene.id} className="scene" data-active={index === active ? "" : undefined}>
              {load ? (
                <Image
                  src={scene.src}
                  alt=""
                  fill
                  sizes="100vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  className="object-cover"
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Light, shade and grain over the photographs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 shade-cinema" />
        <span className="hero-beam left-[8%]" />
        <span className="hero-beam hero-beam-cool left-[58%]" />
        <div className="cursor-spotlight" />
        <div className="grain absolute inset-0" />
      </div>

      {children}

      {/* Scene index: what is on stage now, with controls. */}
      <div className="relative border-t border-white/15 bg-stage/30 backdrop-blur-[2px]">
        <div className="mx-auto flex w-full max-w-content items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setUserChoice(!userPaused)}
            aria-label={userPaused ? "Play the hero slideshow" : "Pause the hero slideshow"}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-yellow-400 hover:text-yellow-400"
          >
            <Icon name={userPaused ? "play" : "pause"} className="size-4" />
          </button>

          <ol
            className="hidden flex-1 gap-4 md:grid"
            style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
            aria-label="Scenes"
          >
            {scenes.map((scene, index) => (
              <li key={scene.id}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={index === active ? "true" : undefined}
                  className={cx(
                    "group flex min-h-11 w-full flex-col justify-center gap-2 text-left transition-colors",
                    index === active ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  <span className="flex items-baseline gap-2 text-sm font-semibold">
                    <span className="font-display text-xs font-semibold text-yellow-400 [font-stretch:125%]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{scene.label}</span>
                  </span>
                  <span className="relative h-px w-full overflow-hidden bg-white/20">
                    {/* Re-keyed per scene so the fill restarts each time. */}
                    <span
                      key={index === active ? `on-${active}` : "off"}
                      data-active={index === active ? "" : undefined}
                      className="scene-progress absolute inset-0 bg-yellow-400"
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* Phones: the current scene's name and dots. */}
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3 md:hidden">
            <p className="truncate text-sm font-semibold text-white" aria-live="off">
              <span className="mr-2 font-display text-xs text-yellow-400 [font-stretch:125%]">
                {String(active + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
              </span>
              {current?.label}
            </p>
            <ol className="flex shrink-0 gap-1" aria-label="Scenes">
              {scenes.map((scene, index) => (
                <li key={scene.id}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Scene ${index + 1}: ${scene.label}`}
                    aria-current={index === active ? "true" : undefined}
                    className="grid size-7 place-items-center"
                  >
                    <span
                      className={cx(
                        "block h-1.5 rounded-full transition-[width,background-color] duration-(--duration-slow)",
                        index === active ? "w-5 bg-yellow-400" : "w-1.5 bg-white/50",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div aria-hidden="true" className="hidden items-center gap-3 pl-4 lg:flex">
            <span className="text-eyebrow text-white/70 uppercase">Scroll</span>
            <span className="scroll-cue" />
          </div>
        </div>
      </div>
    </div>
  );
}

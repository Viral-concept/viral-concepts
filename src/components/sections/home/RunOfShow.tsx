"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef } from "react";

import { cx } from "@/lib/cx";

/**
 * "Run of show": the Company Profile's nine-step process told as a show in five acts.
 *
 * On large screens (and without reduced motion) the section pins to the viewport and the
 * acts slide sideways as the page scrolls — the visitor walks through the production. The
 * scroll position drives one CSS variable (`--ros`, 0 → 1); everything that moves is a
 * transform. Elsewhere the acts simply stack.
 */
export interface RunOfShowAct {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly image: { readonly src: string };
  readonly steps: readonly { readonly id: string; readonly title: string; readonly body: string }[];
}

interface RunOfShowProps {
  readonly header: ReactNode;
  readonly acts: readonly RunOfShowAct[];
  /** The step the Company Profile highlights (Approval). */
  readonly highlight?: string;
}

export function RunOfShow({ header, acts, highlight }: RunOfShowProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track) return;

    const wide = window.matchMedia("(min-width: 64rem)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let distance = 0;
    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      if (!active) return;
      const top = section.getBoundingClientRect().top;
      const progress = distance > 0 ? Math.min(1, Math.max(0, -top / distance)) : 0;
      section.style.setProperty("--ros", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      active = wide.matches && !calm.matches;
      section.toggleAttribute("data-pinned", active);
      if (!active) {
        section.style.removeProperty("height");
        section.style.removeProperty("--ros");
        section.style.removeProperty("--ros-distance");
        return;
      }
      distance = Math.max(0, track.scrollWidth - stage.clientWidth);
      section.style.setProperty("--ros-distance", `${distance}px`);
      section.style.height = `calc(100svh + ${distance}px)`;
      update();
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });
    wide.addEventListener("change", measure);
    calm.addEventListener("change", measure);
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      wide.removeEventListener("change", measure);
      calm.removeEventListener("change", measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Steps are numbered across the whole show (01–09).
  const offsets = acts.map((_, index) =>
    acts.slice(0, index).reduce((sum, act) => sum + act.steps.length, 0),
  );

  return (
    <div ref={sectionRef} className="group/ros relative">
      <div
        ref={stageRef}
        className="flex flex-col gap-12 overflow-hidden py-20 group-data-pinned/ros:sticky group-data-pinned/ros:top-0 group-data-pinned/ros:h-svh group-data-pinned/ros:justify-center group-data-pinned/ros:gap-10 group-data-pinned/ros:pt-[calc(var(--header-h)+1rem)] group-data-pinned/ros:pb-6 sm:py-24"
      >
        <div className="mx-auto flex w-full max-w-content flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          {header}
          {/* Progress through the show (pinned mode only). */}
          <div
            aria-hidden="true"
            className="hidden w-64 shrink-0 flex-col gap-3 group-data-pinned/ros:flex"
          >
            <div className="flex justify-between text-eyebrow text-white/60 uppercase">
              <span>Act I</span>
              <span>Encore</span>
            </div>
            <span className="relative h-px w-full bg-white/20">
              <span className="ros-meter absolute inset-0 bg-yellow-400" />
            </span>
          </div>
        </div>

        <ol
          ref={trackRef}
          className="ros-track flex flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:gap-6 lg:px-8 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {acts.map((act, actIndex) => (
            <li
              key={act.id}
              className="group relative flex shrink-0 flex-col overflow-hidden rounded-media border border-white/12 bg-night-soft lg:w-[min(40rem,64vw)] lg:flex-row"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-[46%]">
                <Image
                  src={act.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 300px, 100vw"
                  className="object-cover transition-[scale] duration-[1400ms] ease-(--ease-brand) group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute inset-0 opacity-70 shade-floor" />
                <span className="absolute bottom-4 left-5 font-display text-sm font-semibold tracking-[0.2em] text-yellow-400 uppercase [font-stretch:125%]">
                  {act.label}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
                <h3 className="text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] leading-[0.9] font-extrabold text-white uppercase [font-stretch:72%]">
                  {act.title}
                </h3>
                <ol className="flex flex-col gap-5">
                  {act.steps.map((step, stepIndex) => {
                    const stepNumber = (offsets[actIndex] ?? 0) + stepIndex + 1;
                    const lit = step.id === highlight;
                    return (
                      <li key={step.id} className="flex gap-4">
                        <span
                          className={cx(
                            "grid size-9 shrink-0 place-items-center rounded-full font-display text-xs font-bold [font-stretch:110%]",
                            lit ? "bg-yellow-400 text-ink" : "border border-white/25 text-white",
                          )}
                        >
                          {String(stepNumber).padStart(2, "0")}
                        </span>
                        <span className="flex flex-col gap-1 pt-1">
                          <span className="font-semibold text-white">{step.title}</span>
                          <span className="text-sm text-white/70">{step.body}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
                {actIndex === acts.length - 1 ? null : (
                  <span
                    aria-hidden="true"
                    className="mt-auto hidden h-px w-full bg-linear-to-r from-yellow-400/60 to-transparent lg:block"
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

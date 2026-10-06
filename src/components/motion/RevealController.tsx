"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives every `.reveal` element on the page with one IntersectionObserver (see globals.css).
 *
 * Order matters: elements already on screen are marked visible *before* `rv-ready` is set on
 * <html>, so nothing that is visible at load ever blinks out. Only then are the rest hidden,
 * to animate in as they scroll into view. Runs again after every client-side navigation.
 * With reduced motion, nothing is hidden or animated.
 *
 * It also pauses ambient loops (`[data-ambient]`: glows, the network, tickers) while they are
 * off screen, to save battery and main-thread time on long pages.
 */
const SELECTOR = ".reveal:not(.is-in)";

export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const viewport = window.innerHeight;
    for (const element of document.querySelectorAll(SELECTOR)) {
      const { top, bottom } = element.getBoundingClientRect();
      if (
        top < viewport &&
        bottom > 0 &&
        !document.documentElement.classList.contains("rv-ready")
      ) {
        element.classList.add("is-in");
      } else {
        observer.observe(element);
      }
    }
    document.documentElement.classList.add("rv-ready");

    // Pause ambient loops while they are off screen (see [data-paused] in globals.css).
    const ambient = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          target.toggleAttribute("data-paused", !isIntersecting);
        }
      },
      { rootMargin: "200px 0px" },
    );
    for (const element of document.querySelectorAll("[data-ambient]")) ambient.observe(element);

    return () => {
      observer.disconnect();
      ambient.disconnect();
    };
  }, [pathname]);

  return null;
}

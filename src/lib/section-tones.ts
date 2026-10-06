import type { SectionTone } from "@/types/ui";

/**
 * Assigns alternating light/surface backgrounds to the sections a page actually renders.
 *
 * Sections without content (unconfirmed stats, projects, testimonials …) are left out of the
 * page, so tones cannot be hard-coded: two neighbours would end up the same colour. Sections
 * with a fixed tone (brand/dark bands) keep it and do not break the alternation.
 */
export interface PageBlock<Key extends string = string> {
  readonly key: Key;
  readonly fixedTone?: SectionTone;
}

export function assignTones<Key extends string>(
  blocks: readonly PageBlock<Key>[],
  first: "light" | "surface" = "light",
): { readonly key: Key; readonly tone: SectionTone }[] {
  let next: "light" | "surface" = first;
  return blocks.map((block) => {
    if (block.fixedTone) return { key: block.key, tone: block.fixedTone };
    const tone = next;
    next = next === "light" ? "surface" : "light";
    return { key: block.key, tone };
  });
}

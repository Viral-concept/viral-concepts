import { Fragment, type ReactNode } from "react";

import { assignTones } from "@/lib/section-tones";
import type { SectionTone } from "@/types/ui";

/**
 * Renders a page's sections in order. Pages pass `false`/`undefined` for sections that have no
 * content in this deployment; the remaining sections alternate light/surface backgrounds, and
 * sections with a fixed tone (brand/dark bands) keep it.
 */
export interface PageBlock {
  readonly key: string;
  readonly fixedTone?: SectionTone;
  readonly render: (tone: SectionTone) => ReactNode;
}

interface PageBlocksProps {
  readonly blocks: readonly (PageBlock | false | undefined)[];
  /** Tone of the first alternating section (pick the one that contrasts with the hero). */
  readonly first?: "light" | "surface";
}

export function PageBlocks({ blocks, first = "light" }: PageBlocksProps) {
  const visible = blocks.filter((block): block is PageBlock => Boolean(block));
  const tones = assignTones(visible, first);
  return visible.map((block, index) => (
    <Fragment key={block.key}>{block.render(tones[index]?.tone ?? "light")}</Fragment>
  ));
}

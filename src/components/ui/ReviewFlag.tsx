import { reviewLabel } from "@/lib/publishing";
import type { Governed } from "@/types/content";

import { Badge } from "./Badge";

/**
 * Marks an item that is only visible because this is a preview build. Renders nothing for
 * publishable content, so it is safe to place on every card and page hero.
 */
export function ReviewFlag({
  item,
  className,
}: {
  readonly item: Governed;
  readonly className?: string;
}) {
  const label = reviewLabel(item);
  if (!label) return null;
  return (
    <Badge tone="review" className={className}>
      {label}
    </Badge>
  );
}

import { Icon } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cx } from "@/lib/cx";
import type { Governed } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/**
 * A short list of benefits (title + one sentence each): "Why Viral Concepts" on the homepage,
 * "Why it matters" on service pages.
 */
export interface FeatureItem {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

interface FeatureListProps {
  readonly tone: SectionTone;
  /** Unique per page; used for the heading id. */
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly items: readonly FeatureItem[];
  /** Flags the whole list in preview builds when its copy is not yet publishable. */
  readonly reviewItem?: Governed;
}

export function FeatureList({ tone, id, eyebrow, title, items, reviewItem }: FeatureListProps) {
  const headingId = `${id}-title`;
  const dark = tone === "dark" || tone === "brand" || tone === "night";
  return (
    <Section tone={tone} labelledBy={headingId}>
      {reviewItem ? <ReviewFlag item={reviewItem} className="mb-4" /> : null}
      <SectionHeader id={headingId} eyebrow={eyebrow} title={title} inverse={dark} />
      <ul
        className={cx(
          "mt-12 grid gap-4 reveal-stagger sm:grid-cols-2 sm:gap-5",
          items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        )}
      >
        {items.map((item, index) => (
          <li key={item.id} className="reveal">
            <div
              className={cx(
                "group glow-border relative flex h-full flex-col gap-5 overflow-hidden rounded-media border p-7",
                "transition-[translate,box-shadow,background-color] duration-(--duration-slow) ease-(--ease-brand) hover:-translate-y-1",
                dark
                  ? "border-white/12 bg-white/[0.04] hover:bg-white/[0.07]"
                  : "border-line bg-white shadow-card hover:shadow-raised",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-full bg-yellow-400 text-ink transition-[rotate,scale] duration-(--duration-slow) ease-(--ease-brand) group-hover:scale-110 group-hover:-rotate-6"
                >
                  <Icon name="check" className="size-6" />
                </span>
                <span
                  aria-hidden="true"
                  className={cx(
                    "font-display text-sm font-semibold tracking-[0.2em]",
                    dark ? "text-white/60" : "text-teal-600",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className={cx("text-h3", dark ? "text-white" : "text-ink")}>{item.title}</h3>
              <p className={dark ? "text-white/75" : "text-muted"}>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

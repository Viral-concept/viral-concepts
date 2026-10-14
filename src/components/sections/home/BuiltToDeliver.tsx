import { Accent } from "@/components/ui/Accent";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import type { Reason } from "@/content/home";
import { cx } from "@/lib/cx";
import type { SectionTone } from "@/types/ui";

/**
 * Why clients trust Viral Concepts with a big day: four promises from the Company Profile,
 * set as a programme of numbered columns with large numerals.
 */
interface BuiltToDeliverProps {
  readonly tone: SectionTone;
  readonly eyebrow: string;
  readonly title: string;
  readonly reasons: readonly Reason[];
}

export function BuiltToDeliver({ tone, eyebrow, title, reasons }: BuiltToDeliverProps) {
  const dark = tone === "dark" || tone === "night" || tone === "brand";
  return (
    <Section tone={tone} labelledBy="built-to-deliver-title">
      <div className="flex max-w-3xl flex-col gap-5">
        <p
          className={cx(
            "flex items-center gap-3 text-eyebrow uppercase reveal",
            dark ? "text-yellow-400" : "text-teal-800",
          )}
        >
          <span
            aria-hidden="true"
            className={cx("h-px w-8", dark ? "bg-yellow-400" : "bg-teal-800")}
          />
          {eyebrow}
        </p>
        <h2
          id="built-to-deliver-title"
          className={cx("text-h1 reveal", dark ? "text-white" : "text-ink")}
        >
          <Accent text={title} />
        </h2>
      </div>
      <ol
        className={cx(
          "mt-14 grid gap-px overflow-hidden rounded-media border reveal-stagger sm:grid-cols-2",
          reasons.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
          dark ? "border-white/12 bg-white/12" : "border-line-strong bg-line-strong",
        )}
      >
        {reasons.map((reason, index) => (
          <li
            key={reason.id}
            className={cx(
              "group relative flex flex-col gap-5 p-7 reveal transition-colors duration-(--duration-slow) sm:p-8",
              dark ? "bg-night hover:bg-night-soft" : "bg-white hover:bg-tint",
            )}
          >
            <span
              aria-hidden="true"
              className={cx(
                "font-display text-7xl leading-none font-extrabold text-outline [font-stretch:72%] transition-colors duration-(--duration-slow)",
                dark
                  ? "[--outline-color:var(--color-yellow-400)] group-hover:text-yellow-400"
                  : "[--outline-color:var(--color-teal-800)] group-hover:text-teal-800",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <ReviewFlag item={reason} className="self-start" />
            <h3 className={cx("text-h3", dark ? "text-white" : "text-ink")}>{reason.title}</h3>
            <p className={dark ? "text-white/75" : "text-muted"}>{reason.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

import { HIGHLIGHTED_PROCESS_STEP, processSteps } from "@/content/process";
import { cx } from "@/lib/cx";

/**
 * The Company Profile's nine-step process as an ordered list.
 * Layout: vertical timeline on mobile, 3×3 grid on tablet, single row from 1280px.
 * "Approval" is highlighted in yellow, as in the profile (CP p.34).
 */
export function ProcessSteps({ className }: { readonly className?: string }) {
  return (
    <ol
      className={cx(
        "relative grid gap-3 reveal-stagger sm:grid-cols-3 sm:gap-4 xl:grid-cols-9 xl:gap-2",
        className,
      )}
    >
      {/* Progress rail: fills as the section scrolls through the screen (vertical on phones). */}
      <li
        aria-hidden="true"
        className="process-rail pointer-events-none absolute top-6 bottom-6 left-6 w-px bg-line-strong sm:hidden xl:top-[2.75rem] xl:right-[5.5%] xl:bottom-auto xl:left-[5.5%] xl:block xl:h-px xl:w-auto"
      >
        <span className="process-rail-fill absolute inset-0 bg-yellow-400" />
      </li>
      {processSteps.map((step, index) => {
        const highlighted = step.id === HIGHLIGHTED_PROCESS_STEP;
        return (
          <li
            key={step.id}
            className={cx(
              "group relative flex items-center gap-4 rounded-card p-3 reveal sm:flex-col sm:items-start sm:gap-3 sm:p-5 xl:items-center xl:bg-transparent xl:px-2 xl:text-center xl:shadow-none",
              highlighted
                ? "bg-yellow-400 text-ink xl:bg-transparent"
                : "bg-white text-ink sm:shadow-card",
            )}
          >
            <span
              className={cx(
                "relative z-10 grid size-12 shrink-0 place-items-center rounded-full font-display text-lg font-bold",
                "transition-[scale,box-shadow] duration-(--duration-slow) ease-(--ease-brand) group-hover:scale-110",
                highlighted
                  ? "bg-ink text-yellow-400 xl:bg-yellow-400 xl:text-ink xl:shadow-[0_0_0_8px_color-mix(in_oklab,var(--color-yellow-400)_25%,transparent)]"
                  : "bg-teal-800 text-white",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-semibold">{step.title}</span>
          </li>
        );
      })}
    </ol>
  );
}

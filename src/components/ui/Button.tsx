import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "@/lib/cx";

import { AppLink, type AppLinkProps } from "./AppLink";
import { Icon, type IconName } from "./Icon";

/**
 * Buttons and button-styled links share one style function, so a CTA looks identical whether
 * it navigates (ButtonLink) or performs an action (Button). Links navigate; buttons act.
 *
 * `className` is for placement only (margin, flex/grid sizing, self-alignment). Never pass
 * display or visibility utilities (`hidden`, `md:inline-flex`): the button always sets its own
 * display, and without class merging the two would conflict. Wrap the button instead.
 *
 * Variants
 * - primary:   yellow fill, ink text (8.7:1). The main CTA, at most one per section.
 * - secondary: teal outline on light backgrounds.
 * - inverse:   white outline on dark backgrounds.
 * - quiet:     text-only link style with an arrow, for tertiary actions.
 * - quietInverse: the quiet style on dark backgrounds (white text; cyan fails AA on teal-800).
 */

export type ButtonVariant = "primary" | "secondary" | "inverse" | "quiet" | "quietInverse";
export type ButtonSize = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,translate] duration-(--duration-fast) ease-(--ease-brand) " +
  "disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "btn-shine rounded-full bg-yellow-400 text-ink shadow-card hover:-translate-y-px hover:shadow-raised active:translate-y-px",
  secondary:
    "rounded-full border-2 border-teal-800 text-teal-800 hover:bg-tint active:translate-y-px",
  inverse:
    "rounded-full border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white/12 active:translate-y-px",
  quiet: "text-teal-800 underline-offset-4 hover:underline",
  quietInverse: "text-white underline-offset-4 hover:underline",
};

/* Both sizes meet the 44px minimum touch target (WCAG 2.5.8 recommends ≥ 24px; we use 44). */
const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-button",
  lg: "min-h-13 px-7 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  const isQuiet = variant === "quiet" || variant === "quietInverse";
  return cx(base, variants[variant], isQuiet ? "min-h-11" : sizes[size]);
}

interface ContentProps {
  readonly children: ReactNode;
  /** Trailing icon. Defaults to an arrow for `quiet`, none otherwise. */
  readonly icon?: IconName;
  /** Leading icon, e.g. phone or chat. */
  readonly leadingIcon?: IconName;
}

function ButtonContent({ children, icon, leadingIcon }: ContentProps) {
  return (
    <>
      {leadingIcon ? <Icon name={leadingIcon} className="size-5 shrink-0" /> : null}
      <span>{children}</span>
      {icon ? (
        <Icon
          name={icon}
          className="size-4.5 shrink-0 transition-transform duration-(--duration-base) ease-(--ease-brand) group-hover:translate-x-1"
        />
      ) : null}
    </>
  );
}

type ButtonProps = ContentProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    readonly variant?: ButtonVariant;
    readonly size?: ButtonSize;
  };

export function Button({
  variant = "primary",
  size = "md",
  icon,
  leadingIcon,
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cx(buttonClasses(variant, size), className)} {...rest}>
      <ButtonContent icon={icon} leadingIcon={leadingIcon}>
        {children}
      </ButtonContent>
    </button>
  );
}

type ButtonLinkProps = ContentProps &
  Omit<AppLinkProps, "children"> & {
    readonly variant?: ButtonVariant;
    readonly size?: ButtonSize;
  };

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon = variant === "quiet" || variant === "quietInverse" ? "arrow-right" : undefined,
  leadingIcon,
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <AppLink className={cx(buttonClasses(variant, size), className)} {...rest}>
      <ButtonContent icon={icon} leadingIcon={leadingIcon}>
        {children}
      </ButtonContent>
    </AppLink>
  );
}

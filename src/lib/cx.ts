/**
 * Join class names, skipping falsy values.
 *
 * There is deliberately no class-conflict merging (no tailwind-merge dependency): components
 * own their visual styles through variants, and `className` props are for layout only
 * (margin, grid placement, width). Overriding a component's colours or padding from outside
 * is a sign a new variant is needed.
 */
export function cx(...classes: readonly (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

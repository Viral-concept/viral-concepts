/**
 * Brand colours for places that cannot read CSS variables (viewport theme colour,
 * generated Open Graph images, email templates). The CSS tokens in `src/app/globals.css`
 * are the primary definition; a unit test keeps the two in sync.
 */
export const brandColors = {
  ink: "#133239",
  teal800: "#1b5062",
  teal600: "#277c84",
  teal500: "#3592a6",
  cyan400: "#5ec2d5",
  /** Derived tint for small text on teal-800 (5.5:1) and ink (8.5:1). */
  cyan300: "#8fd8e6",
  teal200: "#81bec5",
  yellow400: "#ffc714",
  navy: "#151340",
  surface: "#f4f8f9",
  muted: "#4a5f66",
  white: "#ffffff",
  danger: "#b42318",
} as const;

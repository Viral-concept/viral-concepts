import type { SVGProps } from "react";

/**
 * Inline stroke icons (24×24 grid, 1.75 stroke). Kept local instead of an icon library: the
 * site needs a few dozen glyphs, and inline SVG ships no JavaScript.
 *
 * Icons are decorative by default (aria-hidden). Give the surrounding control an accessible
 * name; pass `title` only when the icon itself carries meaning with no adjacent text.
 */

const paths = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-up-right": "M7 17 17 7M8 7h9v9",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-right": "m9 6 6 6-6 6",
  "chevron-left": "m15 6-6 6 6 6",
  expand: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  chart: "M5 20v-8M12 20V5M19 20v-5M3 20h18",
  code: "m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  spark:
    "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9ZM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  plus: "M12 5v14M5 12h14",
  check: "m5 12.5 4.5 4.5L19 7",
  phone:
    "M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  "map-pin":
    "M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2",
  chat: "M4 19.5 5.4 15A8 8 0 1 1 9 18.6L4 19.5Z",
  download: "M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14",
  external: "M14 5h5v5M19 5l-8 8M18 14v5H5V6h5",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  cart: "M3 4h2l2.4 11h10.2L20 8H6.2M9 20h.01M17 20h.01",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6l1-7Z",
  send: "M4 12 20 4l-6 16-3-7-7-1Z",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  play: "M8 5.5v13l10.5-6.5L8 5.5Z",
  pause: "M8.5 5.5v13M15.5 5.5v13",
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  readonly name: IconName;
  /** Accessible name when the icon stands alone and carries meaning. */
  readonly title?: string;
}

export function Icon({ name, title, className, ...rest }: IconProps) {
  const labelled = title !== undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-5 shrink-0"}
      aria-hidden={labelled ? undefined : true}
      role={labelled ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {labelled ? <title>{title}</title> : null}
      <path d={paths[name]} />
    </svg>
  );
}

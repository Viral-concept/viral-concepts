import { Fragment, type ReactNode } from "react";

/**
 * Editorial accents in copy: words wrapped in asterisks render as <em>, which headlines style
 * as Instrument Serif italic (see "Type voice" in globals.css).
 *
 *   <Accent text="We create *experiences*, not just events." />
 *
 * Use `plainText()` wherever the same copy goes somewhere without markup (metadata, aria).
 */
const MARK = /\*([^*]+)\*/g;

export function Accent({ text }: { readonly text: string }): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(MARK)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(<em key={index}>{match[1]}</em>);
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
}

export function plainText(text: string): string {
  return text.replace(MARK, "$1");
}

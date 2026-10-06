import Image from "next/image";

import { brandAssets } from "@/content/brand-assets";
import { cx } from "@/lib/cx";

/**
 * Brand lockup. `color` for light backgrounds, `white` for dark ones.
 * Height is set by the caller (e.g. "h-9"); width follows the intrinsic aspect ratio.
 * Pass `eager` only where the logo is above the fold on first paint (the header).
 * (`priority` is deprecated in Next.js 16.)
 */
interface LogoProps {
  readonly variant?: "color" | "white";
  readonly className?: string;
  readonly eager?: boolean;
  /** A visual duplicate of a logo that is already announced (empty alt). */
  readonly decorative?: boolean;
}

export function Logo({
  variant = "color",
  className,
  eager = false,
  decorative = false,
}: LogoProps) {
  const asset = variant === "white" ? brandAssets.logoWhite : brandAssets.logo;
  return (
    <Image
      src={asset.src}
      alt={decorative ? "" : asset.alt}
      width={asset.width}
      height={asset.height}
      loading={eager ? "eager" : "lazy"}
      sizes="(min-width: 1024px) 200px, 160px"
      className={cx("h-9 w-auto", className)}
    />
  );
}

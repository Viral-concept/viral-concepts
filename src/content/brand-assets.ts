import type { ImageAsset } from "@/types/content";

import { companyProfile } from "./sources";

/**
 * Brand image registry. Logos are raster extracts from the supplied artwork; replace with the
 * client's vector files when provided (checklist #13) — only `src`, `width` and `height` change.
 */
export const brandAssets = {
  logo: {
    src: "/images/brand/viral-concepts-logo.png",
    alt: "Viral Concepts",
    width: 692,
    height: 154,
    kind: "brand",
    status: "live",
    verified: true,
    source: companyProfile(1),
  },
  logoWhite: {
    src: "/images/brand/viral-concepts-logo-white.png",
    alt: "Viral Concepts",
    width: 658,
    height: 146,
    kind: "brand",
    status: "live",
    verified: true,
    source: companyProfile(1),
  },
} as const satisfies Record<string, ImageAsset>;

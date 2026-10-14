import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { brandColors } from "@/config/brand";

/**
 * Shared Open Graph / social card renderer (1200×630), used by every `opengraph-image.tsx`.
 *
 * Text only, on the brand teal: no photo, because no photo is approved for publication yet and
 * a social card must never show an unapproved image. Fonts are static instances of the site's
 * own OFL fonts (src/assets/og), since the renderer cannot read variable woff2 files.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const assets = join(process.cwd(), "src/assets/og");
const fonts = Promise.all([
  readFile(join(assets, "outfit-bold.ttf")),
  readFile(join(assets, "inter-medium.ttf")),
]);
const logo = readFile(
  join(process.cwd(), "public/images/brand/viral-concepts-logo-white.png"),
).then((data) => `data:image/png;base64,${data.toString("base64")}`);

/** Long titles step down in size so they always fit on three lines. */
function titleSize(title: string): number {
  if (title.length <= 32) return 76;
  if (title.length <= 56) return 64;
  return 52;
}

export async function renderOgImage({
  eyebrow,
  title,
}: {
  readonly eyebrow: string;
  readonly title: string;
}): Promise<ImageResponse> {
  const [[outfit, inter], logoSrc] = await Promise.all([fonts, logo]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: brandColors.teal800,
        color: brandColors.white,
        fontFamily: "Inter",
        position: "relative",
      }}
    >
      {/* Brand hexagon outline, as on the Company Profile cover. */}
      <svg
        width="520"
        height="600"
        viewBox="0 0 260 300"
        style={{ position: "absolute", right: -120, top: 40 }}
      >
        <path
          d="M130 6 L254 78 L254 222 L130 294 L6 222 L6 78 Z"
          fill="none"
          stroke={brandColors.teal500}
          strokeOpacity="0.45"
          strokeWidth="14"
        />
      </svg>

      <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
        <img src={logoSrc} width={329} height={73} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 72,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: brandColors.cyan300,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            maxWidth: 900,
            fontFamily: "Outfit",
            fontSize: titleSize(title.replace(/\*/g, "")),
            lineHeight: 1.08,
            letterSpacing: -1.5,
          }}
        >
          {title.replace(/\*/g, "")}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            padding: "0 72px 36px",
            fontSize: 24,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          viralconcepts.co · Dubai · UAE · KSA · Qatar
        </div>
        <div style={{ display: "flex", height: 14 }}>
          <div style={{ flex: 1, backgroundColor: brandColors.ink }} />
          <div style={{ flex: 1, backgroundColor: brandColors.cyan400 }} />
          <div style={{ flex: 1, backgroundColor: brandColors.yellow400 }} />
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Outfit", data: outfit, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}

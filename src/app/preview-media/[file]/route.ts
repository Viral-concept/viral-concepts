import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { media } from "@/content/media";
import { getContentMode } from "@/lib/content";

/**
 * Serves the interim Company Profile photos (src/assets/interim) — in preview builds only.
 *
 * Every file is prerendered at build time when the content mode is preview. In production no
 * paths are generated and `dynamicParams = false`, so every URL under /preview-media is a 404:
 * unapproved photos cannot be fetched from the live site, even by guessing the address.
 */
export const dynamicParams = false;

const FILES = new Set(
  Object.values(media)
    .map((image) => image.src)
    .filter((src) => src.startsWith("/preview-media/"))
    .map((src) => src.slice("/preview-media/".length)),
);

export function generateStaticParams() {
  return getContentMode() === "preview" ? [...FILES].map((file) => ({ file })) : [];
}

export async function GET(_request: Request, { params }: RouteContext<"/preview-media/[file]">) {
  const { file } = await params;
  if (getContentMode() !== "preview" || !FILES.has(file)) {
    return new Response(null, { status: 404 });
  }
  const data = await readFile(join(process.cwd(), "src/assets/interim", file));
  return new Response(new Uint8Array(data), {
    headers: { "Content-Type": "image/jpeg", "X-Robots-Tag": "noindex" },
  });
}

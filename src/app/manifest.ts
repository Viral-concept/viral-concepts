import type { MetadataRoute } from "next";

import { brandColors } from "@/config/brand";
import { site } from "@/content/site";

/** Web app manifest: name, colours and the brand badge icons for "add to home screen". */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: brandColors.white,
    theme_color: brandColors.teal800,
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

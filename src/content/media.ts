import type { ImageAsset } from "@/types/content";

import { companyProfile } from "./sources";

/**
 * Interim photos extracted from the Company Profile PDF (src/assets/interim/).
 *
 * All are drafts: the PDF's embedded photos are low resolution (≈ 640–820px wide) and the
 * client has not confirmed which jobs they show or granted permission to name the brands
 * visible in them. They render only in preview builds, with a review flag. In production the
 * layouts fall back to brand panels until original, approved photos replace these entries.
 *
 * The files live outside public/ on purpose: everything in public/ is downloadable in production,
 * linked or not. They are served only by the /preview-media route, which exists in preview
 * builds alone, so production cannot serve them at any URL.
 *
 * Alt text describes what is visible without claiming a client relationship.
 */
function interim(
  file: string,
  alt: string,
  width: number,
  height: number,
  page: number,
): ImageAsset {
  return {
    src: `/preview-media/${file}`,
    alt,
    width,
    height,
    kind: "project-photo",
    status: "draft",
    verified: false,
    source: companyProfile(page),
  };
}

export const media = {
  /** CP p.1 rendered as an image. Shown with the PDF once the client approves its release. */
  companyProfileCover: {
    ...interim(
      "company-profile-cover.jpg",
      "Cover of the Viral Concepts company profile, with the Dubai skyline in line art",
      960,
      679,
      1,
    ),
    kind: "brand",
  },
  barrierBrandingMall: interim(
    "event-barrier-branding-mall.jpg",
    "Printed fabric barrier covers with Halloween artwork lining a mall entrance",
    819,
    642,
    30,
  ),
  barrierBrandingMarathon: interim(
    "event-barrier-branding-marathon.jpg",
    "Branded barrier cover for a marathon start area",
    818,
    380,
    30,
  ),
  exhibitionStandIlluminated: interim(
    "exhibition-stand-illuminated-header.jpg",
    "Exhibition stand with an illuminated overhead header and branded displays",
    699,
    359,
    17,
  ),
  exhibitionStallDesigner: interim(
    "exhibition-stall-designer-red-white.jpg",
    "Designer exhibition stall in white and red with a geometric patterned column",
    816,
    353,
    26,
  ),
  showroomFestiveLighting: interim(
    "showroom-festive-lighting.jpg",
    "Car showroom facade lit with festive light curtains at night",
    824,
    567,
    24,
  ),
  avEquipmentSetup: interim(
    "av-equipment-event-setup.jpg",
    "Video cameras on tripods set up in a decorated event hall",
    699,
    360,
    17,
  ),
  kidsOutdoorCinema: interim(
    "kids-outdoor-cinema-event.jpg",
    "Families on bean bags watching an outdoor cinema screen at an evening event",
    643,
    295,
    25,
  ),
  portableStallArabicTent: interim(
    "portable-exhibition-stall-arabic-tent.jpg",
    "Portable exhibition stall styled as a traditional Arabic tent",
    816,
    603,
    26,
  ),
} as const satisfies Record<string, ImageAsset>;

import type { ImageAsset } from "@/types/content";

import { clientSupplied } from "./sources";

/**
 * The client's own photographs of delivered work, supplied for the website (October 2026) and
 * optimised for the web (longest side ≤ 2000px, EXIF and location data removed). Files live in
 * public/images/work/<service>/. Alt text describes what is visible without naming clients.
 *
 * Gift-item photos are supplier product shots supplied with the brief; only images without
 * third-party watermarks or brand marks were used.
 */
function work(path: `${string}/${string}`, alt: string, width: number, height: number): ImageAsset {
  return {
    src: `/images/work/${path}.jpg`,
    alt,
    width,
    height,
    kind: "project-photo",
    status: "live",
    verified: true,
    source: clientSupplied("2026-10-20", "Service photos supplied by the client for the website"),
  };
}

export const workPhotos = {
  /* police-barriers */
  brandedBarriersMarathon: work(
    "police-barriers/branded-barriers-marathon",
    "Crowd-control barriers with printed branded covers lining a race route",
    2000,
    1500,
  ),
  barrierCoversRoute: work(
    "police-barriers/barrier-covers-route",
    "Branded barrier covers and fencing set up along an event route",
    2000,
    1500,
  ),
  barriersNight: work(
    "police-barriers/barriers-night",
    "Rows of barriers with printed covers around a venue at night",
    2000,
    1500,
  ),
  barrierCoversPalms: work(
    "police-barriers/barrier-covers-palms",
    "White printed barrier covers along a palm-lined road",
    2000,
    1500,
  ),
  barrierCoverYellow: work(
    "police-barriers/barrier-cover-yellow",
    "A crowd-control barrier wrapped in a printed yellow cover",
    1280,
    794,
  ),
  barrierCoverParks: work(
    "police-barriers/barrier-cover-parks",
    "A barrier wrapped in a printed cover for a public park event",
    1280,
    692,
  ),
  barrierCoverKids: work(
    "police-barriers/barrier-cover-kids",
    "A barrier cover printed with colourful artwork for a kids zone",
    1600,
    902,
  ),
  barrierCoversCrest: work(
    "police-barriers/barrier-covers-crest",
    "Barrier covers printed with an emblem along a footpath",
    2000,
    1500,
  ),
  barriersVenue: work(
    "police-barriers/barriers-venue",
    "Blue branded barrier covers outside an exhibition venue",
    1156,
    453,
  ),
  /* flags */
  streetFlags: work(
    "flags/street-flags",
    "Printed flags on poles lining both sides of a road at sunset",
    2000,
    1500,
  ),
  flagsSunset: work(
    "flags/flags-sunset",
    "A row of printed flags along a seafront road at dusk",
    2000,
    1500,
  ),
  featherFlags: work(
    "flags/feather-flags",
    "Colourful feather flags displayed in front of a building",
    1600,
    747,
  ),
  flagsEntrance: work(
    "flags/flags-entrance",
    "White printed flags at the entrance of an exhibition hall",
    1301,
    875,
  ),
  bladeFlagsDesert: work(
    "flags/blade-flags-desert",
    "Black blade flags installed at a desert event site",
    900,
    1600,
  ),
  flagsPalms: work(
    "flags/flags-palms",
    "Blue printed flags beside palm trees on a city road",
    1080,
    1440,
  ),
  flagsAvenue: work(
    "flags/flags-avenue",
    "Printed flags fitted to street poles along an avenue",
    1500,
    2000,
  ),
  /* tents */
  tentDusk: work(
    "tents/tent-dusk",
    "A large white peak tent lit up for an evening event",
    2000,
    1406,
  ),
  mediaCentreTent: work(
    "tents/media-centre-tent",
    "A branded marquee tent with barrier covers at an event site",
    2000,
    1500,
  ),
  peakTentsNight: work(
    "tents/peak-tents-night",
    "Branded peak tents set up for an outdoor event at night",
    2000,
    1500,
  ),
  pagodaTentsNight: work(
    "tents/pagoda-tents-night",
    "A line of pagoda tents illuminated at night",
    2000,
    1500,
  ),
  brandedGazebo: work(
    "tents/branded-gazebo",
    "A pop-up gazebo printed with event branding",
    868,
    1156,
  ),
  majlisTent: work(
    "tents/majlis-tent",
    "A traditional Arabic majlis tent set up with cushions and lanterns",
    1417,
    1063,
  ),
  tentWithBarriers: work(
    "tents/tent-with-barriers",
    "A marquee tent behind branded barrier covers",
    2000,
    2000,
  ),
  volunteersTent: work(
    "tents/volunteers-tent",
    "A branded peak tent set up as a volunteers area",
    2000,
    1500,
  ),
  cabinStructure: work(
    "tents/cabin-structure",
    "A branded portable cabin structure at an event site",
    2000,
    1500,
  ),
  /* furniture */
  banquetTables: work(
    "furniture/banquet-tables",
    "Long banquet tables with white cloths and chairs set outdoors",
    1280,
    960,
  ),
  roundTablesLawn: work(
    "furniture/round-tables-lawn",
    "Round dining tables and chairs set on a lawn for an event",
    1156,
    520,
  ),
  loungeSofasLawn: work(
    "furniture/lounge-sofas-lawn",
    "White lounge sofas and cubes arranged on a lawn",
    1280,
    720,
  ),
  loungeSeating: work(
    "furniture/lounge-seating",
    "White lounge armchairs and cubes on a red carpet",
    1600,
    702,
  ),
  banquetChairs: work(
    "furniture/banquet-chairs",
    "A banquet table with white chairs set on artificial grass",
    1080,
    1080,
  ),
  banquetSetup: work(
    "furniture/banquet-setup",
    "A dressed banquet table with white chairs on a paved terrace",
    1280,
    960,
  ),
  theatreSeating: work(
    "furniture/theatre-seating",
    "Theatre-style seating in rows facing a stage with a screen",
    1280,
    721,
  ),
  loungeTent: work(
    "furniture/lounge-tent",
    "White lounge furniture arranged inside an event tent",
    1600,
    900,
  ),
  outdoorBanquet: work(
    "furniture/outdoor-banquet",
    "Outdoor banquet tables and chairs set for a large gathering",
    1280,
    960,
  ),
  roundTable: work(
    "furniture/round-table",
    "A round table with white chairs in a garden",
    780,
    780,
  ),
  /* heras-fence */
  brandedFenceMarathon: work(
    "heras-fence/branded-fence-marathon",
    "Temporary fencing wrapped in printed race branding",
    2000,
    1500,
  ),
  fenceCoversWhite: work(
    "heras-fence/fence-covers-white",
    "Temporary fence panels wrapped in white printed covers",
    2000,
    1500,
  ),
  festivalFence: work(
    "heras-fence/festival-fence",
    "Temporary fencing wrapped in colourful festival graphics",
    1280,
    576,
  ),
  festivalFencePanels: work(
    "heras-fence/festival-fence-panels",
    "Printed fence wraps around a festival site",
    1280,
    576,
  ),
  printedFenceArt: work(
    "heras-fence/printed-fence-art",
    "A fence wrap printed with large illustrated artwork",
    1024,
    768,
  ),
  fenceInstall: work(
    "heras-fence/fence-install",
    "A team member installing printed fence wraps on site",
    1600,
    1200,
  ),
  fenceWrapLake: work(
    "heras-fence/fence-wrap-lake",
    "Temporary fencing wrapped in printed graphics by a lakeside venue",
    1280,
    576,
  ),
  fenceLineStage: work(
    "heras-fence/fence-line-stage",
    "A long line of branded fencing near an event stage",
    1280,
    576,
  ),
  fenceStage: work(
    "heras-fence/fence-stage",
    "Branded fencing around an outdoor stage area",
    1280,
    576,
  ),
  mallFenceGraphics: work(
    "heras-fence/mall-fence-graphics",
    "Printed fence graphics with seasonal artwork outside a mall",
    1024,
    768,
  ),
  /* festive */
  showroomNationalDay: work(
    "festive/showroom-national-day",
    "A showroom facade covered in festive curtain lights at night",
    2000,
    1500,
  ),
  showroomLights: work(
    "festive/showroom-lights",
    "A building lit with festive light curtains at night",
    2000,
    1500,
  ),
  showroomFacade: work(
    "festive/showroom-facade",
    "Festive lighting across a showroom facade at night",
    2000,
    1500,
  ),
  showroomCurve: work(
    "festive/showroom-curve",
    "A curved facade wrapped in festive lights in national colours",
    2000,
    1500,
  ),
  buildingLights: work(
    "festive/building-lights",
    "Festive light installation across a commercial building",
    2000,
    1114,
  ),
  lightsClose: work(
    "festive/lights-close",
    "Close view of festive light curtains in national colours",
    1024,
    648,
  ),
  showroomTricolour: work(
    "festive/showroom-tricolour",
    "A showroom entrance decorated with festive lights",
    1024,
    660,
  ),
  /* signage */
  lightBoxEntrance: work(
    "signage/light-box-entrance",
    "An illuminated light box sign marking event entrances",
    2000,
    1500,
  ),
  lightBoxAngle: work(
    "signage/light-box-angle",
    "An illuminated directional light box sign at night",
    2000,
    1500,
  ),
  lightBoxClose: work(
    "signage/light-box-close",
    "Close view of a printed, backlit light box sign",
    2000,
    1500,
  ),
  lightBoxNight: work(
    "signage/light-box-night",
    "A backlit light box sign standing at an event entrance",
    2000,
    1500,
  ),
  /* gifts */
  giftSetBlue: work(
    "gifts/gift-set-blue",
    "A corporate gift set with notebook, pen and flask in a box",
    640,
    640,
  ),
  giftSetGold: work(
    "gifts/gift-set-gold",
    "A gift box with flask, mouse and accessories",
    640,
    640,
  ),
  giftSetBlack: work(
    "gifts/gift-set-black",
    "A black corporate gift set with flask and pen",
    640,
    640,
  ),
  giftBoxes: work("gifts/gift-boxes", "Colourful presentation gift boxes", 640, 640),
  notebookSet: work(
    "gifts/notebook-set",
    "A notebook and flask gift set in a presentation box",
    637,
    640,
  ),
  notebookGreen: work(
    "gifts/notebook-green",
    "A green notebook gift set with pen and accessories",
    652,
    469,
  ),
  leatherSet: work(
    "gifts/leather-set",
    "Leather notebooks, wallets and card holders as gift sets",
    670,
    649,
  ),
  premiumPens: work("gifts/premium-pens", "A selection of premium metal pens", 750, 750),
  pensColours: work("gifts/pens-colours", "Metal pens in assorted colours", 741, 586),
  drinkwareGift: work(
    "gifts/drinkware-gift",
    "A drinkware gift set in a presentation box",
    640,
    560,
  ),
} as const satisfies Record<string, ImageAsset>;

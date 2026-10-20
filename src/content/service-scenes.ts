import type { ImageAsset } from "@/types/content";

import { eventPhotos } from "./event-photos";
import { workPhotos } from "./work-photos";

/**
 * Photographs for each service page. The first three sit beside the page's story; any more
 * appear in the page's "In the field" gallery.
 *
 * The client's own photos (content/work-photos.ts) are used wherever they were supplied.
 * Services without client photos yet fall back to licensed stock that sets the scene
 * (content/event-photos.ts) — never captioned as the company's own work, and never shown in
 * the gallery, which is for real jobs only (see `getServiceGallery`).
 */
export const serviceScenes: Readonly<Record<string, readonly ImageAsset[]>> = {
  "event-production-fabrication": [
    eventPhotos.banquetStage,
    eventPhotos.ledInstall,
    eventPhotos.soundDesk,
  ],
  exhibitions: [eventPhotos.exhibitionAerial, eventPhotos.designRender, eventPhotos.cncRouter],
  "festive-mall-decor": [
    workPhotos.showroomLights,
    workPhotos.showroomCurve,
    workPhotos.buildingLights,
    workPhotos.showroomFacade,
    workPhotos.lightsClose,
    workPhotos.showroomTricolour,
  ],
  "advertising-pr": [eventPhotos.tradeShow, eventPhotos.concertAerial, eventPhotos.planningTable],
  "event-rentals-entertainment": [
    workPhotos.loungeSofasLawn,
    workPhotos.pagodaTentsNight,
    workPhotos.barrierCoversRoute,
    workPhotos.theatreSeating,
    workPhotos.majlisTent,
    workPhotos.festivalFence,
  ],
  "furniture-rental": [
    workPhotos.roundTablesLawn,
    workPhotos.loungeSeating,
    workPhotos.banquetChairs,
    workPhotos.loungeSofasLawn,
    workPhotos.theatreSeating,
    workPhotos.banquetSetup,
    workPhotos.loungeTent,
    workPhotos.outdoorBanquet,
    workPhotos.roundTable,
  ],
  "tent-rental": [
    workPhotos.mediaCentreTent,
    workPhotos.majlisTent,
    workPhotos.brandedGazebo,
    workPhotos.peakTentsNight,
    workPhotos.pagodaTentsNight,
    workPhotos.tentWithBarriers,
    workPhotos.volunteersTent,
    workPhotos.cabinStructure,
  ],
  "heras-fence-rental": [
    workPhotos.festivalFence,
    workPhotos.printedFenceArt,
    workPhotos.fenceInstall,
    workPhotos.festivalFencePanels,
    workPhotos.fenceWrapLake,
    workPhotos.fenceLineStage,
    workPhotos.fenceStage,
    workPhotos.mallFenceGraphics,
  ],
  "police-barrier-rental": [
    workPhotos.barriersNight,
    workPhotos.barrierCoverYellow,
    workPhotos.barrierCoversRoute,
    workPhotos.barrierCoversPalms,
    workPhotos.barrierCoverParks,
    workPhotos.barrierCoverKids,
    workPhotos.barrierCoversCrest,
    workPhotos.barriersVenue,
  ],
  "mojo-barrier-rental": [
    eventPhotos.concertAerial,
    eventPhotos.laserShow,
    eventPhotos.stageConfetti,
  ],
  "branding-printing": [
    workPhotos.featherFlags,
    workPhotos.lightBoxAngle,
    workPhotos.fenceCoversWhite,
    workPhotos.printedFenceArt,
    workPhotos.barrierCoverKids,
    workPhotos.brandedGazebo,
  ],
  flags: [
    workPhotos.featherFlags,
    workPhotos.flagsEntrance,
    workPhotos.bladeFlagsDesert,
    workPhotos.flagsSunset,
    workPhotos.flagsPalms,
    workPhotos.flagsAvenue,
  ],
  "fabric-printing": [
    workPhotos.brandedFenceMarathon,
    workPhotos.barrierCoverKids,
    workPhotos.brandedGazebo,
    workPhotos.printedFenceArt,
    workPhotos.featherFlags,
    workPhotos.barrierCoverYellow,
    workPhotos.mallFenceGraphics,
  ],
  "print-solutions": [
    workPhotos.mallFenceGraphics,
    workPhotos.lightBoxClose,
    eventPhotos.printedStacks,
    workPhotos.printedFenceArt,
    workPhotos.barrierCoverParks,
  ],
  signage: [workPhotos.lightBoxAngle, workPhotos.lightBoxClose, workPhotos.lightBoxNight],
  "corporate-gifts": [
    workPhotos.giftSetBlue,
    workPhotos.giftSetGold,
    workPhotos.notebookGreen,
    workPhotos.giftSetBlack,
    workPhotos.giftBoxes,
    workPhotos.notebookSet,
    workPhotos.leatherSet,
    workPhotos.premiumPens,
    workPhotos.pensColours,
    workPhotos.drinkwareGift,
  ],
};

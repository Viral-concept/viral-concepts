import type { ImageAsset } from "@/types/content";

import { eventPhotos } from "./event-photos";

/**
 * Three supporting photographs per event service line, shown beside the page's story.
 * Licensed stock that sets the scene (see content/event-photos.ts) — never captioned as the
 * company's own projects. Replace with the client's approved photos as they arrive.
 */
export const serviceScenes: Readonly<Record<string, readonly ImageAsset[]>> = {
  "event-production-fabrication": [
    eventPhotos.banquetStage,
    eventPhotos.ledInstall,
    eventPhotos.soundDesk,
  ],
  "event-rentals-entertainment": [
    eventPhotos.outdoorCinema,
    eventPhotos.ballroom,
    eventPhotos.marathon,
  ],
  exhibitions: [eventPhotos.exhibitionAerial, eventPhotos.designRender, eventPhotos.cncRouter],
  "festive-mall-decor": [eventPhotos.festiveMall, eventPhotos.galaHall, eventPhotos.ballroom],
  "branding-printing": [eventPhotos.cncRouter, eventPhotos.welding, eventPhotos.marathon],
  "advertising-pr": [eventPhotos.tradeShow, eventPhotos.concertAerial, eventPhotos.planningTable],
};

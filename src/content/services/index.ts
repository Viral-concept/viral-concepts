import type { Service } from "@/types/content";

import { advertisingPr } from "./advertising-pr";
import { brandingPrinting } from "./branding-printing";
import { eventProductionFabrication } from "./event-production-fabrication";
import { eventRentalsEntertainment } from "./event-rentals-entertainment";
import { exhibitions } from "./exhibitions";
import { festiveMallDecor } from "./festive-mall-decor";
import { corporateGifts, fabricPrinting, flags, printSolutions, signage } from "./print";
import {
  furnitureRental,
  herasFenceRental,
  mojoBarrierRental,
  policeBarrierRental,
  tentRental,
} from "./rentals";

/**
 * Every service, one entry each: the six service lines from the Company Profile "Our Services"
 * page (CP p.6) plus the dedicated rental and branding & print pages the client asked for.
 * Every offering is listed in the CP on the cited pages; CP spelling errors are corrected.
 * Order here is the display order within each group (see content/pillars.ts).
 */
export const services = [
  // Events & production
  eventProductionFabrication,
  exhibitions,
  festiveMallDecor,
  advertisingPr,
  // Event rentals
  eventRentalsEntertainment,
  furnitureRental,
  tentRental,
  herasFenceRental,
  policeBarrierRental,
  mojoBarrierRental,
  // Branding & print
  brandingPrinting,
  flags,
  fabricPrinting,
  printSolutions,
  signage,
  corporateGifts,
] as const satisfies readonly Service[];

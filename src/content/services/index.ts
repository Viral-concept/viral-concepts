import type { Service } from "@/types/content";

import { eventProductionFabrication } from "./event-production-fabrication";
import { eventRentalsEntertainment } from "./event-rentals-entertainment";
import { exhibitions } from "./exhibitions";
import { festiveMallDecor } from "./festive-mall-decor";
import { brandingPrinting } from "./branding-printing";
import { advertisingPr } from "./advertising-pr";

/**
 * The six service lines from the Company Profile "Our Services" page (CP p.6), one file each.
 * Every offering is listed in the CP on the cited pages; CP spelling errors are corrected.
 * SEO fields follow the candidate keyword map (Discovery doc, section J) — volumes to be validated.
 * Order here is the display order.
 */
export const services = [
  eventProductionFabrication,
  eventRentalsEntertainment,
  exhibitions,
  festiveMallDecor,
  brandingPrinting,
  advertisingPr,
] as const satisfies readonly Service[];

import type { Stat } from "@/types/content";

import { companyProfile } from "./sources";

/**
 * Company Profile statistics (CP p.3). They conflict with the template (500+ projects,
 * 11+ years, 98% satisfaction), so all are held as drafts until the client confirms current
 * figures (checklist #6). The stats band does not render while none are publishable.
 * Years of experience is deliberately not a stat: the site says "Since 2014" instead.
 */
export const stats = [
  {
    id: "happy-clients",
    value: 300,
    suffix: "+",
    label: "Happy clients",
    status: "draft",
    verified: false,
    source: companyProfile(3),
  },
  {
    id: "successful-projects",
    value: 400,
    suffix: "+",
    label: "Successful projects",
    status: "draft",
    verified: false,
    source: companyProfile(3),
  },
  {
    id: "corporate-services",
    value: 45,
    suffix: "+",
    label: "Corporate services",
    status: "draft",
    verified: false,
    source: companyProfile(3),
  },
  {
    id: "office-locations",
    value: 2,
    suffix: "+",
    label: "Office locations",
    status: "draft",
    verified: false,
    source: companyProfile(3),
  },
] as const satisfies readonly Stat[];

import type { Governed } from "@/types/content";

import { proposed } from "../sources";

/**
 * Gate for digital page copy.
 *
 * The Company Profile gives the four digital services a single shared paragraph (CP p.23):
 * "solutions for clients across the gulf … complete Digital Marketing solutions including
 * Enterprise Web Solutions, Mobility Solutions and more". That is enough to list the services,
 * not enough for a page each without going beyond what the client has said. The Discovery doc
 * (section J) therefore marks their page copy "written after service confirmation".
 *
 * Page copy below is our draft. It is visible in preview builds for client review and stays out
 * of production until the client approves it. To publish a page: replace this gate with
 * `{ status: "live", verified: true, source: { kind: "client-confirmed", confirmedOn: "…" } }`.
 */
export const DRAFT_DIGITAL_COPY = {
  status: "proposed",
  verified: false,
  source: proposed(
    "Draft page copy for client approval (checklists #26, #27); goes beyond CP p.23",
  ),
} as const satisfies Governed;

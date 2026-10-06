import type { LeadFieldErrors, LeadValues } from "./schema";

/** What the Server Action returns to the form. Never contains anything secret. */
export type LeadFormState =
  | { readonly status: "idle" }
  | {
      readonly status: "error";
      readonly message: string;
      readonly fieldErrors?: LeadFieldErrors;
      /** Echoed back so the visitor never loses what they typed. */
      readonly values?: LeadValues;
    }
  | { readonly status: "success"; readonly firstName: string; readonly serviceLabel: string };

export const INITIAL_LEAD_STATE: LeadFormState = { status: "idle" };

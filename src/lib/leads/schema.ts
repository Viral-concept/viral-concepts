import * as z from "zod/mini";

/**
 * The lead form's single source of truth, shared by the browser (instant feedback) and the
 * Server Action (the real check — client validation is a convenience, never trusted).
 * Built on zod/mini to keep the client bundle small.
 */

export const LEAD_FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "service",
  "budget",
  "eventDate",
  "message",
] as const;
export type LeadField = (typeof LEAD_FIELDS)[number];

/** Hidden field real people never see or fill; bots that fill every input reveal themselves. */
export const HONEYPOT_FIELD = "website";
/** Field Cloudflare Turnstile adds to the form with its token. */
export const TURNSTILE_FIELD = "cf-turnstile-response";
/** Value of the service select when the visitor is unsure or needs something else. */
export const OTHER_SERVICE = "other";

/** Optional budget ranges on the form. Only these values are accepted by the server. */
export const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under AED 10k" },
  { value: "10k-50k", label: "AED 10k – 50k" },
  { value: "50k-150k", label: "AED 50k – 150k" },
  { value: "150k-plus", label: "AED 150k+" },
  { value: "unsure", label: "Not sure yet" },
] as const;
export type BudgetValue = (typeof BUDGET_OPTIONS)[number]["value"];

/** Display label for a budget value (the value itself if unknown). */
export function budgetLabel(value: string): string {
  return BUDGET_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

const budgetValues = BUDGET_OPTIONS.map((option) => option.value) as [
  BudgetValue,
  ...BudgetValue[],
];

export const LEAD_LIMITS = {
  name: 100,
  company: 120,
  email: 254,
  phone: 30,
  message: 5000,
  messageMin: 20,
} as const;

/**
 * Single-line fields end up in email subjects: no line breaks, control characters, Unicode line
 * separators or bidirectional overrides (which can disguise text).
 */
const singleLine = z.refine<string>(
  (value) => !/[\p{Cc}\u2028\u2029\u202A-\u202E\u2066-\u2069]/u.test(value),
  "Please use a single line of plain text.",
);

/** "2026-02-30" has the right shape but is not a day; round-tripping through Date catches it. */
function isRealDate(value: string): boolean {
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

/** Phone numbers: digits, spaces, +, -, ( ) — at least 7 digits, as typed in the UAE or abroad. */
const phonePattern = /^\+?[\d ()-]+$/;

export const leadSchema = z.object({
  name: z
    .string("Please enter your name.")
    .check(
      z.trim(),
      z.minLength(2, "Please enter your name."),
      z.maxLength(LEAD_LIMITS.name, "Please shorten your name."),
      singleLine,
    ),
  company: z.optional(
    z
      .string()
      .check(
        z.trim(),
        z.maxLength(LEAD_LIMITS.company, "Please shorten the company name."),
        singleLine,
      ),
  ),
  email: z
    .string("Please enter your email address.")
    .check(
      z.trim(),
      z.toLowerCase(),
      z.maxLength(LEAD_LIMITS.email, "Please check your email address."),
      z.email("Please enter a valid email address, like name@company.com."),
    ),
  phone: z.optional(
    z.string().check(
      z.trim(),
      z.maxLength(LEAD_LIMITS.phone, "Please check the phone number."),
      z.regex(phonePattern, "Please use digits, spaces and + only."),
      z.refine((value) => value.replace(/\D/g, "").length >= 7, "Please check the phone number."),
    ),
  ),
  service: z
    .string("Please choose what you need.")
    .check(z.trim(), z.minLength(1, "Please choose what you need."), z.maxLength(80)),
  budget: z.optional(z.enum(budgetValues, "Please choose one of the budget ranges.")),
  eventDate: z.optional(
    z
      .string()
      .check(
        z.regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a valid date."),
        z.refine(isRealDate, "Please choose a valid date."),
      ),
  ),
  message: z
    .string("Please tell us about your project.")
    .check(
      z.trim(),
      z.minLength(
        LEAD_LIMITS.messageMin,
        `Please tell us a little more (at least ${LEAD_LIMITS.messageMin} characters).`,
      ),
      z.maxLength(LEAD_LIMITS.message, "Please shorten your message."),
    ),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadFieldErrors = Partial<Record<LeadField, string>>;
export type LeadValues = Partial<Record<LeadField, string>>;

/** Read the lead fields from submitted form data; blank optional fields become undefined. */
export function leadValuesFromFormData(formData: FormData): LeadValues {
  const values: LeadValues = {};
  for (const field of LEAD_FIELDS) {
    const raw = formData.get(field);
    if (typeof raw === "string" && raw.trim() !== "") values[field] = raw;
  }
  return values;
}

export type LeadParseResult =
  | { readonly success: true; readonly lead: Lead }
  | { readonly success: false; readonly fieldErrors: LeadFieldErrors };

/**
 * Validate a submission. `allowedServices` is the list of service values this deployment
 * offers, so a forged value (or a hidden, unpublished service) is rejected.
 */
export function parseLead(values: LeadValues, allowedServices: readonly string[]): LeadParseResult {
  const result = leadSchema.safeParse(values);
  const fieldErrors: LeadFieldErrors = {};

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && (LEAD_FIELDS as readonly string[]).includes(field)) {
        fieldErrors[field as LeadField] ??= issue.message;
      }
    }
  }
  if (values.service && !allowedServices.includes(values.service.trim())) {
    fieldErrors.service ??= "Please choose what you need.";
  }

  if (result.success && Object.keys(fieldErrors).length === 0) {
    return { success: true, lead: result.data };
  }
  return { success: false, fieldErrors };
}

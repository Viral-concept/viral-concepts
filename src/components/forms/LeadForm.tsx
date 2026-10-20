"use client";

import { track } from "@vercel/analytics";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import { submitLead } from "@/app/contact/actions";
import { Field, Input, Textarea } from "@/components/forms/FormField";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import {
  BUDGET_OPTIONS,
  budgetLabel,
  HONEYPOT_FIELD,
  LEAD_LIMITS,
  leadValuesFromFormData,
  OTHER_SERVICE,
  parseLead,
  type LeadField,
  type LeadFieldErrors,
  type LeadValues,
} from "@/lib/leads/schema";
import { INITIAL_LEAD_STATE } from "@/lib/leads/state";
import type { ServiceOption } from "@/lib/leads/services";

/**
 * The enquiry form, in three short steps: what you need → the project → how to reach you.
 *
 * - Service and budget are chosen with large tappable chips (native radio buttons underneath,
 *   so keyboard, screen readers and plain form posts all work). The Events / Branding & Print switch is
 *   pure CSS (see `.lead-services` in globals.css), so it works before JavaScript loads.
 * - Validates in the browser with the same schema the server uses, for instant feedback; the
 *   Server Action validates again and is the only check that counts.
 * - Keeps everything typed when a submission fails, and moves focus to the error summary.
 * - Delivery: `live` (Resend + Turnstile), `test` (logged, labelled) or — on a deployed site
 *   without email keys — `handoffEmail`: the validated brief opens in the visitor's own email
 *   app, addressed to the company, with a copy button as a fallback. A brief is never lost.
 */
export interface LeadFormProps {
  readonly services: readonly ServiceOption[];
  readonly defaultService?: string | undefined;
  /** Turnstile site key; absent in test and hand-off modes, where the check is skipped. */
  readonly turnstileSiteKey?: string | undefined;
  readonly turnstileAction: string;
  readonly fallback: { readonly phone?: string | undefined; readonly email?: string | undefined };
  /** Test mode: enquiries are logged, not emailed. Shown as a visible label on the form. */
  readonly testMode?: boolean;
  /** Hand-off mode: no email delivery configured, so the brief goes via the visitor's email app. */
  readonly handoffEmail?: string | undefined;
  /** Linked under the form once the client's privacy policy is published. */
  readonly privacyHref?: string | undefined;
}

const DIVISIONS = [
  { id: "events", label: "Events & Rentals", group: "Events", icon: "spark" },
  { id: "print", label: "Branding & Print", group: "Branding & Print", icon: "expand" },
] as const satisfies readonly {
  id: string;
  label: string;
  group: ServiceOption["group"];
  icon: IconName;
}[];

/** Order in which invalid fields receive focus (the order they appear on the form). */
const FOCUS_ORDER: readonly LeadField[] = [
  "service",
  "budget",
  "message",
  "eventDate",
  "name",
  "company",
  "email",
  "phone",
];

/** Mail apps truncate very long mailto links; the copy button always has the full brief. */
const MAILTO_BODY_LIMIT = 1800;

function composeBrief(values: LeadValues, serviceLabel: string): string {
  return [
    `Service: ${serviceLabel}`,
    values.budget ? `Budget: ${budgetLabel(values.budget)}` : undefined,
    values.eventDate ? `Event date or deadline: ${values.eventDate}` : undefined,
    "",
    values.message?.trim() ?? "",
    "",
    `Name: ${values.name?.trim() ?? ""}`,
    values.company ? `Company: ${values.company.trim()}` : undefined,
    `Email: ${values.email?.trim() ?? ""}`,
    values.phone ? `Phone: ${values.phone.trim()}` : undefined,
  ]
    .filter((line): line is string => line !== undefined)
    .join("\n");
}

function StepHeading({ index, title, hint }: { index: number; title: string; hint?: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal-800 font-display text-sm font-bold text-yellow-400">
        {String(index).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-1 pt-1.5">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        {hint ? <p className="text-sm text-muted">{hint}</p> : null}
      </div>
    </div>
  );
}

const CHIP =
  "relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink select-none " +
  "transition-[background-color,border-color,color,translate] duration-(--duration-fast) hover:-translate-y-px hover:border-teal-600 " +
  "has-[:checked]:border-teal-800 has-[:checked]:bg-teal-800 has-[:checked]:text-white " +
  "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-600";

function Chip({
  name,
  value,
  defaultChecked,
  describedBy,
  children,
}: {
  readonly name: string;
  readonly value: string;
  readonly defaultChecked: boolean;
  readonly describedBy?: string | undefined;
  readonly children: ReactNode;
}) {
  return (
    <label className={cx("group", CHIP)}>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        aria-describedby={describedBy}
        className="sr-only"
      />
      <Icon name="check" className="hidden size-4 text-yellow-400 group-has-[:checked]:inline" />
      {children}
    </label>
  );
}

export function LeadForm({
  services,
  defaultService,
  turnstileSiteKey,
  turnstileAction,
  fallback,
  privacyHref,
  testMode = false,
  handoffEmail,
}: LeadFormProps) {
  const [state, formAction, pending] = useActionState(submitLead, INITIAL_LEAD_STATE);
  const [clientErrors, setClientErrors] = useState<LeadFieldErrors | null>(null);
  const [clientMessage, setClientMessage] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const [handoff, setHandoff] = useState<{ brief: string; href: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const errors = clientErrors ?? (state.status === "error" ? state.fieldErrors : undefined) ?? {};
  const message = clientMessage ?? (state.status === "error" ? state.message : null);
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const allowed = services.map((option) => option.value);
  const initialService = values.service ?? defaultService ?? "";
  const [chosen, setChosen] = useState(initialService);
  const [messageLength, setMessageLength] = useState(values.message?.length ?? 0);

  const labelFor = (value: string) =>
    services.find((option) => option.value === value)?.label ?? value;
  const initialDivision =
    DIVISIONS.find(
      (division) =>
        services.find((option) => option.value === initialService)?.group === division.group,
    )?.id ?? "events";

  // After the server answers, move focus where it helps (the widget resets itself on `state`).
  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") {
      successRef.current?.focus();
      track("Lead submitted");
    }
  }, [state]);

  useEffect(() => {
    if (handoff) successRef.current?.focus();
  }, [handoff]);

  function onChange(event: ChangeEvent<HTMLFormElement>) {
    const target = event.target as unknown as HTMLInputElement;
    if (target.name === "service") setChosen(target.value);
    if (target.name === "message") setMessageLength(target.value.length);
  }

  function focusField(field: LeadField) {
    if (field === "service" || field === "budget") {
      // The first radio of the group that is currently shown.
      const radios = document.querySelectorAll<HTMLInputElement>(`input[name="${field}"]`);
      const visible = [...radios].find((radio) => radio.closest("label")?.offsetParent !== null);
      visible?.focus();
      return;
    }
    document.getElementById(`lead-${field}`)?.focus();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const formValues = leadValuesFromFormData(new FormData(event.currentTarget));
    const result = parseLead(formValues, allowed);
    if (!result.success) {
      event.preventDefault();
      setClientErrors(result.fieldErrors);
      setClientMessage("Please check the highlighted fields.");
      const first = FOCUS_ORDER.find((field) => result.fieldErrors[field]);
      if (first) focusField(first);
      return;
    }
    if (handoffEmail) {
      event.preventDefault();
      const brief = composeBrief(formValues, labelFor(result.lead.service));
      const body =
        brief.length > MAILTO_BODY_LIMIT ? `${brief.slice(0, MAILTO_BODY_LIMIT)}…` : brief;
      const subject = `Website enquiry: ${labelFor(result.lead.service)} — ${result.lead.name}`;
      const href = `mailto:${handoffEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setClientErrors(null);
      setClientMessage(null);
      setHandoff({ brief, href });
      track("Lead handed to email app");
      window.location.href = href;
      return;
    }
    if (turnstileSiteKey && !hasToken) {
      event.preventDefault();
      setClientErrors(null);
      setClientMessage("Please complete the security check below, then send again.");
      summaryRef.current?.focus();
      return;
    }
    setClientErrors(null);
    setClientMessage(null);
  }

  async function copyBrief() {
    if (!handoff) return;
    try {
      await navigator.clipboard.writeText(handoff.brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (handoff) {
    return (
      <div className="flex flex-col gap-5 rounded-media border border-line bg-white p-8 shadow-card sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-yellow-400 text-ink">
          <Icon name="send" className="size-6" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="text-h3 text-ink focus:outline-none">
          Your brief is ready to send
        </h2>
        <p role="status" className="text-lead text-muted">
          Your email app should have opened with the brief addressed to {handoffEmail}. Just press
          send. If nothing opened, copy the brief and email it to us.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={handoff.href}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-yellow-400 px-6 font-semibold text-ink hover:bg-yellow-hover"
          >
            <Icon name="mail" className="size-5" />
            Open email again
          </a>
          <button
            type="button"
            onClick={copyBrief}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-semibold text-ink hover:border-teal-600"
          >
            <Icon name={copied ? "check" : "download"} className="size-5" />
            {copied ? "Copied" : "Copy brief"}
          </button>
        </div>
        {fallback.phone ? (
          <p className="text-muted">
            Prefer to talk? Call us on{" "}
            <AppLink
              href={`tel:${fallback.phone.replace(/\s/g, "")}`}
              className="font-semibold text-teal-800 underline"
            >
              {fallback.phone}
            </AppLink>
            .
          </p>
        ) : null}
      </div>
    );
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-6 rounded-media border border-line bg-white p-8 shadow-card sm:p-10">
        <span className="relative grid size-14 place-items-center rounded-full bg-yellow-400 text-ink">
          <span
            aria-hidden="true"
            className="vis-ring absolute inset-0 rounded-full border-2 border-yellow-400"
          />
          <Icon name="check" className="size-7" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="text-h2 text-ink focus:outline-none">
          {state.firstName ? `Thank you, ${state.firstName}.` : "Thank you."}
        </h2>
        <p role="status" className="text-lead text-muted">
          {state.serviceLabel
            ? `We’ve received your enquiry about ${state.serviceLabel}, and our team will get back to you.`
            : "We’ve received your enquiry, and our team will get back to you."}
        </p>
        {fallback.phone ? (
          <p className="border-t border-line pt-5 text-muted">
            If it’s urgent, call us on{" "}
            <AppLink
              href={`tel:${fallback.phone.replace(/\s/g, "")}`}
              className="font-semibold text-teal-800 underline"
            >
              {fallback.phone}
            </AppLink>
            .
          </p>
        ) : null}
      </div>
    );
  }

  // "call us on X or email Y", built from whichever channels exist.
  const reachUs = [
    fallback.phone ? `call us on ${fallback.phone}` : undefined,
    fallback.email ? `email ${fallback.email}` : undefined,
  ]
    .filter(Boolean)
    .join(" or ");

  const fieldError = (field: LeadField) => errors[field];
  const value = (field: LeadField) => values[field];
  const serviceErrorId = fieldError("service") ? "lead-service-error" : undefined;
  const budgetErrorId = fieldError("budget") ? "lead-budget-error" : undefined;
  const other = services.find((option) => option.value === OTHER_SERVICE);
  const chosenGroup = services.find((option) => option.value === chosen)?.group;

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
      aria-describedby={message ? "lead-summary" : undefined}
      className="relative flex flex-col gap-10 rounded-media border border-line bg-white p-6 shadow-raised sm:p-10"
    >
      {testMode ? (
        <p className="self-start rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-ink">
          Test mode: enquiries are logged, not emailed
        </p>
      ) : null}
      <div
        id="lead-summary"
        ref={summaryRef}
        tabIndex={-1}
        aria-live="assertive"
        className={
          message
            ? "-mb-4 rounded-card border-2 border-danger bg-white p-4 focus:outline-none"
            : "sr-only"
        }
      >
        {message ? (
          <p className="flex items-start gap-2 font-semibold text-danger">
            <Icon name="close" className="mt-0.5 size-5 shrink-0" />
            {message}
          </p>
        ) : null}
      </div>

      {/* 01 — What can we help with? */}
      <div className="flex flex-col gap-6">
        <StepHeading index={1} title="What can we help with?" hint="Pick the closest match." />
        <fieldset className="lead-services flex flex-col gap-4">
          <legend className="sr-only">Service you need (required)</legend>
          <fieldset className="grid grid-cols-2 gap-1 rounded-full bg-surface p-1">
            <legend className="sr-only">Area</legend>
            {DIVISIONS.map((division) => (
              <label
                key={division.id}
                className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-3 text-center text-sm font-semibold text-muted transition-colors has-[:checked]:bg-white has-[:checked]:text-ink has-[:checked]:shadow-card has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-teal-600"
              >
                <input
                  type="radio"
                  name="division"
                  value={division.id}
                  id={`lead-division-${division.id}`}
                  defaultChecked={division.id === initialDivision}
                  className="sr-only"
                />
                <Icon name={division.icon} className="hidden size-4 text-teal-600 sm:inline" />
                {division.label}
              </label>
            ))}
          </fieldset>

          {DIVISIONS.map((division) => {
            const options = services.filter((option) => option.group === division.group);
            if (options.length === 0) return null;
            return (
              <div key={division.id} data-division={division.id} className="flex flex-wrap gap-2.5">
                {options.map((option) => (
                  <Chip
                    key={option.value}
                    name="service"
                    value={option.value}
                    defaultChecked={option.value === initialService}
                    describedBy={serviceErrorId}
                  >
                    {option.label}
                  </Chip>
                ))}
              </div>
            );
          })}

          {other ? (
            <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
              <Chip
                name="service"
                value={other.value}
                defaultChecked={initialService === other.value}
                describedBy={serviceErrorId}
              >
                {other.label}
              </Chip>
            </div>
          ) : null}

          {/* When the chosen service sits in the other tab, say so. */}
          <p aria-live="polite" className="min-h-5 text-sm text-muted">
            {chosen ? (
              <>
                Selected: <strong className="text-ink">{labelFor(chosen)}</strong>
                {chosenGroup && chosenGroup !== "Other" ? ` · ${chosenGroup}` : ""}
              </>
            ) : null}
          </p>
          {fieldError("service") ? (
            <p id="lead-service-error" className="-mt-3 text-sm font-medium text-danger">
              {fieldError("service")}
            </p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-sm font-semibold text-ink">
            Rough budget <span className="font-normal text-muted">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {BUDGET_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                name="budget"
                value={option.value}
                defaultChecked={value("budget") === option.value}
                describedBy={budgetErrorId}
              >
                {option.label}
              </Chip>
            ))}
          </div>
          {fieldError("budget") ? (
            <p id="lead-budget-error" className="text-sm font-medium text-danger">
              {fieldError("budget")}
            </p>
          ) : null}
        </fieldset>
      </div>

      {/* 02 — The project */}
      <div className="flex flex-col gap-6 border-t border-line pt-10">
        <StepHeading
          index={2}
          title="Tell us about the project"
          hint="For an event: what, where, when and how many guests. For print: the product, size and quantity."
        />
        <Field
          id="lead-message"
          name="message"
          label="Your brief"
          required
          error={fieldError("message")}
        >
          {(control) => (
            <div className="relative">
              <Textarea
                {...control}
                rows={6}
                minLength={LEAD_LIMITS.messageMin}
                maxLength={LEAD_LIMITS.message}
                defaultValue={value("message")}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 bottom-2.5 text-xs text-muted"
              >
                {messageLength} / {LEAD_LIMITS.message}
              </span>
            </div>
          )}
        </Field>
        <Field
          id="lead-eventDate"
          name="eventDate"
          label="Event date or deadline"
          error={fieldError("eventDate")}
          className="sm:max-w-xs"
        >
          {(control) => <Input {...control} type="date" defaultValue={value("eventDate")} />}
        </Field>
      </div>

      {/* 03 — Contact details */}
      <div className="flex flex-col gap-6 border-t border-line pt-10">
        <StepHeading index={3} title="How can we reach you?" />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="lead-name" name="name" label="Your name" required error={fieldError("name")}>
            {(control) => (
              <Input
                {...control}
                type="text"
                autoComplete="name"
                maxLength={LEAD_LIMITS.name}
                defaultValue={value("name")}
              />
            )}
          </Field>
          <Field id="lead-company" name="company" label="Company" error={fieldError("company")}>
            {(control) => (
              <Input
                {...control}
                type="text"
                autoComplete="organization"
                maxLength={LEAD_LIMITS.company}
                defaultValue={value("company")}
              />
            )}
          </Field>
          <Field id="lead-email" name="email" label="Email" required error={fieldError("email")}>
            {(control) => (
              <Input
                {...control}
                type="email"
                autoComplete="email"
                inputMode="email"
                maxLength={LEAD_LIMITS.email}
                defaultValue={value("email")}
              />
            )}
          </Field>
          <Field
            id="lead-phone"
            name="phone"
            label="Phone or WhatsApp"
            hint="Include the country code, e.g. +971."
            error={fieldError("phone")}
          >
            {(control) => (
              <Input
                {...control}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                maxLength={LEAD_LIMITS.phone}
                defaultValue={value("phone")}
              />
            )}
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology; only bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="lead-website">Leave this field empty</label>
        <input
          id="lead-website"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {turnstileSiteKey ? (
        <TurnstileWidget
          siteKey={turnstileSiteKey}
          action={turnstileAction}
          resetSignal={state}
          onTokenChange={setHasToken}
          unavailableMessage={`The security check could not load, so the form cannot be sent from this browser.${
            reachUs ? ` Please ${reachUs}.` : ""
          }`}
        />
      ) : null}

      <noscript>
        <p className="text-sm text-muted">
          This form needs JavaScript to send.
          {reachUs ? ` You can also ${reachUs}.` : ""}
        </p>
      </noscript>

      <div className="flex flex-col-reverse gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span className="text-danger" aria-hidden="true">
            *
          </span>{" "}
          Required fields.
          {privacyHref ? (
            <>
              {" "}
              See our{" "}
              <AppLink href={privacyHref} className="font-semibold text-teal-800 underline">
                privacy policy
              </AppLink>
              .
            </>
          ) : null}
        </p>
        <div className={cx(pending && "opacity-80")}>
          <Button type="submit" size="lg" icon="arrow-right" disabled={pending}>
            {pending ? "Sending…" : handoffEmail ? "Send my brief" : "Send enquiry"}
          </Button>
        </div>
      </div>
    </form>
  );
}

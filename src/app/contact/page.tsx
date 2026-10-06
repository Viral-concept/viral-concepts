import { Suspense } from "react";

import { LeadForm } from "@/components/forms/LeadForm";
import { LeadFormFromQuery } from "@/components/forms/LeadFormFromQuery";
import { Aurora } from "@/components/motion/Aurora";
import { PageHero } from "@/components/sections/PageHero";
import { AppLink } from "@/components/ui/AppLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { publicEnv } from "@/config/env.public";
import { getLeadFormConfig } from "@/config/env.server";
import { contactContent } from "@/content/contact";
import { whatsappHref } from "@/lib/contact-actions";
import { getContactChannels, isPageVisible } from "@/lib/content";
import { TURNSTILE_ACTION } from "@/lib/leads/turnstile";
import { getLeadServiceOptions } from "@/lib/leads/services";
import { buildMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import type { Governed } from "@/types/content";

export const metadata = buildMetadata({
  title: contactContent.seo.title,
  absoluteTitle: true,
  description: contactContent.seo.description,
  path: routes.contact,
});

interface Channel {
  readonly icon: IconName;
  readonly label: string;
  readonly value: string;
  readonly href?: string;
  readonly item: Governed;
}

/**
 * /contact: hero (with quick call/email actions) → three-step brief form + contact channels
 * and what happens next.
 *
 * Only confirmed channels are listed (address and hours are template-only until the client
 * confirms them). The form always works:
 * - live: Turnstile + Resend email delivery;
 * - test: `npm run dev` without keys, or LEAD_FORM_MODE=test on previews (logged, labelled);
 * - not configured on a deployed site: the brief opens in the visitor's own email app,
 *   addressed to the published email. Only with no email at all does a note replace the form.
 */
export default function ContactPage() {
  const config = getLeadFormConfig();
  const { phone, whatsapp, email, address, businessHours } = getContactChannels();
  const services = getLeadServiceOptions();
  const turnstileSiteKey =
    config.mode === "live" ? publicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY : undefined;
  const handoffEmail = config.mode === "disabled" ? email?.value : undefined;
  const formAvailable = config.mode !== "disabled" || handoffEmail !== undefined;

  const candidates: (Channel | undefined)[] = [
    phone && {
      icon: "phone",
      label: "Call",
      value: phone.value.display,
      href: `tel:${phone.value.e164}`,
      item: phone,
    },
    whatsapp && {
      icon: "chat",
      label: "WhatsApp",
      value: whatsapp.value.display,
      href: whatsappHref(whatsapp.value.e164),
      item: whatsapp,
    },
    email && {
      icon: "mail",
      label: "Email",
      value: email.value,
      href: `mailto:${email.value}`,
      item: email,
    },
    address && {
      icon: "map-pin",
      label: "Visit",
      value: `${address.value.locality}, ${address.value.city}`,
      item: address,
    },
    businessHours && {
      icon: "clock",
      label: "Hours",
      value: businessHours.value.map((row) => `${row.days} ${row.hours}`).join(" · "),
      item: businessHours,
    },
  ];
  const channels = candidates.filter((channel): channel is Channel => channel !== undefined);

  const formProps = {
    services,
    turnstileSiteKey,
    turnstileAction: TURNSTILE_ACTION,
    fallback: { phone: phone?.value.display, email: email?.value },
    privacyHref: isPageVisible("privacyPolicy") ? routes.privacyPolicy : undefined,
    testMode: config.mode === "test",
    handoffEmail,
  };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Contact", href: routes.contact },
        ]}
        eyebrow={contactContent.eyebrow}
        title={contactContent.title}
        lead={contactContent.lead}
        actions={
          channels.some((channel) => channel.href) ? (
            <ul className="flex flex-wrap gap-3" aria-label="Quick contact">
              {channels
                .filter((channel) => channel.href && channel.label !== "Visit")
                .map((channel) => (
                  <li key={channel.label}>
                    <AppLink
                      href={channel.href ?? ""}
                      className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 bg-white/5 py-2 pr-5 pl-2 text-white transition-colors hover:border-yellow-400"
                    >
                      <span className="grid size-9 place-items-center rounded-full bg-yellow-400 text-ink transition-transform duration-(--duration-base) group-hover:-rotate-12">
                        <Icon name={channel.icon} className="size-4" />
                      </span>
                      <span className="font-semibold break-all">{channel.value}</span>
                    </AppLink>
                  </li>
                ))}
            </ul>
          ) : undefined
        }
      />

      <Section tone="surface" labelledBy="contact-form-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col gap-2">
              <h2 id="contact-form-title" className="text-h2 text-ink">
                {contactContent.formTitle}
              </h2>
              <p className="text-lead text-muted">{contactContent.formIntro}</p>
            </div>
            {formAvailable ? (
              <Suspense fallback={<LeadForm {...formProps} />}>
                <LeadFormFromQuery {...formProps} />
              </Suspense>
            ) : (
              <p className="rounded-media border border-line bg-white p-6 text-lead text-ink shadow-card">
                {contactContent.unavailable}
              </p>
            )}
          </div>

          <aside
            aria-labelledby="contact-channels-title"
            className="flex flex-col gap-8 self-start lg:sticky lg:top-28 lg:col-span-5 xl:col-span-4"
          >
            <div
              data-tone="dark"
              className="relative isolate flex flex-col gap-6 overflow-hidden rounded-media bg-night p-8 text-white"
            >
              <Aurora tone="digital" />
              <h2 id="contact-channels-title" className="text-h3 text-white">
                {contactContent.channelsTitle}
              </h2>
              <ul className="flex flex-col gap-5">
                {channels.map((channel) => (
                  <li key={channel.label} className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-cyan-400">
                      <Icon name={channel.icon} className="size-5" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-eyebrow text-cyan-300 uppercase">{channel.label}</span>
                      {channel.href ? (
                        <AppLink
                          href={channel.href}
                          className="inline-flex min-h-11 items-center text-lg font-semibold break-all text-white hover:text-yellow-400"
                        >
                          {channel.value}
                        </AppLink>
                      ) : (
                        <span className="text-lg font-semibold">{channel.value}</span>
                      )}
                      <ReviewFlag item={channel.item} className="self-start" />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="flex items-start gap-3 border-t border-white/15 pt-5 text-white/85">
                <Icon name="map-pin" className="mt-0.5 size-5 shrink-0 text-yellow-400" />
                {contactContent.reach}
              </p>
            </div>

            <div className="flex flex-col gap-5 rounded-media border border-line bg-white p-8 shadow-card">
              <h2 className="text-eyebrow text-teal-600 uppercase">
                {contactContent.nextSteps.title}
              </h2>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 bottom-2 left-[1.0625rem] w-px bg-linear-to-b from-yellow-400 to-line-strong"
                />
                <ol className="relative flex flex-col gap-5">
                  {contactContent.nextSteps.steps.map((step, index) => (
                    <li key={step.title} className="relative flex items-start gap-4">
                      <span
                        className={
                          index === 0
                            ? "grid size-9 shrink-0 place-items-center rounded-full bg-yellow-400 font-display text-sm font-bold text-ink"
                            : "grid size-9 shrink-0 place-items-center rounded-full bg-teal-800 font-display text-sm font-bold text-white"
                        }
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex flex-col gap-0.5 pt-1">
                        <span className="font-semibold text-ink">{step.title}</span>
                        <span className="text-sm text-muted">{step.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

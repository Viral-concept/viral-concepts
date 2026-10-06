import { ActionBarCta } from "@/components/layout/ActionBarCta";
import { AppLink } from "@/components/ui/AppLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { whatsappHref } from "@/lib/contact-actions";
import { getContactChannels } from "@/lib/content";
import { PRIMARY_CTA } from "@/lib/navigation";

/**
 * Fixed bottom action bar on phones (below 768px). Server-rendered, no JavaScript.
 * Call and WhatsApp appear only when those numbers are confirmed, as compact icon tiles, so the
 * primary CTA keeps a full-width target even at 320px. The body reserves the bar's height
 * (`pb-action-bar`), so it never covers page content. The bar uses the same height token
 * (`h-action-bar`, border included), so the reserved space always matches exactly.
 */
function ActionTile({
  href,
  icon,
  label,
}: {
  readonly href: string;
  readonly icon: IconName;
  readonly label: string;
}) {
  return (
    <AppLink
      href={href}
      className="flex size-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-input border-2 border-teal-600 text-xs font-semibold text-teal-800 hover:bg-tint"
    >
      <Icon name={icon} className="size-5" />
      {label}
    </AppLink>
  );
}

export function MobileActionBar() {
  const { phone, whatsapp } = getContactChannels();

  return (
    <div
      role="region"
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 h-action-bar border-t border-line bg-white pb-safe md:hidden"
    >
      <div className="flex h-full items-center gap-2 px-4">
        {phone ? <ActionTile href={`tel:${phone.value.e164}`} icon="phone" label="Call" /> : null}
        {whatsapp ? (
          <ActionTile href={whatsappHref(whatsapp.value.e164)} icon="chat" label="WhatsApp" />
        ) : null}
        <ActionBarCta label={PRIMARY_CTA.label} href={PRIMARY_CTA.href} />
      </div>
    </div>
  );
}

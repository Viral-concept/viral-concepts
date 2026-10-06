"use client";

import { usePathname } from "next/navigation";

import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

/**
 * The mobile action bar's main button. On the contact page, a "Start a Project" link back to
 * the same page would do nothing, so it jumps to the brief form instead.
 */
export function ActionBarCta({ label, href }: { readonly label: string; readonly href: string }) {
  const onContactPage = usePathname() === routes.contact;
  return (
    <ButtonLink
      href={onContactPage ? "#contact-form-title" : href}
      size="lg"
      icon={onContactPage ? "chevron-down" : "arrow-right"}
      className="flex-1"
    >
      {onContactPage ? "Send your brief" : label}
    </ButtonLink>
  );
}

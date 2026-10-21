import "server-only";

import { productCategories } from "@/content/products";
import {
  getPillarsWithServices,
  getVisible,
  getServiceHref,
  hasServicePage,
  hasIndustriesPage,
  hasProjectsPage,
  isPageVisible,
} from "@/lib/content";
import { reviewLabel } from "@/lib/publishing";
import { contactRouteForService, routes } from "@/lib/routes";
import type { Service } from "@/types/content";
import type { FooterColumn, NavItem, NavigationModel, NavLink } from "@/types/navigation";

/**
 * Builds the site navigation from the content layer, so menus only ever link to pages that
 * exist in this deployment. Header, mobile menu and footer all render this one model.
 */

export const PRIMARY_CTA: NavLink = { label: "Plan your event", href: routes.contact };

function serviceLink(service: Service, withDescription: boolean): NavLink {
  // Flag a live service whose page copy is still a draft (visible in preview only).
  const label =
    reviewLabel(service) ??
    (hasServicePage(service) && service.page ? reviewLabel(service.page) : undefined);
  return {
    label: service.title,
    href: getServiceHref(service),
    ...(withDescription ? { description: service.summary } : {}),
    ...(label ? { reviewLabel: label } : {}),
  };
}

/** Optional pages appear only when they exist in this deployment. */
function optionalPageLinks() {
  return {
    about: isPageVisible("about") ? { label: "About", href: routes.about } : undefined,
    projects: hasProjectsPage() ? { label: "Projects", href: routes.projects } : undefined,
    industries: hasIndustriesPage() ? { label: "Industries", href: routes.industries } : undefined,
    companyProfile: isPageVisible("companyProfile")
      ? { label: "Company Profile", href: routes.companyProfile }
      : undefined,
  } satisfies Record<string, NavLink | undefined>;
}

const CONTACT: NavLink = { label: "Contact", href: routes.contact };
const GALLERY: NavLink = { label: "Gallery", href: routes.gallery };

function present<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function asNavItem(link: NavLink): NavItem {
  return { kind: "link", id: link.href, label: link.label, href: link.href };
}

export function getNavigation(): NavigationModel {
  const optional = optionalPageLinks();
  const pillars = getPillarsWithServices();
  const eventPillars = pillars.filter((pillar) => pillar.id !== "branding-advertising");
  const printPillar = pillars.find((pillar) => pillar.id === "branding-advertising");
  const eventServices = eventPillars.flatMap((pillar) => pillar.services);
  const products = getVisible(productCategories);
  const company = [
    optional.about,
    GALLERY,
    optional.projects,
    optional.industries,
    optional.companyProfile,
    CONTACT,
  ].filter(present);

  // Two ways into the business: plan an event (production and rentals), or order branding & print.
  const eventsMenu: NavItem = {
    kind: "menu",
    id: "services",
    label: "Events & Rentals",
    layout: "mega",
    overview: {
      label: "All services",
      href: routes.services,
      description:
        "Event production, exhibitions and décor, and furniture, tents, fences and barriers to rent.",
    },
    sections: eventPillars.map((pillar) => ({
      title: pillar.title,
      links: pillar.services.map((service) => serviceLink(service, false)),
    })),
  };

  const printMenu: NavItem | undefined = printPillar
    ? {
        kind: "menu",
        id: "branding-print",
        label: "Branding & Print",
        layout: "mega",
        cta: { label: "Request a quote", href: contactRouteForService("branding-printing") },
        overview: {
          label: "All products",
          href: routes.products,
          description:
            "Flags, banners, signage, large format, fabric, vehicle branding, print and gifts — made in-house.",
        },
        sections: [
          { title: "Services", links: printPillar.services.map((s) => serviceLink(s, false)) },
        ],
      }
    : undefined;

  // Explicit display order. Optional items drop out when their page does not exist.
  const primary: NavItem[] = [
    eventsMenu,
    printMenu,
    asNavItem(GALLERY),
    optional.projects && asNavItem(optional.projects),
    optional.about && asNavItem(optional.about),
    optional.industries && asNavItem(optional.industries),
    optional.companyProfile && asNavItem(optional.companyProfile),
    asNavItem(CONTACT),
  ].filter(present);

  const footerColumns: FooterColumn[] = [
    { title: "Events & Rentals", links: eventServices.map((s) => serviceLink(s, false)) },
    ...(printPillar
      ? [
          {
            title: "Branding & Print",
            links: [
              ...printPillar.services.map((s) => serviceLink(s, false)),
              ...(products.length > 0 ? [{ label: "All products", href: routes.products }] : []),
            ],
          },
        ]
      : []),
    { title: "Company", links: company },
  ];

  const legal: NavLink[] = [
    ...(isPageVisible("privacyPolicy")
      ? [{ label: "Privacy Policy", href: routes.privacyPolicy }]
      : []),
    ...(isPageVisible("terms") ? [{ label: "Terms of Service", href: routes.terms }] : []),
  ];

  return { primary, cta: PRIMARY_CTA, footerColumns, legal };
}

import "server-only";

import { productCategories } from "@/content/products";
import {
  getPillarsWithServices,
  getVisible,
  getServiceHref,
  hasServicePage,
  getServices,
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

function present<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function asNavItem(link: NavLink): NavItem {
  return { kind: "link", id: link.href, label: link.label, href: link.href };
}

export function getNavigation(): NavigationModel {
  const services = getServices("services");
  const optional = optionalPageLinks();
  const print = services.find((service) => service.slug === "branding-printing");
  const eventServices = services.filter((service) => service.slug !== "branding-printing");
  const eventPillar = getPillarsWithServices().find((pillar) => pillar.id === "events-experiences");
  const products = getVisible(productCategories);
  const company = [
    optional.about,
    optional.projects,
    optional.industries,
    optional.companyProfile,
    CONTACT,
  ].filter(present);

  // Two ways into the business: plan an event, or order branding & print.
  const eventsMenu: NavItem = {
    kind: "menu",
    id: "services",
    label: "Events",
    layout: "mega",
    overview: {
      label: "Events & exhibitions",
      href: routes.services,
      description:
        "Corporate events, conferences, exhibitions, activations and décor — produced in our own Dubai production house.",
    },
    sections: [
      {
        title: eventPillar?.title ?? "Events & Experiences",
        links: (eventPillar?.services ?? []).map((service) => serviceLink(service, true)),
      },
      {
        title: "Activations",
        links: eventServices
          .filter((service) => !eventPillar?.services.some((s) => s.slug === service.slug))
          .map((service) => serviceLink(service, true)),
      },
    ].filter((section) => section.links.length > 0),
  };

  const printMenu: NavItem | undefined = print
    ? {
        kind: "menu",
        id: "branding-print",
        label: "Branding & Print",
        layout: "mega",
        cta: { label: "Request a quote", href: contactRouteForService("branding-printing") },
        overview: {
          label: "All branding & print",
          href: routes.products,
          description:
            "Flags, banners, signage, large format, fabric, vehicle branding, print and gifts — made in-house.",
        },
        sections: [
          {
            title: "Products",
            links: products.map((category) => ({
              label: category.title,
              href: `${routes.products}#${category.id}`,
            })),
          },
          { title: "Service", links: [serviceLink(print, true)] },
        ],
      }
    : undefined;

  // Explicit display order. Optional items drop out when their page does not exist.
  const primary: NavItem[] = [
    eventsMenu,
    printMenu,
    optional.projects && asNavItem(optional.projects),
    optional.about && asNavItem(optional.about),
    optional.industries && asNavItem(optional.industries),
    optional.companyProfile && asNavItem(optional.companyProfile),
    asNavItem(CONTACT),
  ].filter(present);

  const footerColumns: FooterColumn[] = [
    { title: "Events", links: eventServices.map((s) => serviceLink(s, false)) },
    ...(print
      ? [
          {
            title: "Branding & Print",
            links: [
              { label: "All products", href: routes.products },
              ...products.map((category) => ({
                label: category.title,
                href: `${routes.products}#${category.id}`,
              })),
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

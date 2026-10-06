import "server-only";

import { CAPABILITY_META, CAPABILITY_ORDER } from "@/components/sections/home/DigitalBand";
import {
  getPillarsWithServices,
  getServiceHref,
  hasServicePage,
  getServices,
  hasIndustriesPage,
  hasProjectsPage,
  isPageVisible,
} from "@/lib/content";
import { reviewLabel } from "@/lib/publishing";
import { routes } from "@/lib/routes";
import type { Service } from "@/types/content";
import type { FooterColumn, NavItem, NavigationModel, NavLink } from "@/types/navigation";

/**
 * Builds the site navigation from the content layer, so menus only ever link to pages that
 * exist in this deployment. Header, mobile menu and footer all render this one model.
 */

export const PRIMARY_CTA: NavLink = { label: "Start a Project", href: routes.contact };

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
  const servicePillars = getPillarsWithServices().filter((p) => p.id !== "digital-technology");
  const digital = getServices("digital-solutions");
  const services = getServices("services");
  const optional = optionalPageLinks();
  const company = [
    optional.about,
    optional.projects,
    optional.industries,
    optional.companyProfile,
    CONTACT,
  ].filter(present);

  const servicesMenu: NavItem = {
    kind: "menu",
    id: "services",
    label: "Services",
    layout: "mega",
    overview: {
      label: "All services",
      href: routes.services,
      description: "Six service lines delivered from our Dubai production house.",
    },
    sections: servicePillars.map((pillar) => ({
      title: pillar.title,
      links: pillar.services.map((service) => serviceLink(service, true)),
    })),
  };

  // Digital services grouped like an agency menu: marketing · web & apps · AI & automation.
  const digitalSections = CAPABILITY_ORDER.map((capability) => ({
    title: CAPABILITY_META[capability].title,
    links: digital.filter((s) => s.capability === capability).map((s) => serviceLink(s, false)),
  })).filter((section) => section.links.length > 0);

  const digitalMenu: NavItem = {
    kind: "menu",
    id: "digital-solutions",
    label: "Digital Solutions",
    layout: digitalSections.length > 1 ? "mega" : "list",
    overview: {
      label: "Digital Solutions overview",
      href: routes.digitalSolutions,
      description: "Digital marketing, websites and apps, and AI & automation.",
    },
    sections: digitalSections,
  };

  // Explicit display order. Optional items drop out when their page does not exist.
  const primary: NavItem[] = [
    optional.about && asNavItem(optional.about),
    servicesMenu,
    digital.length > 0 ? digitalMenu : undefined,
    optional.projects && asNavItem(optional.projects),
    optional.industries && asNavItem(optional.industries),
    optional.companyProfile && asNavItem(optional.companyProfile),
    asNavItem(CONTACT),
  ].filter(present);

  const footerColumns: FooterColumn[] = [
    { title: "Services", links: services.map((s) => serviceLink(s, false)) },
    ...(digital.length > 0
      ? [
          {
            title: "Digital Solutions",
            links: [
              { label: "Overview", href: routes.digitalSolutions },
              ...digital.map((s) => serviceLink(s, false)),
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

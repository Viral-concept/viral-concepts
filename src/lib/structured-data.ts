import "server-only";

import { siteUrl } from "@/config/env.public";
import { site } from "@/content/site";
import { projectCategoryLabels } from "@/content/taxonomy";
import {
  getCompanyFacts,
  getContactChannels,
  getCoverImage,
  getPublicClientName,
  getSocialProfiles,
} from "@/lib/content";
import { isProofImage, isPublishable } from "@/lib/publishing";
import { absoluteUrl, projectRoute, serviceRoute } from "@/lib/routes";
import type { Faq, Project, Service } from "@/types/content";

/**
 * schema.org JSON-LD (Discovery doc, section J).
 *
 * Built only from content visible in this deployment, so in production every property is a
 * published fact. Nothing is added to please search engines: no ratings or reviews, no
 * address (and therefore no LocalBusiness) until the client confirms one, no social profiles
 * until they are confirmed.
 */

export type JsonLdObject = Record<string, unknown>;

const ORGANIZATION_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;
const url = (path: string) => absoluteUrl(siteUrl, path);

function countries() {
  return getCompanyFacts().reach.map((country) => ({ "@type": "Country", name: country.name }));
}

/** The company. Becomes a LocalBusiness only once a confirmed address exists. */
export function organizationJsonLd(): JsonLdObject {
  const { phone, email, address } = getContactChannels();
  const socials = getSocialProfiles();
  const legalName = isPublishable(site.legalName) ? site.legalName.value : undefined;
  const facts = getCompanyFacts();

  return {
    "@context": "https://schema.org",
    "@type": address ? "LocalBusiness" : "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    ...(legalName ? { legalName } : {}),
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: url("/images/brand/viral-concepts-logo.png"),
      width: 692,
      height: 154,
    },
    description: site.description,
    ...(facts.foundingYear ? { foundingDate: String(facts.foundingYear) } : {}),
    areaServed: countries(),
    ...(phone ? { telephone: phone.value.e164 } : {}),
    ...(email ? { email: email.value } : {}),
    ...(phone || email
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              ...(phone ? { telephone: phone.value.e164 } : {}),
              ...(email ? { email: email.value } : {}),
              areaServed: facts.reach.map((country) => country.code),
            },
          ],
        }
      : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: address.value.city,
            addressRegion: address.value.locality,
            addressCountry: address.value.country,
          },
        }
      : {}),
    ...(socials.length > 0 ? { sameAs: socials.map((profile) => profile.url) } : {}),
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: siteUrl,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbJsonLd(
  items: readonly { readonly label: string; readonly href: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: url(item.href),
    })),
  };
}

/** A service page: what is offered (every item from the Company Profile) and by whom. */
export function serviceJsonLd(service: Service): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seo.h1 ?? service.title,
    serviceType: service.title,
    description: service.seo.description,
    url: url(serviceRoute(service)),
    provider: { "@id": ORGANIZATION_ID },
    // CP p.35 for the service lines;
    areaServed: service.vertical === "services" ? countries() : "Gulf",
    ...(service.offerings.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: service.title,
            itemListElement: service.offerings.map((group) => ({
              "@type": "OfferCatalog",
              name: group.title,
              itemListElement: group.items.map((item) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: item },
              })),
            })),
          },
        }
      : {}),
  };
}

/** FAQ markup for exactly the questions and answers shown on the page. */
export function faqJsonLd(faqs: readonly Faq[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** A published case study. Client, place and year appear only when confirmed. */
export function projectJsonLd(project: Project): JsonLdObject {
  const cover = getCoverImage(project.gallery);
  const images = project.gallery.filter(isProofImage).map((image) => url(image.src));
  const client = getPublicClientName(project);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    ...(project.summary ? { description: project.summary } : {}),
    url: url(projectRoute(project.slug)),
    creator: { "@id": ORGANIZATION_ID },
    genre: project.categories.map((category) => projectCategoryLabels[category]),
    ...(cover && isProofImage(cover) ? { image: images } : {}),
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    ...(project.location ? { locationCreated: { "@type": "Place", name: project.location } } : {}),
    ...(client ? { sourceOrganization: { "@type": "Organization", name: client } } : {}),
  };
}

/** Serialise for a <script> tag; `<` is escaped so content can never close the tag early. */
export function serializeJsonLd(data: JsonLdObject | readonly JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

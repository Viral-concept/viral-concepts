import { CtaBand } from "@/components/sections/CtaBand";
import {
  EventOfferings,
  ServiceGallery,
  ServiceStory,
} from "@/components/sections/EventServiceSections";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { BuiltToDeliver } from "@/components/sections/home/BuiltToDeliver";
import { RunOfShow } from "@/components/sections/home/RunOfShow";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { homeContent } from "@/content/home";
import { pillars } from "@/content/pillars";
import { HIGHLIGHTED_PROCESS_STEP } from "@/content/process";
import { productCategories, productsLanding } from "@/content/products";
import {
  getContactChannels,
  getFaqs,
  getProjectsForService,
  getRelatedServices,
  getServiceGallery,
  getServiceScenes,
  getVisible,
  getVisibleImage,
  hasProjectsPage,
  type ServiceWithPage,
} from "@/lib/content";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import { needsReviewBanner } from "@/lib/publishing";
import { contactRouteForService, routes, serviceRoute } from "@/lib/routes";
import { serviceJsonLd } from "@/lib/structured-data";
import type { SectionTone } from "@/types/ui";

function present<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * Template for every service page (/services/[slug]): cinematic photo hero → story beside a
 * photo collage → what we deliver → (branding & printing: the product catalogue) → why it
 * matters → related work → how we work (run of show) → FAQ → related services → finale.
 * Each page differs by content; sections without content are omitted.
 */
interface ServicePageProps {
  readonly service: ServiceWithPage;
  readonly parent: { readonly label: string; readonly href: string };
}

export function ServicePage({ service, parent }: ServicePageProps) {
  const { page } = service;
  const isPrint = service.pillar === "branding-advertising";
  const isCatalogue = service.slug === "branding-printing";
  const heroImage = getVisibleImage(service.heroImage);
  const projects = getProjectsForService(service.slug).slice(0, 3);
  const faqs = getFaqs(`service:${service.slug}`);
  const related = getRelatedServices(service);
  const { phone } = getContactChannels();
  const secondary = getSecondaryContactAction();
  const enquiryHref = contactRouteForService(service.slug);
  const ctaLabel = isPrint ? "Request a quote" : "Plan your event";
  const offeringCount = service.offerings.reduce((sum, group) => sum + group.items.length, 0);
  const scenes = getServiceScenes(service).slice(0, 3);
  const gallery = getServiceGallery(service);
  const credits = service.offerings.flatMap((group) => group.items).slice(0, 5);
  const products = isCatalogue ? getVisible(productCategories) : [];
  const acts = homeContent.runOfShow.acts
    .map((act) => {
      const image = getVisibleImage(act.image);
      return image ? { ...act, image: { src: image.src } } : undefined;
    })
    .filter(present);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          parent,
          { label: service.title, href: serviceRoute(service) },
        ]}
        eyebrow={pillars.find((pillar) => pillar.id === service.pillar)?.title ?? parent.label}
        title={service.seo.h1 ?? service.title}
        lead={service.summary}
        reviewItem={needsReviewBanner(service) ? service : page}
        {...(heroImage ? { image: heroImage, credits } : {})}
        actions={
          <>
            <ButtonLink href={enquiryHref} size="lg" icon="arrow-right">
              {ctaLabel}
            </ButtonLink>
            {phone ? (
              <ButtonLink
                href={`tel:${phone.value.e164}`}
                size="lg"
                variant="inverse"
                leadingIcon="phone"
              >
                {phone.value.display}
              </ButtonLink>
            ) : null}
            <ButtonLink href={routes.services} variant="quietInverse" className="self-center">
              All services
            </ButtonLink>
          </>
        }
      />

      <PageBlocks
        blocks={[
          {
            key: "intro",
            fixedTone: "surface",
            render: (tone) => (
              <ServiceStory
                tone={tone}
                eyebrow="Overview"
                title={`${service.title} in Dubai`}
                intro={page.intro}
                images={scenes}
              />
            ),
          },
          offeringCount >= 2 && {
            key: "offerings",
            fixedTone: "night",
            render: (tone) => (
              <EventOfferings tone={tone} serviceTitle={service.title} groups={service.offerings} />
            ),
          },
          gallery.length > 0 && {
            key: "gallery",
            render: (tone) => (
              <ServiceGallery tone={tone} serviceTitle={service.title} images={gallery} />
            ),
          },
          products.length > 0 && {
            key: "products",
            render: (tone) => (
              <Section tone={tone} labelledBy="products-title">
                <SectionHeader
                  id="products-title"
                  eyebrow={productsLanding.eyebrow}
                  title="Pick a product, *get a quote.*"
                  intro="Every category below is printed or made in our own production house."
                  className="mb-12 reveal"
                />
                <ProductGrid categories={products} headingLevel={3} />
              </Section>
            ),
          },
          page.highlights.length > 0 && {
            key: "highlights",
            render: (tone) => (
              <BuiltToDeliver
                tone={tone}
                eyebrow="Why it matters"
                title="Why work *with us.*"
                reasons={page.highlights.map((highlight) => ({
                  status: page.status,
                  verified: page.verified,
                  source: page.source,
                  ...highlight,
                }))}
              />
            ),
          },
          projects.length > 0 && {
            key: "projects",
            render: (tone) => (
              <FeaturedProjects
                tone={tone}
                projects={projects}
                title="Related projects"
                {...(hasProjectsPage() ? { allProjectsHref: routes.projects } : {})}
              />
            ),
          },
          acts.length > 0 && {
            key: "process",
            fixedTone: "night",
            render: (tone: SectionTone) => (
              <Section tone={tone} spacing="none" container={false} labelledBy="run-of-show-title">
                <RunOfShow
                  acts={acts}
                  highlight={HIGHLIGHTED_PROCESS_STEP}
                  header={
                    <SectionHeader
                      id="run-of-show-title"
                      eyebrow="How we work"
                      title={homeContent.runOfShow.title}
                      intro={homeContent.runOfShow.intro}
                      size="statement"
                      inverse
                    />
                  }
                />
              </Section>
            ),
          },
          faqs.length > 0 && {
            key: "faq",
            render: (tone) => (
              <FaqSection tone={tone} faqs={faqs} title={`${service.title}: common questions`} />
            ),
          },
          related.length > 0 && {
            key: "related",
            render: (tone) => <RelatedServices tone={tone} services={related} />,
          },
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                title={page.cta.title}
                lead={page.cta.lead}
                primary={{ label: ctaLabel, href: enquiryHref }}
                {...(secondary ? { secondary } : {})}
              />
            ),
          },
        ]}
      />
    </>
  );
}

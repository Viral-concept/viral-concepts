import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { ProductionHouse } from "@/components/sections/home/ProductionHouse";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/content/about";
import { eventPhotos } from "@/content/event-photos";
import { homeContent } from "@/content/home";
import { productCategories, productOptionValue, productsLanding } from "@/content/products";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import {
  getContactChannels,
  getFaqs,
  getService,
  getServiceHref,
  getVisible,
  getVisibleImage,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { contactRouteForService, routes } from "@/lib/routes";
import type { SectionTone } from "@/types/ui";

export const metadata = buildMetadata({
  title: productsLanding.seo.title,
  description: productsLanding.seo.description,
  path: routes.products,
});

function present<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * /products — the branding & print side of the business as a catalogue buyers can scan:
 * hero → every product category with a quote link → the production house → FAQ → finale with
 * one-tap category picks. Each quote link opens the brief form with the category chosen.
 */
export default function ProductsPage() {
  const categories = getVisible(productCategories);
  const service = getService("services", "branding-printing");
  const { phone } = getContactChannels();
  const secondary = getSecondaryContactAction();
  const faqs = getFaqs("service:branding-printing");
  const { productionHouse } = homeContent;
  const quoteHref = contactRouteForService("branding-printing");

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Branding & Print", href: routes.products },
        ]}
        eyebrow={productsLanding.eyebrow}
        title={productsLanding.title}
        lead={productsLanding.lead}
        image={eventPhotos.fabricPrinter}
        credits={categories.map((category) => category.title)}
        actions={
          <>
            <ButtonLink href={quoteHref} size="lg" icon="arrow-right">
              Request a quote
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
          </>
        }
      />
      <PageBlocks
        blocks={[
          categories.length > 0 && {
            key: "catalogue",
            fixedTone: "surface",
            render: (tone: SectionTone) => (
              <Section tone={tone} labelledBy="catalogue-title">
                <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <SectionHeader
                    id="catalogue-title"
                    eyebrow="The catalogue"
                    title={`${categories.length} categories, *one production house.*`}
                    intro="Choose a category to send a quote request — tell us the size, quantity and date, and attach artwork if you have it."
                    className="reveal"
                  />
                  {service ? (
                    <ButtonLink href={getServiceHref(service)} variant="quiet" className="shrink-0">
                      About our printing
                    </ButtonLink>
                  ) : null}
                </div>
                <ProductGrid categories={categories} headingLevel={3} />
              </Section>
            ),
          },
          {
            key: "production-house",
            render: (tone: SectionTone) => (
              <ProductionHouse
                tone={tone}
                eyebrow={productionHouse.eyebrow}
                title={productionHouse.title}
                body={productionHouse.body}
                verbs={productionHouse.verbs}
                images={productionHouse.images.map(getVisibleImage).filter(present)}
                capabilities={aboutContent.capabilities.items}
              />
            ),
          },
          faqs.length > 0 && {
            key: "faq",
            render: (tone: SectionTone) => (
              <FaqSection tone={tone} faqs={faqs} title="Branding & print: common questions" />
            ),
          },
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                eyebrow="Ready when you are"
                title={productsLanding.cta.title}
                lead={productsLanding.cta.lead}
                primary={{ label: "Request a quote", href: quoteHref }}
                image={eventPhotos.printRolls}
                picker={{
                  label: "What do you need?",
                  options: categories.map((category) => ({
                    label: category.title,
                    href: contactRouteForService(productOptionValue(category.id)),
                  })),
                }}
                {...(secondary ? { secondary } : {})}
              />
            ),
          },
        ]}
      />
    </>
  );
}

import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { BuiltToDeliver } from "@/components/sections/home/BuiltToDeliver";
import { ExperienceIndex, type ExperienceItem } from "@/components/sections/home/ExperienceIndex";
import { Manifesto, type Fact } from "@/components/sections/home/Manifesto";
import { ProductionHouse } from "@/components/sections/home/ProductionHouse";
import { RunOfShow } from "@/components/sections/home/RunOfShow";
import { ShowtimeHero } from "@/components/sections/home/ShowtimeHero";
import { TwoDoors } from "@/components/sections/home/TwoDoors";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { type PageBlock, PageBlocks } from "@/components/sections/PageBlocks";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import type { Scene } from "@/components/motion/HeroScenes";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/content/about";
import { eventPhotos } from "@/content/event-photos";
import { experiences } from "@/content/experiences";
import { homeContent } from "@/content/home";
import { HIGHLIGHTED_PROCESS_STEP, processSteps } from "@/content/process";
import { productCategories } from "@/content/products";
import { site } from "@/content/site";
import {
  getCompanyFacts,
  getFaqs,
  getFeaturedProjects,
  getService,
  getServiceHref,
  getServices,
  getStats,
  getTestimonials,
  getVisible,
  getVisibleImage,
  hasProjectsPage,
} from "@/lib/content";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import { buildMetadata, DEFAULT_TITLE } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { contactRouteForService, routes } from "@/lib/routes";
import type { SectionTone } from "@/types/ui";

export const metadata = buildMetadata({
  title: DEFAULT_TITLE,
  absoluteTitle: true,
  description: site.description,
  path: routes.home,
});

function present<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * Homepage — one production house, two ways in, told like a show:
 * hero (events & branding, under one roof) → manifesto (who we are) → two doors (plan an
 * event · order branding & print) → what we create (interactive index of events) → branding &
 * print catalogue preview → the production house (the differentiator) → run of show (the
 * nine-step process in five acts) → selected work → why us → FAQ → finale (what are you
 * planning?). Sections without content in this deployment drop out.
 */
export default function HomePage() {
  const { hero, manifesto, runOfShow, productionHouse, reasons, doors, productsPreview, finalCta } =
    homeContent;
  const facts = getCompanyFacts();
  const serviceLines = getServices("services");
  const products = getVisible(productCategories);
  const printService = getService("services", "branding-printing");
  const stats = getStats();
  const projects = getFeaturedProjects(6);
  const testimonials = getTestimonials();
  const faqs = getFaqs("home");
  const visibleReasons = getVisible(reasons);
  const secondary = getSecondaryContactAction();

  const scenes: Scene[] = hero.scenes
    .map((scene) => {
      const image = getVisibleImage(scene.image);
      return image
        ? {
            id: scene.id,
            label: scene.label,
            src: image.src,
            width: image.width,
            height: image.height,
          }
        : undefined;
    })
    .filter(present);

  const experienceItems: ExperienceItem[] = getVisible(experiences)
    .map((experience) => {
      const service = getService("services", experience.serviceSlug);
      const image = getVisibleImage(experience.image);
      if (!service || !image) return undefined;
      return {
        id: experience.id,
        title: experience.title,
        summary: experience.summary,
        includes: experience.includes,
        href: getServiceHref(service),
        image: { src: image.src, width: image.width, height: image.height },
      };
    })
    .filter(present);

  const manifestoFacts: Fact[] = [
    ...(facts.foundingYear
      ? [{ value: String(facts.foundingYear), label: "Founded as Viral Concepts Advertising LLC" }]
      : []),
    { value: String(serviceLines.length), label: "Service lines under one roof" },
    { value: String(processSteps.length), label: "Steps from first coffee to post-sale service" },
    ...(facts.reach.length > 0
      ? [{ value: String(facts.reach.length), label: "Countries — the UAE, KSA and Qatar" }]
      : []),
  ];

  const acts = runOfShow.acts
    .map((act) => {
      const image = getVisibleImage(act.image);
      return image ? { ...act, image: { src: image.src } } : undefined;
    })
    .filter(present);

  const picker = [
    ...getVisible(experiences)
      .filter((experience) => getService("services", experience.serviceSlug))
      .map((experience) => ({
        label: experience.title,
        href: contactRouteForService(experience.serviceSlug),
      })),
    ...(printService
      ? [{ label: "Branding & print", href: contactRouteForService(printService.slug) }]
      : []),
    { label: "Something else", href: routes.contact },
  ];

  const eventServices = serviceLines.filter((service) => service.slug !== "branding-printing");
  const doorImages = {
    events: getVisibleImage(eventPhotos.galaHall),
    print: getVisibleImage(eventPhotos.flagsSky),
  };

  const blocks: (PageBlock | undefined)[] = [
    {
      key: "manifesto",
      fixedTone: "surface",
      render: (tone: SectionTone) => (
        <Manifesto
          tone={tone}
          eyebrow={manifesto.eyebrow}
          parts={manifesto.parts}
          body={manifesto.body}
          facts={manifestoFacts}
        />
      ),
    },
    stats.length > 0
      ? { key: "stats", fixedTone: "brand", render: () => <StatsBand stats={stats} /> }
      : undefined,
    doorImages.events && doorImages.print
      ? {
          key: "doors",
          fixedTone: "light",
          render: (tone: SectionTone) => (
            <TwoDoors
              tone={tone}
              eyebrow={doors.eyebrow}
              title={doors.title}
              doors={[
                {
                  id: "events",
                  ...doors.events,
                  image: { src: doorImages.events?.src ?? "" },
                  items: eventServices.map((service) => ({
                    label: service.title,
                    href: getServiceHref(service),
                  })),
                  primary: { label: "Plan an event", href: PRIMARY_CTA.href },
                  secondary: { label: "Explore events", href: routes.services },
                },
                ...(printService
                  ? [
                      {
                        id: "print",
                        ...doors.print,
                        image: { src: doorImages.print?.src ?? "" },
                        items: products.slice(0, 6).map((category) => ({
                          label: category.title,
                          href: `${routes.products}#${category.id}`,
                        })),
                        primary: {
                          label: "Request a quote",
                          href: contactRouteForService(printService.slug),
                        },
                        secondary: { label: "Browse products", href: routes.products },
                      },
                    ]
                  : []),
              ]}
            />
          ),
        }
      : undefined,
    experienceItems.length > 0
      ? {
          key: "experiences",
          fixedTone: "night",
          render: (tone: SectionTone) => (
            <Section tone={tone} labelledBy="experiences-title" id="experiences">
              <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SectionHeader
                  id="experiences-title"
                  eyebrow={homeContent.experiences.eyebrow}
                  title={homeContent.experiences.title}
                  size="statement"
                  inverse
                  className="reveal"
                />
                <p className="max-w-sm text-white/75 reveal lg:pb-2">
                  {homeContent.experiences.intro}
                </p>
              </div>
              <ExperienceIndex items={experienceItems} />
            </Section>
          ),
        }
      : undefined,
    products.length > 0
      ? {
          key: "products",
          fixedTone: "surface",
          render: (tone: SectionTone) => (
            <Section tone={tone} labelledBy="products-preview-title">
              <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SectionHeader
                  id="products-preview-title"
                  eyebrow={productsPreview.eyebrow}
                  title={productsPreview.title}
                  intro={productsPreview.intro}
                  size="statement"
                  className="reveal"
                />
                <div className="shrink-0 reveal">
                  <ButtonLink href={routes.products} variant="secondary" icon="arrow-right">
                    All {products.length} categories
                  </ButtonLink>
                </div>
              </div>
              <ProductGrid categories={products.slice(0, 6)} headingLevel={3} itemLimit={4} />
            </Section>
          ),
        }
      : undefined,
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
    acts.length > 0
      ? {
          key: "run-of-show",
          fixedTone: "night",
          render: (tone: SectionTone) => (
            <Section tone={tone} spacing="none" container={false} labelledBy="run-of-show-title">
              <RunOfShow
                acts={acts}
                highlight={HIGHLIGHTED_PROCESS_STEP}
                header={
                  <SectionHeader
                    id="run-of-show-title"
                    eyebrow={runOfShow.eyebrow}
                    title={runOfShow.title}
                    intro={runOfShow.intro}
                    size="statement"
                    inverse
                  />
                }
              />
            </Section>
          ),
        }
      : undefined,
    projects.length > 0
      ? {
          key: "projects",
          render: (tone: SectionTone) => (
            <FeaturedProjects
              tone={tone}
              projects={projects}
              {...(hasProjectsPage() ? { allProjectsHref: routes.projects } : {})}
            />
          ),
        }
      : undefined,
    visibleReasons.length > 0
      ? {
          key: "why",
          render: (tone: SectionTone) => (
            <BuiltToDeliver
              tone={tone}
              eyebrow="Why Viral Concepts"
              title="Built to *deliver.*"
              reasons={visibleReasons}
            />
          ),
        }
      : undefined,
    testimonials.length > 0
      ? {
          key: "testimonials",
          render: (tone: SectionTone) => <Testimonials tone={tone} testimonials={testimonials} />,
        }
      : undefined,
    faqs.length > 0
      ? { key: "faq", render: (tone: SectionTone) => <FaqSection tone={tone} faqs={faqs} /> }
      : undefined,
    {
      key: "cta",
      fixedTone: "dark",
      render: () => (
        <CtaBand
          title={finalCta.title}
          lead={finalCta.lead}
          primary={{ label: "Plan your event", href: PRIMARY_CTA.href }}
          picker={{ label: finalCta.picker, options: picker }}
          {...(secondary ? { secondary } : {})}
        />
      ),
    },
  ];

  return (
    <>
      <ShowtimeHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        lead={hero.lead}
        scenes={scenes}
        credits={hero.credits}
        primaryCta={{ label: "Plan your event", href: PRIMARY_CTA.href }}
        secondaryCta={{ label: "Order branding & print", href: routes.products }}
      />
      <PageBlocks blocks={blocks} />
    </>
  );
}

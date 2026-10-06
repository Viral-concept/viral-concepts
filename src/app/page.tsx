import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureList } from "@/components/sections/FeatureList";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { DigitalBand } from "@/components/sections/home/DigitalBand";
import {
  FeaturedOfferings,
  type OfferingWithImage,
} from "@/components/sections/home/FeaturedOfferings";
import { FactsBand } from "@/components/sections/home/FactsBand";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { type PageBlock, PageBlocks } from "@/components/sections/PageBlocks";
import { WhoWeAre } from "@/components/sections/home/WhoWeAre";
import { AiShowcase } from "@/components/sections/AiShowcase";
import { IndustriesStrip } from "@/components/sections/IndustriesStrip";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { aiShowcase } from "@/content/ai-showcase";
import { homeContent } from "@/content/home";
import { processSteps } from "@/content/process";
import { site } from "@/content/site";
import {
  getCompanyFacts,
  getFaqs,
  getFeaturedProjects,
  getIndustries,
  getPillarsWithServices,
  getService,
  getServiceHref,
  getServices,
  getStats,
  getTestimonials,
  getVisible,
  getVisibleImage,
  hasIndustriesPage,
  hasProjectsPage,
  isPageVisible,
} from "@/lib/content";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import { buildMetadata, DEFAULT_TITLE } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { routes } from "@/lib/routes";
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
 * Homepage (Discovery doc, section E). Data is read through the content layer, sections without
 * content are left out entirely, and the remaining sections alternate backgrounds.
 */
export default function HomePage() {
  const { hero, whoWeAre, featuredOfferings, reasons, process, digital, finalCta } = homeContent;

  const heroImage = getVisibleImage(hero.image);
  const facts = getCompanyFacts();
  const serviceLines = getServices("services");
  const [aiBlock] = getVisible([aiShowcase]);

  const stats = getStats();
  const projects = getFeaturedProjects(6);
  const industries = getIndustries();
  const testimonials = getTestimonials();
  const faqs = getFaqs("home");
  const digitalServices = getServices("digital-solutions");
  const visibleReasons = getVisible(reasons);

  const offerings: OfferingWithImage[] = getVisible(featuredOfferings)
    .map((offering) => {
      const service = getService("services", offering.serviceSlug);
      if (!service) return undefined;
      const image = getVisibleImage(offering.image);
      return { offering, href: getServiceHref(service), ...(image ? { image } : {}) };
    })
    .filter(present);

  const ctaSecondary = getSecondaryContactAction();
  const aiServices = digitalServices.filter((service) => service.capability === "ai");
  const digitalItems = [
    ...hero.divisions.digital.items,
    ...(aiServices.length > 0 ? ["AI & automation"] : []),
  ];

  const blocks: (PageBlock | undefined)[] = [
    stats.length > 0
      ? { key: "stats", fixedTone: "brand" as const, render: () => <StatsBand stats={stats} /> }
      : {
          key: "facts",
          fixedTone: "night" as const,
          render: () => (
            <FactsBand
              ticker={hero.ticker}
              since={facts.foundingYear}
              facts={[
                { value: serviceLines.length, label: "Service lines under one roof" },
                ...(facts.reach.length > 0
                  ? [{ value: facts.reach.length, label: "Countries: UAE, KSA, Qatar" }]
                  : []),
                { value: processSteps.length, label: "Steps from brief to delivery" },
              ]}
            />
          ),
        },
    {
      key: "who",
      render: (tone: SectionTone) => (
        <WhoWeAre
          tone={tone}
          {...whoWeAre}
          foundingYear={getCompanyFacts().foundingYear}
          {...(isPageVisible("about") ? { aboutHref: routes.about } : {})}
        />
      ),
    },
    {
      key: "pillars",
      render: (tone: SectionTone) => (
        <PillarsSection tone={tone} pillars={getPillarsWithServices()} />
      ),
    },
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
    offerings.length > 0
      ? {
          key: "offerings",
          fixedTone: "night" as const,
          render: () => (
            <FeaturedOfferings
              {...homeContent.reel}
              items={offerings}
              allServicesHref={routes.services}
            />
          ),
        }
      : undefined,
    visibleReasons.length > 0
      ? {
          key: "why",
          render: (tone: SectionTone) => (
            <FeatureList
              tone={tone}
              id="why-us"
              eyebrow="Why Viral Concepts"
              title="Built to deliver"
              items={visibleReasons}
            />
          ),
        }
      : undefined,
    {
      key: "process",
      render: (tone: SectionTone) => <ProcessSection tone={tone} {...process} cta={PRIMARY_CTA} />,
    },
    digitalServices.length > 0
      ? {
          key: "digital",
          fixedTone: "night" as const,
          render: () => (
            <DigitalBand {...digital} services={digitalServices} href={routes.digitalSolutions} />
          ),
        }
      : undefined,
    aiBlock
      ? {
          key: "ai",
          fixedTone: "night" as const,
          render: () => <AiShowcase showcase={aiBlock} services={aiServices} />,
        }
      : undefined,
    industries.length > 0
      ? {
          key: "industries",
          render: (tone: SectionTone) => (
            <IndustriesStrip
              tone={tone}
              industries={industries}
              {...(hasIndustriesPage() ? { industriesHref: routes.industries } : {})}
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
      fixedTone: "dark" as const,
      render: () => (
        <CtaBand
          title={finalCta.title}
          lead={finalCta.lead}
          primary={{ label: "Start Your Project", href: PRIMARY_CTA.href }}
          {...(ctaSecondary ? { secondary: ctaSecondary } : {})}
        />
      ),
    },
  ];

  return (
    <>
      <HomeHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        lead={hero.lead}
        proofPoints={hero.proofPoints}
        {...(heroImage ? { image: heroImage } : {})}
        divisions={[
          { ...hero.divisions.events, href: routes.services, tone: "events" },
          {
            ...hero.divisions.digital,
            items: digitalItems,
            href: routes.digitalSolutions,
            tone: "digital",
          },
        ]}
        primaryCta={PRIMARY_CTA}
        secondaryCta={{ label: "Explore Services", href: routes.services }}
      />
      <PageBlocks blocks={blocks} />
    </>
  );
}

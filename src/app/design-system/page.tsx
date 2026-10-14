import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PillarCard } from "@/components/cards/PillarCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Field, Input, Select, Textarea } from "@/components/forms/FormField";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { HexWatermark, TitleRule, TricolourBar } from "@/components/ui/BrandMotifs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCounter } from "@/components/ui/StatCounter";
import { brandColors } from "@/config/brand";
import {
  getContentMode,
  getFaqs,
  getPillarsWithServices,
  getProjects,
  getServices,
  getStats,
} from "@/lib/content";
import { routes } from "@/lib/routes";

/**
 * Internal review page for the design system, using real content. Available only in preview
 * builds (Vercel previews or CONTENT_PREVIEW=true); production builds return 404. Never indexed
 * and never listed in the sitemap.
 */
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const swatches = Object.entries(brandColors);

export default function DesignSystemPage() {
  if (getContentMode() !== "preview") notFound();

  const services = getServices();
  const pillars = getPillarsWithServices();
  const projects = getProjects().slice(0, 3);
  const stats = getStats();
  const faqs = getFaqs("home");

  return (
    <>
      <Section tone="surface" spacing="compact" pattern labelledBy="ds-title">
        <Breadcrumbs
          items={[
            { label: "Home", href: routes.home },
            { label: "Design system", href: "/design-system" },
          ]}
          className="mb-6"
        />
        <SectionHeader
          level={1}
          id="ds-title"
          eyebrow="Internal · preview only"
          title="Viral Concepts design system"
          intro="Tokens and components from Stage 2, rendered with real content. Items marked in yellow are visible only in preview builds."
        />
      </Section>

      <Section labelledBy="ds-colour">
        <SectionHeader id="ds-colour" eyebrow="Tokens" title="Colour" />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map(([name, hex]) => (
            <li key={name} className="overflow-hidden rounded-card border border-line">
              <span className="block h-20" style={{ backgroundColor: hex }} />
              <span className="block p-3 text-sm">
                <span className="block font-semibold">{name}</span>
                <span className="text-muted">{hex}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="ds-type">
        <SectionHeader id="ds-type" eyebrow="Tokens" title="Typography" />
        <div className="mt-10 flex flex-col gap-6">
          <p className="font-display text-display">Display · Built to Spread!</p>
          <p className="font-display text-h1">Heading 1 · Event production</p>
          <p className="font-display text-h2">Heading 2 · Exhibition stands</p>
          <p className="font-display text-h3">Heading 3 · Large format printing</p>
          <p className="text-lead text-muted">
            Lead · From concept to fabrication to the final install, produced in-house in Dubai.
          </p>
          <p className="max-w-prose">
            Body · We transform your key messages into creative visuals that speak to your audience,
            with a large format digital print setup and a digital fabric print setup.
          </p>
          <p className="text-eyebrow text-teal-600 uppercase">Eyebrow · Our services</p>
        </div>
      </Section>

      <Section labelledBy="ds-brand">
        <SectionHeader id="ds-brand" eyebrow="Brand" title="Logo and motifs" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="grid place-items-center rounded-card border border-line p-10">
            <Logo className="h-12" />
          </div>
          <div className="grid place-items-center rounded-card bg-teal-800 p-10">
            <Logo variant="white" className="h-12" />
          </div>
        </div>
        <div className="relative mt-6 flex flex-col gap-4 overflow-hidden rounded-card bg-surface p-10 text-teal-200">
          <HexWatermark className="-top-16 -right-10 w-64" />
          <TitleRule />
          <TricolourBar className="max-w-md" />
        </div>
      </Section>

      <Section tone="surface" labelledBy="ds-buttons">
        <SectionHeader id="ds-buttons" eyebrow="Components" title="Buttons and badges" />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href={routes.contact} icon="arrow-right" size="lg">
            Start a Project
          </ButtonLink>
          <ButtonLink href={routes.services} variant="secondary">
            Explore Services
          </ButtonLink>
          <ButtonLink href={routes.projects} variant="quiet">
            View all projects
          </ButtonLink>
          <Button leadingIcon="phone" variant="secondary">
            Button (action)
          </Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge>Exhibitions</Badge>
          <Badge tone="outline">Dubai</Badge>
          <Badge tone="review">Proposed · not live</Badge>
        </div>
      </Section>

      <Section tone="brand" pattern labelledBy="ds-dark">
        <SectionHeader
          id="ds-dark"
          inverse
          eyebrow="On dark"
          title="Take your brand beyond the physical world"
          intro="Inverse header, buttons and stats on the brand teal background."
        />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href={routes.contact} icon="arrow-right">
            Start a Project
          </ButtonLink>
          <ButtonLink href={routes.products} variant="inverse">
            Explore branding & print
          </ButtonLink>
          <ButtonLink href={routes.about} variant="quietInverse">
            About Viral Concepts
          </ButtonLink>
        </div>
        {stats.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inverse
              />
            ))}
          </div>
        ) : null}
      </Section>

      <Section labelledBy="ds-pillars">
        <SectionHeader id="ds-pillars" eyebrow="Cards" title="Pillars" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              services={pillar.services}
              index={index + 1}
              cta={{ label: "Explore services", href: routes.services }}
            />
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy="ds-services">
        <SectionHeader id="ds-services" eyebrow="Cards" title="Services" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section labelledBy="ds-projects">
        <SectionHeader
          id="ds-projects"
          eyebrow="Cards"
          title="Projects"
          intro="Draft candidates without verified photos show the branded panel, never a stock image."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section tone="surface" labelledBy="ds-process">
        <SectionHeader id="ds-process" eyebrow="Sections" title="Our process" />
        <ProcessSteps className="mt-10" />
      </Section>

      <Section labelledBy="ds-faq" container="prose">
        <SectionHeader id="ds-faq" eyebrow="Components" title="Accordion" />
        <Accordion
          className="mt-10"
          items={faqs.map((faq) => ({ id: faq.id, title: faq.question, content: faq.answer }))}
        />
      </Section>

      <Section tone="surface" labelledBy="ds-form" container="prose">
        <SectionHeader id="ds-form" eyebrow="Components" title="Form fields" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Field id="ds-name" label="Full name" required>
            {(control) => <Input autoComplete="name" {...control} />}
          </Field>
          <Field id="ds-company" label="Company">
            {(control) => <Input autoComplete="organization" {...control} />}
          </Field>
          <Field
            id="ds-email"
            label="Email"
            required
            error="Enter an email address, like name@company.com"
          >
            {(control) => <Input type="email" autoComplete="email" {...control} />}
          </Field>
          <Field id="ds-service" label="Service of interest" required>
            {(control) => (
              <Select defaultValue="" {...control}>
                <option value="" disabled>
                  Choose a service
                </option>
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </Select>
            )}
          </Field>
          <Field
            id="ds-message"
            label="Message"
            required
            hint="Dates, venue, quantities — anything that helps us quote."
            className="sm:col-span-2"
          >
            {(control) => <Textarea {...control} />}
          </Field>
        </div>
      </Section>
    </>
  );
}

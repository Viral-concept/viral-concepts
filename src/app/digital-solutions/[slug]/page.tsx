import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePage } from "@/components/templates/ServicePage";
import { getServicePage, getServicePages } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { routes, serviceRoute } from "@/lib/routes";

/**
 * /digital-solutions/[slug]. Only services whose page copy is visible in this deployment are
 * generated; every other slug (including proposed services, and the four source-backed
 * services until their copy is approved) returns 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getServicePages("digital-solutions").map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/digital-solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage("digital-solutions", slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: serviceRoute(service),
  });
}

export default async function DigitalServiceRoute({
  params,
}: PageProps<"/digital-solutions/[slug]">) {
  const { slug } = await params;
  const service = getServicePage("digital-solutions", slug);
  if (!service) notFound();
  return (
    <ServicePage
      service={service}
      parent={{ label: "Digital Solutions", href: routes.digitalSolutions }}
    />
  );
}

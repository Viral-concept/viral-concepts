import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePage } from "@/components/templates/ServicePage";
import { getServicePage, getServicePages } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { routes, serviceRoute } from "@/lib/routes";

/** Only services visible in this deployment are generated; any other slug is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getServicePages("services").map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage("services", slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: serviceRoute(service),
  });
}

export default async function ServiceRoute({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServicePage("services", slug);
  if (!service) notFound();
  return <ServicePage service={service} parent={{ label: "Services", href: routes.services }} />;
}

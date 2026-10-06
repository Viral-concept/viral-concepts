import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getServiceHref } from "@/lib/content";
import type { Service } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/**
 * Every sub-service, grouped under its service and linking to that service's page — the
 * "everything under one roof" view, and strong internal linking for search.
 */
interface CapabilityIndexProps {
  readonly tone: SectionTone;
  readonly services: readonly Service[];
}

export function CapabilityIndex({ tone, services }: CapabilityIndexProps) {
  return (
    <Section tone={tone} labelledBy="capabilities-title">
      <SectionHeader
        id="capabilities-title"
        eyebrow="Under one roof"
        title="Everything we deliver"
        intro="Every capability listed in our company profile, grouped by service."
      />
      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <section key={service.slug} aria-labelledby={`cap-${service.slug}`} className="reveal">
            <h3 id={`cap-${service.slug}`} className="text-h3">
              <Link
                href={getServiceHref(service)}
                className="text-ink underline-offset-4 hover:text-teal-800 hover:underline"
              >
                {service.title}
              </Link>
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.offerings
                .flatMap((group) => group.items)
                .map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}

import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { legalDocuments, type LegalDocument, type LegalKey } from "@/content/legal";
import { isPageVisible } from "@/lib/content";
import { routes } from "@/lib/routes";

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" });

/** Privacy Policy and Terms. Hidden in production until the client's text is in place. */
export function LegalPage({ documentKey }: { readonly documentKey: LegalKey }) {
  if (!isPageVisible(documentKey)) notFound();
  const doc: LegalDocument = legalDocuments[documentKey];
  const href = documentKey === "privacyPolicy" ? routes.privacyPolicy : routes.terms;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: doc.title, href },
        ]}
        title={doc.title}
        {...(doc.updatedOn
          ? { lead: `Last updated ${dateFormat.format(new Date(doc.updatedOn))}.` }
          : {})}
      />
      <Section tone="light" labelledBy="legal-body-title">
        <h2 id="legal-body-title" className="sr-only">
          {doc.title}
        </h2>
        {doc.sections.length === 0 ? (
          // Preview only: the page cannot be published without the client's text.
          <div className="flex max-w-prose flex-col gap-3 rounded-card border-2 border-yellow-400 bg-white p-6">
            <Badge tone="review" className="self-start">
              Needed before publishing
            </Badge>
            <p className="text-ink">
              The client&apos;s {doc.title.toLowerCase()} text, or approval of a drafted version by
              their adviser (checklist #8).
            </p>
          </div>
        ) : (
          <div className="flex max-w-prose flex-col gap-10">
            {doc.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-4">
                <h3 className="text-h3 text-ink">{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

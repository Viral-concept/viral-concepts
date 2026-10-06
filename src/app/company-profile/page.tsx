import { notFound } from "next/navigation";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { companyProfileContent } from "@/content/company-profile";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import { getCompanyProfileDownload, getVisibleImage, isPageVisible } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { PRIMARY_CTA } from "@/lib/navigation";
import { routes } from "@/lib/routes";

export const metadata = buildMetadata({
  title: companyProfileContent.seo.title,
  description: companyProfileContent.seo.description,
  path: routes.companyProfile,
});

function formatSize(bytes: number): string {
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

/**
 * /company-profile: hero with the cover → download (file size and page count shown, as the
 * Discovery doc asks) → what's inside → CTA.
 *
 * The download is a plain <a download>, not next/link: a client-side link would prefetch a
 * multi-megabyte PDF. The page exists only once the client approves the web-optimised file.
 */
export default function CompanyProfilePage() {
  if (!isPageVisible("companyProfile")) notFound();

  const content = companyProfileContent;
  const download = getCompanyProfileDownload();
  const cover = getVisibleImage(content.cover);
  const secondary = getSecondaryContactAction();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Company Profile", href: routes.companyProfile },
        ]}
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        {...(cover ? { image: cover } : {})}
        actions={
          download ? (
            <div className="flex flex-col gap-2">
              <a href={download.value.href} download className={buttonClasses("primary", "lg")}>
                <Icon name="download" className="size-5" />
                Download PDF
              </a>
              <p className="text-sm text-muted">
                PDF · {formatSize(download.value.bytes)} · {download.value.pages} pages
              </p>
            </div>
          ) : (
            // Preview only: the page cannot be published without an approved file.
            <div className="flex flex-col gap-2 rounded-card border-2 border-yellow-400 bg-white p-5">
              <Badge tone="review" className="self-start">
                Needed before publishing
              </Badge>
              <p className="text-ink">
                A web-optimised PDF (≤ 5 MB) approved by Viral Concepts. The download button appears
                here once it is added.
              </p>
            </div>
          )
        }
      />

      <Section tone="light" labelledBy="profile-contents-title">
        <SectionHeader
          id="profile-contents-title"
          eyebrow="What’s inside"
          title="Everything about Viral Concepts, in one document"
        />
        <ol className="mt-12 grid gap-x-10 border-t border-line md:grid-cols-2">
          {content.contents.map((entry) => (
            <li
              key={entry.title}
              className="flex items-baseline justify-between gap-6 border-b border-line py-4"
            >
              <span className="font-semibold text-ink">{entry.title}</span>
              <span className="shrink-0 text-sm text-muted">p. {entry.pages}</span>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Prefer to talk it through?"
        lead="Tell us about your event, exhibition or campaign — we’ll roll it out for you."
        primary={{ label: "Start Your Project", href: PRIMARY_CTA.href }}
        {...(secondary ? { secondary } : {})}
      />
    </>
  );
}

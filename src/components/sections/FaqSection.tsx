import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqJsonLd } from "@/lib/structured-data";
import type { Faq } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/**
 * Frequently asked questions (homepage and service pages). Answers are visible in the HTML, so
 * FAQPage structured data can describe exactly what users see (added in the SEO stage).
 */
interface FaqSectionProps {
  readonly tone: SectionTone;
  readonly faqs: readonly Faq[];
  readonly title?: string;
}

export function FaqSection({ tone, faqs, title = "Frequently asked questions" }: FaqSectionProps) {
  return (
    <Section tone={tone} labelledBy="faq-title">
      {/* Marks up exactly the questions shown below — answers are visible, not hidden. */}
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeader id="faq-title" eyebrow="FAQ" title={title} className="lg:col-span-4" />
        <Accordion
          className="lg:col-span-8"
          exclusive
          groupName="faq"
          items={faqs.map((faq) => ({
            id: faq.id,
            title: faq.question,
            content: faq.answer,
            badge: <ReviewFlag item={faq} />,
          }))}
        />
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/types/content";
import type { SectionTone } from "@/types/ui";

/**
 * Client testimonials. Pages render this only with real, permission-backed quotes; there is
 * no placeholder state on the live site.
 */
interface TestimonialsProps {
  readonly tone: SectionTone;
  readonly testimonials: readonly Testimonial[];
}

export function Testimonials({ tone, testimonials }: TestimonialsProps) {
  return (
    <Section tone={tone} labelledBy="testimonials-title">
      <SectionHeader id="testimonials-title" eyebrow="Testimonials" title="What our clients say" />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id} className="reveal">
            <figure className="flex h-full flex-col gap-6 rounded-card bg-white p-7 shadow-card">
              <blockquote className="text-lead text-ink">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-auto text-sm">
                <span className="block font-semibold text-ink">{testimonial.personName}</span>
                <span className="text-muted">
                  {testimonial.personRole}, {testimonial.company}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

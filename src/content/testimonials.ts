import type { Testimonial } from "@/types/content";

/**
 * No testimonials have been supplied (checklist #23). The testimonials section does not render
 * while this list has no publishable entries. Each entry needs the exact quote, the person's
 * name, role and company, and written permission to publish.
 */
export const testimonials: readonly Testimonial[] = [];

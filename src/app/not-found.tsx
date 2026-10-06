import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

// Next.js adds `noindex` to not-found responses itself.
export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:py-32">
      <p className="text-eyebrow text-teal-600 uppercase">Error 404</p>
      <h1 className="text-h1 text-ink">We couldn’t find that page.</h1>
      <p className="max-w-prose text-lead text-muted">
        The link may be out of date, or the page may have moved. These pages can help you get back
        on track.
      </p>
      <nav aria-label="Helpful links">
        <ul className="flex flex-wrap gap-3">
          <li>
            <ButtonLink href={routes.home}>Go to the homepage</ButtonLink>
          </li>
          <li>
            <ButtonLink href={routes.contact} variant="secondary">
              Contact us
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}

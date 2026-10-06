"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

interface ErrorBoundaryProps {
  readonly error: Error & { digest?: string };
  readonly retry: () => void;
}

/**
 * Route-level error boundary. Server errors arrive with a generic message and a `digest`
 * that matches the server log, so the digest is shown as a support reference.
 */
export default function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <section
      role="alert"
      className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:py-32"
    >
      <h1 className="text-h1 text-ink">Something went wrong.</h1>
      <p className="max-w-prose text-lead text-muted">
        This page didn’t load properly. Please try again — if it keeps happening, contact us and
        we’ll help directly.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={retry}>Try again</Button>
        <ButtonLink href={routes.contact} variant="secondary">
          Contact us
        </ButtonLink>
      </div>
      {error.digest ? <p className="text-sm text-muted">Reference: {error.digest}</p> : null}
    </section>
  );
}

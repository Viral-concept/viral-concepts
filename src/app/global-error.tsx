"use client";

import { brandColors } from "@/config/brand";

interface GlobalErrorProps {
  readonly error: Error & { digest?: string };
  readonly retry: () => void;
}

/**
 * Last-resort boundary for failures in the root layout. It replaces the whole document, so it
 * cannot rely on global CSS or fonts and uses inline styles from the brand palette instead.
 */
export default function GlobalError({ error, retry }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          color: brandColors.ink,
          background: brandColors.surface,
          padding: "1.5rem",
        }}
      >
        <title>Something went wrong | Viral Concepts</title>
        <main role="alert" style={{ maxWidth: "36rem" }}>
          <h1 style={{ fontSize: "2rem", margin: "0 0 1rem" }}>Something went wrong.</h1>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.6, margin: "0 0 1.5rem" }}>
            The website couldn’t load. Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={retry}
            style={{
              minHeight: "44px",
              padding: "0 1.25rem",
              border: 0,
              borderRadius: "6px",
              background: brandColors.yellow400,
              color: brandColors.ink,
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {error.digest ? (
            <p style={{ fontSize: "0.875rem", marginTop: "1.5rem" }}>Reference: {error.digest}</p>
          ) : null}
        </main>
      </body>
    </html>
  );
}

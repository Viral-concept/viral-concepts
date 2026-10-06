import { serializeJsonLd, type JsonLdObject } from "@/lib/structured-data";

/** Renders schema.org data as a JSON-LD script (server-side, no JavaScript shipped). */
export function JsonLd({ data }: { readonly data: JsonLdObject | readonly JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      // Safe: serializeJsonLd escapes "<", so the payload cannot break out of the script tag.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

import { LegalPage } from "@/components/templates/LegalPage";
import { legalDocuments } from "@/content/legal";
import { buildMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata = buildMetadata({
  title: legalDocuments.terms.title,
  description: legalDocuments.terms.description,
  path: routes.terms,
});

export default function Page() {
  return <LegalPage documentKey="terms" />;
}

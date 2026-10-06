import { LegalPage } from "@/components/templates/LegalPage";
import { legalDocuments } from "@/content/legal";
import { buildMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata = buildMetadata({
  title: legalDocuments.privacyPolicy.title,
  description: legalDocuments.privacyPolicy.description,
  path: routes.privacyPolicy,
});

export default function Page() {
  return <LegalPage documentKey="privacyPolicy" />;
}

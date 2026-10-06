/**
 * Copy for /industries. The page exists only once the client has validated at least one
 * industry (checklist #24); until then it returns 404 in production.
 */
export const industriesLanding = {
  eyebrow: "Industries",
  title: "Industries we work with",
  lead: "Events, exhibitions, branding and décor for organisations in these sectors.",
  seo: {
    title: "Industries We Serve",
    description:
      "The sectors Viral Concepts produces events, exhibitions, branding and décor for, with related projects.",
  },
  cta: {
    title: "Don’t see your sector?",
    lead: "Tell us about your event or campaign — we’ll roll it out for you.",
  },
} as const;

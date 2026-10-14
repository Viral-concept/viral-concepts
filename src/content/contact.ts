/**
 * Copy for /contact. The "what happens next" steps are the first four of the Company Profile's
 * process (CP p.34), each with a one-line description; no response times are promised.
 */
export const contactContent = {
  eyebrow: "Contact",
  title: "Tell us about *your event.*",
  lead: "An event, an exhibition stand, or flags, signage and print for your brand — tell us what you have in mind and we’ll roll it out for you.",
  formTitle: "Send us your brief",
  formIntro: "Three quick steps. The more you tell us, the better our first conversation.",
  channelsTitle: "Talk to us",
  /** CP p.3 (Dubai production house) and p.35 (reach). */
  reach: "Based in Dubai, working across the UAE, KSA and Qatar.",
  nextSteps: {
    title: "What happens next",
    steps: [
      { title: "Coffee", body: "We talk through your brief, in person or online." },
      { title: "Analysis", body: "We look at the scope, the audience and your goals." },
      { title: "Design", body: "We shape the concept, the visuals and the plan." },
      { title: "Proposal", body: "You receive a clear scope to review." },
    ],
  },
  unavailable:
    "Our online form is not available right now. Please call or email us — we’ll be glad to help.",
  seo: {
    /** Contains the brand, so it is used without the site suffix. */
    title: "Contact Viral Concepts – Start a Project",
    description:
      "Tell us about your event, exhibition, activation or printing job. Call, email or send a brief and our Dubai team will respond.",
  },
} as const;

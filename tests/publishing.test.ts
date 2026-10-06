import { describe, expect, it } from "vitest";

import { companyProfile, ownerApproved, pexels, proposed, template } from "@/content/sources";
import {
  filterVisible,
  isProofImage,
  isPublishable,
  isServicePageVisible,
  isVisible,
  needsReviewBanner,
} from "@/lib/publishing";
import type { Governed, ImageAsset } from "@/types/content";

const live: Governed = { status: "live", verified: true, source: companyProfile(3) };
const confirmed: Governed = {
  status: "live",
  verified: true,
  source: { kind: "client-confirmed", confirmedOn: "2026-10-01" },
};
const ownerLive: Governed = {
  status: "live",
  verified: true,
  source: ownerApproved("2026-10-06"),
};
const ownerUnverified: Governed = {
  status: "live",
  verified: false,
  source: ownerApproved("2026-10-06"),
};
const unverified: Governed = { status: "live", verified: false, source: companyProfile(3) };
const draft: Governed = { status: "draft", verified: true, source: companyProfile(3) };
const proposal: Governed = { status: "proposed", verified: false, source: proposed() };
const templateLive: Governed = { status: "live", verified: true, source: template() };
const proposedLive: Governed = { status: "live", verified: true, source: proposed() };

describe("isPublishable", () => {
  it("accepts live, verified items from trusted sources", () => {
    expect(isPublishable(live)).toBe(true);
    expect(isPublishable(confirmed)).toBe(true);
    expect(isPublishable(ownerLive)).toBe(true);
  });

  it("still requires owner-approved items to be live and verified", () => {
    expect(isPublishable(ownerUnverified)).toBe(false);
    expect(isPublishable({ ...ownerLive, status: "proposed" })).toBe(false);
  });

  it("never treats a licensed stock photo as proof of delivered work", () => {
    const stock: ImageAsset = {
      src: "https://images.pexels.com/photos/1/pexels-photo-1.jpeg",
      alt: "A laptop on a desk",
      width: 1600,
      height: 1067,
      kind: "stock-photo",
      status: "live",
      verified: true,
      source: pexels("https://www.pexels.com/photo/laptop-1/", "Photographer"),
    };
    expect(isPublishable(stock)).toBe(true);
    expect(isProofImage(stock)).toBe(false);
  });

  it("rejects anything unverified, not live, or from an untrusted source", () => {
    expect(isPublishable(unverified)).toBe(false);
    expect(isPublishable(draft)).toBe(false);
    expect(isPublishable(proposal)).toBe(false);
    expect(isPublishable(templateLive)).toBe(false);
    expect(isPublishable(proposedLive)).toBe(false);
  });
});

describe("isVisible", () => {
  it("shows only publishable content in production", () => {
    expect(filterVisible([live, draft, proposal, templateLive], "production")).toEqual([live]);
  });

  it("shows proposed and draft content in preview, but never template placeholders", () => {
    expect(isVisible(draft, "preview")).toBe(true);
    expect(isVisible(proposal, "preview")).toBe(true);
    expect(isVisible(templateLive, "preview")).toBe(false);
  });

  it("flags non-publishable visible content for a review banner", () => {
    expect(needsReviewBanner(proposal)).toBe(true);
    expect(needsReviewBanner(live)).toBe(false);
  });
});

describe("isProofImage", () => {
  const base = {
    src: "/images/projects/example/photo.avif",
    alt: "Exhibition stand",
    width: 1600,
    height: 1067,
  } as const;

  it("accepts only publishable project photos", () => {
    const photo: ImageAsset = { ...base, ...live, kind: "project-photo" };
    const render: ImageAsset = { ...base, ...live, kind: "render" };
    const unverifiedPhoto: ImageAsset = { ...base, ...unverified, kind: "project-photo" };

    expect(isProofImage(photo)).toBe(true);
    expect(isProofImage(render)).toBe(false);
    expect(isProofImage(unverifiedPhoto)).toBe(false);
  });
});

describe("isServicePageVisible", () => {
  const live: Governed = { status: "live", verified: true, source: companyProfile(23) };
  const draft: Governed = { status: "proposed", verified: false, source: proposed() };

  it("needs page content", () => {
    expect(isServicePageVisible({ ...live }, "preview")).toBe(false);
  });

  it("hides a live service's draft page in production but shows it in preview", () => {
    const service = { ...live, page: draft };
    expect(isServicePageVisible(service, "production")).toBe(false);
    expect(isServicePageVisible(service, "preview")).toBe(true);
  });

  it("hides a proposed service's page in production even if its copy were live", () => {
    expect(isServicePageVisible({ ...draft, page: live }, "production")).toBe(false);
  });

  it("shows a live service with live page copy everywhere", () => {
    expect(isServicePageVisible({ ...live, page: live }, "production")).toBe(true);
  });
});

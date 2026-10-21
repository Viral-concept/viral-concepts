import { ProjectGallery, type GalleryImage } from "@/components/projects/ProjectGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageBlocks } from "@/components/sections/PageBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { workPhotos } from "@/content/work-photos";
import { getSecondaryContactAction } from "@/lib/contact-actions";
import {
  getPillarsWithServices,
  getServiceHref,
  getServiceScenes,
  getVisibleImage,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";
import type { ImageAsset, Service } from "@/types/content";
import type { SectionTone } from "@/types/ui";

export const metadata = buildMetadata({
  title: "Photo Gallery — Our Work in Dubai",
  description:
    "Photos of our work across the UAE: branded police barriers, Heras fencing, tents, event furniture, flags, fabric printing, signage and festive lighting.",
  path: routes.gallery,
});

/** Photos shown per service, at most. Services with fewer than the minimum are left out. */
const MAX_PER_SERVICE = 6;
const MIN_PER_SERVICE = 2;

/**
 * Broad services (rentals overall, branding & printing overall) reuse photos from the specific
 * services. They pick last, so the same photo isn't shown twice on the page.
 */
const BROAD_SERVICES = new Set(["event-rentals-entertainment", "branding-printing"]);

interface GalleryGroup {
  readonly service: Service;
  readonly pillarTitle: string;
  readonly images: readonly GalleryImage[];
}

function toGalleryImage({ src, alt, width, height }: ImageAsset): GalleryImage {
  return { src, alt, width, height };
}

/**
 * Builds the gallery from the client's own photos only (`kind: "project-photo"`). Stock photos
 * are never shown here, because this page presents the company's real work.
 */
function getGalleryGroups(): GalleryGroup[] {
  const entries = getPillarsWithServices().flatMap((pillar) =>
    pillar.services.map((service) => ({ service, pillarTitle: pillar.title })),
  );
  const pickOrder = [
    ...entries.filter(({ service }) => !BROAD_SERVICES.has(service.slug)),
    ...entries.filter(({ service }) => BROAD_SERVICES.has(service.slug)),
  ];

  const used = new Set<string>();
  const picks = new Map<string, ImageAsset[]>();

  for (const { service } of pickOrder) {
    const candidates = [getVisibleImage(service.heroImage), ...getServiceScenes(service)]
      .filter((image): image is ImageAsset => image?.kind === "project-photo")
      .filter((image, index, all) => all.findIndex((other) => other.src === image.src) === index);

    const fresh = candidates.filter((image) => !used.has(image.src));
    const chosen = fresh.slice(0, MAX_PER_SERVICE);
    // Top up from photos used elsewhere only when a service would otherwise drop out.
    if (chosen.length < MIN_PER_SERVICE) {
      chosen.push(
        ...candidates
          .filter((image) => used.has(image.src))
          .slice(0, MIN_PER_SERVICE - chosen.length),
      );
    }
    chosen.forEach((image) => used.add(image.src));
    picks.set(service.slug, chosen);
  }

  return entries.flatMap(({ service, pillarTitle }) => {
    const images = picks.get(service.slug) ?? [];
    return images.length >= MIN_PER_SERVICE
      ? [{ service, pillarTitle, images: images.map(toGalleryImage) }]
      : [];
  });
}

/**
 * /gallery — the client's photos, grouped by service: hero → a jump list of services → one
 * section per service (photos open in a lightbox) → finale. Built from the same content as the
 * service pages, so adding a photo to a service in `content/service-scenes.ts` adds it here.
 */
export default function GalleryPage() {
  const groups = getGalleryGroups();
  const photoCount = groups.reduce((sum, group) => sum + group.images.length, 0);
  const secondary = getSecondaryContactAction();
  const heroImage = getVisibleImage(workPhotos.pagodaTentsNight);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Gallery", href: routes.gallery },
        ]}
        eyebrow="Gallery"
        title="Our work, *in the field.*"
        lead="Barriers, fences, tents, furniture, flags, signage and festive lighting — produced, printed and installed by our own team across the UAE."
        {...(heroImage
          ? { image: heroImage, credits: [`${groups.length} services`, `${photoCount} photos`] }
          : {})}
        actions={
          <>
            <ButtonLink href="#gallery-services" size="lg" icon="arrow-right">
              Browse the gallery
            </ButtonLink>
            <ButtonLink href={routes.services} size="lg" variant="inverse">
              All services
            </ButtonLink>
          </>
        }
      />

      <PageBlocks
        blocks={[
          {
            key: "index",
            fixedTone: "surface",
            render: (tone: SectionTone) => (
              <Section tone={tone} labelledBy="gallery-index-title" id="gallery-services">
                <SectionHeader
                  id="gallery-index-title"
                  eyebrow="Browse by service"
                  title={`${groups.length} services, *${photoCount} photos.*`}
                  intro="Choose a service to jump to its photos. Tap any photo to see it larger."
                  className="mb-8 reveal"
                />
                <nav aria-label="Gallery services" className="reveal">
                  <ul className="flex flex-wrap gap-2">
                    {groups.map(({ service, images }) => (
                      <li key={service.slug}>
                        <a
                          href={`#${service.slug}`}
                          className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-teal-800 hover:bg-tint"
                        >
                          {service.title}
                          <span className="ml-2 text-muted">{images.length}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Section>
            ),
          },
          ...groups.map(({ service, pillarTitle, images }) => ({
            key: service.slug,
            render: (tone: SectionTone) => (
              <Section tone={tone} labelledBy={`${service.slug}-title`} id={service.slug}>
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <SectionHeader
                    id={`${service.slug}-title`}
                    eyebrow={pillarTitle}
                    title={service.title}
                    className="reveal"
                  />
                  <ButtonLink
                    href={getServiceHref(service)}
                    variant="quiet"
                    icon="arrow-right"
                    className="shrink-0 self-start sm:self-auto"
                  >
                    View service
                  </ButtonLink>
                </div>
                <ProjectGallery images={images} title={service.title} dense />
              </Section>
            ),
          })),
          {
            key: "cta",
            fixedTone: "dark",
            render: () => (
              <CtaBand
                eyebrow="Ready when you are"
                title="Like what you *see?*"
                lead="Tell us your date, venue and what you need — we'll come back with a plan and a quote."
                primary={{ label: "Plan your event", href: routes.contact }}
                {...(secondary ? { secondary } : {})}
              />
            ),
          },
        ]}
      />
    </>
  );
}

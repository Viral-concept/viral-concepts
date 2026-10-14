import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { ReviewFlag } from "@/components/ui/ReviewFlag";
import { productOptionValue, type ProductCategory } from "@/content/products";
import { getVisibleImage } from "@/lib/content";
import { contactRouteForService } from "@/lib/routes";

/**
 * The branding & print catalogue as cards: photo, what the category covers, every product in
 * it, and a quote link that opens the brief form with the category already chosen.
 * Each card carries `id={category.id}`, so menu links (/products#flags) land on it.
 */
interface ProductGridProps {
  readonly categories: readonly ProductCategory[];
  /** h2 on the catalogue page, h3 where the grid sits under a section heading. */
  readonly headingLevel?: 2 | 3;
  /** Show every product in a category (catalogue) or the first few (previews). */
  readonly itemLimit?: number;
}

export function ProductGrid({ categories, headingLevel = 2, itemLimit }: ProductGridProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <ul className="grid gap-6 reveal-stagger sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => {
        const image = getVisibleImage(category.image);
        const items = itemLimit ? category.items.slice(0, itemLimit) : category.items;
        const more = category.items.length - items.length;
        return (
          <li
            key={category.id}
            id={category.id}
            className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-media border border-line bg-white shadow-card reveal transition-[translate,box-shadow] duration-(--duration-slow) ease-(--ease-brand) hover:-translate-y-1 hover:shadow-raised"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-night-soft">
              {image ? (
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-[scale] duration-[1400ms] ease-(--ease-brand) group-hover:scale-105"
                />
              ) : null}
              <span aria-hidden="true" className="absolute inset-0 opacity-60 shade-floor" />
              <span className="absolute top-4 left-4 rounded-full bg-stage/70 px-3 py-1 font-display text-xs font-semibold text-white [font-stretch:125%] backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
              <ReviewFlag item={category} className="self-start" />
              <Heading className="text-h3 text-ink">{category.title}</Heading>
              <p className="text-muted">{category.summary}</p>
              <ul className="flex flex-wrap gap-1.5" aria-label={`${category.title} we produce`}>
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line-strong px-2.5 py-1 text-sm text-ink"
                  >
                    {item}
                  </li>
                ))}
                {more > 0 ? (
                  <li className="rounded-full px-2.5 py-1 text-sm text-muted">+{more} more</li>
                ) : null}
              </ul>
              <Link
                href={contactRouteForService(productOptionValue(category.id))}
                className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-2 font-semibold text-teal-800 after:absolute after:inset-0 after:content-[''] hover:underline"
              >
                Get a quote
                <span className="sr-only"> for {category.title.toLowerCase()}</span>
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-(--duration-base) group-hover:translate-x-1"
                />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

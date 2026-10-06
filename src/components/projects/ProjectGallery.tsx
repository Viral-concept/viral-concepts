"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

/**
 * Project photo gallery with a lightbox on the native <dialog> element: the browser provides
 * the modal behaviour (focus trap, Escape to close, inert background, focus returned to the
 * thumbnail). Arrow keys move between photos. Thumbnails are buttons, so without JavaScript the
 * grid is still a complete, readable gallery.
 */
export interface GalleryImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** Shown in preview builds for unapproved photos. */
  readonly reviewLabel?: string;
}

interface ProjectGalleryProps {
  readonly images: readonly GalleryImage[];
  readonly title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = images[index];
  const many = images.length > 1;

  function open(at: number) {
    setIndex(at);
    dialogRef.current?.showModal();
  }

  function step(by: number) {
    setIndex((i) => (i + by + images.length) % images.length);
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, i) => (
          <li key={image.src} className="relative">
            <button
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              className="group relative block aspect-4/3 w-full overflow-hidden rounded-media bg-teal-800"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="size-full object-cover transition-transform duration-(--duration-slow) ease-(--ease-brand) group-hover:scale-104"
              />
              <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-ink/75 text-white">
                <Icon name="expand" className="size-5" />
                <span className="sr-only">View larger</span>
              </span>
            </button>
            {image.reviewLabel ? (
              <Badge tone="review" className="absolute top-3 left-3">
                {image.reviewLabel}
              </Badge>
            ) : null}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title}: photo ${index + 1} of ${images.length}`}
        onKeyDown={(event) => {
          if (!many) return;
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        // A click on the backdrop (the dialog element itself) closes it.
        onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-ink/90"
      >
        {current ? (
          <figure className="flex max-h-[90dvh] w-[min(92vw,1200px)] flex-col items-center gap-4">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="92vw"
              className="max-h-[75dvh] w-auto rounded-media object-contain"
            />
            <figcaption className="text-center text-sm text-white/85">
              {current.alt}
              {many ? ` (${index + 1} of ${images.length})` : null}
            </figcaption>
          </figure>
        ) : null}
        <div className="mt-4 flex justify-center gap-3">
          {many ? (
            <button type="button" onClick={() => step(-1)} className={controlClass}>
              <Icon name="chevron-left" className="size-5" />
              <span className="sr-only">Previous photo</span>
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className={controlClass}
            autoFocus
          >
            <Icon name="close" className="size-5" />
            <span className="sr-only">Close</span>
          </button>
          {many ? (
            <button type="button" onClick={() => step(1)} className={controlClass}>
              <Icon name="chevron-right" className="size-5" />
              <span className="sr-only">Next photo</span>
            </button>
          ) : null}
        </div>
      </dialog>
    </>
  );
}

const controlClass =
  "grid size-12 place-items-center rounded-full bg-white text-ink hover:bg-yellow-400 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-yellow-400";

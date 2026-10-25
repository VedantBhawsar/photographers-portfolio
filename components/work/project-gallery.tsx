"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Photo } from "@/content/portfolio";

/**
 * Project gallery with a full-screen lightbox. The lightbox is a native modal
 * <dialog>: focus is trapped inside, Escape closes it and focus returns to the
 * thumbnail that opened it. Arrow keys move between photographs.
 */
export function ProjectGallery({ title, photos }: { title: string; photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (photoIndex: number) => {
    setIndex(photoIndex);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (delta: number) => setIndex((current) => (current === null ? current : (current + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKeyDown);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : photos[index];
  const counter = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {/* Masonry columns keep every photograph uncropped at its natural aspect ratio. */}
      <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
        {photos.map((photo, photoIndex) => (
          <li key={`${photo.src.src}-${photoIndex}`} className="mb-6 break-inside-avoid lg:mb-8">
            <button
              type="button"
              onClick={() => open(photoIndex)}
              className="group block w-full cursor-zoom-in overflow-hidden bg-muted"
              aria-label={`View larger: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt=""
                placeholder="blur"
                loading={photoIndex < 3 ? "eager" : "lazy"}
                sizes="(min-width: 90rem) 420px, (min-width: 64rem) 31vw, (min-width: 40rem) 46vw, 100vw"
                className="h-auto w-full transition-transform duration-1000 ease-(--ease-editorial) group-hover:scale-[1.02]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} — photo viewer`}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-transparent open:flex open:flex-col"
      >
        <div className="container-page flex h-(--header-height) shrink-0 items-center justify-between gap-4 border-b">
          <p className="eyebrow truncate">{title}</p>
          <div className="flex items-center gap-6">
            {index !== null && (
              <p className="eyebrow text-muted-foreground" aria-live="polite">
                <span className="sr-only">Photo </span>
                {counter(index + 1)} <span aria-hidden="true">/</span>
                <span className="sr-only">of</span> {counter(photos.length)}
              </p>
            )}
            <button type="button" onClick={close} className="eyebrow -mr-2 inline-flex h-11 items-center px-2">
              Close
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          {current && (
            <figure className="absolute inset-0 m-0 flex flex-col p-4 sm:p-8">
              <div className="relative min-h-0 flex-1">
                <Image
                  key={current.src.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  placeholder="blur"
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground">
                {current.alt}
              </figcaption>
            </figure>
          )}
        </div>

        {photos.length > 1 && (
          <div className="container-page flex shrink-0 items-center justify-between border-t py-3">
            <button type="button" onClick={() => step(-1)} className="eyebrow inline-flex h-11 items-center gap-2 px-2">
              <span aria-hidden="true">←</span> Previous
            </button>
            <button type="button" onClick={() => step(1)} className="eyebrow inline-flex h-11 items-center gap-2 px-2">
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}

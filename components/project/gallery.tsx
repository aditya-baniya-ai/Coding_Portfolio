"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { MediaItem } from "@/lib/project-types";
import MediaImage from "./media-image";

type Image = Extract<MediaItem, { type: "image" }>;

export default function Gallery({ images, title }: { images: Image[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const count = images.length;
  const go = useCallback((n: number) => setIndex((n + count) % count), [count]);
  const current = images[index];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const thumb = strip.current?.children[index] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    else if (e.key === "ArrowLeft") go(index - 1);
    else return;
    e.preventDefault();
  };

  if (!count) return null;
  return (
    <div
      className="gallery"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} image gallery`}
      onKeyDown={onKey}
    >
      <div className="gallery-stage">
        <button
          type="button"
          className="gallery-open"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge image ${index + 1} of ${count}`}
        >
          <MediaImage
            key={current.src}
            src={current.src}
            alt={current.alt}
            sizes="(max-width: 1100px) 100vw, 900px"
            priority={index === 0}
          />
          <span className="gallery-expand" aria-hidden="true">
            <Expand size={16} />
          </span>
        </button>
        {count > 1 && (
          <>
            <button type="button" className="carousel-arrow carousel-prev" onClick={() => go(index - 1)} aria-label="Previous image">
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="carousel-arrow carousel-next" onClick={() => go(index + 1)} aria-label="Next image">
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <span className="gallery-count" aria-live="polite">
          {index + 1} / {count}
        </span>
      </div>
      {current.caption && <p className="gallery-caption">{current.caption}</p>}
      {count > 1 && (
        <div className="gallery-thumbs" ref={strip}>
          {images.map((img, i) => (
            <button
              type="button"
              key={img.src}
              className={i === index ? "is-active" : ""}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${title} image viewer`}
        onClose={() => setOpen(false)}
        onKeyDown={onKey}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        {open && (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.full ?? current.src} alt={current.alt} referrerPolicy="no-referrer" />
            <figcaption>
              <span>{current.caption ?? current.alt}</span>
              <span>
                {index + 1} / {count}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="lightbox-close icon-button" onClick={() => setOpen(false)} aria-label="Close image viewer" autoFocus>
          <X />
        </button>
        {count > 1 && (
          <>
            <button type="button" className="carousel-arrow carousel-prev" onClick={() => go(index - 1)} aria-label="Previous image">
              <ChevronLeft size={22} />
            </button>
            <button type="button" className="carousel-arrow carousel-next" onClick={() => go(index + 1)} aria-label="Next image">
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { MediaItem } from "@/lib/project-types";
import MediaImage from "./media-image";
import LocalVideo from "./local-video";
import YouTubeEmbed from "./youtube-embed";

const INTERVAL = 4800;

type Props = {
  items: MediaItem[];
  label: string;
  /** Where an image click goes (the case-study page). */
  href: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", on);
    return () => query.removeEventListener("change", on);
  }, []);
  return reduced;
}

export default function MediaCarousel({ items, label, href }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1]));
  const touch = useRef<number | null>(null);
  const count = items.length;

  const go = useCallback(
    (next: number) => {
      const i = (next + count) % count;
      setIndex(i);
      setPlaying(false);
      setSeen((s) => new Set(s).add(i).add((i + 1) % count));
    },
    [count],
  );

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const autoplay = !reduced && !paused && !hovering && visible && !playing && count > 1;
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [autoplay, index, go]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    else if (e.key === "ArrowLeft") go(index - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={root}
      className={`media-carousel${playing ? " is-playing" : ""}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${label} photos and video`}
      onKeyDown={onKey}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onTouchStart={(e) => {
        touch.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="carousel-track" aria-live={autoplay ? "off" : "polite"}>
        {items.map((item, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              className={`carousel-slide${active ? " is-active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
            >
              {seen.has(i) && (
                <>
                  {item.type === "image" && (
                    <>
                      <MediaImage
                        src={item.src}
                        alt={item.alt}
                        sizes="(max-width: 760px) 100vw, 700px"
                        priority={i === 0}
                      />
                      <Link
                        href={href}
                        className="carousel-hit"
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    </>
                  )}
                  {item.type === "youtube" && (
                    <YouTubeEmbed
                      key={active ? "on" : "off"}
                      id={item.id}
                      title={item.title}
                      className="in-carousel"
                      onPlay={() => setPlaying(true)}
                    />
                  )}
                  {item.type === "video" && (
                    <LocalVideo
                      key={active ? "on" : "off"}
                      src={item.src}
                      poster={item.poster}
                      title={item.title}
                      className="in-carousel"
                      onPlay={() => setPlaying(true)}
                      onStop={() => setPlaying(false)}
                    />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="carousel-arrow carousel-prev"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="carousel-arrow carousel-next"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          <div className="carousel-bar">
            <span className="carousel-count" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
              <i>/</i>
              {String(count).padStart(2, "0")}
            </span>
            {count <= 8 && (
              <div className="carousel-dots">
                {items.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={i === index ? "is-active" : ""}
                    onClick={() => go(i)}
                    aria-label={`Show slide ${i + 1}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
            )}
            {!reduced && (
              <button
                type="button"
                className="carousel-pause"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Start automatic slideshow" : "Pause automatic slideshow"}
              >
                {paused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  id: string;
  title: string;
  /** Start playing as soon as the facade is mounted (used after a user click). */
  autoPlay?: boolean;
  className?: string;
  /** Called when the visitor presses play. */
  onPlay?: () => void;
};

/**
 * Click-to-load YouTube player. Nothing is requested from YouTube's player
 * until the visitor presses play, and it uses the privacy-enhanced domain.
 */
export default function YouTubeEmbed({ id, title, autoPlay, className, onPlay }: Props) {
  const [active, setActive] = useState(Boolean(autoPlay));
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <div className={`video-frame ${className ?? ""}`}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          className="video-facade"
          onClick={() => {
            setActive(true);
            onPlay?.();
          }}
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
          />
          <span className="video-play">
            <Play size={26} fill="currentColor" />
          </span>
          <span className="video-label">{title}</span>
        </button>
      )}
    </div>
  );
}

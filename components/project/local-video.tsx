"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import MediaImage from "./media-image";

type Props = {
  src: string;
  poster: string;
  title: string;
  className?: string;
  onPlay?: () => void;
  onStop?: () => void;
};

/** A self-hosted video that shows its poster until the visitor presses play. */
export default function LocalVideo({ src, poster, title, className, onPlay, onStop }: Props) {
  const [active, setActive] = useState(false);
  return (
    <div className={`video-frame ${className ?? ""}`}>
      {active ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          aria-label={title}
          onEnded={() => {
            setActive(false);
            onStop?.();
          }}
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
          <MediaImage src={poster} alt="" sizes="(max-width: 760px) 100vw, 700px" />
          <span className="video-play">
            <Play size={26} fill="currentColor" />
          </span>
          <span className="video-label">{title}</span>
        </button>
      )}
    </div>
  );
}

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** "contain" shows the whole image over a blurred copy of itself. */
  fit?: "contain" | "cover";
};

/** Local files go through next/image; remote (Devpost, GitHub) files are plain <img>. */
export default function MediaImage({
  src,
  alt,
  sizes = "(max-width: 760px) 100vw, 50vw",
  priority,
  fit = "contain",
}: Props) {
  const local = src.startsWith("/");
  return (
    <>
      {fit === "contain" && (
        <span className="media-backdrop" aria-hidden="true">
          {local ? (
            <Image src={src} alt="" fill sizes="25vw" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="" loading="lazy" decoding="async" />
          )}
        </span>
      )}
      {local ? (
        <Image
          className={`media-fg media-${fit}`}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`media-fg media-${fit}`}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
      )}
    </>
  );
}

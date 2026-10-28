export type MediaItem =
  | { type: "image"; src: string; full?: string; alt: string; caption?: string }
  | { type: "youtube"; id: string; title: string }
  | { type: "video"; src: string; poster: string; title: string };

export type Bullet = string | { lead: string; text: string };

export type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: Bullet[];
  steps?: { title: string; text: string }[];
  stats?: { value: string; label: string }[];
  table?: { caption?: string; head: string[]; rows: string[][] };
  checklist?: { text: string; done: boolean }[];
  /** Paragraphs shown after any steps, table or lists. */
  closing?: string[];
  note?: string;
};

export type Category = "AI & vision" | "Robotics" | "Full stack" | "Experiments";

export type Project = {
  id: string;
  title: string;
  category: Category;
  hackathon?: boolean;
  eyebrow: string;
  summary: string;
  tags: string[];
  featured?: boolean;
  color: string;
  image?: string;
  art?: "chess";
  metric?: string;
  metricLabel?: string;
  context: string;
  /** Shown on the card tab, e.g. "Oct 2026". Falls back to the category. */
  period?: string;
  approach?: string[];
  outcome?: string;
  github?: string;
  demo?: string;
  devpost?: string;
  /** Short "what we did" / "how we built it" lines shown on the card. */
  did?: string;
  how?: string;
  /** Video first, then images. Drives the card slideshow and the case-study page. */
  media?: MediaItem[];
  facts?: { label: string; value: string }[];
  metrics?: { value: string; label: string }[];
  sections?: Section[];
  builtWith?: string[];
};

const DEVPOST_CDN =
  "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos";

/**
 * Devpost gallery images. `ids` are the path segments after `software_photos/`
 * (e.g. "005/463/686"); `captions` is keyed by zero-based position.
 */
export function devpostImages(
  title: string,
  ids: string[],
  captions: Record<number, string> = {},
): MediaItem[] {
  return ids.map((id, i) => ({
    type: "image",
    src: `${DEVPOST_CDN}/${id}/datas/gallery.jpg`,
    full: `${DEVPOST_CDN}/${id}/datas/original.png`,
    alt: captions[i] ?? `${title} screenshot ${i + 1} of ${ids.length}`,
    caption: captions[i],
  }));
}

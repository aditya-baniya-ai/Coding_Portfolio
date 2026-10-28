import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import CaseSections from "@/components/project/case-sections";
import Gallery from "@/components/project/gallery";
import LocalVideo from "@/components/project/local-video";
import Toc from "@/components/project/toc";
import YouTubeEmbed from "@/components/project/youtube-embed";
import { contactEmail } from "@/lib/contact";
import {
  getNeighbours,
  getProject,
  orderedMedia,
  projects,
  type MediaItem,
  type Section,
} from "@/lib/projects";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const cover = (p.media ?? []).find((m) => m.type === "image");
  const image = cover?.type === "image" ? cover.src : p.image;
  return {
    title: `${p.title} · Aaditya Baniya`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.id}` },
    openGraph: {
      title: `${p.title} · Aaditya Baniya`,
      description: p.summary,
      type: "article",
      url: `/projects/${p.id}`,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary" },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const media: MediaItem[] = p.media
    ? orderedMedia(p)
    : (p.image
      ? [{ type: "image", src: p.image, alt: `${p.title} project screenshot` }]
      : []);
  const videos = media.filter((m) => m.type !== "image");
  const images = media.filter(
    (m): m is Extract<MediaItem, { type: "image" }> => m.type === "image",
  );

  const sections: Section[] = p.sections ?? [];
  if (!p.sections) {
    if (p.approach?.length)
      sections.push({ id: "engineering", title: "The engineering", bullets: p.approach });
    if (p.outcome)
      sections.push({ id: "outcome", title: "The outcome", paragraphs: [p.outcome] });
  }

  const facts = p.facts ?? [{ label: "Context", value: p.context }];
  const { previous, next } = getNeighbours(p.id);
  const subject = encodeURIComponent(`Let’s talk about ${p.title}`);

  return (
    <article className={`case card-${p.color}`}>
      <header className="section-shell case-hero">
        <Link href="/#projects" className="case-back">
          <ArrowLeft size={16} /> All work
        </Link>
        <p className="eyebrow case-eyebrow">{p.eyebrow}</p>
        <h1>{p.title}</h1>
        <p className="case-lede">{p.summary}</p>
        <div className="case-actions">
          {p.github && (
            <a className="button button-dark" href={p.github} target="_blank" rel="noreferrer">
              <Github size={17} /> View source <ArrowUpRight size={17} />
            </a>
          )}
          {p.devpost && (
            <a className="button button-lime" href={p.devpost} target="_blank" rel="noreferrer">
              Devpost submission <ArrowUpRight size={17} />
            </a>
          )}
          {p.demo && (
            <a className="button button-outline" href={p.demo} target="_blank" rel="noreferrer">
              Live project <ArrowUpRight size={17} />
            </a>
          )}
        </div>
        <dl className="case-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {p.metrics && (
        <div className="section-shell case-metrics">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <section className="section-shell case-media" aria-labelledby="gallery">
          <p className="eyebrow">GALLERY · {images.length} {images.length === 1 ? "IMAGE" : "IMAGES"}</p>
          <h2 id="gallery" className="sr-only">
            Image gallery
          </h2>
          <Gallery images={images} title={p.title} />
        </section>
      )}

      {videos.length > 0 && (
        <section className="section-shell case-media" aria-labelledby="watch">
          <p className="eyebrow">WATCH</p>
          <h2 id="watch" className="sr-only">
            Videos
          </h2>
          <div className={`case-videos${videos.length > 1 ? " is-multi" : ""}`}>
            {videos.map((v) =>
              v.type === "youtube" ? (
                <YouTubeEmbed key={v.id} id={v.id} title={v.title} />
              ) : v.type === "video" ? (
                <LocalVideo key={v.src} src={v.src} poster={v.poster} title={v.title} />
              ) : null,
            )}
          </div>
        </section>
      )}

      {sections.length > 0 && (
        <div className="section-shell case-body">
          <Toc items={sections.map(({ id, title }) => ({ id, title }))} />
          <div>
            <CaseSections sections={sections} />
            {p.builtWith && (
              <section className="case-section case-built" aria-labelledby="built-with">
                <p className="eyebrow">STACK</p>
                <h2 id="built-with">Built with</h2>
                <div className="skill-tags">
                  {p.builtWith.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      <nav className="section-shell case-pager" aria-label="More projects">
        {previous ? (
          <Link href={`/projects/${previous.id}`} rel="prev">
            <span className="eyebrow">
              <ArrowLeft size={14} /> PREVIOUS
            </span>
            <strong>{previous.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.id}`} rel="next" className="is-next">
            <span className="eyebrow">
              NEXT <ArrowRight size={14} />
            </span>
            <strong>{next.title}</strong>
          </Link>
        )}
      </nav>

      <aside className="section-shell case-cta">
        <div>
          <p className="eyebrow">QUESTIONS?</p>
          <h2>Want the details behind {p.title}?</h2>
        </div>
        <a className="button button-lime" href={`mailto:${contactEmail}?subject=${subject}`}>
          Get in touch <Mail size={18} />
        </a>
      </aside>
    </article>
  );
}

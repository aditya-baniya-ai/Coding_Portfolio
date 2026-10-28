import Link from "next/link";
import { ArrowUpRight, Github, PlayCircle } from "lucide-react";
import { orderedMedia, type Project } from "@/lib/projects";
import MediaCarousel from "./media-carousel";
import ProjectArt from "./project-art";

type Props = { project: Project; index: number };

export default function ProjectCard({ project: p, index }: Props) {
  const href = `/projects/${p.id}`;
  const did = p.did ?? p.outcome;
  const how = p.how ?? p.approach?.[0];
  const videos = p.media?.filter((m) => m.type !== "image").length ?? 0;
  const photos = p.media?.filter((m) => m.type === "image").length ?? 0;
  return (
    <article className="project-card">
      <div className="project-frame">
        {p.media?.length ? (
          <div className="project-art-button media-frame">
            <MediaCarousel items={orderedMedia(p)} label={p.title} href={href} />
          </div>
        ) : (
          <Link
            href={href}
            className="project-art-button"
            aria-label={`Read the ${p.title} case study`}
          >
            <ProjectArt project={p} />
          </Link>
        )}
        <Link
          href={href}
          className="project-open"
          aria-label={`Open the ${p.title} case study`}
          tabIndex={-1}
        >
          <ArrowUpRight size={22} />
        </Link>
        {p.metric && (
          <span className="metric-badge">
            <strong>{p.metric}</strong>
            <span>{p.metricLabel}</span>
          </span>
        )}
      </div>
      <div className="project-meta">
        <p className="eyebrow">
          {p.eyebrow}
          <span>{String(index + 1).padStart(2, "0")}</span>
        </p>
        <h3>
          <Link href={href}>
            {p.title}
            <ArrowUpRight size={23} />
          </Link>
        </h3>
        <p className="project-summary">{p.summary}</p>
        {did && how && (
          <dl className="project-brief">
            <div>
              <dt>What we did</dt>
              <dd>{did}</dd>
            </div>
            <div>
              <dt>How we built it</dt>
              <dd>{how}</dd>
            </div>
          </dl>
        )}
        <div className="tag-row">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="project-actions">
          <Link href={href} className="button button-dark">
            Read the case study <ArrowUpRight size={17} />
          </Link>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="text-link">
              <Github size={16} /> Code
            </a>
          )}
          {p.devpost && (
            <a href={p.devpost} target="_blank" rel="noreferrer" className="text-link">
              Devpost <ArrowUpRight size={15} />
            </a>
          )}
          {(videos > 0 || photos > 1) && (
            <span className="media-count">
              <PlayCircle size={15} aria-hidden="true" />
              {videos > 0 && `${videos} video${videos > 1 ? "s" : ""}`}
              {videos > 0 && photos > 0 && " · "}
              {photos > 0 && `${photos} photo${photos > 1 ? "s" : ""}`}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

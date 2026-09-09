"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Search,
  X,
} from "lucide-react";
import OrbitScene from "@/components/orbit-scene";
import {
  awards,
  experiences,
  projects,
  skills,
  type Project,
} from "@/lib/portfolio";

import { buildEmailDraft, contactEmail as email } from "@/lib/contact";
const filters = [
  "Selected",
  "All work",
  "AI & vision",
  "Full stack",
  "Experiments",
] as const;

function ProjectArt({ project }: { project: Project }) {
  if (project.id === "sentinel")
    return (
      <div
        className="pipeline-art"
        aria-label="PPE detection pipeline: camera input, YOLOv8 with CBAM, TensorRT edge inference"
      >
        <div className="scan-field">
          <div className="scan-cross cross-one" />
          <div className="scan-cross cross-two" />
          <div className="scan-box">
            <span>PPE DETECTION</span>
            <div className="scan-points">
              {Array.from({ length: 24 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <b>VISION → ACTION</b>
          </div>
        </div>
        <div className="pipeline-steps">
          <span>CAPTURE</span>
          <i>→</i>
          <span>YOLOv8 + CBAM</span>
          <i>→</i>
          <span>TENSORRT</span>
        </div>
      </div>
    );
  if (project.id === "reelstudio")
    return (
      <div
        className="reel-art"
        aria-label="ReelStudio pipeline: photos, vision agents, cinematic reels"
      >
        <div className="reel-word">
          reel<span>studio</span>
          <sup>↗</sup>
        </div>
        <div className="reel-timeline">
          {[
            34, 48, 72, 46, 89, 63, 42, 79, 100, 62, 39, 78, 49, 91, 57, 37, 68,
            46, 82, 54, 34, 73, 96, 63, 45, 82, 55, 69, 42, 87,
          ].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="reel-caption">
          <span>PHOTOS → AGENTS → FILM</span>
          <span>ON THE BEAT.</span>
        </div>
      </div>
    );
  return (
    <div className="project-image">
      <Image
        src={project.image!}
        alt={`${project.title} project screenshot`}
        fill
        sizes="(max-width: 720px) 100vw, 50vw"
      />
    </div>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    if (project) {
      modal?.showModal();
      document.body.style.overflow = "hidden";
    }
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-content">
          <button
            className="dialog-close icon-button"
            aria-label="Close project details"
            onClick={onClose}
            autoFocus
          >
            <X />
          </button>
          <span className={`eyebrow accent-${project.color}`}>
            {project.eyebrow}
          </span>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p className="dialog-context">{project.context}</p>
          <p className="dialog-summary">{project.summary}</p>
          <div className="tag-row">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <h3>The engineering</h3>
          <ul>
            {project.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <div className={`outcome outcome-${project.color}`}>
            <span className="eyebrow">THE OUTCOME</span>
            <p>{project.outcome}</p>
          </div>
          <div className="dialog-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="button button-dark"
              >
                <Github size={17} /> View source <ArrowUpRight size={17} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="button button-outline"
              >
                Live project <ArrowUpRight size={17} />
              </a>
            )}
            {!project.github && !project.demo && (
              <p>
                Interested in the technical details?{" "}
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(`Let’s talk about ${project.title}`)}`}
                >
                  Let’s talk <ArrowUpRight size={14} />
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<string>("Selected");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [copyState, setCopyState] = useState("");
  const [draftState, setDraftState] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  const visible = projects.filter(
    (p) =>
      (query.trim() ||
        filter === "All work" ||
        (filter === "Selected" && p.featured) ||
        filter === p.category) &&
      `${p.title} ${p.summary} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("Email copied");
    } catch {
      setCopyState("Copy unavailable. Select the email address below.");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState(""), 4000);
  };
  const draft = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    window.location.href = buildEmailDraft({
      name: String(data.get("name")),
      email: String(data.get("email")),
      subject: String(data.get("subject")),
      message: String(data.get("message")),
    });
    setDraftState(
      "Your email app will open a draft. Send it there when you’re ready. If it does not open, use the email address above.",
    );
  };
  return (
    <>
      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="little-star">✳</span> SOFTWARE ENGINEERING ×
            COMPUTER VISION
          </p>
          <h1>
            Intelligent
            <br />
            systems.
            <br />
            <span className="hero-last">
              Real-world <em>impact.</em>
            </span>
          </h1>
          <p className="hero-intro">
            I’m <strong>Aaditya</strong>, a software engineer and computer
            vision researcher turning ambitious ideas into systems that work
            beyond the demo.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">
              Explore my work <ArrowDown size={18} />
            </a>
            <a className="text-link" href="#contact">
              Let’s connect <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-location">
            <MapPin size={14} />
            <span>San Marcos, Texas</span>
            <span className="small-divider" />
            <span>Texas State University</span>
          </div>
        </div>
        <OrbitScene />
        <div className="hero-bottom">
          <span>RESEARCH MINDSET. BUILDER’S INSTINCT.</span>
          <a href="#projects">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </a>
        </div>
      </section>
      <div className="proof-strip section-shell">
        <div>
          <strong>
            25–30<span>ms</span>
          </strong>
          <p>Edge inference · Makerspace Sentinel</p>
        </div>
        <div>
          <strong>
            18,000<span>+</span>
          </strong>
          <p>Unseen validation images · Sentinel</p>
        </div>
        <div>
          <strong>$13,000</strong>
          <p>Grants, fellowships & prizes</p>
        </div>
        <div className="proof-note">
          <span className="little-star">✳</span>
          <p>
            From the research lab
            <br />
            to the real world.
          </p>
        </div>
      </div>
      <section id="projects" className="section-shell work-section">
        <div className="section-top">
          <div>
            <p className="eyebrow">
              <span>01</span> THE WORK
            </p>
            <h2>
              Ideas, made real<span className="blue-dot">.</span>
            </h2>
          </div>
          <p>
            Vision at the edge. Intelligence in the browser.
            <br className="desktop-break" /> A few things I’ve put into the
            world.
          </p>
        </div>
        <div className="work-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setQuery("");
                }}
                aria-pressed={filter === f && !query}
                className={filter === f && !query ? "active" : ""}
              >
                {f}
                {f === "All work" && <span>{projects.length}</span>}
              </button>
            ))}
          </div>
          <label className="project-search">
            <Search size={17} />
            <span className="sr-only">Search all projects</span>
            <input
              type="search"
              placeholder="Search projects or tech"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
          {query
            ? ` matching “${query}”`
            : filter === "Selected"
              ? " selected"
              : ""}
        </p>
        <div className="project-grid">
          {visible.map((p, i) => (
            <article className={`project-card card-${p.color}`} key={p.id}>
              <button
                className="project-art-button"
                onClick={() => setSelected(p)}
                aria-label={`Read ${p.title} project details`}
              >
                <ProjectArt project={p} />
                <span className="project-open">
                  <ArrowUpRight size={22} />
                </span>
                {p.metric && (
                  <span className="metric-badge">
                    <strong>{p.metric}</strong>
                    <span>{p.metricLabel}</span>
                  </span>
                )}
              </button>
              <div className="project-meta">
                <p className="eyebrow">
                  {p.eyebrow}
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3>
                  <button onClick={() => setSelected(p)}>
                    {p.title}
                    <ArrowUpRight size={23} />
                  </button>
                </h3>
                <p className="project-summary">{p.summary}</p>
                <div className="tag-row">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        {!visible.length && (
          <div className="empty-state">
            <Search size={32} />
            <h3>No projects found</h3>
            <p>Try a technology like Python, React, or computer vision.</p>
            <button
              className="button button-dark"
              onClick={() => {
                setQuery("");
                setFilter("All work");
              }}
            >
              Show all projects
            </button>
          </div>
        )}
        {filter === "Selected" && !query && (
          <div className="more-work">
            <p>There’s more in the workshop.</p>
            <button
              className="text-link"
              onClick={() => {
                setFilter("All work");
              }}
            >
              Explore all {projects.length} projects <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>
      <section id="experience" className="experience-section">
        <div className="section-shell">
          <div className="section-top">
            <div>
              <p className="eyebrow">
                <span>02</span> EXPERIENCE
              </p>
              <h2>
                Learning by building.
                <br />
                Building for people.
              </h2>
            </div>
            <p>
              Research, product thinking, and the engineering
              <br className="desktop-break" /> that brings it all together.
            </p>
          </div>
          <div className="experience-list">
            {experiences.map((e, i) => (
              <article className="experience-row" key={e.role}>
                <div className="experience-date">
                  <span className={i < 2 ? "current-dot" : "past-dot"} />
                  {e.date}
                </div>
                <div>
                  <p className="eyebrow">{e.label}</p>
                  <h3>{e.role}</h3>
                  <p className="experience-org">
                    {e.org}
                    {e.link && (
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${e.org}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </p>
                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="section-shell about-section">
        <div className="about-photo">
          <Image
            src="/aditya.jpeg"
            alt="Aaditya Baniya"
            width={600}
            height={700}
            sizes="(max-width: 720px) 100vw, 35vw"
          />
          <span className="photo-caption">
            AADITYA RAJ BANIYA <span>↗</span>
          </span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">
            <span>03</span> THE PERSON BEHIND THE PROJECTS
          </p>
          <h2>
            Curiosity is
            <br />
            the through line<span className="blue-dot">.</span>
          </h2>
          <p>
            I’m a Computer Science student at Texas State University, working at
            the intersection of software engineering, machine learning, and
            computer vision.
          </p>
          <p>
            My work spans factory safety, industrial time studies, creative AI
            tools, and robotics. I like the whole process: understanding a
            problem, building the system, and seeing it work in someone’s hands.
          </p>
          <div className="education">
            <div className="education-icon">
              <Code2 size={23} />
            </div>
            <div>
              <h3>Texas State University</h3>
              <p>B.S. Computer Science · Expected May 2027</p>
              <div className="education-tags">
                <span>3.8 GPA</span>
                <span>Honors Scholar</span>
                <span>President’s List</span>
              </div>
            </div>
          </div>
          <div className="leadership">
            <div>
              <span className="eyebrow">LEADING & CONNECTING</span>
              <p>
                President · Data Analytics Association
                <br />
                Secretary · Google Developer Group TXST
              </p>
            </div>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/aadityabaniya/"
              target="_blank"
              rel="noreferrer"
            >
              More about me <ArrowUpRight size={17} />
            </a>
          </div>
          <p className="community-note">
            Also part of .EXE, ACM AI, SIAM Math Club, IEEE, and CODE PATH ORG.
          </p>
        </div>
      </section>
      <section id="skills" className="section-shell skills-section">
        <div className="section-top">
          <div>
            <p className="eyebrow">
              <span>04</span> THE TOOLKIT
            </p>
            <h2>A full-system perspective.</h2>
          </div>
          <p>
            The right tools for the problem.
            <br />
            From a model to the interface around it.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((s) => (
            <article key={s.title}>
              <span className="skill-number">{s.number} /</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div className="skill-tags">
                {s.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="coursework">
          <strong>Foundations</strong> Machine Learning · Data Structures &
          Algorithms · Object-Oriented Programming · Applied Linear Algebra ·
          Software Engineering
        </p>
      </section>
      <section id="achievements" className="section-shell recognition-section">
        <div className="recognition-heading">
          <p className="eyebrow">
            <span>05</span> RECOGNITION
          </p>
          <h2>
            A little fuel
            <br />
            for the next idea.
          </h2>
          <strong className="award-total">
            $13k<span>in grants, fellowships & prizes</span>
          </strong>
          <p>
            President’s List & Dean’s List
            <br />
            across 6 semesters.
          </p>
        </div>
        <div className="award-list">
          {awards.map(([name, context, amount]) => (
            <div className="award-row" key={name}>
              <span className="award-star">✳</span>
              <div>
                <h3>{name}</h3>
                <p>{context}</p>
              </div>
              <strong>{amount}</strong>
            </div>
          ))}
        </div>
      </section>
      <section id="hackathons" className="section-shell hackathon-section">
        <p className="eyebrow">BUILT IN GOOD COMPANY</p>
        <div className="hackathon-line">
          <span>AITX ’26</span>
          <i>✳</i>
          <span>NexHacks ’26</span>
          <i>✳</i>
          <span>HackTX ’25</span>
          <i>✳</i>
          <span>AITX ’24</span>
          <i>✳</i>
          <span>BokoHacks ’24</span>
        </div>
      </section>
      <section id="resumes" className="section-shell resumes-section">
        <div>
          <p className="eyebrow">THE DETAILS, TO GO</p>
          <h2>
            Two lenses.
            <br />
            One curious engineer.
          </h2>
        </div>
        <a
          className="resume-card"
          href="/resumes/aaditya-baniya-software-engineering.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <span className="resume-icon">
            <Code2 />
          </span>
          <span>
            <strong>Software Engineering</strong>
            <small>Full stack, systems & product · PDF</small>
          </span>
          <ArrowDownToLine size={22} />
        </a>
        <a
          className="resume-card"
          href="/resumes/aaditya-baniya-ai-computer-vision.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <span className="resume-icon">
            <span>✳</span>
          </span>
          <span>
            <strong>AI & Computer Vision</strong>
            <small>Research, models & edge AI · PDF</small>
          </span>
          <ArrowDownToLine size={22} />
        </a>
      </section>
      <section id="contact" className="contact-section">
        <div className="section-shell contact-grid">
          <div>
            <p className="eyebrow">
              <span>06</span> WHAT’S NEXT?
            </p>
            <h2>
              Let’s make
              <br />
              something
              <br />
              <em>meaningful.</em>
              <span>↗</span>
            </h2>
            <p className="contact-intro">
              An interesting engineering challenge, a research idea, or just a
              good conversation. I’d love to hear it.
            </p>
            <div className="email-row">
              <a href={`mailto:${email}`}>{email}</a>
              <button
                onClick={copy}
                className="icon-button"
                aria-label="Copy email address"
              >
                {copyState === "Email copied" ? (
                  <Check size={19} />
                ) : (
                  <Copy size={19} />
                )}
              </button>
            </div>
            <p className="copy-status" aria-live="polite">
              {copyState}
            </p>
            <div className="contact-socials">
              <a
                href="https://github.com/aditya-baniya-ai"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} /> GitHub <ArrowUpRight size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/aadityabaniya/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} /> LinkedIn <ArrowUpRight size={16} />
              </a>
              <a href="tel:+17373150786">
                Call <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="alternate-email">
              Also at{" "}
              <a href="mailto:adityabaniya.us@gmail.com">
                adityabaniya.us@gmail.com
              </a>
            </p>
          </div>
          <form className="contact-form" onSubmit={draft}>
            <h3>Start a conversation.</h3>
            <p>This opens a draft in your email app.</p>
            <div className="form-two">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Alex Chen"
                  maxLength={100}
                />
              </label>
              <label>
                Your email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="alex@company.com"
                  maxLength={200}
                />
              </label>
            </div>
            <label>
              What’s on your mind?
              <input
                name="subject"
                required
                placeholder="An opportunity, an idea, a hello…"
                maxLength={200}
              />
            </label>
            <label>
              A little more about it
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me what you’re thinking."
                maxLength={5000}
              />
            </label>
            <button className="button button-lime" type="submit">
              Open email draft <Mail size={18} />
            </button>
            <p className="draft-status" role="status">
              {draftState}
            </p>
          </form>
        </div>
      </section>
      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

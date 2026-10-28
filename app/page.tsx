"use client";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Pin,
  PinOff,
  Search,
} from "lucide-react";
import Link from "next/link";
import OrbitScene from "@/components/orbit-scene";
import ProjectCard from "@/components/project/project-card";
import {
  awards,
  experiences,
  hackathons,
  skills,
} from "@/lib/portfolio";
import { pinned as defaultPins } from "@/lib/pinned";
import { projects } from "@/lib/projects";

import { buildEmailDraft, contactEmail as email } from "@/lib/contact";
const filters = [
  "Selected",
  "All work",
  "AI & vision",
  "Robotics",
  "Full stack",
  "Hackathons",
  "Experiments",
] as const;

export default function Home() {
  const [filter, setFilter] = useState<string>("Selected");
  const [query, setQuery] = useState("");
  const [copyState, setCopyState] = useState("");
  const [draftState, setDraftState] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  const [pins, setPins] = useState<string[]>(defaultPins);
  const [owner, setOwner] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [pinNote, setPinNote] = useState("");
  // Pin mode is for the site owner only: add `?pin` to the address.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("pin")) return;
    setOwner(true);
    try {
      const saved = JSON.parse(localStorage.getItem("portfolio-pins") ?? "null");
      if (Array.isArray(saved))
        setPins(saved.filter((id) => projects.some((p) => p.id === id)));
    } catch {}
  }, []);
  const togglePin = (id: string) => {
    const next = pins.includes(id) ? pins.filter((x) => x !== id) : [...pins, id];
    setPins(next);
    setPinNote("");
    try {
      localStorage.setItem("portfolio-pins", JSON.stringify(next));
    } catch {}
  };
  const copyPins = async () => {
    const text = `export const pinned: string[] = [\n${pins.map((id) => `  "${id}",`).join("\n")}\n];\n`;
    try {
      await navigator.clipboard.writeText(text);
      setPinNote("Copied. Paste it into lib/pinned.ts, or send it to Claude.");
    } catch {
      setPinNote(`Pinned: ${pins.join(", ")}`);
    }
  };
  const rank = (id: string) => {
    const i = pins.indexOf(id);
    return i === -1 ? 1000 + projects.findIndex((p) => p.id === id) : i;
  };
  const matches = projects
    .filter(
      (p) =>
        (query.trim() ||
          filter === "All work" ||
          (filter === "Selected" && pins.includes(p.id)) ||
          filter === p.category ||
          (filter === "Hackathons" && p.hackathon)) &&
        `${p.title} ${p.summary} ${p.tags.join(" ")}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => rank(a.id) - rank(b.id));
  const collapsible = filter === "Selected" && !query.trim();
  const extra = collapsible
    ? projects.filter((p) => !pins.includes(p.id)).sort((a, b) => rank(a.id) - rank(b.id))
    : [];
  const visible = collapsible && expanded ? [...matches, ...extra] : matches;
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
      <div id="top" />
      <section id="about" className="section-shell about-section about-opening">
        <div className="about-intro">
          <p className="eyebrow">
            <span>01</span> ABOUT ME
          </p>
          <p className="personal-greeting">Hi, I’m</p>
          <h1>
            Aaditya Baniya<span className="blue-dot">.</span>
          </h1>
          <p className="personal-role">
            Software engineer & computer vision researcher
          </p>
        </div>
        <div className="about-photo">
          <Image
            src="/aditya.jpeg"
            alt="Aaditya Baniya"
            width={600}
            height={700}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1150px) 38vw, 420px"
            preload
          />
          <span className="photo-caption">
            AADITYA RAJ BANIYA <span>↗</span>
          </span>
        </div>
        <div className="about-copy">
          <p>
            I’m a Computer Science student at Texas State University, working at
            the intersection of software engineering, machine learning, and
            computer vision.
          </p>
          <p>
            My work spans factory safety, industrial time studies, wearable
            health AI, creative tools, and robotics. I like the whole process:
            understanding a problem, building the system, and seeing it work in
            someone’s hands.
          </p>
          <Link className="latest-build" href={`/projects/${projects[0].id}`}>
            <span className="latest-dot" aria-hidden="true" />
            <span>
              <small>LATEST BUILD</small>
              {projects[0].title} · {projects[0].context.split(" · ")[0]}
            </span>
            <ArrowUpRight size={17} />
          </Link>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">
              View my projects <ArrowDown size={18} />
            </a>
            <a className="text-link" href="#contact">
              Get in touch <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-location">
            <MapPin size={14} />
            <span>San Marcos, Texas</span>
            <span className="small-divider" />
            <a href="https://github.com/aditya-baniya-ai" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="small-divider" />
            <a href="https://devpost.com/adityahacker-1" target="_blank" rel="noreferrer">
              Devpost
            </a>
            <span className="small-divider" />
            <a href="https://www.linkedin.com/in/aadityabaniya/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="about-background">
          <h2 className="sr-only">Education & community</h2>
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
          <div className="about-community">
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
              Also part of .EXE, ACM AI, SIAM Math Club, IEEE, and CODE PATH
              ORG.
            </p>
          </div>
        </div>
      </section>
      <section id="projects" className="section-shell work-section">
        <div className="section-top">
          <div>
            <p className="eyebrow">
              <span>02</span> THE WORK
            </p>
            <h2>
              Ideas, made real<span className="blue-dot">.</span>
            </h2>
          </div>
          <p>
            Vision at the edge. Robots that talk back. Health data you can
            <br className="desktop-break" /> have a conversation with. Open any
            project for the full story.
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
            : filter === "Selected" && !expanded
              ? " pinned"
              : ""}
        </p>
        <div className="project-grid">
          {visible.map((p, i) => {
            const isPinned = pins.includes(p.id);
            return (
              <Fragment key={p.id}>
                {collapsible && expanded && i === matches.length && (
                  <div className="more-divider" role="separator">
                    <span>More projects</span>
                  </div>
                )}
                <div className={`project-tile card-${p.color}`}>
                  <span className="project-tab">
                    {isPinned && filter !== "Selected" && (
                      <Pin size={13} aria-label="Pinned" />
                    )}
                    {p.period ?? p.category}
                  </span>
                  {owner && (
                    <button
                      type="button"
                      className={`pin-toggle${isPinned ? " is-pinned" : ""}`}
                      onClick={() => togglePin(p.id)}
                      aria-pressed={isPinned}
                    >
                      {isPinned ? <PinOff size={15} /> : <Pin size={15} />}
                      {isPinned ? "Unpin" : "Pin to main screen"}
                    </button>
                  )}
                  <ProjectCard project={p} index={i} />
                </div>
              </Fragment>
            );
          })}
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
        {collapsible && extra.length > 0 && (
          <div className="show-more">
            <button
              type="button"
              className="show-more-button"
              aria-expanded={expanded}
              onClick={() => setExpanded((e) => !e)}
            >
              <span className="show-more-count">{extra.length}</span>
              <span className="show-more-label">
                {expanded ? "Show fewer projects" : "Show more projects"}
                <small>
                  {expanded
                    ? "Back to the pinned ones"
                    : "More hackathon builds, robotics and experiments"}
                </small>
              </span>
              {expanded ? <ChevronUp size={26} /> : <ChevronDown size={26} />}
            </button>
          </div>
        )}
        {owner && (
          <div className="owner-bar" role="region" aria-label="Pin mode">
            <strong>Pin mode</strong>
            <span>{pins.length} pinned</span>
            <button type="button" onClick={copyPins}>
              Copy list
            </button>
            <button
              type="button"
              onClick={() => {
                setPins(defaultPins);
                setPinNote("");
                try {
                  localStorage.removeItem("portfolio-pins");
                } catch {}
              }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                setOwner(false);
                window.history.replaceState(null, "", window.location.pathname + "#projects");
              }}
            >
              Exit
            </button>
            {pinNote && <p role="status">{pinNote}</p>}
          </div>
        )}
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
        <div>
          <strong>{hackathons.length}</strong>
          <p>Hackathons built at, newest first below</p>
        </div>
      </div>
      <section id="experience" className="experience-section">
        <div className="section-shell">
          <div className="section-top">
            <div>
              <p className="eyebrow">
                <span>03</span> EXPERIENCE
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
      <section id="skills" className="section-shell skills-section">
        <div className="toolkit-heading">
          <div>
            <p className="eyebrow">
              <span>04</span> THE TOOLKIT
            </p>
            <h2>A full-system perspective.</h2>
            <p className="toolkit-intro">
              The right tools for the problem.
              <br />
              From a model to the interface around it.
            </p>
          </div>
          <div className="toolkit-orbit">
            <OrbitScene />
          </div>
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
        <ul className="hackathon-line">
          {hackathons.map((h, i) => (
            <li key={h.name}>
              {i > 0 && <i aria-hidden="true">✳</i>}
              <Link href={`/projects/${h.project}`}>{h.name}</Link>
            </li>
          ))}
        </ul>
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
    </>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function Toc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const nodes = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => Boolean(n));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="case-toc" aria-label="On this page">
      <p className="eyebrow">ON THIS PAGE</p>
      <ol>
        {items.map((i, n) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined} className={active === i.id ? "is-active" : ""}>
              <span>{String(n + 1).padStart(2, "0")}</span>
              {i.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

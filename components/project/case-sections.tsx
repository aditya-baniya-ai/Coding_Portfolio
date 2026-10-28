import type { Bullet, Section } from "@/lib/projects";
import { Check, Circle } from "lucide-react";

const renderBullet = (b: Bullet, i: number) =>
  typeof b === "string" ? (
    <li key={i}>{b}</li>
  ) : (
    <li key={i}>
      <strong>{b.lead}:</strong> {b.text}
    </li>
  );

export default function CaseSections({ sections }: { sections: Section[] }) {
  return (
    <div className="case-sections">
      {sections.map((s, n) => (
        <section key={s.id} id={s.id} className="case-section">
          <p className="eyebrow">{String(n + 1).padStart(2, "0")}</p>
          <h2>{s.title}</h2>
          {s.paragraphs?.map((t, i) => (
            <p key={i} className="case-p">
              {t}
            </p>
          ))}
          {s.stats && (
            <div className="case-stats">
              {s.stats.map((x) => (
                <div key={x.label}>
                  <strong>{x.value}</strong>
                  <span>{x.label}</span>
                </div>
              ))}
            </div>
          )}
          {s.steps && (
            <ol className="case-steps">
              {s.steps.map((x) => (
                <li key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </li>
              ))}
            </ol>
          )}
          {s.table && (
            <figure className="case-table">
              <div className="case-table-scroll" tabIndex={0} role="region" aria-label={s.table.caption ?? s.title}>
                <table>
                  <thead>
                    <tr>
                      {s.table.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r) => (
                      <tr key={r[0]}>
                        {r.map((c, i) =>
                          i === 0 ? (
                            <th key={i} scope="row">
                              {c}
                            </th>
                          ) : (
                            <td key={i}>{c}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {s.table.caption && <figcaption>{s.table.caption}</figcaption>}
            </figure>
          )}
          {s.bullets && <ul className="case-list">{s.bullets.map(renderBullet)}</ul>}
          {s.checklist && (
            <ul className="case-checklist">
              {s.checklist.map((c) => (
                <li key={c.text} className={c.done ? "is-done" : ""}>
                  <span aria-hidden="true">{c.done ? <Check size={14} /> : <Circle size={10} />}</span>
                  <span className="sr-only">{c.done ? "Done: " : "Not yet: "}</span>
                  {c.text}
                </li>
              ))}
            </ul>
          )}
          {s.closing?.map((t, i) => (
            <p key={i} className="case-p case-closing">
              {t}
            </p>
          ))}
          {s.note && <p className="case-note">{s.note}</p>}
        </section>
      ))}
    </div>
  );
}

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";
const toDataUrl = async (url) => {
  let code = ts.transpileModule(readFileSync(url, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  // Inline relative imports (extensionless in the source) as nested data URLs.
  for (const [, spec] of [...code.matchAll(/from "(\.{1,2}\/[^"]+)"/g)]) {
    const dep = await toDataUrl(new URL(`${spec}.ts`, url));
    code = code.replaceAll(`"${spec}"`, `"${dep}"`);
  }
  return "data:text/javascript;base64," + Buffer.from(code).toString("base64");
};
const loadTS = async (path) =>
  import(await toDataUrl(new URL(path, import.meta.url)));
const { buildEmailDraft, contactEmail } = await loadTS("../lib/contact.ts");
const { awards, hackathons } = await loadTS("../lib/portfolio.ts");
const { projects } = await loadTS("../lib/projects.ts");

test("email draft preserves message text and keeps special characters within its fields", () => {
  const draft = {
    name: "Alex & Sam",
    email: "qa+portfolio@example.com",
    subject: "R&D? An idea & a hello",
    message: "Line 1\nLine 2 &cc=other@example.com #design",
  };
  const url = new URL(buildEmailDraft(draft));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, contactEmail);
  assert.equal(url.searchParams.get("subject"), draft.subject);
  assert.equal(
    url.searchParams.get("body"),
    `Hi Aaditya,\n\n${draft.message}\n\n${draft.name}\n${draft.email}`,
  );
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
});
test("email subject cannot introduce a new header through line breaks", () => {
  const url = new URL(
    buildEmailDraft({
      name: "Test",
      email: "qa@example.com",
      subject: "Hello\r\nBcc: elsewhere@example.com",
      message: "Hello",
    }),
  );
  assert.equal(
    url.searchParams.get("subject"),
    "Hello Bcc: elsewhere@example.com",
  );
  assert.equal(url.searchParams.has("bcc"), false);
});
test("every project has unique identity and a complete case study", () => {
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  for (const project of projects) {
    assert.match(project.id, /^[a-z0-9-]+$/, "id doubles as the URL slug");
    assert.ok(project.title && project.summary && project.context);
    const story =
      project.sections?.length >= 3 ||
      (project.outcome && project.approach?.length >= 2);
    assert.ok(story, `${project.id} needs sections, or approach + outcome`);
    assert.ok(project.tags.length >= 3);
    for (const link of [project.github, project.demo, project.devpost].filter(
      Boolean,
    )) {
      assert.equal(new URL(link).protocol, "https:");
      assert.notEqual(link, "#");
    }
    const ids = (project.sections ?? []).map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length, `${project.id} section ids`);
  }
});
test("project media is well formed and local files exist", () => {
  const withMedia = projects.filter((p) => p.media?.length);
  assert.ok(withMedia.length >= 4, "the photo-and-video showcase projects have media");
  for (const project of withMedia) {
    for (const m of project.media) {
      if (m.type === "youtube") assert.match(m.id, /^[\w-]{11}$/);
      else if (m.type === "image") {
        assert.ok(m.alt, `${project.id} image needs alt text`);
        assert.match(m.src, /^(https:\/\/|\/)/);
      }
      for (const src of [m.src, m.poster].filter((x) => x?.startsWith("/")))
        assert.ok(
          existsSync(new URL(`../public${src}`, import.meta.url)),
          `${src} is missing from public/`,
        );
    }
  }
});
test("hackathon strip links to real projects", () => {
  for (const h of hackathons)
    assert.ok(projects.some((p) => p.id === h.project), h.name);
});
test("recognition total matches the displayed grants and prizes", () => {
  assert.equal(
    awards.reduce(
      (sum, award) => sum + Number(award[2].replace(/[$,]/g, "")),
      0,
    ),
    13000,
  );
});

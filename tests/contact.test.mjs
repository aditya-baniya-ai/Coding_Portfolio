import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const loadTS = async (path) =>
  import(
    "data:text/javascript;base64," +
      Buffer.from(
        ts.transpileModule(
          readFileSync(new URL(path, import.meta.url), "utf8"),
          {
            compilerOptions: {
              module: ts.ModuleKind.ESNext,
              target: ts.ScriptTarget.ES2022,
            },
          },
        ).outputText,
      ).toString("base64")
  );
const { buildEmailDraft, contactEmail } = await loadTS("../lib/contact.ts");
const { projects, awards } = await loadTS("../lib/portfolio.ts");

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
    assert.ok(
      project.title && project.summary && project.context && project.outcome,
    );
    assert.ok(project.approach.length >= 2);
    assert.ok(project.tags.length >= 3);
    for (const link of [project.github, project.demo].filter(Boolean)) {
      assert.equal(new URL(link).protocol, "https:");
      assert.notEqual(link, "#");
    }
  }
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

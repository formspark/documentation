import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { parsePage } from "../docs/.vitepress/pages.js";

const DOCS = new URL("../docs/", import.meta.url);
const SITE = "https://documentation.formspark.io";

// Files the build writes that have no source of their own.
const GENERATED = ["/llms-full.txt"];

// The bucket serves files by exact key, so a link resolves only when the
// build writes a file at that key: a page or its Markdown copy from the
// page's source, or a file copied from docs/public.
function sourceFor(pathname) {
  if (pathname.endsWith("/")) return `${pathname.slice(1)}index.md`;
  if (pathname.endsWith(".html")) return pathname.slice(1, -5) + ".md";
  if (
    pathname.endsWith(".md") &&
    existsSync(new URL(pathname.slice(1), DOCS))
  ) {
    return pathname.slice(1);
  }
  return `public${pathname}`;
}

// The files agents read first. Each must link only to addresses that exist.
for (const file of ["llms.txt", "skills/formspark/SKILL.md"]) {
  describe(file, () => {
    const text = readFileSync(new URL(`public/${file}`, DOCS), "utf8");
    const links = [
      ...text.matchAll(/https:\/\/documentation\.formspark\.io[^\s)>\]]*/g),
    ].map(([url]) => new URL(url.replace(/[.,;:]+$/, "")).pathname);

    it("links to the documentation", () => {
      assert.ok(links.length > 0);
    });

    for (const pathname of new Set(links)) {
      it(`resolves ${SITE}${pathname}`, () => {
        if (GENERATED.includes(pathname)) return;
        const source = sourceFor(pathname);
        assert.ok(existsSync(new URL(source, DOCS)), `no docs/${source}`);
      });
    }
  });
}

describe("Formspark skill", () => {
  const { frontmatter } = parsePage(
    readFileSync(new URL("public/skills/formspark/SKILL.md", DOCS), "utf8"),
  );

  it("names itself after its directory", () => {
    assert.equal(frontmatter.name, "formspark");
  });

  it("describes when to use it within the 1024 character limit", () => {
    assert.ok(frontmatter.description.length > 0);
    assert.ok(frontmatter.description.length <= 1024);
  });
});

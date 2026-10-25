import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const DOCS = new URL("../docs/", import.meta.url);
const SITE = "https://documentation.formspark.io";

// The bucket serves files by exact key, so a link resolves only when the
// build writes a file at that key: a page from its Markdown source, or a
// file copied from docs/public.
function sourceFor(pathname) {
  if (pathname.endsWith("/")) return `${pathname.slice(1)}index.md`;
  if (pathname.endsWith(".html")) return pathname.slice(1, -5) + ".md";
  return `public${pathname}`;
}

describe("llms.txt", () => {
  const text = readFileSync(new URL("public/llms.txt", DOCS), "utf8");
  const links = [
    ...text.matchAll(/https:\/\/documentation\.formspark\.io[^\s)>\]]*/g),
  ].map(([url]) => new URL(url).pathname);

  it("links to the documentation", () => {
    assert.ok(links.length > 0);
  });

  for (const pathname of links) {
    it(`resolves ${SITE}${pathname}`, () => {
      const source = sourceFor(pathname);
      assert.ok(existsSync(new URL(source, DOCS)), `no docs/${source}`);
    });
  }
});

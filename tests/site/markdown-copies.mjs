import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readPages } from "../../docs/.vitepress/pages.js";
import { markdownUrl, SITE_URL } from "../../docs/.vitepress/urls.js";
import { builtHead, DIST } from "./built.js";

const read = (file) => readFileSync(join(DIST, file), "utf8");

// The file in dist that answers a documentation URL, as the bucket would.
function served(url) {
  const { pathname } = new URL(url);
  return join(
    DIST,
    pathname.endsWith("/") ? `${pathname}index.html` : pathname,
  );
}

const documentationLinks = (text) =>
  [
    ...text.matchAll(/https:\/\/documentation\.formspark\.io[^\s)>\]"'`]*/g),
  ].map(([url]) => url.replace(/[.,;:]+$/, ""));

describe("built Markdown copies", () => {
  for (const { relativePath } of readPages()) {
    it(`publishes ${relativePath} and links it from the page`, () => {
      assert.doesNotMatch(read(relativePath), /^---\n/);
      assert.ok(
        builtHead(relativePath).includes(
          `<link rel="alternate" type="text/markdown" href="${markdownUrl(relativePath)}">`,
        ),
      );
    });
  }

  for (const file of [
    "llms.txt",
    "llms-full.txt",
    "skills/formspark/SKILL.md",
  ]) {
    it(`resolves every documentation link in ${file}`, () => {
      const links = documentationLinks(read(file));
      assert.ok(links.length > 0);
      const missing = links.filter((url) => !existsSync(served(url)));
      assert.deepEqual([...new Set(missing)], []);
    });
  }

  it("starts llms-full.txt with the home page", () => {
    assert.ok(read("llms-full.txt").includes(`Source: ${SITE_URL}/index.md\n`));
  });
});

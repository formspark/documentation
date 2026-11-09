import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readPages } from "../../docs/.vitepress/pages.js";
import { sidebar } from "../../docs/.vitepress/sidebar.js";
import { markdownUrl } from "../../docs/.vitepress/urls.js";
import { builtHead, DIST, distFile } from "./built.js";

const DOCUMENTATION_LINK =
  /https:\/\/documentation\.formspark\.io[^\s)>\]"'`]*/g;
const TRAILING_PUNCTUATION = /[.,;:]+$/;
const SOURCE_LINE = /^Source: (\S+)$/gm;

const read = (file) => readFileSync(join(DIST, file), "utf8");

const served = (url) => distFile(new URL(url).pathname);

const documentationLinks = (text) =>
  [...text.matchAll(DOCUMENTATION_LINK)].map(([url]) =>
    url.replace(TRAILING_PUNCTUATION, ""),
  );

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

  it("publishes sidebar pages first and unlisted pages last in llms-full.txt", () => {
    const sources = [...read("llms-full.txt").matchAll(SOURCE_LINE)].map(
      ([, url]) => url,
    );
    const expected = sidebar.flatMap(({ items }) =>
      items.map(({ link }) =>
        markdownUrl(`${link.slice(1)}${link.endsWith("/") ? "index" : ""}.md`),
      ),
    );
    assert.deepEqual(sources.slice(0, expected.length), expected);
    assert.ok(
      sources.slice(expected.length).every((url) => !expected.includes(url)),
    );
    assert.deepEqual(
      sources.toSorted(),
      readPages()
        .map(({ relativePath }) => markdownUrl(relativePath))
        .sort(),
    );
  });

  it("includes each published Markdown copy in llms-full.txt", () => {
    const full = read("llms-full.txt");
    for (const { relativePath } of readPages()) {
      assert.ok(
        full.includes(
          `Source: ${markdownUrl(relativePath)}\n\n${read(relativePath)}`,
        ),
        `${relativePath} differs from its entry in llms-full.txt`,
      );
    }
  });
});

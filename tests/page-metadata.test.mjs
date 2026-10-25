import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readPages } from "../docs/.vitepress/pages.js";
import { sidebar } from "../docs/.vitepress/sidebar.js";
import { pagePath } from "../docs/.vitepress/urls.js";

// Pages reachable by link only, outside the navigation.
const UNLISTED = ["integration/integromat.md"];

const pages = readPages();

describe("page metadata", () => {
  it("gives every page a unique title", () => {
    const titles = pages.map(({ frontmatter }) => frontmatter.title);
    assert.ok(titles.every(Boolean), "a page has no title");
    assert.deepEqual(
      titles.filter((title, index) => titles.indexOf(title) !== index),
      [],
    );
  });

  for (const { relativePath, frontmatter } of pages) {
    it(`describes ${relativePath} in 70 to 160 characters`, () => {
      const { description = "" } = frontmatter;
      assert.ok(
        description.length >= 70 && description.length <= 160,
        `${description.length} characters`,
      );
      assert.doesNotMatch(description, /\u2014/);
    });
  }

  it("lists every page in the sidebar exactly once", () => {
    const links = sidebar
      .flatMap((group) => group.items)
      .map(({ link }) => (link.endsWith("/") ? link : `${link}.html`));
    const listed = pages
      .filter(({ relativePath }) => !UNLISTED.includes(relativePath))
      .map(({ relativePath }) => pagePath(relativePath));
    assert.deepEqual([...links].sort(), listed.sort());
  });
});

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parsePage, readPages } from "../docs/.vitepress/pages.js";

describe("parsePage", () => {
  it("splits the frontmatter from the body", () => {
    const { frontmatter, body } = parsePage(
      "---\ntitle: Webhooks\nlang: en-US\n---\n\n# Webhooks\n",
    );
    assert.deepEqual(frontmatter, { title: "Webhooks", lang: "en-US" });
    assert.equal(body, "\n# Webhooks\n");
  });

  it("reads a double-quoted value as a JSON string", () => {
    const { frontmatter } = parsePage(
      '---\ndescription: "Fields: \\"name\\" and email."\n---\n',
    );
    assert.equal(frontmatter.description, 'Fields: "name" and email.');
  });

  it("keeps a page without frontmatter whole", () => {
    assert.deepEqual(parsePage("# Page\n\n---\n"), {
      frontmatter: {},
      body: "# Page\n\n---\n",
    });
  });
});

describe("readPages", () => {
  const paths = readPages().map(({ relativePath }) => relativePath);

  it("lists pages in path order", () => {
    assert.deepEqual(paths, paths.toSorted());
  });

  it("skips Markdown under .vitepress and public", () => {
    assert.ok(paths.includes("index.md"));
    assert.ok(paths.every((path) => !/^(\.vitepress|public)\//.test(path)));
  });
});

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parsePage } from "../docs/.vitepress/pages.js";

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

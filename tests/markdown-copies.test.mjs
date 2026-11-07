import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  markdownCopy,
  readingOrder,
} from "../docs/.vitepress/markdown-copies.js";

const SITE = "https://documentation.formspark.io";
const copy = (body, relativePath = "api/errors.md") =>
  markdownCopy({ relativePath, body });

describe("markdownCopy", () => {
  it("points a site-relative page link at its Markdown copy", () => {
    assert.equal(
      copy("See [limits](/troubleshooting/limits-and-plans#plans)."),
      `See [limits](${SITE}/troubleshooting/limits-and-plans.md#plans).\n`,
    );
  });

  it("resolves a relative link against the page's directory", () => {
    assert.equal(
      copy("[Pagination](./pagination)", "api/index.md"),
      `[Pagination](${SITE}/api/pagination.md)\n`,
    );
    assert.equal(
      copy("[Setup](../setup/)"),
      `[Setup](${SITE}/setup/index.md)\n`,
    );
  });

  it("points an .html link at the copy beside it", () => {
    assert.equal(
      copy("[Webhooks](/integration/webhooks.html)"),
      `[Webhooks](${SITE}/integration/webhooks.md)\n`,
    );
  });

  it("keeps a file link's extension", () => {
    assert.equal(
      copy("![Echo](/submit-echo.png)"),
      `![Echo](${SITE}/submit-echo.png)\n`,
    );
  });

  it("leaves external links and anchors as they are", () => {
    const body = "[Formspark](https://formspark.io) and [below](#roles)";
    assert.equal(copy(body), `${body}\n`);
  });

  it("rewrites every link in the body on each call", () => {
    const body = "[Setup](/setup/) and [Errors](/api/errors)";
    const expected = `[Setup](${SITE}/setup/index.md) and [Errors](${SITE}/api/errors.md)\n`;
    assert.equal(copy(body), expected);
    assert.equal(copy(body), expected);
  });

  it("trims the body to end in one newline", () => {
    assert.equal(copy("\n# Errors\n\n\n"), "# Errors\n");
  });
});

describe("readingOrder", () => {
  const order = (...paths) =>
    readingOrder(paths.map((relativePath) => ({ relativePath }))).map(
      ({ relativePath }) => relativePath,
    );

  it("sorts pages in sidebar order", () => {
    assert.deepEqual(
      order("api/errors.md", "setup/spam-protection.md", "setup/index.md"),
      ["setup/index.md", "setup/spam-protection.md", "api/errors.md"],
    );
  });

  it("puts a page missing from the sidebar last", () => {
    assert.deepEqual(order("drafts/unlisted.md", "index.md"), [
      "index.md",
      "drafts/unlisted.md",
    ]);
  });

  it("leaves the given list as it is", () => {
    const pages = [
      { relativePath: "api/errors.md" },
      { relativePath: "index.md" },
    ];
    readingOrder(pages);
    assert.equal(pages[0].relativePath, "api/errors.md");
  });
});

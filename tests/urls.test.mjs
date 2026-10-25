import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  linkPath,
  markdownUrl,
  ogImagePath,
  pagePath,
} from "../docs/.vitepress/urls.js";

describe("pagePath", () => {
  it("serves a page at its .html file", () => {
    assert.equal(
      pagePath("setup/spam-protection.md"),
      "/setup/spam-protection.html",
    );
  });

  it("serves a directory index at the directory", () => {
    assert.equal(pagePath("index.md"), "/");
    assert.equal(pagePath("setup/index.md"), "/setup/");
  });

  it("keeps a page whose name ends in index as a page", () => {
    assert.equal(pagePath("setup/reindex.md"), "/setup/reindex.html");
  });
});

describe("linkPath", () => {
  it("adds the .html suffix VitePress renders", () => {
    assert.equal(
      linkPath("/setup/spam-protection"),
      "/setup/spam-protection.html",
    );
  });

  it("keeps a directory link as it is", () => {
    assert.equal(linkPath("/setup/"), "/setup/");
    assert.equal(linkPath("/"), "/");
  });
});

describe("markdownUrl", () => {
  it("addresses a copy at its source path", () => {
    assert.equal(
      markdownUrl("setup/index.md"),
      "https://documentation.formspark.io/setup/index.md",
    );
  });
});

describe("ogImagePath", () => {
  it("names the image after the page's source", () => {
    assert.equal(ogImagePath("index.md"), "/og/index.png");
    assert.equal(ogImagePath("api/errors.md"), "/og/api/errors.png");
  });
});

// Checks the built site, so it runs after `vitepress build`, not with
// `pnpm test`. See the build script in package.json.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readPages } from "../../docs/.vitepress/pages.js";
import { pageUrl } from "../../docs/.vitepress/urls.js";
import { builtHead } from "./built.js";

const attribute = (head, pattern) =>
  [...head.matchAll(pattern)].map(([, value]) => value);

describe("built page head", () => {
  for (const { relativePath, frontmatter } of readPages()) {
    it(`describes ${relativePath}`, () => {
      const head = builtHead(relativePath);
      assert.deepEqual(
        attribute(head, /<link rel="canonical" href="([^"]*)"/g),
        [pageUrl(relativePath)],
      );
      assert.deepEqual(
        attribute(head, /<meta property="og:url" content="([^"]*)"/g),
        [pageUrl(relativePath)],
      );
      assert.deepEqual(
        attribute(head, /<meta name="description" content="([^"]*)"/g),
        [frontmatter.description.replaceAll("&", "&amp;")],
      );
      assert.equal(
        attribute(head, /<meta property="og:title" content="([^"]*)"/g).length,
        1,
      );
    });
  }
});

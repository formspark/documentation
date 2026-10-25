import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { readPages } from "../../docs/.vitepress/pages.js";
import { SITE_URL } from "../../docs/.vitepress/urls.js";
import { builtHead, DIST } from "./built.js";

describe("built Open Graph images", () => {
  for (const { relativePath } of readPages()) {
    it(`renders a 1200x630 PNG for ${relativePath}`, () => {
      const [image, ...others] = [
        ...builtHead(relativePath).matchAll(
          /<meta property="og:image" content="([^"]*)"/g,
        ),
      ].map(([, url]) => url);
      assert.equal(others.length, 0);
      assert.ok(image.startsWith(`${SITE_URL}/og/`), image);
      const png = readFileSync(join(DIST, image.slice(SITE_URL.length)));
      // The IHDR chunk holds the width and height right after the signature.
      assert.equal(png.readUInt32BE(16), 1200);
      assert.equal(png.readUInt32BE(20), 630);
    });
  }
});

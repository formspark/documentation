import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { imageSize, PUBLIC_DIR } from "../docs/.vitepress/image-size.js";

const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
// The content column is about 690px wide, so 2x covers a sharp screen. A
// little headroom allows for a screenshot cropped at its natural width.
const MAX_WIDTH = 1600;
// About 10 seconds on Slow 3G, which is already a long wait for one image.
const MAX_BYTES = 256 * 1024;

const rasters = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return rasters(path);
    return RASTER.has(extname(entry.name).toLowerCase()) ? [path] : [];
  });

describe("public images", () => {
  for (const path of rasters(PUBLIC_DIR)) {
    const name = relative(PUBLIC_DIR, path);

    it(`keeps ${name} under the weight budget`, () => {
      assert.ok(
        statSync(path).size <= MAX_BYTES,
        `${name} is over ${MAX_BYTES / 1024} KB: resize it to the slot`,
      );
    });

    it(`keeps ${name} at most ${MAX_WIDTH}px wide`, () => {
      const size = imageSize(path);
      assert.ok(size, `${name} is not a PNG or JPEG the build can measure`);
      assert.ok(size.width <= MAX_WIDTH, `${name} is wider than needed`);
    });
  }
});

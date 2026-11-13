import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createMarkdownRenderer } from "vitepress";
import config from "../docs/.vitepress/config.js";
import { imageSize } from "../docs/.vitepress/image-size.js";
import { readPages } from "../docs/.vitepress/pages.js";

const IMAGE_TAG = /<img [^>]*>/g;

// The first bytes of a PNG: signature, then an IHDR chunk with the size.
function png(width, height) {
  const ihdr = Buffer.alloc(8);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  return Buffer.concat([
    Buffer.from("89504e470d0a1a0a0000000d49484452", "hex"),
    ihdr,
  ]);
}

// The first bytes of a progressive JPEG: SOI, an APP0 segment, a Huffman
// table segment (C4, which is not a frame), then the SOF2 frame header.
function jpeg(width, height) {
  const frame = Buffer.alloc(9);
  frame.writeUInt16BE(0xffc2, 0);
  frame.writeUInt16BE(17, 2);
  frame.writeUInt8(8, 4);
  frame.writeUInt16BE(height, 5);
  frame.writeUInt16BE(width, 7);
  return Buffer.concat([
    Buffer.from("ffd8ffe000044a46ffc4000300", "hex"),
    frame,
    Buffer.alloc(8),
  ]);
}

describe("imageSize", () => {
  let directory;
  const file = (name, bytes) => {
    const path = join(directory, name);
    writeFileSync(path, bytes);
    return path;
  };

  before(() => {
    directory = mkdtempSync(join(tmpdir(), "image-size-"));
  });
  after(() => rmSync(directory, { recursive: true, force: true }));

  it("reads a PNG's size from its header", () => {
    assert.deepEqual(imageSize(file("shot.png", png(1400, 795))), {
      width: 1400,
      height: 795,
    });
  });

  it("reads a JPEG's size from its frame header, past other segments", () => {
    assert.deepEqual(imageSize(file("shot.jpeg", jpeg(1114, 567))), {
      width: 1114,
      height: 567,
    });
  });

  it("measures no other format", () => {
    assert.equal(imageSize(file("art.svg", "<svg></svg>")), undefined);
  });
});

describe("imageDimensions", () => {
  let md;
  const render = (source) => md.render(source, { relativePath: "page.md" });

  before(async () => {
    md = await createMarkdownRenderer("docs", config.markdown, "/");
  });

  it("gives a screenshot its size and keeps it lazy", () => {
    assert.match(
      render("![Framer](/formspark-framer.png)"),
      /<img src="\/formspark-framer.png" alt="Framer" width="\d+" height="\d+" loading="lazy">/,
    );
  });

  it("leaves an image on another host alone", () => {
    assert.equal(
      render("![Logo](https://example.com/logo.png)").match(IMAGE_TAG)[0],
      '<img src="https://example.com/logo.png" alt="Logo" loading="lazy">',
    );
  });

  it("fails on an image it cannot measure", () => {
    assert.throws(
      () => render("![Illustration](/illustration.svg)"),
      /Cannot read the size of \/illustration.svg in page.md/,
    );
  });

  it("sizes every image on every page", () => {
    for (const { relativePath, body } of readPages()) {
      for (const tag of md.render(body, { relativePath }).match(IMAGE_TAG) ??
        []) {
        assert.match(
          tag,
          / width="\d+" height="\d+"/,
          `${relativePath}: ${tag}`,
        );
      }
    }
  });
});

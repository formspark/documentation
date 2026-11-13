import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DOCS_DIR } from "./pages.js";

export const PUBLIC_DIR = join(DOCS_DIR, "public");

// A path on this site, not a protocol-relative address on another host.
const SITE_PATH = /^\/(?!\/)/;
const PNG_SIGNATURE = "89504e470d0a1a0a";
// JPEG start-of-frame markers carry the size. C4, C8 and CC share the range
// but are a Huffman table, a reserved marker and an arithmetic coding table.
const isStartOfFrame = (marker) =>
  marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);

// A PNG states its size in the IHDR chunk, right after the signature.
function pngSize(bytes) {
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

// A JPEG states its size in the start-of-frame segment, found by walking the
// segments from the start of the file.
function jpegSize(bytes) {
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1];
    if (isStartOfFrame(marker)) {
      return {
        width: bytes.readUInt16BE(offset + 7),
        height: bytes.readUInt16BE(offset + 5),
      };
    }
    offset += 2 + bytes.readUInt16BE(offset + 2);
  }
  return undefined;
}

// The intrinsic size of a PNG or JPEG file, or undefined for another format.
export function imageSize(path) {
  const bytes = readFileSync(path);
  if (bytes.subarray(0, 8).toString("hex") === PNG_SIGNATURE)
    return pngSize(bytes);
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return jpegSize(bytes);
  return undefined;
}

// A markdown-it plugin that gives every Markdown image served from
// docs/public its width and height. The browser then reserves the image's
// box before it loads, so a screenshot arriving late on a slow connection
// does not push the text below it down. An image it cannot measure fails the
// build rather than shipping a page that shifts.
export function imageDimensions(md) {
  const render = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, index, options, env, self) => {
    const token = tokens[index];
    const src = token.attrGet("src");
    if (SITE_PATH.test(src ?? "") && !token.attrGet("width")) {
      const size = imageSize(join(PUBLIC_DIR, decodeURI(src)));
      if (!size)
        throw new Error(
          `Cannot read the size of ${src} in ${env.relativePath}`,
        );
      token.attrSet("width", String(size.width));
      token.attrSet("height", String(size.height));
    }
    return render(tokens, index, options, env, self);
  };
}

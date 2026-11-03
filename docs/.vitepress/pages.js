import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;
const FRONTMATTER_FIELD = /^([\w-]+):\s*(.*)$/;
const ASSET_DIRECTORY = /^(\.vitepress|public)\//;

export const DOCS_DIR = fileURLToPath(new URL("..", import.meta.url));

// Splits a page into its frontmatter and body. Pages keep their frontmatter
// to flat `key: value` lines, with strings that need quoting in double quotes.
export function parsePage(source) {
  const match = source.match(FRONTMATTER);
  const frontmatter = {};
  for (const line of match ? match[1].split("\n") : []) {
    const [, key, value] = line.match(FRONTMATTER_FIELD) ?? [];
    if (key)
      frontmatter[key] = value.startsWith('"') ? JSON.parse(value) : value;
  }
  return { frontmatter, body: match ? source.slice(match[0].length) : source };
}

// Every documentation page, by its path relative to docs/.
export function readPages() {
  return readdirSync(DOCS_DIR, { recursive: true })
    .filter((file) => file.endsWith(".md") && !ASSET_DIRECTORY.test(file))
    .sort()
    .map((relativePath) => ({
      relativePath,
      ...parsePage(readFileSync(join(DOCS_DIR, relativePath), "utf8")),
    }));
}

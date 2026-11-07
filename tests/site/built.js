import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DOCS_DIR } from "../../docs/.vitepress/pages.js";
import { pagePath } from "../../docs/.vitepress/urls.js";

export const DIST = join(DOCS_DIR, ".vitepress/dist");

// The file in dist that answers a site path, as the bucket would.
export const distFile = (path) =>
  join(DIST, path.endsWith("/") ? `${path}index.html` : path);

export function builtHead(relativePath) {
  const html = readFileSync(distFile(pagePath(relativePath)), "utf8");
  return html.slice(0, html.indexOf("</head>"));
}

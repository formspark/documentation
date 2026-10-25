import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DOCS_DIR } from "../../docs/.vitepress/pages.js";
import { pagePath } from "../../docs/.vitepress/urls.js";

export const DIST = join(DOCS_DIR, ".vitepress/dist");

export function builtHead(relativePath) {
  const path = pagePath(relativePath);
  const file = path.endsWith("/") ? `${path}index.html` : path;
  const html = readFileSync(join(DIST, file), "utf8");
  return html.slice(0, html.indexOf("</head>"));
}

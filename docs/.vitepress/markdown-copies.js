import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { readPages } from "./pages.js";
import { sidebar } from "./sidebar.js";
import { linkPath, markdownUrl, pagePath, SITE_URL } from "./urls.js";

// Points a site-relative link in a page at an absolute address, so the copy
// still works once it leaves the site. Links to other pages go to their
// Markdown copies, links to images and other files stay as they are.
function absoluteLink(target, relativePath) {
  const url = new URL(target, markdownUrl(relativePath));
  if (url.pathname.endsWith("/")) url.pathname += "index.md";
  else if (url.pathname.endsWith(".html"))
    url.pathname = url.pathname.replace(/\.html$/, ".md");
  else if (!/\.\w+$/.test(url.pathname)) url.pathname += ".md";
  return url.href;
}

export function markdownCopy({ relativePath, body }) {
  return (
    body
      .trim()
      .replace(
        /\]\((\.{0,2}\/[^)\s]*)\)/g,
        (_, target) => `](${absoluteLink(target, relativePath)})`,
      ) + "\n"
  );
}

// Sidebar order first, so the full text reads in the order a person would.
function readingOrder(pages) {
  const order = sidebar.flatMap((group) =>
    group.items.map(({ link }) => linkPath(link)),
  );
  const rank = ({ relativePath }) => {
    const index = order.indexOf(pagePath(relativePath));
    return index === -1 ? order.length : index;
  };
  return [...pages].sort((a, b) => rank(a) - rank(b));
}

// Writes each page's Markdown source, without its frontmatter, next to its
// HTML, and every page in one llms-full.txt. VitePress containers such as
// `::: tip` stay as they are, since they read plainly as text.
export function writeMarkdownCopies(outDir) {
  const pages = readingOrder(readPages());
  for (const page of pages) {
    const file = join(outDir, page.relativePath);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, markdownCopy(page));
  }
  const full = pages.map(
    (page) =>
      `Source: ${markdownUrl(page.relativePath)}\n\n${markdownCopy(page)}`,
  );
  writeFileSync(
    join(outDir, "llms-full.txt"),
    `# Formspark Documentation\n\n> Every page of ${SITE_URL}, in sidebar order.\n\n${full.join("\n---\n\n")}`,
  );
}

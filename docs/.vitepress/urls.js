export const SITE_URL = "https://documentation.formspark.io";

// The site path a page's source builds to. cleanUrls is off, so a page is
// served at its .html file and a directory index at the directory itself.
export function pagePath(relativePath) {
  if (relativePath === "index.md" || relativePath.endsWith("/index.md")) {
    return `/${relativePath.slice(0, -"index.md".length)}`;
  }
  return `/${relativePath.replace(/\.md$/, ".html")}`;
}

export const pageUrl = (relativePath) => SITE_URL + pagePath(relativePath);

// The site path a sidebar link points at, since sidebar links leave out the
// .html suffix that VitePress adds when it renders them.
export const linkPath = (link) => (link.endsWith("/") ? link : `${link}.html`);

// The Markdown copy of a page sits next to its HTML, under the source's name.
export const markdownUrl = (relativePath) => `${SITE_URL}/${relativePath}`;

// Where the build writes a page's Open Graph image.
export const ogImagePath = (relativePath) =>
  `/og/${relativePath.replace(/\.md$/, ".png")}`;

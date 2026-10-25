import { sidebar } from "./sidebar.js";
import { linkPath, pagePath, pageUrl, SITE_URL } from "./urls.js";

export const SITE_TITLE = "Formspark Documentation";
export const CDN = "https://cdn.formspark.io/images/formspark/logos";

const ORGANIZATION = {
  "@type": "Organization",
  "@id": "https://formspark.io/#organization",
  name: "Formspark",
  url: "https://formspark.io",
  logo: `${CDN}/formspark.svg`,
};

export const meta = (entries) =>
  Object.entries(entries).map(([key, content]) => [
    "meta",
    // og:* is an Open Graph property, everything else is a plain meta name.
    { [key.startsWith("og:") ? "property" : "name"]: key, content },
  ]);

// The tags that describe one page to search engines and link previews.
// The 404 page has no address of its own, so it gets none of them.
export function pageHead({ pageData, title, description }) {
  if (pageData.isNotFound) return [];
  const url = pageUrl(pageData.relativePath);
  return [
    ["link", { rel: "canonical", href: url }],
    ...meta({
      "og:title": title,
      "og:description": description,
      "og:url": url,
    }),
    [
      "script",
      { type: "application/ld+json" },
      // Escaping "<" keeps a value from closing the script element early.
      JSON.stringify(structuredData(pageData, description)).replaceAll(
        "<",
        "\\u003c",
      ),
    ],
  ];
}

// Where a page sits in the sidebar: its group, and the group's first page,
// which stands in for the group since groups have no page of their own.
function sidebarPlace(relativePath) {
  const path = pagePath(relativePath);
  for (const group of sidebar) {
    if (group.items.some(({ link }) => linkPath(link) === path)) {
      return { name: group.text, path: linkPath(group.items[0].link) };
    }
  }
}

function breadcrumbs(relativePath, title) {
  const group = sidebarPlace(relativePath);
  const trail = [
    { name: "Documentation", path: "/" },
    ...(group && group.path !== pagePath(relativePath) ? [group] : []),
    { name: title, path: pagePath(relativePath) },
  ];
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: SITE_URL + path,
    })),
  };
}

export function structuredData(pageData, description) {
  const { relativePath, title } = pageData;
  const isHome = relativePath === "index.md";
  const article = {
    "@type": "TechArticle",
    headline: title,
    description,
    url: pageUrl(relativePath),
    inLanguage: "en-US",
    publisher: ORGANIZATION,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_TITLE,
    url: `${SITE_URL}/`,
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION["@id"] },
  };
  return {
    "@context": "https://schema.org",
    "@graph": isHome
      ? [ORGANIZATION, website, article]
      : [article, breadcrumbs(relativePath, title)],
  };
}

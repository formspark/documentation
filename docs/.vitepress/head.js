import { pageUrl } from "./urls.js";

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
  ];
}

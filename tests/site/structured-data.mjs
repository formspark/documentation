import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readPages } from "../../docs/.vitepress/pages.js";
import { pageUrl } from "../../docs/.vitepress/urls.js";
import { builtHead } from "./built.js";

// Every URL a crawler reads from the graph, which must stand on its own.
function urls(node) {
  if (Array.isArray(node)) return node.flatMap(urls);
  if (!node || typeof node !== "object") return [];
  return Object.entries(node).flatMap(([key, value]) =>
    ["url", "item", "logo", "@id"].includes(key) ? [value] : urls(value),
  );
}

describe("built structured data", () => {
  for (const { relativePath, frontmatter } of readPages()) {
    it(`describes ${relativePath} as JSON-LD`, () => {
      const scripts = [
        ...builtHead(relativePath).matchAll(
          /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
        ),
      ];
      assert.equal(scripts.length, 1);
      const graph = JSON.parse(scripts[0][1])["@graph"];
      const types = graph.map((node) => node["@type"]);
      const article = graph.find((node) => node["@type"] === "TechArticle");

      assert.equal(article.headline, frontmatter.title);
      assert.equal(article.description, frontmatter.description);
      assert.equal(article.url, pageUrl(relativePath));
      assert.equal(article.publisher.name, "Formspark");
      for (const url of urls(graph)) {
        assert.match(url, /^https:\/\//, `${url} is not absolute`);
      }
      if (relativePath === "index.md") {
        assert.deepEqual(types.sort(), [
          "Organization",
          "TechArticle",
          "WebSite",
        ]);
      } else {
        const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
        assert.equal(crumbs.itemListElement.at(-1).item, pageUrl(relativePath));
      }
    });
  }
});

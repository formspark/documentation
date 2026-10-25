import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  pageHead,
  sidebarPlace,
  structuredData,
} from "../docs/.vitepress/head.js";

const SITE = "https://documentation.formspark.io";
const crumbs = (relativePath, title) =>
  structuredData({ relativePath, title }, "")
    ["@graph"].find((node) => node["@type"] === "BreadcrumbList")
    .itemListElement.map(({ name, item }) => [name, item]);

describe("pageHead", () => {
  it("gives the 404 page no tags of its own", () => {
    assert.deepEqual(pageHead({ pageData: { isNotFound: true } }), []);
  });

  it("keeps a value from closing the JSON-LD script", () => {
    const head = pageHead({
      pageData: { relativePath: "api/errors.md", title: "</script>" },
      title: "</script>",
      description: "",
    });
    const [, , json] = head.find(([tag]) => tag === "script");
    assert.ok(!json.includes("</script>"));
    assert.equal(JSON.parse(json)["@graph"][0].headline, "</script>");
  });
});

describe("sidebarPlace", () => {
  it("places a page in its group, under the group's first page", () => {
    assert.deepEqual(sidebarPlace("setup/file-uploads.md"), {
      name: "Setup",
      path: "/setup/",
    });
  });

  it("places an unlisted page nowhere", () => {
    assert.equal(sidebarPlace("integration/integromat.md"), undefined);
  });
});

describe("structuredData", () => {
  it("leads the breadcrumb through the page's group", () => {
    assert.deepEqual(crumbs("setup/file-uploads.md", "File uploads"), [
      ["Documentation", `${SITE}/`],
      ["Setup", `${SITE}/setup/`],
      ["File uploads", `${SITE}/setup/file-uploads.html`],
    ]);
  });

  it("does not repeat a group's first page in its breadcrumb", () => {
    assert.deepEqual(crumbs("setup/index.md", "Installation"), [
      ["Documentation", `${SITE}/`],
      ["Installation", `${SITE}/setup/`],
    ]);
  });
});

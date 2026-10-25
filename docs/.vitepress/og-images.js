import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { renderAsync } from "@resvg/resvg-js";
import satori from "satori";
import { sidebarPlace } from "./head.js";
import { readPages } from "./pages.js";
import { ogImagePath } from "./urls.js";

const WIDTH = 1200;
const HEIGHT = 630;

// The package exports only its stylesheets, so the font files are read
// from beside its LICENSE.
const fontDir = join(
  dirname(createRequire(import.meta.url).resolve("@fontsource/inter/LICENSE")),
  "files",
);
const fonts = [400, 700].map((weight) => ({
  name: "Inter",
  weight,
  style: "normal",
  data: readFileSync(join(fontDir, `inter-latin-${weight}-normal.woff`)),
}));

const element = (type, style, children) => ({
  type,
  props: { style, children },
});

// A branded card with the page's sidebar group above its title.
function card({ section, title }) {
  return element(
    "div",
    {
      width: WIDTH,
      height: HEIGHT,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      backgroundColor: "#5f6cdb",
      color: "#ffffff",
      fontFamily: "Inter",
    },
    [
      element("div", { fontSize: 36, fontWeight: 700 }, "Formspark"),
      element("div", { display: "flex", flexDirection: "column" }, [
        element(
          "div",
          { fontSize: 32, opacity: 0.8, marginBottom: 16 },
          section,
        ),
        element(
          "div",
          {
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: WIDTH - 160,
          },
          title,
        ),
      ]),
      element(
        "div",
        { fontSize: 28, opacity: 0.8 },
        "documentation.formspark.io",
      ),
    ],
  );
}

// Renders one Open Graph image per page into the build output. Rendering
// runs on libuv's thread pool, so the pages render side by side.
export async function writeOgImages(outDir) {
  await Promise.all(
    readPages().map(async ({ relativePath, frontmatter }) => {
      const section = sidebarPlace(relativePath)?.name ?? "Documentation";
      const svg = await satori(card({ section, title: frontmatter.title }), {
        width: WIDTH,
        height: HEIGHT,
        fonts,
      });
      const file = join(outDir, ogImagePath(relativePath));
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, (await renderAsync(svg)).asPng());
    }),
  );
}

// Checks the built site, so it runs after `vitepress build`, not with
// `pnpm test`. See the build script in package.json.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readPages } from "../../docs/.vitepress/pages.js";
import { markdownPathFor } from "../../docs/.vitepress/theme/doc-actions.js";
import { DIST } from "./built.js";

describe("page actions", () => {
  for (const { relativePath } of readPages()) {
    it(`copies ${relativePath} from a file the build wrote`, () => {
      const file = join(DIST, decodeURI(markdownPathFor(relativePath)));
      assert.ok(existsSync(file), file);
      assert.doesNotMatch(readFileSync(file, "utf8"), /Copy Markdown/);
    });
  }

  it("keeps the buttons out of llms-full.txt", () => {
    assert.doesNotMatch(
      readFileSync(join(DIST, "llms-full.txt"), "utf8"),
      /Copy Markdown|Copy for agents/,
    );
  });
});

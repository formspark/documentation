import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readPages } from "../docs/.vitepress/pages.js";
import { markdownUrl } from "../docs/.vitepress/urls.js";
import {
  agentPrompt,
  markdownPathFor,
  markdownUrlFor,
} from "../docs/.vitepress/theme/doc-actions.js";

describe("markdownUrlFor", () => {
  it("addresses a page's copy at its source path", () => {
    assert.equal(
      markdownUrlFor("setup/spam-protection.md"),
      "https://documentation.formspark.io/setup/spam-protection.md",
    );
  });

  it("addresses a directory index at its index.md", () => {
    assert.equal(markdownPathFor("setup/index.md"), "/setup/index.md");
    assert.equal(
      markdownUrlFor("index.md"),
      "https://documentation.formspark.io/index.md",
    );
  });

  it("agrees with the address the build writes each copy at", () => {
    for (const { relativePath } of readPages()) {
      assert.equal(markdownUrlFor(relativePath), markdownUrl(relativePath));
    }
  });
});

describe("agentPrompt", () => {
  it("names the page, its Markdown copy and the skill", () => {
    assert.equal(
      agentPrompt(
        "Spam protection",
        "https://documentation.formspark.io/setup/spam-protection.md",
      ),
      [
        'Read the Formspark docs page "Spam protection": https://documentation.formspark.io/setup/spam-protection.md',
        "The Formspark agent skill is at https://documentation.formspark.io/skills/formspark/SKILL.md.",
        "Use them to make this change in my project, on the stack it already uses. Ask me for keys or IDs rather than inventing them.",
      ].join("\n"),
    );
  });
});

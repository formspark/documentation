import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeSentryEvent } from "../docs/.vitepress/theme/sentry-privacy.js";

describe("sanitizeSentryEvent", () => {
  it("omits payloads, locals and exception values while preserving locations", () => {
    const event = {
      request: { url: "https://example.test/?token=private-url" },
      user: { email: "private-email" },
      extra: { query: "private-literal", variables: { code: "private-code" } },
      contexts: { trpc: { input: { answers: "private-answer" } } },
      breadcrumbs: [{ message: "private-breadcrumb" }],
      exception: {
        values: [
          {
            type: "Error",
            value: "private-error",
            stacktrace: {
              frames: [
                {
                  filename: "app.ts?private-query",
                  lineno: 42,
                  vars: { value: "private-local" },
                  context_line: "private-source",
                },
              ],
            },
          },
        ],
      },
    };
    const output = sanitizeSentryEvent(event);
    const json = JSON.stringify(output);
    assert.ok(!json.includes("private-"));
    assert.ok(json.includes("app.ts"));
    assert.ok(json.includes("42"));
    assert.equal(event.extra.query, "private-literal");
  });
});

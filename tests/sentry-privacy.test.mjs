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

  it("handles events without exceptions", () => {
    const output = sanitizeSentryEvent({
      event_id: "event-id",
      message: "private-message",
    });
    assert.equal(output.event_id, "event-id");
    assert.equal(output.exception, undefined);
    assert.equal(output.message, undefined);
  });

  it("normalizes unknown exception types and handles missing stack frames", () => {
    const output = sanitizeSentryEvent({
      exception: {
        values: [
          { type: "private-type", value: "private-value" },
          { type: "TypeError", stacktrace: {} },
        ],
      },
    });
    assert.deepEqual(output.exception.values, [
      {
        type: "Error",
        value: "Error details omitted",
        mechanism: undefined,
        stacktrace: undefined,
      },
      {
        type: "TypeError",
        value: "Error details omitted",
        mechanism: undefined,
        stacktrace: { frames: undefined },
      },
    ]);
  });

  it("keeps mechanism status without attached data and removes URL fragments", () => {
    const output = sanitizeSentryEvent({
      exception: {
        values: [
          {
            type: "Error",
            mechanism: {
              type: "generic",
              handled: false,
              data: { secret: "private-data" },
            },
            stacktrace: {
              frames: [{ filename: "app.js#private-fragment", lineno: 7 }],
            },
          },
        ],
      },
    });
    const [exception] = output.exception.values;
    assert.deepEqual(exception.mechanism, { type: "generic", handled: false });
    assert.equal(exception.stacktrace.frames[0].filename, "app.js");
    assert.ok(!JSON.stringify(output).includes("private-"));
  });
});

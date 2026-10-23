const ERROR_TYPES = new Set([
  "Error",
  "TypeError",
  "RangeError",
  "SyntaxError",
  "ReferenceError",
  "AbortError",
  "TimeoutError",
  "DrizzleQueryError",
  "DatabaseError",
  "GraphQLError",
  "TRPCError",
  "ZodError",
]);

// SDK collection flags do not cover hand-attached context or exception text.
// Keep code locations for grouping, without payloads, locals or breadcrumbs.
export function sanitizeSentryEvent(event) {
  return {
    ...event,
    message: undefined,
    logentry: undefined,
    request: undefined,
    user: undefined,
    extra: undefined,
    breadcrumbs: undefined,
    contexts: undefined,
    transaction: undefined,
    exception: event.exception && {
      values: event.exception.values?.map((exception) => ({
        type:
          exception.type && ERROR_TYPES.has(exception.type)
            ? exception.type
            : "Error",
        value: "Error details omitted",
        mechanism: exception.mechanism && {
          type: exception.mechanism.type,
          handled: exception.mechanism.handled,
        },
        stacktrace: exception.stacktrace && {
          frames: exception.stacktrace.frames?.map((frame) => ({
            filename: frame.filename?.replace(/[?#][\s\S]*$/, ""),
            function: frame.function,
            module: frame.module,
            lineno: frame.lineno,
            colno: frame.colno,
            in_app: frame.in_app,
          })),
        },
      })),
    },
  };
}

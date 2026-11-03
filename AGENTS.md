# Agent context

- Hoist fixed regexes to module scope. Shared `g`/`y` expressions retain
  `lastIndex` across `test`/`exec`; reset it or avoid those flags.
- Reuse parsed URL parts rather than reparsing the same input, while retaining
  security normalization and validation.
- Run independent asynchronous reads in parallel. Keep dependencies, write order
  and failure precedence intact; do not parallelize dependent operations.

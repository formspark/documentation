# Agent context

- Hoist fixed regexes to module scope. Shared `g`/`y` expressions retain
  `lastIndex` across `test`/`exec`; reset it or avoid those flags.
- Reuse parsed URL parts rather than reparsing the same input, while retaining
  security normalization and validation.
- Run independent asynchronous reads in parallel. Keep dependencies, write order
  and failure precedence intact; do not parallelize dependent operations.

## Checking a UI change

A change to the theme, a layout or an image is checked in a browser before it
is done. The rules it is checked against are in `DESIGN.md`.

- Serve it with `pnpm dev` (VitePress, on :5173 unless the output says
  otherwise) and drive it with the `chrome-devtools` MCP server. Without
  `pnpm` on the path, `./node_modules/.bin/vitepress dev docs` does the same.
- Check the pages it touches at 320, 375, 414, 768, 1024 and 1440px wide.
  Nothing scrolls sideways and the top bar's menu button stays on screen.
  Compare `document.documentElement.scrollWidth` with the width you set, not
  with `innerWidth`: under mobile emulation `innerWidth` grows with the
  overflow, so the two match even when the page scrolls sideways.
- Emulate touch at the phone and tablet widths and measure the controls a
  finger needs against `--fs-tap-target`.
- Try long content: a long page title, a wide code block and table, the open
  sidebar and the "On this page" menu.
- For a change that affects loading, run Slow 3G with the cache disabled on a
  production build (`pnpm build`, then `pnpm exec vitepress preview docs`),
  since the dev server ships unbundled modules and its layout shift numbers
  mean nothing. Watch the first paint, layout shift and the font swap, on a
  page with an image near the top (`/` or `/examples/framer`): an image
  without dimensions arrives after the first paint and pushes the text down.
  A build is CPU-heavy, and `pnpm build` already runs every test, so preview
  the build you verify with rather than building twice.
- Close the pages you opened when done.

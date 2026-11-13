# Design

The site is the VitePress default theme. `docs/.vitepress/theme/style.css`
holds every override, and `DocActions.vue` is the one custom control. Change
the theme there rather than in a page, so the rule applies to every page at
once.

## Phones and touch

The narrowest width designed for is 320px. Every page shares one theme, so a
rule here holds for all of them.

- **Tap targets.** A control a phone relies on is at least
  `--fs-tap-target` (44px) tall: the top bar's menu, the local nav's buttons
  and the Copy Markdown split button. A rule that only a finger needs goes
  under `(pointer: coarse)` or a phone width, so a mouse keeps the compact
  desktop size. A control that sits in a bar that must
  not grow gets an invisible `::before` hit area centred on its label, using
  the shared rule in `style.css`. The theme's own sidebar links (32px) and the
  404 page's home link are VitePress defaults kept on purpose: growing about 80
  stacked sidebar links would make the menu far longer.
- **Nothing scrolls sideways.** At 320px the top bar fits because the site
  title may shrink and wrap to a second line. A new item in the bar has to fit
  beside it or move into the menu. Code blocks and tables scroll inside their
  own box, never the page.
- **No hover-only controls.** A control that appears on hover appears on focus
  too, since a touch screen has no hover.
- **Images.** A screenshot ships at about 2x the 690px content column, at most
  1600px wide and 256 KB, with its metadata stripped.
  `tests/public-images.test.mjs` holds every image in `docs/public` to that
  budget. Markdown images load lazily (`markdown.image.lazyLoading` in
  `config.js`), and the build writes each one's `width` and `height` from the
  file (`image-size.js`), so the page keeps its place while it loads. A
  Markdown image from `docs/public` that is not a PNG or JPEG fails the
  build; write it as HTML instead. An image written as HTML states its
  `width` and `height` by hand, and never sets a fixed inline
  `max-width`, which would override the theme's `max-width: 100%` and push
  the page wider than a phone.
- **Fonts.** Inter loads with `font-display: swap` from the theme, so text
  shows in the fallback at once.

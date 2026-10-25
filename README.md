# Formspark documentation

[![Continuous deployment](https://github.com/formspark/documentation/workflows/Continuous%20deployment/badge.svg)](https://github.com/formspark/documentation/actions?query=workflow%3A%22Continuous+deployment%22)

Source of the Formspark documentation website.

[https://documentation.formspark.io](https://documentation.formspark.io)

## Local development

Use the Node version in `.tool-versions` and the pnpm version in `package.json`.
Install dependencies with `pnpm install --frozen-lockfile`, then run `pnpm dev`.
`pnpm build` runs the tests, builds the site into
`docs/.vitepress/dist` and checks the result.

## Tests

`pnpm test` discovers the Node test suites under `tests/`. The privacy filter's
suite mirrors the theme module's name: `tests/sentry-privacy.test.mjs` covers
`docs/.vitepress/theme/sentry-privacy.js`. Pull requests run the same production
build as the deployment workflow.

`pnpm test:site` checks the built site in `docs/.vitepress/dist`, so its suites
under `tests/site/` have no `.test` suffix and `pnpm test` skips them. The build
runs it after `vitepress build`.

Every page carries a `title` and a `description` of 70 to 160 characters in its
frontmatter, and appears once in `docs/.vitepress/sidebar.js`. The build turns
them into the page's canonical link, Open Graph tags and JSON-LD.

## Markdown for agents

The build copies each page's Markdown source, without its frontmatter, next to
its HTML (`setup/index.md` beside `setup/index.html`) and joins every page into
`llms-full.txt`. `docs/public/llms.txt` is written by hand and links the copies.
`pnpm run deploy` uploads `.md` files with a `text/markdown` content type.

## Error reporting

Sentry reports browser errors through the theme's privacy filter. Reports keep
code locations and omit exception values, request data, breadcrumbs, locals and
attached context. Browser performance tracing is disabled. `pnpm test` checks
the final event projection, and the production build runs that check first.

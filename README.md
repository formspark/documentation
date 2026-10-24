# Formspark documentation

[![Continuous deployment](https://github.com/formspark/documentation/workflows/Continuous%20deployment/badge.svg)](https://github.com/formspark/documentation/actions?query=workflow%3A%22Continuous+deployment%22)

Source of the Formspark documentation website.

[https://documentation.formspark.io](https://documentation.formspark.io)

## Local development

Use the Node version in `.tool-versions` and the pnpm version in `package.json`.
Install dependencies with `pnpm install --frozen-lockfile`, then run `pnpm dev`.
`pnpm build` tests the privacy filter and builds the site into
`docs/.vitepress/dist`.

## Tests

`pnpm test` discovers the Node test suites under `tests/`. The privacy filter's
suite mirrors the theme module's name: `tests/sentry-privacy.test.mjs` covers
`docs/.vitepress/theme/sentry-privacy.js`. Pull requests run the same production
build as the deployment workflow.

## Error reporting

Sentry reports browser errors through the theme's privacy filter. Reports keep
code locations and omit exception values, request data, breadcrumbs, locals and
attached context. Browser performance tracing is disabled. `pnpm test` checks
the final event projection, and the production build runs that check first.

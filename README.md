# Formspark documentation

[![Continuous deployment](https://github.com/formspark/documentation/workflows/Continuous%20deployment/badge.svg)](https://github.com/formspark/documentation/actions?query=workflow%3A%22Continuous+deployment%22)

Source of the Formspark documentation website.

[https://documentation.formspark.io](https://documentation.formspark.io)

## Error reporting

Sentry reports browser errors through the theme's privacy filter. Reports keep
code locations and omit exception values, request data, breadcrumbs, locals and
attached context. Browser performance tracing is disabled. `pnpm test` checks
the final event projection, and the production build runs that check first.

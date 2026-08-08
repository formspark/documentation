---
title: API overview
lang: en-US
---

# API

The Formspark API lets you create forms, change their settings, and read their submissions from your own code.

The API is available on upgraded workspaces. Listing your workspaces and reading your own token stay open on any plan, so a client can always discover which workspace qualifies. See [limits and plans](/troubleshooting/limits-and-plans).

## Base URL

```
https://api.formspark.io/public/v1
```

## Authentication

Create an API token in your [dashboard](https://dashboard.formspark.io/account/api-tokens) and send it as a bearer token:

```sh
curl https://api.formspark.io/public/v1/me \
  -H "Authorization: Bearer fsk_live_..."
```

A token reaches every workspace you are a member of, limited to its [scopes](./api-tokens).

`GET /me` describes the token you are using:

```json
{
  "name": "CI",
  "scopes": ["forms:read", "submissions:read"],
  "expiresAt": "2027-01-14T00:00:00.000Z",
  "lastUsedAt": "2026-07-29T09:12:44.000Z"
}
```

## OpenAPI

The API is described by an OpenAPI 3.1 document, which you can use to generate a client:

```
https://api.formspark.io/public/v1/openapi.json
```

## Versioning

The version is in the path. Within `v1`, new optional fields and new endpoints can appear at any time, so ignore fields you do not recognize. Changes that would break a working integration ship as a new version.

## Retries

`GET` requests are safe to retry.

Retry a write only after checking whether it landed: a repeated `POST` creates a second form or workspace.

## Rate limits

Requests are limited per IP address. Sustained bursts from one address are blocked for a period. If you are planning something high-volume, [get in touch](https://formspark.io/support/contact) first.

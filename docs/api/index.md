---
title: API overview
lang: en-US
---

# API

The Formspark API lets you create forms, change their settings, and read their
submissions from your own code.

It is separate from the endpoint your forms post to. `submit-form.com` receives
submissions from browsers and needs no credentials; this API manages the forms
behind them and always does.

## Base URL

```
https://api.formspark.io/public/v1
```

## Authentication

Every request carries an API token, created in your
[dashboard](https://dashboard.formspark.io/account/api-tokens):

```sh
curl https://api.formspark.io/public/v1/me \
  -H "Authorization: Bearer fsk_live_..."
```

A token reaches every workspace you are a member of, limited to the scopes you
gave it. See [API tokens](./api-tokens) for what each scope covers.

`GET /me` describes the token you are holding, which is the quickest way to
check what a request is allowed to do:

```json
{
  "name": "CI",
  "scopes": ["forms:read", "submissions:read"],
  "expiresAt": "2027-01-14T00:00:00.000Z",
  "lastUsedAt": "2026-07-29T09:12:44.000Z"
}
```

## OpenAPI

The API is described by an OpenAPI 3.1 document:

```
https://api.formspark.io/public/v1/openapi.json
```

Use it to generate a typed client rather than writing one by hand. The document
is published from the same route definitions that serve the requests, so it
cannot drift from the API's actual behaviour.

## Versioning

The version is in the path. Within `v1` we only add: new optional fields and new
endpoints can appear at any time, so parse responses tolerantly and ignore
fields you do not recognise.

Anything that would break a working integration, such as removing a field,
changing its type, or changing a default, means a new version rather than a
change to this one.

## Retries

`GET` requests are safe to retry.

**Writes are not.** `POST` has no idempotency mechanism yet, so a retried create
makes a second form or workspace. If a write times out, check whether it landed
before sending it again. The `Idempotency-Key` header is reserved for this and
is not implemented.

## Rate limits

Requests are throttled per API, not per token. There is no published quota yet;
if you are planning something high-volume, get in touch first.

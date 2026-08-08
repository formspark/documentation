---
title: API errors
lang: en-US
---

# Errors

Failures are returned as [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) problem details, with the content type `application/problem+json`:

```json
{
  "type": "https://documentation.formspark.io/api/errors.html#insufficient-scope",
  "title": "Insufficient scope",
  "status": 403,
  "detail": "This token has forms:read; forms:write is required.",
  "code": "insufficient_scope",
  "requiredScope": "forms:write"
}
```

Branch on `code`. It is stable, while `detail` is written for a human reading a log and its wording can change. Some errors add fields of their own, such as `requiredScope` above.

`type` points at the section for that code on this page: the code with its underscores replaced by hyphens, as an anchor.

## Invalid token

`401` · `invalid_token`

The `Authorization` header is missing or malformed, or the token is unknown, revoked or expired.

## Insufficient scope

`403` · `insufficient_scope`

The token is valid but lacks the scope this operation needs. `requiredScope` names it. Create a token with that scope, or check `GET /me` for what the current one holds.

## Not found

`404` · `not_found`

The resource does not exist, or it belongs to another account.

## Validation error

`400` · `validation_error`

The request body or query string is invalid. An `errors` array names the fields:

```json
{
  "code": "validation_error",
  "detail": "The request is invalid.",
  "errors": ["name: Name must be 128 characters or fewer"]
}
```

Also returned for a `startingAfter` cursor this API did not issue.

## Quota exceeded

`403` · `quota_exceeded`

A plan limit stopped the request. Free workspaces hold 10 forms, paid ones hold 100.

## Upgrade required

`403` · `upgrade_required`

The API is available on upgraded workspaces, and the request touched a free one. The `workspaceId` extension names it. Upgrade that workspace, or point the request at an upgraded one. See [limits and plans](/troubleshooting/limits-and-plans).

## Conflict

`409` · `conflict`

The resource cannot be changed that way. Deleting a submission that was quarantined as spam returns this: quarantined submissions expire on their own and cannot be deleted early.

## Internal error

`500` · `internal_error`

Something broke on our side. These are reported to us automatically. If one is reproducible, [let us know](https://formspark.io/support/contact).

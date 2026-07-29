---
title: API errors
lang: en-US
---

# Errors

Failures are returned as [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457)
problem details, with the content type `application/problem+json`:

```json
{
  "type": "https://documentation.formspark.io/api/errors#insufficient-scope",
  "title": "Insufficient scope",
  "status": 403,
  "detail": "This token has forms:read; forms:write is required.",
  "code": "insufficient_scope",
  "requiredScope": "forms:write"
}
```

**Branch on `code`.** It is stable. `detail` is written for a human reading a
log and its wording can change; `title` and `status` follow `code`. Some errors
add fields of their own, such as `requiredScope` above, and more may appear.

## Invalid token

`401` · `invalid_token`

The `Authorization` header is missing, malformed, or names a token that is
unknown, revoked or expired.

Those cases are deliberately indistinguishable. The API will not tell you
whether a secret was ever real, so this status cannot be used to test candidate
tokens.

## Insufficient scope

`403` · `insufficient_scope`

The token is valid but was not given the scope this operation needs. The
required scope is in `requiredScope`.

Scopes are fixed when a token is created, so this is not something to retry.
Create a token with the scope it needs, or use `GET /me` to see what the current
one holds.

## Not found

`404` · `not_found`

There is no such resource, **or** it belongs to somebody else.

Those two are one answer on purpose. If a missing form and an inaccessible form
returned different statuses, the difference would tell you which form ids exist
in other people's accounts.

## Validation error

`400` · `validation_error`

The request body or query string is wrong. An `errors` array names the offending
fields:

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

A plan limit stopped the request, such as the number of forms a workspace may
hold. Free workspaces hold 10 forms; paid ones hold 100.

## Conflict

`409` · `conflict`

The resource cannot be changed the way you asked. Today this means trying to
delete a submission that was rejected as spam: those expire on their own and
cannot be removed early.

## Internal error

`500` · `internal_error`

Something broke on our side. The response deliberately carries no detail. These
are reported to us automatically, but if one is reproducible we would like to
hear about it.

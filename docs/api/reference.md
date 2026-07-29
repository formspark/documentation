---
title: API reference
lang: en-US
---

# Reference

Base URL `https://api.formspark.io/public/v1`. Every request needs an
`Authorization: Bearer` header. The machine-readable description is at
[`/openapi.json`](https://api.formspark.io/public/v1/openapi.json).

## Token

### `GET /me`

Describes the current token. No scope required.

## Workspaces

### `GET /workspaces`

Every workspace you are a member of. Scope: `workspaces:read`.

### `POST /workspaces`

Scope: `workspaces:write`.

```sh
curl -X POST https://api.formspark.io/public/v1/workspaces \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Acme"}'
```

### `PATCH /workspaces/{workspaceId}`

Renames a workspace. Scope: `workspaces:write`.

## Forms

### `GET /forms?workspaceId=...`

Forms in a workspace. Scope: `forms:read`.

### `GET /forms/{formId}`

Scope: `forms:read`.

### `POST /forms`

Creates a form, applying any settings sent alongside it. `workspaceId` and
`name` are required; everything else is optional. Scope: `forms:write`.

```sh
curl -X POST https://api.formspark.io/public/v1/forms \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "abc123",
    "name": "Contact",
    "notificationEmails": ["you@example.com"]
  }'
```

The response contains the form's `id`. That id is what your HTML form posts to:

```html
<form action="https://submit-form.com/FORM_ID" method="POST">
  <input type="email" name="email" />
  <button type="submit">Send</button>
</form>
```

### `PATCH /forms/{formId}`

Applies **only the fields present in the body**. Anything you leave out keeps
its current value, so renaming a form cannot disturb its spam protection or its
notification emails. Scope: `forms:write`.

```sh
curl -X PATCH https://api.formspark.io/public/v1/forms/FORM_ID \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Contact us"}'
```

Sending `null` for a field clears it. Omitting it leaves it alone. The two are
different on purpose.

`notificationEmails` is replaced wholesale when present, so send the complete
list you want rather than just the additions.

### `DELETE /forms/{formId}`

Deletes the form and its submissions. Scope: `forms:write`.

## Submissions

### `GET /forms/{formId}/submissions`

Newest first, [cursor paginated](./pagination). Scope: `submissions:read`.

Query parameters: `limit` (1-100, default 25), `startingAfter`, `search`.

```sh
curl "https://api.formspark.io/public/v1/forms/FORM_ID/submissions?limit=50" \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"
```

### `GET /workspaces/{workspaceId}/submissions`

The same, across every form in the workspace. Scope: `submissions:read`.

### `DELETE /submissions/{submissionId}`

Scope: `submissions:write`.

Submissions rejected as spam cannot be deleted; they expire on their own. Trying
returns `409` with the code `conflict`.

## What is not returned

A form's third-party credentials, meaning its Botpoison, reCAPTCHA, hCaptcha and
Turnstile secret keys, its Slack token and its Zapier key, are never included in
API responses. They are readable in the dashboard only, so a leaked API token
cannot become access to your other accounts.

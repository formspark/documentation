---
title: API reference
lang: en-US
---

# Reference

Base URL `https://api.formspark.io/public/v1`. Every request needs an `Authorization: Bearer` header. The machine-readable description is at [`/openapi.json`](https://api.formspark.io/public/v1/openapi.json).

Responses contain a form's settings and its notification emails. Its captcha secret keys, Slack token and Zapier key are available in the dashboard.

## Token

### `GET /me`

Describes the current token. Works with any token.

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

Creates a form, applying any settings sent with it. `workspaceId` and `name` are required. Scope: `forms:write`.

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

The response contains the form's `id`, which is what your HTML form posts to:

```html
<form action="https://submit-form.com/FORM_ID" method="POST">
  <input type="email" name="email" />
  <button type="submit">Send</button>
</form>
```

### `PATCH /forms/{formId}`

Applies the fields present in the body. Fields you leave out keep their current value. Scope: `forms:write`.

```sh
curl -X PATCH https://api.formspark.io/public/v1/forms/FORM_ID \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Contact us"}'
```

Send `null` to clear a field. Send `notificationEmails` as the complete list you want, since it replaces the existing one.

### `DELETE /forms/{formId}`

Deletes the form and its submissions. Scope: `forms:write`.

## Submissions

### `GET /forms/{formId}/submissions`

Newest first, [cursor paginated](./pagination). Scope: `submissions:read`.

Query parameters: `limit` (1 to 100, default 25), `startingAfter`, `search`.

```sh
curl "https://api.formspark.io/public/v1/forms/FORM_ID/submissions?limit=50" \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"
```

### `GET /workspaces/{workspaceId}/submissions`

The same, across every form in the workspace. Scope: `submissions:read`.

### `DELETE /submissions/{submissionId}`

Scope: `submissions:write`.

Submissions rejected as spam expire on their own. Deleting one returns `409`.

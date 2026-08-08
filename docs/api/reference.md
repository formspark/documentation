---
title: API reference
lang: en-US
---

# Reference

Base URL `https://api.formspark.io/public/v1`. Every request needs an `Authorization: Bearer` header. The machine-readable description is at [`/openapi.json`](https://api.formspark.io/public/v1/openapi.json).

Responses contain a form's settings and its notification emails. Captcha secret keys, the Slack token and the Zapier key are never returned; they stay in the dashboard.

## Token

### `GET /me`

Describes the current token. Works with any token.

## Workspaces

### `GET /workspaces`

Every workspace you are a member of, [cursor paginated](./pagination). Scope: `workspaces:read`.

Query parameters: `limit` (1 to 100, default 25), `startingAfter`.

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

Forms in a workspace, [cursor paginated](./pagination). Scope: `forms:read`.

Query parameters: `limit` (1 to 100, default 25), `startingAfter`.

### `GET /forms/{formId}`

Scope: `forms:read`.

### `POST /forms`

Creates a form, applying any settings sent with it. `workspaceId` and `name` are required. Scope: `forms:write`.

```sh
curl -X POST https://api.formspark.io/public/v1/forms \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "your-workspace-id",
    "name": "Contact",
    "notificationEmails": ["you@example.com"]
  }'
```

The response contains the form's `id`, which is what your HTML form posts to:

```html
<form action="https://submit-form.com/your-form-id" method="POST">
  <input type="email" name="email" />
  <button type="submit">Send</button>
</form>
```

### `PATCH /forms/{formId}`

Applies the fields present in the body. Fields you leave out keep their current value. Scope: `forms:write`.

```sh
curl -X PATCH https://api.formspark.io/public/v1/forms/your-form-id \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Contact us"}'
```

Send `null` to clear a field. Send `notificationEmails` as the complete list you want, since it replaces the existing one.

### `DELETE /forms/{formId}`

Deletes the form and its submissions. Scope: `forms:write`.

### Form settings

`POST /forms` and `PATCH /forms/{formId}` accept a form's settings, with a few restrictions. Anything the API rejects comes back as a [`validation_error`](./errors#validation-error).

#### `spamProtection`

Accepts one of four values:

| Value                 | Provider     |
| --------------------- | ------------ |
| `BOTPOISON`           | Botpoison    |
| `GOOGLE_RECAPTCHA_V2` | reCAPTCHA v2 |
| `HCAPTCHA`            | hCaptcha     |
| `TURNSTILE`           | Turnstile    |

No other value is accepted, and the automatic spam filtering that screens every submission is not configurable.

The provider's secret key is not part of the API. Store it in the dashboard first, then switch the form over: selecting a provider whose secret key is not already stored is rejected. See [spam protection](/setup/spam-protection).

#### `webhookUrl`

Must be an `http` or `https` URL. See [webhooks](/integration/webhooks).

#### `notificationEmails`

A form accepts at most 10 notification emails. Since the list you send replaces the existing one, read the current list back first if you are adding to it rather than replacing it.

## Submissions

### `GET /forms/{formId}/submissions`

Newest first, [cursor paginated](./pagination). Scope: `submissions:read`.

Query parameters: `limit` (1 to 100, default 25), `startingAfter`, `search`.

```sh
curl "https://api.formspark.io/public/v1/forms/your-form-id/submissions?limit=50" \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"
```

### `GET /workspaces/{workspaceId}/submissions`

The same, across every form in the workspace. Scope: `submissions:read`.

### `DELETE /submissions/{submissionId}`

Scope: `submissions:write`.

Submissions rejected as spam expire on their own and cannot be deleted early. Deleting one returns a [`conflict`](./errors#conflict).

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

Beyond the three settings described below, a form carries these fields. Each of them accepts `null` to clear it, except `name`, which a form always has.

| Field             | Type                    |
| ----------------- | ----------------------- |
| `name`            | string, 128 characters  |
| `description`     | string, 512 characters  |
| `technology`      | string, 128 characters  |
| `slackChannel`    | string, 128 characters  |
| `customHoneypot`  | string, 128 characters  |
| `customSpamWords` | string, 2560 characters |
| `emailThreading`  | boolean                 |

`customHoneypot` and `customSpamWords` are the API side of the settings described under [spam protection](/setup/spam-protection#custom-spam-words).

#### `spamProtection`

Accepts one of four providers, or `null` to require no challenge at all:

| Value                 | Provider     |
| --------------------- | ------------ |
| `BOTPOISON`           | Botpoison    |
| `GOOGLE_RECAPTCHA_V2` | reCAPTCHA v2 |
| `HCAPTCHA`            | hCaptcha     |
| `TURNSTILE`           | Turnstile    |

No other value is accepted, and the automatic spam filtering that screens every submission is not configurable.

The provider's secret key is not part of the API. Store it in the dashboard first, then switch the form over: selecting a provider whose secret key is not already stored is rejected. See [spam protection](/setup/spam-protection).

#### `webhookUrl`

Must be an `http` or `https` URL, and must resolve to a public address when Formspark calls it, so an endpoint on `localhost` or a private network is rejected. See [webhooks](/integration/webhooks).

#### `notificationEmails`

A form accepts at most 100 notification emails, each at most 128 characters. Since the list you send replaces the existing one, read the current list back first if you are adding to it rather than replacing it.

## Templates

A form carries two email templates: the `notification` template lays out the email
your recipients get, and the `autoresponder` template is the reply sent to whoever
submitted the form. Both are addressed by the form and the kind.

A form without a template uses the default layout, and reading one returns
[`not_found`](./errors#not-found).

### `GET /forms/{formId}/templates/{kind}`

Scope: `forms:read`.

```json
{
  "kind": "autoresponder",
  "mode": "code",
  "code": "<p>Thanks {{data.firstName}}</p>",
  "updatedAt": "2026-09-17T10:04:00.000Z",
  "paused": false
}
```

### `PUT /forms/{formId}/templates/{kind}`

Writes the body, creating the template if the form has none. Scope: `forms:write`.

```sh
curl -X PUT https://api.formspark.io/public/v1/forms/your-form-id/templates/autoresponder \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code":"<p style=\"font-size:16px\">Thanks {{data.firstName}}</p>"}'
```

### `DELETE /forms/{formId}/templates/{kind}`

Scope: `forms:write`. Notifications go back to the default layout.

### `POST /forms/{formId}/templates/{kind}/preview`

Renders the template the way the delivered email is rendered, and sends nothing.
Scope: `forms:read`.

```sh
curl -X POST https://api.formspark.io/public/v1/forms/your-form-id/templates/autoresponder/preview \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data":{"firstName":"Ada","email":"ada@example.com"}}'
```

The response holds the `html` and the `text` alternative. Send `data` to choose
what it renders against. Leave it out and the form's own example data is used.

### Writing a template

`code` is HTML with [Handlebars](https://handlebarsjs.com/) placeholders. The
submission is reachable under `data`, so a field named `firstName` is
<code v-pre>{{data.firstName}}</code>. It accepts at most 262144 characters.

Style it with inline `style` attributes. The API sends no separate stylesheet, and
mail clients treat a `<style>` block inconsistently.

A template that did not compile comes back as
[`template_invalid`](./errors#template-invalid), with an `errors` array naming
what is wrong. The check runs before anything is stored, so a form that already
had a working template keeps it.

### Templates built in the visual editor

`mode` tells you how a template is laid out. `visual` means someone built it in the
template editor, and `code` means it was written as code.

::: warning
Writing code to a `visual` template replaces its layout, and the template editor
cannot rebuild it afterwards. Read the template first if you are not sure which one
you are pointing at.
:::

### Switching the autoresponder on

The autoresponder has no separate switch. Writing an `autoresponder` template turns
it on, and deleting that template turns it off. It is available on
[upgraded workspaces](/troubleshooting/limits-and-plans), so writing one for a free
workspace returns [`upgrade_required`](./errors#upgrade-required).

`paused` reports whether our content check has stopped the template sending. It is
`null` for a `notification` template, which is not content checked.

::: warning
A paused autoresponder sends nothing, and the write that paused it still answers
`200`. Check `paused` after every write.
:::

The check reads the template on its own, with no submission filled in. Marketing
phrasing and bare links are what usually trip it, so prefer a short confirmation and
a link with an anchor rather than a naked URL. Rewriting the template has it scored
again. If it stays paused,
[get in touch](https://dashboard.formspark.io/support/contact).

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

Submissions quarantined as spam expire on their own and cannot be deleted early. Deleting one returns a [`conflict`](./errors#conflict).

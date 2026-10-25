---
name: formspark
description: Connect website forms to Formspark, a hosted form backend, and manage its forms and submissions through the Formspark REST API. Use when a site needs a contact, signup or feedback form without its own server, when a form posts to submit-form.com, or when code must create forms or read submissions on api.formspark.io.
---

# Formspark

Formspark is a form backend. An HTML form posts to
`https://submit-form.com/FORM_ID`, and Formspark stores the submission, emails
the form's notification recipients, and runs the form's integrations. The site
brings its own HTML and CSS.

There are two surfaces:

- `https://submit-form.com/FORM_ID` receives submissions from browsers. It
  needs no credentials.
- `https://api.formspark.io/public/v1` creates and manages forms and reads
  submissions. It needs an API token.

## Get a form id

A form id comes from the user. They create a form in the dashboard at
https://dashboard.formspark.io and copy its action URL, or code with an API
token creates one with `POST /forms`. Do not invent an id. Until there is one,
use `https://submit-form.com/echo`, which echoes the submitted payload back.

## Submit from an HTML form

```html
<form action="https://submit-form.com/FORM_ID" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

- Give every input, select and textarea a `name`, or its value is not sent.
- Formspark does no server-side validation. Validate in the browser with
  `required`, `minlength`, `maxlength`, `pattern` and input types.
- Formspark does not accept files. Upload them to a storage provider and submit
  the resulting URL as a text field.
- After a browser form post, Formspark redirects the visitor to its feedback
  page, or to `_redirect` when the form sets one.

## Submit with JavaScript

Send JSON with both `Content-Type: application/json` and
`Accept: application/json`. Without that `Accept` header, Formspark treats the
request as a browser form post and answers with a redirect.

```js
const response = await fetch("https://submit-form.com/FORM_ID", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ email, message }),
});
if (!response.ok) throw new Error(await response.text());
```

An accepted submission answers `200` with the submitted fields as JSON. A
rejected one answers with a status and a short plain-text message: `400` for an
empty body, a file, or JSON that is not an object or array, `402` when the
workspace is out of submissions, `403` when spam protection rejects it, and
`404` when the form id matches no form.

## Control fields

Fields whose name starts with an underscore control the submission and are not
stored with it. In JSON, nest them as objects, such as
`{"_email": {"subject": "New message"}}`.

- `_redirect` sends the visitor to a URL afterwards, and `_error` to another
  one when something fails. `_append` set to `false` stops the fields being
  appended to the redirect URL.
- `_email.subject`, `_email.from` and `_email.replyto` shape the notification
  email. A field named `email` or `mail` also sets its reply-to address.
- `_language` picks the language of the feedback page and the autoresponder.
- `_feedback.*` fields customize the feedback page.
- `_honeypot` and `_gotcha` are spam traps: hide the field with CSS, and a
  submission that fills it is rejected as spam.

Botpoison, reCAPTCHA, hCaptcha and Turnstile are configured per form in the
dashboard, and their widgets go on the page. See the spam protection page.

## Use the API

The API works on upgraded workspaces. `GET /me` and `GET /workspaces` work on
any plan, and other calls on a free workspace answer `403` with the code
`upgrade_required`. The user creates a token at
https://dashboard.formspark.io/account/api-tokens with the least scopes the task
needs: `workspaces:read|write`, `forms:read|write`, `submissions:read|write`.
Read the token from the environment, never from source code.

```sh
curl https://api.formspark.io/public/v1/me \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"

curl -X POST https://api.formspark.io/public/v1/forms \
  -H "Authorization: Bearer $FORMSPARK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"workspaceId":"WORKSPACE_ID","name":"Contact","notificationEmails":["you@example.com"]}'

curl "https://api.formspark.io/public/v1/forms/FORM_ID/submissions?limit=50" \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"
```

- The response to `POST /forms` holds the form's `id`, which the HTML form
  posts to.
- `PATCH` applies the fields sent and keeps the rest. Send `null` to clear a
  field, except a boolean, which takes `true` or `false`.
- Lists are cursor paginated. While `hasMore` is `true`, pass `nextCursor` back
  as `startingAfter`. Treat cursors as opaque.
- Errors are `application/problem+json`. Branch on `code`, not on `detail`.
- `GET` is safe to retry. Check whether a `POST` landed before retrying it,
  since a repeated `POST` creates a second form or workspace.
- The OpenAPI 3.1 description is at
  https://api.formspark.io/public/v1/openapi.json.

## Documentation

Each page below is Markdown. Read the one that matches the task before writing
code.

- [Installation](https://documentation.formspark.io/setup/index.md)
- [AJAX submissions](https://documentation.formspark.io/examples/ajax.md)
- [Spam protection](https://documentation.formspark.io/setup/spam-protection.md)
- [Redirection](https://documentation.formspark.io/customization/redirection.md)
- [Notification email](https://documentation.formspark.io/customization/notification-email.md)
- [Common issues](https://documentation.formspark.io/troubleshooting/common-issues.md)
- [Limits and plans](https://documentation.formspark.io/troubleshooting/limits-and-plans.md)
- [API overview](https://documentation.formspark.io/api/index.md)
- [API tokens](https://documentation.formspark.io/api/api-tokens.md)
- [API reference](https://documentation.formspark.io/api/reference.md)
- [Pagination](https://documentation.formspark.io/api/pagination.md)
- [Errors](https://documentation.formspark.io/api/errors.md)

Framework examples follow the same pattern, such as
https://documentation.formspark.io/examples/react.md or
https://documentation.formspark.io/examples/nextjs.md. The page index is at
https://documentation.formspark.io/llms.txt, and every page in one file is at
https://documentation.formspark.io/llms-full.txt.

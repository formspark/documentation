---
title: Webhooks
lang: en-US
---

# Webhooks

Formspark can send webhook events that notify your application any time you receive a form submission.

## Setup

1. Define an endpoint on your server for receiving events. This route should listen for `POST` requests and answer with a `2xx` status code.
2. Open your form's settings and find the `Webhook` row under `Integrations`.
3. Click `Connect`, paste the endpoint into the `URL` field, and click `Save`.
4. Submit to your form and verify your endpoint is receiving submissions successfully.

## Payload format

Given the following form:

```html
<form action="https://submit-form.com/your-form-id" method="POST">
  <input type="text" name="email" />
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

The body of the POST request will look as follows:

```json
{
  "email": "kramer@nineties.sitcom",
  "message": "Who turns down a Junior Mint?"
}
```

The request carries a `Content-Type: application/json` header. The body holds the fields your form submitted. Control fields, the ones whose name starts with an underscore such as `_redirect` or `_email.subject`, are left out, and so are spam protection tokens.

Formspark only calls your webhook for submissions it accepts. A submission rejected as spam, or one that arrives while your workspace is out of submissions, does not trigger it.

## Delivery

Formspark makes one attempt per submission and does not retry a failed one. A delivery fails when your endpoint:

- answers with a status code outside the `2xx` range,
- does not answer within 5 seconds, or
- cannot be reached.

Formspark does not follow redirects, so a `3xx` answer counts as a failure. Use the final URL of your endpoint.

The URL must be a public `http` or `https` address.

## Delivery status

The `Webhook` row in your form's settings shows how the last delivery went:

- `Never called`: Formspark has not called the webhook yet.
- `Active`: the last delivery succeeded.
- `Last call failed`: the last delivery failed. The row shows the reason next to the URL, for example the status code your endpoint answered with.

A failed delivery is not sent again, but the submission is still in your dashboard.

## Testing and troubleshooting

- Your endpoint should accept POST requests.
- Your endpoint should be able to parse a JSON object.
- Your endpoint's URL should not exceed 512 characters.

To preview what the webhook requests look like before pointing them at your own server, use a public inspection service such as [httphq.com](https://httphq.com). Paste the temporary URL it gives you into the `URL` field and submit your form once.

## Signature verification

Formspark does not currently sign webhook requests. Anyone who learns your endpoint URL can send requests to it, so do not rely on the request origin for authentication. If you need stronger guarantees, keep your endpoint URL secret, validate the submission body against an expected shape, or require a shared secret in your request handler.

## Removal

To stop using webhooks, clear the `URL` field in the `Webhook` row and click `Save`.

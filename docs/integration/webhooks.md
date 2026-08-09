---
title: Webhooks
lang: en-US
---

# Webhooks

Formspark can send webhook events that notify your application any time you receive a form submission.

## Setup

1. Define an endpoint on your server for receiving events, this route should listen for `POST` events and return a `200`
   status code.
2. Paste the endpoint into the `Webhook URL` field found in your form's settings.
3. Submit to your form and verify your endpoint is receiving submissions successfully.

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

## Testing and troubleshooting

- Your endpoint should accept POST requests.
- Your endpoint should be able to parse a JSON object.
- Your endpoint's URL should not exceed 512 characters.

To preview what the webhook requests look like before pointing them at your own server, use a public inspection service such as [httphq.com](https://httphq.com). Paste the temporary URL it gives you into the `Webhook URL` field and submit your form once.

## Signature verification

Formspark does not currently sign webhook requests. Anyone who learns your endpoint URL can send requests to it, so do not rely on the request origin for authentication. If you need stronger guarantees, keep your endpoint URL secret, validate the submission body against an expected shape, or require a shared secret in your request handler.

## Removal

To stop using webhooks, clear the `Webhook URL` field found in your form's settings.

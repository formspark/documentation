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

A delivery fails when your endpoint:

- answers with a status code outside the `2xx` range,
- does not answer within 5 seconds, or
- cannot be reached.

Formspark does not follow redirects, so a `3xx` answer counts as a failure. Use the final URL of your endpoint.

The URL must be a public `http` or `https` address. Your webhook receives only submissions that arrive after its URL is saved.

## Retries

A failed delivery is retried every 5 minutes, in order, until it gets through. Submissions that arrive meanwhile wait behind it, so your endpoint always receives them in the order they were sent.

A retry can deliver a submission your endpoint already handled. Every request carries two headers to help with that:

- `Formspark-Submission-Id`: the same for every attempt at one submission. Skip one you have already seen.
- `Formspark-Timestamp`: when the request was sent, in Unix seconds.

A submission rescued from `Spam` is not delivered.

## Delivery status

The `Webhook` row in your form's settings shows how delivery is going:

- `Never called`: Formspark has not called the webhook yet.
- `Active`: the last delivery succeeded.
- `Retrying`: a delivery failed and is being retried. The row shows the reason next to the URL.
- `Paused`: deliveries failed for about a day, so Formspark stopped trying and emailed your workspace admins. Fix your endpoint, then use `Retry now`. Delivery resumes from the first submission that did not arrive.

## Testing and troubleshooting

- Your endpoint should accept POST requests.
- Your endpoint should be able to parse a JSON object.
- Your endpoint's URL should not exceed 512 characters.

To preview what the webhook requests look like before pointing them at your own server, use a public inspection service such as [httphq.com](https://httphq.com). Paste the temporary URL it gives you into the `URL` field and submit your form once.

## Signature verification

Turn on `Sign deliveries` in the `Webhook` row to prove each request comes from Formspark. Copy the secret it shows into your endpoint.

Every request then carries a `Formspark-Signature` header: `v1=` followed by a hex HMAC-SHA256 of the `Formspark-Timestamp` header, a dot, and the raw request body, keyed with your secret. Compute the same value and compare. Reject a request whose timestamp is more than a few minutes old.

```js
import crypto from "node:crypto";

const verify = (secret, timestamp, rawBody, signature) => {
  const expected =
    "v1=" +
    crypto
      .createHmac("sha256", secret)
      .update(`${timestamp}.${rawBody}`)
      .digest("hex");
  return (
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  );
};
```

```python
import hashlib, hmac

def verify(secret, timestamp, raw_body, signature):
    digest = hmac.new(secret.encode(), f"{timestamp}.{raw_body}".encode(), hashlib.sha256)
    return hmac.compare_digest(signature, "v1=" + digest.hexdigest())
```

Use the body exactly as received, before any JSON parsing.

`Rotate secret` replaces the secret at once. Deliveries fail until your endpoint uses the new one, then the queued ones arrive.

## Removal

To stop using webhooks, clear the `URL` field in the `Webhook` row and click `Save`.

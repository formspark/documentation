---
title: HTMX
lang: en-US
---

# HTMX

Formspark returns a JSON response (when `Accept: application/json` is set), so we use `hx-swap="none"` to prevent HTMX from replacing the form with the response, and show a thank-you message via `hx-on::after-request`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | HTMX</title>
    <script src="https://unpkg.com/htmx.org@2"></script>
    <script src="https://unpkg.com/htmx-ext-json-enc@2"></script>
  </head>
  <body>
    <form
      hx-post="https://submit-form.com/your-form-id"
      hx-ext="json-enc"
      hx-headers='{"Accept": "application/json"}'
      hx-swap="none"
      hx-on::after-request="if(event.detail.successful){this.reset();document.getElementById('thanks').hidden=false}"
    >
      <label>
        <span>Message</span>
        <textarea name="message"></textarea>
      </label>
      <button type="submit">Send</button>
    </form>

    <div id="thanks" hidden>Thanks! We received your message.</div>
  </body>
</html>
```

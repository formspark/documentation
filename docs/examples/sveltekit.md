---
title: SvelteKit
lang: en-US
---

# SvelteKit

## HTML form

The simplest integration is a plain HTML form that posts directly to Formspark.
No JavaScript is required.

```svelte
<!-- src/routes/contact/+page.svelte -->
<form method="POST" action="https://submit-form.com/your-form-id">
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

## Fetch

```svelte
<!-- src/routes/contact/+page.svelte -->
<script>
  const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

  let message = $state("");
  let submitting = $state(false);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      submitting = true;
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });
      message = "";
      alert("Form submitted");
    } finally {
      submitting = false;
    }
  }
</script>

<form onsubmit={onSubmit}>
  <textarea bind:value={message}></textarea>
  <button type="submit" disabled={submitting}>Send</button>
</form>
```

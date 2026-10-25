---
title: Svelte
description: "Submit a form to Formspark from a Svelte 5 component with Fetch, using $state runes to hold the message and disable the button while sending."
lang: en-US
---

# Svelte

## Fetch

```svelte
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

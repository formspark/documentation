---
title: Sapper
lang: en-US
---

# Sapper

## Fetch

```html
<script>
  const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

  let message = "";
  let submitting = false;

  async function onSubmit() {
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

<form on:submit|preventDefault="{onSubmit}">
  <textarea bind:value="{message}" />
  <button type="submit" disabled="{submitting}">Send</button>
</form>
```

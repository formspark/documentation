---
title: Astro
lang: en-US
---

# Astro

## HTML

Astro ships zero JavaScript by default, so a plain HTML form inside a `.astro` page is the recommended approach.

```astro
---
const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";
---

<form action={FORMSPARK_ACTION_URL} method="POST">
  <label>
    <span>Message</span>
    <textarea name="message"></textarea>
  </label>
  <button type="submit">Send</button>
</form>
```

## Fetch

Add a `<script>` block to your `.astro` page to submit the form without a page reload.

```astro
---
const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";
---

<form id="contact" data-action={FORMSPARK_ACTION_URL}>
  <label>
    <span>Message</span>
    <textarea name="message"></textarea>
  </label>
  <button type="submit">Send</button>
</form>

<script>
  const form = document.getElementById("contact") as HTMLFormElement;
  const action = form.dataset.action!;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button")!;
    button.disabled = true;
    try {
      await fetch(action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      form.reset();
      alert("Form submitted");
    } finally {
      button.disabled = false;
    }
  });
</script>
```

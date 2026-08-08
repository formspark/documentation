---
title: SolidStart
lang: en-US
---

# SolidStart

## HTML form

A plain form posts straight to your action URL, so it needs no client
JavaScript and works before the page has hydrated.

```jsx
// src/routes/contact.jsx
const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export default function ContactPage() {
  return (
    <form method="post" action={FORMSPARK_ACTION_URL}>
      <label>
        <span>Message</span>
        <textarea name="message" required />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
```

## Fetch

Solid's signals are read as functions, and text inputs report changes through
`onInput` rather than `onChange`.

```jsx
// src/routes/contact.jsx
import { createSignal } from "solid-js";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export default function ContactPage() {
  const [message, setMessage] = createSignal("");
  const [submitting, setSubmitting] = createSignal(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: message() }),
      });
      setMessage("");
      alert("Form submitted");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Message</span>
        <textarea
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
      </label>
      <button type="submit" disabled={submitting()}>
        Send
      </button>
    </form>
  );
}
```

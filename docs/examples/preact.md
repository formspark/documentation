---
title: Preact
lang: en-US
---

# Preact

## Fetch

Preact's hooks live in `preact/hooks`, and text inputs report changes through
`onInput` rather than `onChange`.

```jsx
import { useState } from "preact/hooks";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        body: JSON.stringify({ message }),
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
          value={message}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
      </label>
      <button type="submit" disabled={submitting}>
        Send
      </button>
    </form>
  );
}
```

## use-formspark

[use-formspark](https://github.com/formspark/use-formspark) is built on the
React hooks API, so it works under `preact/compat`.

```jsx
import { useState } from "preact/hooks";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "your-form-id";

export function ContactForm() {
  const [submit, submitting] = useFormspark({ formId: FORMSPARK_FORM_ID });
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await submit({ message });
    alert("Form submitted");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={message}
        onInput={(e) => setMessage(e.currentTarget.value)}
      />
      <button type="submit" disabled={submitting}>
        Send
      </button>
    </form>
  );
}
```

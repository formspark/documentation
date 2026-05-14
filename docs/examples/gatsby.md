---
title: Gatsby
lang: en-US
---

# Gatsby

## HTML

```jsx
import React from "react";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export default function ContactPage() {
  return (
    <form method="POST" action={FORMSPARK_ACTION_URL}>
      <textarea name="message" placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
}
```

## use-formspark

:::tip
Check out our official React hooks: [use-formspark](https://github.com/formspark/use-formspark).
:::

```jsx
import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "your-form-id";

export default function ContactPage() {
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await submit({ message });
    alert("Form submitted");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit" disabled={submitting}>
        Send
      </button>
    </form>
  );
}
```

## Fetch

```jsx
import React, { useState } from "react";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export default function ContactPage() {
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch(FORMSPARK_ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message }),
    });
    alert("Form submitted");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
```

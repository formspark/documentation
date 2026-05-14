---
title: Next.js
lang: en-US
---

# Next.js

## App Router (Server Action)

Keeps the form ID server-side and redirects after submission. No client JavaScript required.

```jsx
// app/contact/page.jsx
import { redirect } from "next/navigation";

async function submitForm(formData) {
  "use server";
  const body = Object.fromEntries(formData);
  await fetch("https://submit-form.com/your-form-id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  redirect("/thanks");
}

export default function ContactPage() {
  return (
    <form action={submitForm}>
      <textarea name="message" required />
      <button type="submit">Send</button>
    </form>
  );
}
```

## App Router (client component)

When you want a loading state or to stay on the same page after submission.

```jsx
// app/contact/page.jsx
"use client";

import { useState } from "react";
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

## Pages Router (use-formspark)

:::tip
Check out our official React hooks: [use-formspark](https://github.com/formspark/use-formspark).
:::

```jsx
import React, { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "your-form-id";

function ContactPage() {
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

export default ContactPage;
```

## Pages Router (Fetch)

```jsx
import React, { useState } from "react";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

function ContactPage() {
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
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
    alert("Form submitted");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactPage;
```

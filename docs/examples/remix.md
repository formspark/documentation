---
title: Remix
lang: en-US
---

# Remix

## Route action

An `action` runs on the server, so the submission works before the page has
hydrated and keeps working with JavaScript disabled.

```jsx
// app/routes/contact.jsx
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export async function action({ request }) {
  const formData = await request.formData();
  await fetch(FORMSPARK_ACTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  return redirect("/thanks");
}

export default function ContactPage() {
  return (
    <Form method="post">
      <label>
        <span>Message</span>
        <textarea name="message" required />
      </label>
      <button type="submit">Send</button>
    </Form>
  );
}
```

Remix's `<Form>` submits without a full page load once hydrated, and falls back
to a normal browser submission before that.

### Disabling the button while submitting

`useNavigation` reports the state of the in-flight submission.

```jsx
// app/routes/contact.jsx
import { Form, useNavigation } from "@remix-run/react";

export default function ContactPage() {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <label>
        <span>Message</span>
        <textarea name="message" required />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send"}
      </button>
    </Form>
  );
}
```

## use-formspark

:::tip
Check out our official React hooks: [use-formspark](https://github.com/formspark/use-formspark).
:::

Submits from the browser instead, so you can stay on the page and render your
own confirmation.

```jsx
// app/routes/contact.jsx
import { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "your-form-id";

export default function ContactPage() {
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await submit({ message });
    setMessage("");
    setSent(true);
  };

  if (sent) {
    return <p>Thanks! We received your message.</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit" disabled={submitting}>
        Send
      </button>
    </form>
  );
}
```

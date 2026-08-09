---
title: Qwik
lang: en-US
---

# Qwik

## routeAction$

`routeAction$` runs on the server, so the submission works before the page has
hydrated and keeps working with JavaScript disabled.

```tsx
import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export const useContactAction = routeAction$(async (data) => {
  await fetch(FORMSPARK_ACTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return { success: true };
});

export default component$(() => {
  const action = useContactAction();

  return (
    <div>
      <Form action={action}>
        <label>
          <span>Message</span>
          <textarea name="message" />
        </label>
        <button type="submit" disabled={action.isRunning}>
          Send
        </button>
      </Form>

      {action.value?.success && <p>Thanks! We received your message.</p>}
    </div>
  );
});
```

## Fetch

If you would rather submit from the browser, use a `$` handler and a signal. The
action URL ends up in the client bundle here, which is no different from a plain
HTML form: a form id identifies a form, it does not authorize anything, so it is
safe to ship to the browser.

```tsx
import { component$, useSignal, $ } from "@builder.io/qwik";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export default component$(() => {
  const message = useSignal("");
  const submitting = useSignal(false);

  const onSubmit = $(async () => {
    submitting.value = true;
    try {
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: message.value }),
      });
      message.value = "";
    } finally {
      submitting.value = false;
    }
  });

  return (
    <form preventdefault:submit onSubmit$={onSubmit}>
      <textarea bind:value={message} />
      <button type="submit" disabled={submitting.value}>
        Send
      </button>
    </form>
  );
});
```

---
title: Next.js
lang: en-US
---

# Next.js

## Fetch

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
    }).then(() => {
      alert("Form submitted");
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        name="message"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactPage;
```

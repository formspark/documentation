---
title: Gatsby
lang: en-US
---

# Gatsby

```jsx
import React from "react";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export default function HomePage() {
  return (
    <form method="POST" action={FORMSPARK_ACTION_URL}>
      <textarea name="message" placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
}
```

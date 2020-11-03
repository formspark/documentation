---
title: React
lang: en-US
---

# React

## Fetch

```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

const Application = () => {
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
};

ReactDOM.render(<Application />, document.getElementById("root"));
```

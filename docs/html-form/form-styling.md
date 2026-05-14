---
title: Form styling
lang: en-US
---

# Form styling

With Formspark you get to bring your own HTML and CSS.

On this page you'll find tips, tricks and links to help you style your forms.

## Simple vertical layout

![Simple vertical layout](/simple-vertical-layout.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .vertical-form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 500px;
      }
    </style>
  </head>
  <body>
    <form class="vertical-form" action="https://submit-form.com/your-form-id">
      <label for="first-name">First name</label>
      <input id="first-name" name="first-name" type="text" />
      <label for="last-name">Last name</label>
      <input id="last-name" name="last-name" type="text" />
      <label for="message">Message</label>
      <textarea id="message" name="message" cols="15" rows="5"></textarea>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

## Accessible form

Pair every input with a `<label for>`, give focused fields a visible outline, and never rely on placeholder text as a label.

```html
<style>
  .accessible-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 500px;
    font-family: system-ui, sans-serif;
  }
  .accessible-form label {
    font-weight: 600;
  }
  .accessible-form :is(input, textarea) {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .accessible-form :is(input, textarea):focus-visible {
    outline: 3px solid #707ee7;
    outline-offset: 2px;
  }
</style>

<form class="accessible-form" action="https://submit-form.com/your-form-id">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="5" required></textarea>

  <button type="submit">Send</button>
</form>
```

## Tailwind CSS

```html
<form
  class="mx-auto flex max-w-md flex-col gap-3"
  action="https://submit-form.com/your-form-id"
>
  <label for="email" class="font-semibold">Email</label>
  <input
    id="email"
    name="email"
    type="email"
    required
    class="rounded border border-gray-300 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
  />

  <label for="message" class="font-semibold">Message</label>
  <textarea
    id="message"
    name="message"
    rows="5"
    required
    class="rounded border border-gray-300 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
  ></textarea>

  <button
    type="submit"
    class="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
  >
    Send
  </button>
</form>
```

## Add an asterisk to required field labels

![Required field label asterisk](/required-field-label-asterisk.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      label.required:after {
        content: "*";
        color: red;
      }
    </style>
  </head>
  <body>
    <form action="https://submit-form.com/your-form-id">
      <label for="first-name" class="required">First name</label>
      <input id="first-name" name="first-name" type="text" required />
      <label for="last-name">Last name</label>
      <input id="last-name" name="last-name" type="text" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

## Success and error states (AJAX)

When you submit via AJAX, you control the post-submission UI yourself. A common pattern is to swap the form for a thank-you message on success and show an inline error on failure.

```html
<form id="contact" action="https://submit-form.com/your-form-id">
  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>
  <button type="submit">Send</button>
  <p id="error" hidden>Something went wrong. Please try again.</p>
</form>

<div id="thanks" hidden>Thanks! We received your message.</div>

<script>
  const form = document.getElementById("contact");
  const error = document.getElementById("error");
  const thanks = document.getElementById("thanks");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.hidden = true;
    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Sending...";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error();
      form.hidden = true;
      thanks.hidden = false;
    } catch {
      error.hidden = false;
      button.disabled = false;
      button.textContent = "Send";
    }
  });
</script>
```

## CSS frameworks

- [Bootstrap](https://getbootstrap.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pico CSS](https://picocss.com/) — minimal, semantic, no classes required.

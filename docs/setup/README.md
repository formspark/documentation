---
title: Installation
lang: en-US
---

# Installation

Set your HTML form's `action` attribute to your form's action URL.

Your form's action URL is `https://submit-form.com/your-form-id`

```html
<form action="https://submit-form.com/your-form-id">
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

Ensure all input, select and textarea elements inside your form have a `name` attribute, otherwise you will not receive the data filled in these fields.

Make sure your form contains a button element of `type` "submit".

::: warning
Make sure you replace the placeholder form id with your own form id.

You can create own form id [here](https://dashboard.formspark.io).
:::

::: warning
Input names starting with an underscore will be hidden from the dashboard and notification emails.
:::

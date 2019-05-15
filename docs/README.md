---
title: Basic setup
lang: en-US
---

# About

Formspark is a simple way to save information from your website via forms without having to set up a server.

- No servers to manage
- No databases to handle
- No APIs or frameworks to learn
- Keep full control over the look and feel of your forms

Formspark is perfect for static sites and works anywhere you can put an HTML form

# Basic setup

## Adapt your form

Set your HTML form's action attribute to the Formspark form's action URL

``` html
<form action="https://submit-form.com/your-form-id">
  <input type="email" name="email">
  <button type="submit">Subscribe</button>
</form>
```

* Ensure all input, select and textarea elements inside your form have a name attribute, otherwise you will not receive the data filled in these fields.
* Make sure your form contains a button element of type submit.
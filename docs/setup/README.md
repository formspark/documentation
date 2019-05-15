---
title: Installation
lang: en-US
---

# Installation

Set your HTML form's action attribute to the Formspark form's action URL

```html
<form action="https://submit-form.com/your-form-id">
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

- Ensure all input, select and textarea elements inside your form have a name attribute, otherwise you will not receive the data filled in these fields.
- Make sure your form contains a button element of type submit.

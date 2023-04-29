---
title: Redirection
lang: en-US
---


## Specifying a custom redirect URL

1. Add an input of type `hidden`.
2. Set the input's name to `_redirect`.
3. Set the value to the URL you want to redirect users to.

```html
<form action="https://submit-form.com/your-form-id">
  <input
    type="hidden"
    name="_redirect"
    value="https://your-website.com/thank-you"
  />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

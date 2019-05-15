---
title: Custom redirect
lang: en-US
---

# Custom redirect

After submitting a form the user will be redirected to a generic feedback page hosted by Formspark.

You can override this default behavior by specifying a custom redirect URL.

1. Add an input of type "hidden".
2. Set the input's name to "\_redirect".
3. Set the value to the URL you want to redirect users to.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="hidden" name="_redirect" value="https://site.io/thanks.html" />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

---
title: Advanced features
lang: en-US
---

# Advanced features

## Custom redirect

After submitting a form the user will be redirected to a generic feedback page hosted by Formspark.

You can override this default behavior by specifying a custom redirect URL.

1. Add an input of type "hidden".
2. Set the input's name to "_redirect".
3. Set the value to the URL you want to redirect users to.

``` html
<form action="https://submit-form.com/your-form-id">
  <input type="hidden" name="_redirect" value="https://site.io/thanks.html" />
  <input type="email" name="email">
  <button type="submit">Subscribe</button>
</form>
```

## Direct replies

When email notifications are enabled, Formspark enables you to directly "Reply" to the person who originally submitted the form.

The form must contain an input with a "_replyto" or "email" name.

``` html
<input type="email" name="email" placeholder="Your email" />
```
``` html
<input type="text" name="_replyto" placeholder="Your email" />
```

## Submitting the form in a different tab

When setting the "target" attribute to "_blank", the form will be submitted in a new tab.

``` html
<form action="https://submit-form.com/your-form-id" target="_blank">
  <input type="email" name="email">
  <button type="submit">Subscribe</button>
</form>
```
---
title: Redirection
lang: en-US
---

# Redirection

After submitting a form, the user will be redirected to a generic [feedback page](/customization/feedback-page) hosted by Formspark.

This default behavior can be overridden in multiple ways.

## Specifying a custom redirect URL

1. Add an input of type `hidden`.
2. Set the input's name to `_redirect`.
3. Set the value to the URL you want to redirect users to.

```html
<form action="https://submit-form.com/your-form-id">
  <input
    type="hidden"
    name="_redirect"
    value="https://your-website.com/thanks"
  />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

By default, Formspark appends the submission's entries to the custom redirect URL (to its search string).
This enables you to personalize your page with user-submitted data.

The above form's submissions would redirect to `https://your-website.com/thanks?email=example%40email.com`.

You can toggle off this behavior by adding a hidden input with the name `_append` and the value `false`.

```html
<input type="hidden" name="_append" value="false" />
```

## Specifying a custom error redirect URL

Note: If you don't specify a custom error redirect URL then the configuration from `_redirect` (if present) will
automatically be inherited.

1. Add an input of type `hidden`.
2. Set the input's name to `_error`.
3. Set the value to the URL you want to redirect users to.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="hidden" name="_error" value="https://your-website.com/error" />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

## Preventing the redirect

### Staying on the same page (without leaving it)

This is only possible with JavaScript/AJAX.

Formspark has excellent AJAX support, [learn more about it here](/examples/ajax.html).

### Returning to the same page (after leaving it)

```html
<!--
1. If your form is hosted at "https:/my-website.com/newsletter.html"
-->
<form action="https://submit-form.com/your-form-id">
  <!-- 2. Then you would set the "_redirect" to "https:/my-website.com/newsletter.html" -->
  <input
    type="hidden"
    name="_redirect"
    value="https:/my-website.com/newsletter.html"
  />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

This method is based on illusion. Technically, you are not preventing the redirection.

---
title: Redirection
lang: en-US
---

# Redirection

After submitting a form, the user will be redirected to a generic feedback page hosted by Formspark.

![Feedback OK](../.vuepress/public/feedback-ok.png)

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

Note: If you don't specify a custom error redirect URL then the configuration from `_redirect` (if present) will automatically be inherited.

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

Formspark has excellent AJAX support, [learn more about it here](/examples/ajax).

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

### JSON response

You can request a JSON response instead of a redirection.

1. Add an input of type `hidden`.
2. Set the input's name to `_redirect`.
3. Set the value to `false`.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="hidden" name="_redirect" value="false" />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

## Customizing the default feedback page

You can customize the look-and-feel and content of the default feedback page with the following reserved input names.

### `_feedback.whitelabel`

Removes all Formspark branding from the feedback page.
You need an upgraded workspace to unlock this feature.

Default value: false

```html
<form action="https://submit-form.com/your-form-id">
  <input type="hidden" name="_feedback.whitelabel" value="true" />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

### `_feedback.dark`

Toggles dark mode.

Default value: false

```html
<form action="https://submit-form.com/your-form-id">
  <input type="hidden" name="_feedback.dark" value="true" />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

![Feedback dark mode](../.vuepress/public/feedback-dark-mode.png)

### `_feedback.language`

Customizes the language of the feedback page.

Default value: "en"

Supported values:

| Value | Language   |
| ----- | ---------- |
| "en"  | English    |
| "ru"  | Russian    |
| "es"  | Spanish    |
| "pt"  | Portuguese |
| "fr"  | French     |
| "it"  | Italian    |
| "de"  | German     |
| "nl"  | Dutch      |

### `_feedback.success.title`

Customizes the title of the success feedback page.

Default value: "Your form has been submitted."

### `_feedback.success.message`

Customizes the message of the success feedback page.

Default value: _none_

### `_feedback.error.title`

Customizes the title of the error feedback page.

Default value: "An error has occurred."

### `_feedback.error.message`

Customizes the message of the error feedback page.

Default value: "Please try again."

### Example

```html
<form action="https://submit-form.com/your-form-id">
  <input
    type="hidden"
    name="_feedback.success.title"
    value="I'm a custom title!"
  />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

![Feedback OK custom title](../.vuepress/public/feedback-ok-custom-title.png)

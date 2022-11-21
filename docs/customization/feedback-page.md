---
title: Feedback page
lang: en-US
---

# Feedback page

After submitting a form, the user will be redirected to a generic feedback page hosted by Formspark.

![Feedback OK](../.vuepress/public/feedback-ok.png)

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

---
title: Submit in different tab
lang: en-US
---

# Submit in different tab

When setting the `target` attribute to `_blank`, the form will be submitted in a new tab.

```html
<form action="https://submit-form.com/your-form-id" target="_blank">
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

::: warning
Browsers may block the new tab if the submission isn't triggered by a direct user gesture (for example, a programmatic `form.submit()` call). On mobile, opening a new tab can interrupt the flow and feels broken to many users. Prefer staying on the same page with [AJAX](/examples/ajax) for a better experience.
:::

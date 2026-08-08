---
title: Eleventy
lang: en-US
---

# Eleventy

## Inline

Eleventy templates are plain HTML, so a form can point straight at your action
URL.

```html
---
layout: base.njk
title: Contact
---

<form action="https://submit-form.com/your-form-id" method="POST">
  <label>
    <span>Message</span>
    <textarea name="message"></textarea>
  </label>
  <button type="submit">Send</button>
</form>
```

## Reusable include

Keeping the form id in a global data file means one edit when it changes, and
no id duplicated across templates.

Add `src/_data/formspark.json`:

```json
{
  "formId": "your-form-id"
}
```

Add `src/_includes/contact-form.njk`:

```html
<form action="https://submit-form.com/{{ formspark.formId }}" method="POST">
  <label>
    <span>Message</span>
    <textarea name="message"></textarea>
  </label>
  <button type="submit">Send</button>
</form>
```

Then include it from any template:

```html
{% include "contact-form.njk" %}
```

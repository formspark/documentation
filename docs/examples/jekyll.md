---
title: Jekyll
lang: en-US
---

# Jekyll

## Inline

```html
---
layout: default
---

<form action="https://submit-form.com/{{ site.formspark_form_id }}">
  <textarea name="message"></textarea>
  <button type="submit">Submit</button>
</form>
```

## Reusable include

Store the form ID once in your site config and render the form from an include wherever you need it.

```yaml
# _config.yml
formspark_form_id: your-form-id
```

```html
<!-- _includes/contact-form.html -->
<form action="https://submit-form.com/{{ site.formspark_form_id }}">
  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

Use it from any page or layout:

```liquid
{% include contact-form.html %}
```

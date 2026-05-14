---
title: Hugo
lang: en-US
---

# Hugo

## Inline

```html
<html>
  <head>
    <title>{{ .Title }}</title>
  </head>
  <body>
    <h1>{{ .Title }}</h1>
    <form action="https://submit-form.com/{{ .Site.Params.formspark_form_id }}">
      <textarea name="message"></textarea>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

## Reusable partial

Store the form ID once in your site config and render the form from a partial wherever you need it.

```toml
# hugo.toml
[params]
formspark_form_id = "your-form-id"
```

```html
<!-- layouts/partials/contact-form.html -->
<form action="https://submit-form.com/{{ .Site.Params.formspark_form_id }}">
  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

Use it from any layout or page:

```html
{{ partial "contact-form.html" . }}
```

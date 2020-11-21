---
title: Hugo
lang: en-US
---

# Hugo

```html
<html>
  <head>
    <title>{{ .Title }}</title>
  </head>
  <body>
    <h1>{{ .Title }}</h1>
    <form
      action="https://submit-form.com/{{ .Site.Params.formspark_form_id }}"
      target="_self"
    >
      <textarea name="message"></textarea>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

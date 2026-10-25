---
title: WordPress
description: "Add a Formspark form to a WordPress site with a Custom HTML block that holds a form posting to your Formspark action URL."
lang: en-US
---

# WordPress

WordPress integration is possible
via [Custom HTML blocks](https://wordpress.com/support/wordpress-editor/blocks/custom-html-block/).

1. Create a Custom HTML block.

![WordPress Custom HTML block](/wordpress-custom-html-block.png)

2. Add the HTML of your form.

```html
<form action="https://submit-form.com/your-form-id" method="POST">
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

---
title: WordPress
lang: en-US
---

# WordPress

WordPress integration is possible
via [Custom HTML blocks](https://wordpress.com/support/wordpress-editor/blocks/custom-html-block/).

1. Create a Custom HTML block.

![WordPress Custom HTML block](../.vuepress/public/wordpress-custom-html-block.png)

2. Add the HTML of your form.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

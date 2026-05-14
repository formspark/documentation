---
title: Custom routing
lang: en-US
---

# Custom routing

You can use JavaScript to dynamically select a form endpoint.

Using this technique, you can use a drop-down to dynamically route submissions to a specific team, department, inbox,
webhook, etc...

## At build time

If your form lives on a static site and the destination only depends on the page (not on a user choice), set the `action` at build time so no JavaScript is needed.

### Hugo

```html
<!-- layouts/_default/contact.html -->
<form action="https://submit-form.com/{{ .Site.Params.formspark_form_id }}">
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

### Jekyll

```html
<!-- _layouts/contact.html -->
<form action="https://submit-form.com/{{ site.formspark_form_id }}">
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

## At runtime

```html
<form id="my-form" action="https://submit-form.com/sales-form-id" method="POST">
  <label for="department">Department</label>
  <select id="department" onchange="onChange(this)">
    <option value="sales" selected>Sales</option>
    <option value="marketing">Marketing</option>
    <option value="hr">HR</option>
  </select>

  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>
  <button type="submit">Send</button>
</form>

<script>
  onChange = function (event) {
    let action;
    switch (event.value) {
      case "sales":
        action = "https://submit-form.com/sales-form-id";
        break;
      case "marketing":
        action = "https://submit-form.com/marketing-form-id";
        break;
      case "hr":
        action = "https://submit-form.com/hr-form-id";
        break;
    }
    document.getElementById("my-form").action = action;
  };
</script>
```

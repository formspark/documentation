---
title: Custom routing
lang: en-US
---

# Custom routing

You can use JavaScript to dynamically select a form endpoint.

Using this technique, you can use a drop-down to dynamically route submissions to a specific team, department, inbox,
webhook, etc...

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

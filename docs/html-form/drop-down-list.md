---
title: Drop-down list
lang: en-US
---

# Drop-down list

The `<select>` element is used to create a drop-down list.

Only the value(s) of the selected option(s) will be forwarded.

Use the `multiple` attribute to specify whether multiple options can be selected at once

```html
<!-- Single option (selection persisted as a string) -->
<form action="https://submit-form.com/your-form-id">
  <select name="car">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </select>
  <button type="submit">Submit</button>
</form>
```

```html
<!-- Multiple options (selection persisted as an array)-->
<form action="https://submit-form.com/your-form-id">
  <select name="vegetables" multiple>
    <option value="tomato">Tomato</option>
    <option value="carrot">Carrot</option>
    <option value="potato">Potato</option>
    <option value="kale">Kale</option>
  </select>
  <button type="submit">Submit</button>
</form>
```

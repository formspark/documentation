---
title: Drop-down list
lang: en-US
---

# Drop-down list

The `<select>` element is used to create a drop-down list.

Only the value(s) of the selected option(s) will be forwarded.

Use the `multiple` attribute to specify whether multiple options can be selected at once.

```html
<!-- Single option (selection persisted as a string) -->
<form action="https://submit-form.com/your-form-id" method="POST">
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
<form action="https://submit-form.com/your-form-id" method="POST">
  <select name="vegetables" multiple>
    <option value="tomato">Tomato</option>
    <option value="carrot">Carrot</option>
    <option value="potato">Potato</option>
    <option value="kale">Kale</option>
  </select>
  <button type="submit">Submit</button>
</form>
```

::: tip
When a `multiple` select has nothing selected, the field is omitted from the submission entirely, so the key will not appear in your data.
:::

## Grouped options

Use `<optgroup>` to organize related options under a heading.

```html
<select name="car">
  <optgroup label="European">
    <option value="volvo">Volvo</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
  <optgroup label="American">
    <option value="ford">Ford</option>
    <option value="tesla">Tesla</option>
  </optgroup>
</select>
```

## Autocomplete suggestions

A `<datalist>` provides suggestions for a plain text input. Unlike `<select>`, the user can still type any value.

```html
<form action="https://submit-form.com/your-form-id" method="POST">
  <label for="country">Country</label>
  <input list="countries" id="country" name="country" />
  <datalist id="countries">
    <option value="Belgium"></option>
    <option value="France"></option>
    <option value="Germany"></option>
    <option value="Netherlands"></option>
  </datalist>
  <button type="submit">Submit</button>
</form>
```

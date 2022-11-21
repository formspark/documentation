---
title: Special input types
lang: en-US
---

# Special input types

## Radio

Radio buttons let a user select ONLY ONE of a limited number of choices.

Only the value of the checked choice will be forwarded.

All choices should share the SAME `name` attribute.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="radio" name="color" value="blue" checked /> Blue
  <input type="radio" name="color" value="red" /> Red
  <input type="radio" name="color" value="green" /> Green
  <button type="submit">Submit</button>
</form>
```

## Checkbox

Checkboxes let a user select ZERO or MORE options of a limited number of choices.

The value of each checked choice will be forwarded.

When unchecked, the browser does not send the input in the request, so a checkbox value will either be true, or the key
will not exist at all.

All choices should have a UNIQUE `name` attribute.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="checkbox" name="has-bike" value="Bike" /> I have a bike
  <input type="checkbox" name="has-car" value="Car" /> I have a car
  <button type="submit">Submit</button>
</form>
```

## Hidden field

A hidden field lets you include data that cannot be seen or modified by users when a form is submitted.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="hidden" name="website-version" value="1.0.0" />
  <input type="text" name="name" />
  <button type="submit">Submit</button>
</form>
```

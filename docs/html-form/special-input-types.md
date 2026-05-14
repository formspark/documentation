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

## Email, telephone, and URL

These types are stored as plain strings on Formspark's side. Their value is that browsers validate the format and mobile keyboards switch to the appropriate layout.

```html
<input type="email" name="email" required />
<input type="tel" name="phone" />
<input type="url" name="website" />
```

## Number and range

```html
<input type="number" name="quantity" min="1" max="10" step="1" />
<input type="range" name="satisfaction" min="0" max="10" />
```

## Date and color

```html
<input type="date" name="birthday" />
<input type="color" name="brand-color" value="#707ee7" />
```

## File uploads

::: warning
`<input type="file">` does not work with Formspark directly. Browsers send file inputs as `multipart/form-data` and Formspark expects URL-encoded form data or JSON.

To accept file uploads, use a storage provider such as Uploadcare and submit the resulting URL to Formspark. See [File uploads](/setup/file-uploads).
:::

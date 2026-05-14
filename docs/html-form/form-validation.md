---
title: Form validation
lang: en-US
---

# Form validation

We recommend using HTML5's built-in validation. It is very rich these days, and has good browser support.

::: warning
Formspark performs no server-side validation. Validate your inputs client-side before submission to avoid storing malformed data.
:::

## Resources

- [MDN: Form data validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
- [HTML5 validation browser support](https://caniuse.com/#search=validation)
- [MDN: the input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

## Required fields

The `required` attribute is a boolean attribute. When present, it specifies that an input field must be filled out before submitting the form.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

## Length constraints

Use `minlength` and `maxlength` to constrain text inputs.

```html
<input type="text" name="username" minlength="3" maxlength="20" required />
<textarea name="message" minlength="10" maxlength="500" required></textarea>
```

## Pattern matching

Use `pattern` with a regular expression to enforce a specific format.

```html
<!-- US zip code -->
<input
  type="text"
  name="zip"
  pattern="\d{5}(-\d{4})?"
  title="A 5-digit ZIP code (optionally followed by -4 digits)"
  required
/>
```

The `title` attribute is shown by the browser when the pattern fails.

## Custom validation messages

Use `setCustomValidity` to replace the default browser message.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="email" name="email" id="email" required />
  <button type="submit">Send</button>
</form>

<script>
  const email = document.getElementById("email");
  email.addEventListener("invalid", () => {
    email.setCustomValidity("Please enter a valid work email address.");
  });
  email.addEventListener("input", () => {
    email.setCustomValidity("");
  });
</script>
```

## Styling invalid fields

CSS pseudo-classes let you style validation state without JavaScript.

```css
/* Applies as soon as the field is invalid */
input:invalid {
  border-color: red;
}

/* Applies only after the user has interacted with the field */
input:user-invalid {
  border-color: red;
}

input:user-valid {
  border-color: green;
}
```

Prefer `:user-invalid` / `:user-valid` over `:invalid` / `:valid` so empty required fields don't appear red on page load.

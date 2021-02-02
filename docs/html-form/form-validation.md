---
title: Form validation
lang: en-US
---

# Form validation

We recommend using HTML5 validation that is built into the browser. HTML5 validation is very rich these days, and has good browser support.

## Resources

- [MDN: Form data validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
- [HTML5 validation browser support](https://caniuse.com/#search=validation)
- [MDN: the input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

## Example

The `required` attribute is a boolean attribute.
When present, it specifies that an input field must be filled out before submitting the form.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

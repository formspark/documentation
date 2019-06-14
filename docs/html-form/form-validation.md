---
title: Form validation
lang: en-US
---

# Form validation

We recommend using HTML5 validation that is built into the browser. HTML5 validation is very rich these days, and has good browser support.

## Resources:

- [MDN: Form data validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
- [HTML5 validation browser support](https://caniuse.com/#search=validation)
- [MDNT: the input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

## Example

```html
<!-- Note the `required` attributes in inputs -->
<form action="https://submit-form.com/your-form-id">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

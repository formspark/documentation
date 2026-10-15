---
title: Ghost
lang: en-US
---

# Ghost

Ghost has no form builder of its own, so a form is plain HTML posted to
Formspark. Add it to a single post or page with an HTML card, or build it into
your theme.

## HTML card

1. In the Ghost editor, type `/html` and press Enter to add an HTML card.
2. Paste the HTML of your form.

```html
<form action="https://submit-form.com/your-form-id" method="POST">
  <input type="email" name="email" placeholder="Email" required />
  <textarea name="message" placeholder="Message"></textarea>
  <button type="submit">Send</button>
</form>
```

## Theme template

If you can upload a custom theme, give the form a page template of its own.
Ghost uses `page-{slug}.hbs` for the page with that slug.

1. Save this as `page-contact.hbs` in your theme.
2. Upload the theme, then create a page with the `contact` slug.

```handlebars
{{!< default}}

<section class="post-full-content">
  <h1>{{title}}</h1>

  <form action="https://submit-form.com/your-form-id" method="POST">
    <input type="email" name="email" placeholder="Email" required />
    <textarea name="message" placeholder="Message"></textarea>
    <button type="submit">Send</button>
  </form>
</section>
```

To send visitors back to your own site after they submit, see
[redirection](/customization/redirection).

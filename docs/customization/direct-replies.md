---
title: Direct replies
lang: en-US
---

# Direct replies

When email notifications are active, Formspark enables you to directly reply to the person who originally submitted the form.

To activate this behavior, create an input with any of the following names:

- `mail`
- `email`
- `_replyto`
- `_email.replyto`

```html
<input type="email" name="mail" placeholder="Your email" />
```

```html
<input type="email" name="email" placeholder="Your email" />
```

```html
<input type="text" name="_replyto" placeholder="Your email" />
```

```html
<input type="text" name="_email.replyto" placeholder="Your email" />
```

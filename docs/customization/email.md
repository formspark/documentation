---
title: Email customizations
lang: en-US
---

# Email customizations

## Subject

You can change the subject of the notification email.

Create a hidden input with the name `_email.subject`.

```html
<input type="hidden" name="_email.subject" value="You have a new message!" />
```

## Sender name

You can change the name of the sender of the notification email.

Create a hidden input with the name `_email.from`.

```html
<input type="hidden" name="_email.from" value="John Doe" />
```

Note: you can't change the actual address.

## Template title

You can change the title of the notification email template.

Create a hidden input with the name `_email.template.title`.

```html
<input type="hidden" name="_email.template.title" value="My Custom Title" />
```

You can remove the title be setting the value to `false`.

```html
<input type="hidden" name="_email.template.title" value="false" />
```

## Template footer

You can remove the footer from the notification email template.

Create a hidden input with the name `_email.template.footer` and the value `false`.

```html
<input type="hidden" name="_email.template.footer" value="false" />
```

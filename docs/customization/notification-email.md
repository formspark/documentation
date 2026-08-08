---
title: Notification email
lang: en-US
---

# Notification email

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

The value must only contain alphanumeric characters, spaces, dashes and underscores.

It is currently not possible to change the sender address.

## Template title

You can change the title of the notification email template.

Create a hidden input with the name `_email.template.title`.

```html
<input type="hidden" name="_email.template.title" value="My Custom Title" />
```

You can remove the title by setting the value to `false`.

```html
<input type="hidden" name="_email.template.title" value="false" />
```

## Template footer

You can remove the footer from the notification email template.

Create a hidden input with the name `_email.template.footer` and the value `false`.

```html
<input type="hidden" name="_email.template.footer" value="false" />
```

## Custom templates

You can go beyond these options and design the notification email in a visual template editor, built in partnership with [Postcraft](https://postcraft.io/).

[Check this page](/dashboard/email-notification-settings#custom-templates) to learn more about custom email
templates.

## Autoresponder

Notification emails go to you; the [autoresponder](/dashboard/autoresponder) sends a confirmation email to the person who submitted your form.

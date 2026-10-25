---
title: Notification email
description: "Change the notification email's subject, sender name, title, button and footer with hidden _email fields, or send a custom template."
lang: en-US
---

# Notification email

## Subject

You can change the subject of the notification email.

Create a hidden input with the name `_email.subject`.

```html
<input type="hidden" name="_email.subject" value="You have a new message!" />
```

A [custom template](#custom-templates) can carry its own subject line instead. When
the submission also has an `_email.subject` field, that field takes precedence.

## Sender name

You can change the name of the sender of the notification email.

Create a hidden input with the name `_email.from`.

```html
<input type="hidden" name="_email.from" value="John Doe" />
```

The value cannot contain `@`, `<` or `>`. A value that breaks this rule is ignored, and the email is sent as "Formspark Notifications".

It is currently not possible to change the sender address.

## Template title

You can change the title of the notification email template.

Create a hidden input with the name `_email.template.title`.

```html
<input type="hidden" name="_email.template.title" value="My Custom Title" />
```

You can remove the title and the Formspark logo by setting the value to `false`.

```html
<input type="hidden" name="_email.template.title" value="false" />
```

## Dashboard button

Team members get a "View submission" button that opens the submission in the dashboard. You can remove it.

Create a hidden input with the name `_email.template.button` and the value `false`.

```html
<input type="hidden" name="_email.template.button" value="false" />
```

Guests never get this button, since they cannot open the dashboard.

## Template footer

You can remove the footer from the notification email template.

Create a hidden input with the name `_email.template.footer` and the value `false`.

```html
<input type="hidden" name="_email.template.footer" value="false" />
```

Guests get no footer. Their mail client offers an unsubscribe button beside the sender instead.

The title, button and footer options shape the default template. A [custom template](#custom-templates) is sent exactly as you designed it, with no footer for anyone.

## Custom templates

You can go beyond these options and design the notification email in a visual template editor, built in partnership with [Postcraft](https://postcraft.io/).

[Check this page](/dashboard/email-notification-settings#custom-templates) to learn more about custom email
templates.

You can write the same template from your own code instead. See [templates](/api/reference#templates) in the API reference.

## Autoresponder

Notification emails go to you; the [autoresponder](/dashboard/autoresponder) sends a confirmation email to the person who submitted your form.

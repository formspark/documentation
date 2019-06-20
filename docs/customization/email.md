---
title: email customizations
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

You can change the name (not the email address) of the notification email's sender.

Create a hidden input with the name `_email.from`.

```html
<input type="hidden" name="_email.from" value="John Doe" />
```

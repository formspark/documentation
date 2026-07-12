---
title: Autoresponder
lang: en-US
---

# Autoresponder

The autoresponder automatically sends a confirmation email to the person who submitted your form.

The autoresponder is available on all paid workspaces.

## Enabling the autoresponder

To enable the autoresponder for a form, navigate to its `Settings` section and create an autoresponder template.

The template is designed in a visual editor, built in partnership with [Postcraft](https://postcraft.io/). Add your own copy and imagery, and include a recap of the submitted data.

## Who receives the autoresponse

Formspark determines the recipient from your form's submission data. The first of the following fields that contains a valid email address is used:

1. `_replyto`
2. `mail`
3. `email`

```html
<input type="email" name="email" />
```

If the submission contains no valid email address in these fields, no autoresponse is sent.

::: tip
The same fields also set the reply-to address of your own notification emails, so a form that supports direct replies already works with the autoresponder.
:::

## Replies

Replies to an autoresponse go to your form's first notification recipient, so a submitter who answers the confirmation email reaches you, not Formspark.

## Footer and unsubscribe

Every autoresponse includes a footer identifying the form it was sent on behalf of, along with an unsubscribe link. Recipients who unsubscribe stop receiving autoresponses; the footer cannot be removed.

## Content policy

The rendered autoresponse is automatically checked before every send. Autoresponses that classify as spam are not sent, and repeated detections disable the autoresponder for the workspace. Use the autoresponder for transactional confirmations, not for marketing or bulk email.

::: warning
Spam-flagged submissions never trigger an autoresponse, and neither do submissions blocked by your form's spam protection.
:::

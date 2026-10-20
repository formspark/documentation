---
title: Autoresponder
lang: en-US
---

# Autoresponder

The autoresponder automatically sends a confirmation email to the person who submitted your form.

The autoresponder is available on [upgraded workspaces](/troubleshooting/limits-and-plans).

## Enabling the autoresponder

To enable the autoresponder for a form, open its `Settings` section, expand `Autoresponder` under `Emails` and press `Create template`. Creating the template turns replies on, and deleting it turns them off.

The template is designed in a visual editor, built in partnership with [Postcraft](https://postcraft.io/). Add your own copy and imagery, and include a recap of the submitted data.

You can also write the template from your own code, without opening the dashboard at all. See [templates](/api/reference#templates) in the API reference.

## Who receives the autoresponse

Formspark determines the recipient from your form's submission data. It reads the first of the following fields that the submission fills in:

1. `_replyto`
2. `mail`
3. `email`
4. `_email.replyto`

`mail` and `email` match in any case, so a field named `Email` works too.

```html
<input type="email" name="email" />
```

If none of these fields is filled in, or the value found is not a valid email address, no autoresponse is sent.

::: tip
The same fields also set the reply-to address of your own notification emails, so a form that supports direct replies already works with the autoresponder.
:::

## Replies

Replies to an autoresponse go to your form's first notification recipient, so a submitter who answers the confirmation email reaches you, not Formspark.

## Footer and unsubscribe

Every autoresponse ends with a footer you cannot remove. It tells the recipient they received the confirmation because they submitted a form on your site, and names that site (or the form, when the site is unknown). It also offers an unsubscribe link to anyone who did not submit it.

Recipients who unsubscribe stop receiving autoresponses.

## Subject

Set a subject line in the template to replace the default one. It can include the submitted data, such as the visitor's name. A subject that comes out empty, because the fields it names were not filled in, falls back to the default.

## Language

The default subject and the footer are in English. Add a hidden `_language` field to send them in your visitor's language. See [Language](/customization/language) for the supported values. A subject you set in the template is sent as you wrote it, whatever the language.

The body is your own template, so write it in the language you want.

## Content policy

Use the autoresponder for transactional confirmations, not for marketing or bulk email.

::: warning
Spam-flagged submissions never trigger an autoresponse.
:::

Every autoresponder template passes a content check. If the check pauses yours, the `Autoresponder` row says so and no replies are sent. Submissions are still stored. Contact support to have the template reviewed.

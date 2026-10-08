---
title: Language
lang: en-US
---

# Language

Formspark writes a few things to your visitors itself: the feedback page they see after submitting, and the subject and footer of the [autoresponder](/dashboard/autoresponder). By default these are in English.

Add a hidden `_language` field to show them in your visitor's language:

```html
<form action="https://submit-form.com/your-form-id" method="POST">
  <input type="hidden" name="_language" value="de" />
  <input type="email" name="email" />
  <button type="submit">Send</button>
</form>
```

A multilingual site can set the value per page, so each visitor gets their own language.

## What `_language` translates

| Where                                         | What                                                  |
| --------------------------------------------- | ----------------------------------------------------- |
| [Feedback page](/customization/feedback-page) | The default title and message                         |
| [Autoresponder](/dashboard/autoresponder)     | The subject, and the footer with its unsubscribe link |

It does not translate:

- Text you write yourself, such as a custom feedback title or the body of your autoresponder template. Write those in the language you want.
- Your own [notification emails](/customization/notification-email). Those are for you, not your visitors.

## Supported values

| Value | Language   |
| ----- | ---------- |
| "de"  | German     |
| "en"  | English    |
| "es"  | Spanish    |
| "fr"  | French     |
| "it"  | Italian    |
| "nl"  | Dutch      |
| "pl"  | Polish     |
| "pt"  | Portuguese |
| "ru"  | Russian    |
| "uk"  | Ukrainian  |

Any other value falls back to English.

## The feedback page only

`_feedback.language` sets the language of the feedback page alone. When a form sends both fields, the feedback page follows `_feedback.language` and the autoresponder follows `_language`.

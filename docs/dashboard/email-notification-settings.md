---
title: Email notification settings
lang: en-US
---

# Email notification settings

To manage your form's email notification settings, navigate to its `Settings` section.

## Recipients

- You can enable/disable email notifications for your workspace's team members.
- You can add guests to send email notifications to people outside your workspace/organization.

![Email notification settings](/email-notification-settings.png)

## Custom templates

You can customize the notification email template of a form.

Formspark custom email templates use the [Handlebars](https://handlebarsjs.com/) templating language.

```handlebars
<div style="text-align: left;">
  <strong>New submission:</strong>
  <div style="margin: 16px 0;">
    <strong>First name</strong>:
    {{data.firstName}}
  </div>
  <strong>Last name</strong>:
  {{data.lastName}}
</div>
```

### Custom Handlebars helpers

The following custom Handlebars helpers have been registered for you:

| Name                          | Description                                                                                                                                            | Example usage                                                                                                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `capitalize`                  | Capitalizes the first character of a string and lowercases the rest.                                                                                   | <span v-pre>`{{capitalize "hello world"}}`</span> → `Hello world`                                                                                                                           |
| `nl2br`                       | Converts newlines in a string into `<br>` HTML tags, so line breaks display correctly in HTML.                                                         | <span v-pre>`{{nl2br user.comment}}`</span> → `Line one<br>Line two`                                                                                                                        |
| `pluralize`                   | Returns the singular or plural form of a word based on a count. Optionally accepts a custom plural form.                                               | <span v-pre>`{{pluralize 1 "item"}}`</span> → `1 item`<br><span v-pre>`{{pluralize 3 "item"}}`</span> → `3 items`<br><span v-pre>`{{pluralize 2 "child" "children"}}`</span> → `2 children` |
| `stringify`                   | Serializes a value to a JSON string. Supports optional indentation for pretty-printing.                                                                | <span v-pre>`{{stringify data}}`</span> → `{"name":"Alice","age":30}`<br><span v-pre>`{{stringify data indent=2}}`</span> → pretty-printed JSON                                             |
| `switch` / `case` / `default` | Block helper for matching a value against multiple cases. Renders the content of the matching `case` block, or the `default` block if no case matches. | <span v-pre>`{{#switch type}}{{#case "a"}}A{{/case}}{{#case "b"}}B{{/case}}{{#default}}Other{{/default}}{{/switch}}`</span>                                                                 |
| `titleCase`                   | Capitalizes the first letter of every word in a string.                                                                                                | <span v-pre>`{{titleCase "hello world from the team"}}`</span> → `Hello World From The Team`                                                                                                |

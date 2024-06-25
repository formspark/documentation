---
title: Email notification settings
lang: en-US
---

# Email notification settings

To manage your form's email notification settings, navigate to its `Settings` section.

## Recipients

- You can enable/disable email notifications for your workspace's team members.
- You can add guests to send email notifications to people outside your workspace/organization.

![Email notification settings](../.vuepress/public/email-notification-settings.png)

## Custom templates

You can customize the notification email template of a form.

Formspark custom email templates use the [Handlebars](https://handlebarsjs.com/) templating language.

```handlebars

<div style="text-align: left;">
    <strong>New submission:</strong>
    <div style="margin: 16px 0;">
        <strong>First name</strong>: {{data.firstName}}</div>
    <strong>Last name</strong>: {{data.lastName}}</div>
</div>
</div>
```

### Custom Handlebars helpers

The following custom Handlebars helpers have been registered for you:

#### json

Stringifies a JSON object.

##### Usage

```handlebars
{{json data}}
```

##### Implementation

```javascript
Handlebars.registerHelper("json", function (ctx) {
  if (typeof ctx === "object") {
    return new Handlebars.SafeString(JSON.stringify(ctx));
  }
  return ctx;
});
```

#### formatNewlines

Converts newlines in a string to `<br>` HTML tags.

##### Usage

```handlebars
{{formatNewlines data.message}}
```

##### Implementation

```javascript
Handlebars.registerHelper("formatNewlines", function (ctx) {
  if (typeof ctx === "string") {
    return new Handlebars.SafeString(ctx.replace(/\r\n|\r|\n/g, "<br>"));
  }
  return ctx;
});
```

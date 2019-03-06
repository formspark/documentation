---
title: Anti-spam
lang: en-US
---

# Anti-spam

## Honeypot

Every form falls victim to spambots at some point. How you handle them can affect your customers, most solutions tending to discourage people from filling out your forms.

The honeypot technique allows us to ignore spambots without forcing your users to fill out a captcha or jump through other hoops.

To enable this feature, add a field with the name "_honeypot" (or "_gotcha") to your form and hide it with CSS (see example below). The submission will be silently ignored when a spambot enters a value.

``` html
<form action="https://submit-form.com/<your-form-id>">
  <input type="checkbox" name="_honeypot" style="display:none" tabindex="-1" autocomplete="off">
  <input type="email" name="email">
  <button type="submit">Subscribe</button>
</form>
```

## Custom honeypot attribute

Instead of using "_honeypot" (or "_gotcha"), you can specify your own honeypot attribute in your form's settings.

Example of an "abracadabra" custom honeypot attribute:

![Custom honeypot](./.vuepress/public/custom-honeypot.png)

``` html
<form action="https://submit-form.com/<your-form-id>">
  <input type="checkbox" name="abracadabra" style="display:none" tabindex="-1" autocomplete="off">
  <input type="email" name="email">
  <button type="submit">Subscribe</button>
</form>
```
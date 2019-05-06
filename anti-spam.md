---
title: Anti-spam
lang: en-US
---

# Anti-spam

Every form falls victim to spambots at some point. How you handle them can affect your customers, Formspark integrates with Google's reCAPTCHA v2 and also implements the honeypot technique.

## reCAPTCHA

Formspark integrates with Google's reCAPTCHA v2 "I'm not a robot" checkbox.

1. Open [https://www.google.com/recaptcha/](https://www.google.com/recaptcha/)
2. Navigate to the admin console.
3. Create a new site.
4. Make sure you select reCAPTCHA v2.
5. Make sure you whitelist your website's domain.
6. Integrate the _site key_ on your client ([instructions](https://developers.google.com/recaptcha/docs/display)).
7. Copy the _secret key_, paste it into the "reCAPTCHA v2 secret key" field found in your form's settings.

Formspark will now use your secret key to verify the reCAPTCHA response.

![reCAPTCHA](./.vuepress/public/recaptcha.png)

To stop using reCAPTCHA, clear the "reCAPTCHA v2 secret key" field found in your form's settings.

## Honeypot

The honeypot technique allows us to ignore spambots without forcing your users to fill out a captcha or jump through other hoops.

To enable this feature, add a field with the name "\_honeypot" (or "\_gotcha") to your form and hide it with CSS (see example below). The submission will be silently ignored when a spambot enters a value.

```html
<form action="https://submit-form.com/your-form-id">
  <input
    type="checkbox"
    name="_honeypot"
    style="display:none"
    tabindex="-1"
    autocomplete="off"
  />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

## Custom honeypot attribute

Instead of using "\_honeypot" (or "\_gotcha"), you can specify your own honeypot attribute in your form's settings.

Example of an "abracadabra" custom honeypot attribute:

![Custom honeypot](./.vuepress/public/custom-honeypot.png)

```html
<form action="https://submit-form.com/your-form-id">
  <input
    type="checkbox"
    name="abracadabra"
    style="display:none"
    tabindex="-1"
    autocomplete="off"
  />
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</form>
```

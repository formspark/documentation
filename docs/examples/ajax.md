---
title: AJAX submissions
lang: en-US
---

# AJAX submissions

You can use AJAX to submit your forms.

To do so, make a `POST` request to your form endpoint (https://submit-form.com/your-form-id).

Ensure that both the `Content-Type` and `Accept` headers are set to `application/json` (some HTTP libraries do this
automatically).

If you wish to include special fields and customizations, which require hidden fields such as `_email.subject`
and `_email.from`, include them as a nested object in the payload:

```javascript
fetch("https://submit-form.com/your-form-id", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    message: "Hello, World",
    _email: {
      from: "A Human Being",
      subject: "A message awaits.",
      template: {
        title: false,
        footer: false,
      },
    },
  }),
});
```

## Fetch

The modern, dependency-free way to submit a form.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Fetch</title>
  </head>
  <body>
    <script>
      async function submit() {
        try {
          const response = await fetch("https://submit-form.com/your-form-id", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              message: "Hello, World",
            }),
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          console.log("Submitted");
        } catch (error) {
          console.error(error);
        }
      }

      submit();
    </script>
  </body>
</html>
```

## Fetch with Botpoison

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Fetch and Botpoison</title>
    <script src="https://unpkg.com/@botpoison/browser" async></script>
  </head>
  <body>
    <script>
      async function submit() {
        const botpoison = new Botpoison({
          publicKey: "your-public-key",
        });
        const { solution } = await botpoison.challenge();
        await fetch("https://submit-form.com/your-form-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            message: "Hello, World",
            _botpoison: solution,
          }),
        });
      }

      submit();
    </script>
  </body>
</html>
```

## Fetch with reCAPTCHA v2

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Fetch and reCAPTCHA v2</title>
    <script src="https://www.google.com/recaptcha/api.js" async></script>
  </head>
  <body>
    <div class="g-recaptcha" data-sitekey="your-site-key"></div>
    <button id="send-button" type="button">Send</button>
    <script>
      document
        .getElementById("send-button")
        .addEventListener("click", async () => {
          await fetch("https://submit-form.com/your-form-id", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              message: "Hello, World",
              "g-recaptcha-response": grecaptcha.getResponse(),
            }),
          });
        });
    </script>
  </body>
</html>
```

## Axios

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Axios</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js" async></script>
  </head>
  <body>
    <script>
      axios
        .post("https://submit-form.com/your-form-id", {
          message: "Hello, World",
        })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    </script>
  </body>
</html>
```

## Axios with Botpoison

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Axios and Botpoison</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js" async></script>
    <script src="https://unpkg.com/@botpoison/browser" async></script>
  </head>
  <body>
    <script>
      const botpoison = new Botpoison({
        publicKey: "your-public-key",
      });
      botpoison.challenge().then(({ solution }) => {
        axios
          .post("https://submit-form.com/your-form-id", {
            message: "Hello, World",
            _botpoison: solution,
          })
          .then((response) => console.log(response))
          .catch((error) => console.error(error));
      });
    </script>
  </body>
</html>
```

## Axios with reCAPTCHA v2

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Axios and reCAPTCHA v2</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js" async></script>
    <script src="https://www.google.com/recaptcha/api.js" async></script>
  </head>
  <body>
    <div class="g-recaptcha" data-sitekey="your-site-key"></div>
    <button id="send-button" type="button">Send</button>
    <script>
      document.getElementById("send-button").addEventListener("click", () => {
        axios.post("https://submit-form.com/your-form-id", {
          message: "Hello, World",
          "g-recaptcha-response": grecaptcha.getResponse(),
        });
      });
    </script>
  </body>
</html>
```

## Legacy

The patterns below still work, but we recommend Fetch for new code.

### JavaScript XHR

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with JavaScript XHR</title>
  </head>
  <body>
    <script>
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://submit-form.com/your-form-id");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send(
        JSON.stringify({
          message: "Hello, World!",
        }),
      );
    </script>
  </body>
</html>
```

### jQuery

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with jQuery</title>
    <script src="https://unpkg.com/jquery/dist/jquery.js"></script>
  </head>
  <body>
    <script>
      $.post(
        "https://submit-form.com/your-form-id",
        {
          message: "Hello, World",
        },
        null,
        "json", // dataType must be set to json
      )
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    </script>
  </body>
</html>
```

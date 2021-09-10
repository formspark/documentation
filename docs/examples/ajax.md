---
title: AJAX submissions
lang: en-US
---

# AJAX submissions

You can use AJAX to submit your forms.

To do so, make a `GET` or `POST` request to your form endpoint (https://submit-form.com/your-form-id).

Ensure that both the `Content-Type` and `Accept` headers are set to `application/json` (some HTTP libraries do this automatically).

We have included examples for: Axios, Fetch, jQuery and Javascript XHR.

## Axios

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Axios</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <script>
      axios
        .post("https://submit-form.com/your-form-id", {
          message: "Hello, World",
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.error(response);
        });
    </script>
  </body>
</html>
```

If you wish to include customizations, which require hidden fields such as `_email.subject` and `_email.from`, include them as a nested object in the payload:

```javascript
...
      axios
        .post("https://submit-form.com/your-form-id", {
          message: "Hello, World",
          "_email": {
            from: "A Human Being",
            subject: "A message awaits.",
            template: {
              title: false,
              footer: false,
            }
          },
        })
...
```

This also works for the redirection customizations, which require fields nested under `_feedback`.

## Axios with Botpoison

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Axios and Botpoison</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/@botpoison/browser"></script>
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
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.error(response);
          });
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
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://www.google.com/recaptcha/api.js"></script>
  </head>
  <body>
    <div class="g-recaptcha" data-sitekey="your-site-key"></div>
    <button id="send-button" type="button">Send</button>
    <script>
      document
        .getElementById("send-button")
        .addEventListener("click", function () {
          axios
            .post("https://submit-form.com/your-form-id", {
              message: "Hello, World",
              "g-recaptcha-response": grecaptcha.getResponse(),
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (response) {
              console.error(response);
            });
        });
    </script>
  </body>
</html>
```

## Fetch

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Fetch</title>
  </head>
  <body>
    <script>
      fetch("https://submit-form.com/your-form-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: "Hello, World",
        }),
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
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
    <script src="https://www.google.com/recaptcha/api.js"></script>
  </head>
  <body>
    <div class="g-recaptcha" data-sitekey="your-site-key"></div>
    <button id="send-button" type="button">Send</button>
    <script>
      document
        .getElementById("send-button")
        .addEventListener("click", function () {
          fetch("https://submit-form.com/your-form-id", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              message: "Hello, World",
              "g-recaptcha-response": grecaptcha.getResponse(),
            }),
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.error(error);
            });
        });
    </script>
  </body>
</html>
```

## JavaScript XHR

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | AJAX with Javascript XHR</title>
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
        })
      );
    </script>
  </body>
</html>
```

## jQuery

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
        "json" // dataType must be set to json
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (response) {
          console.error(response);
        });
    </script>
  </body>
</html>
```

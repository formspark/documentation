---
title: AJAX submissions
lang: en-US
---

# AJAX submissions

You can use AJAX to submit your forms.

To do so, make a `GET` or `POST` request to your form endpoint (https://submit-form.com/your-form-id).

Ensure that both the `Content-Type` and `Accept` headers are set to `application/json` (some HTTP libraries do this automatically).

We have included examples for: Axios, Fetch, jQuery and Javascript XHR.

## Axios example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>AJAX Axios</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <script>
      axios
        .post("https://submit-form.com/<your-form-id>", {
          message: "Hello, World"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(response) {
          console.error(response);
        });
    </script>
  </body>
</html>
```

## Fetch example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>AJAX Fetch</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <script>
      fetch("https://submit-form.com/<your-form-id>", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          message: "Hello, World"
        })
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
    </script>
  </body>
</html>
```

## jQuery example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>AJAX jQuery</title>
    <script src="https://unpkg.com/jquery/dist/jquery.js"></script>
  </head>
  <body>
    <script>
      $.post(
        "https://submit-form.com/<your-form-id>",
        {
          message: "Hello, World"
        },
        null,
        "json" // dataType must be set to json
      )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(response) {
          console.error(response);
        });
    </script>
  </body>
</html>
```

## JavaScript XHR example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>AJAX XHR</title>
  </head>
  <body>
    <script>
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://submit-form.com/<your-form-id>"
      );
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          message: "Hello, World!"
        })
      );
    </script>
  </body>
</html>
```
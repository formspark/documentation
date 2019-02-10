---
title: AJAX submissions
lang: en-US
---

# AJAX submissions

You can use AJAX to submit your forms.

If you want to prevent redirection, set the _redirect property inside the data object to false.

## jQuery example

```javascript
const settings = {
    url: "https://submit-form.com/<your-form-id>",
    method: "POST",
    "headers": {
    "Content-Type": "application/json",
    },
    data: JSON.stringify({
        message: "Hello, World!"
        _redirect: false
    })
}

$.ajax(settings);
```

## JavaScript XHR example

```javascript
const data = JSON.stringify({
  message: "Hello, World!"
   _redirect: false
});

const xhr = new XMLHttpRequest();

xhr.open("POST", "https://submit-form.com/<your-form-id>");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
```

## cURL example

```bash
curl -X POST \
    https://submit-form.com/<your-form-id> \
    -H 'Content-Type: application/json' \
    -d '{
        "message": "Hello, World!",
        "_redirect": "false"
    }'
```
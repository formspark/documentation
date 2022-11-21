---
title: File uploads
lang: en-US
---

# File uploads

## Uploadcare

Create a free Uploadcare account at [https://uploadcare.com/](https://uploadcare.com/), the free tier of Uploadcare
gives you 3000 uploads per month

Want to upload non-image files? You can add a payment method to your Uploadcare account without having to leave their
free plan.

### Steps

Start with a simple Formspark form.

```html
<form action="https://submit-form.com/your-form-id">
  <!-- Name -->
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />

  <button type="submit">Send</button>
</form>
```

Add the Uploadcare widget to the `head` of your HTML file.

```html
<script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"></script>
```

Add an input of type `hidden`, set its role to `uploadcare-uploader`, add your Uploadcare public key as
the `data-public-key` attribute.

```html
<!-- Photo -->
<label for="photo">Name</label>
<input
  type="hidden"
  id="photo"
  name="photo"
  role="uploadcare-uploader"
  data-public-key="your-public-uploadcare-id"
/>
```

Links to the uploaded files will now automatically be attached to your submissions.

![Uploadcare submission](../.vuepress/public/uploadcare-submission.png)

Final code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Formspark with Uploadcare</title>
    <script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"></script>
  </head>
  <body>
    <form action="https://submit-form.com/your-form-id">
      <!-- Name -->
      <label for="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Name" required="" />

      <!-- Photo -->
      <label for="photo">Name</label>
      <input
        type="hidden"
        id="photo"
        name="photo"
        role="uploadcare-uploader"
        data-public-key="your-public-uploadcare-id"
      />

      <button type="submit">Send</button>
    </form>
  </body>
</html>
```

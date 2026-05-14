---
title: File uploads
lang: en-US
---

# File uploads

::: tip
Formspark stores a link to your uploaded file, not the file itself. You upload the file to a third-party storage provider and Formspark records the resulting URL with the submission.
:::

The example below uses Uploadcare. Any provider that returns a public URL after upload will work the same way.

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

![Uploadcare submission](/uploadcare-submission.png)

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

## Alternatives

- [Cloudinary](https://cloudinary.com/) — image and video focused, generous free tier.
- [Filestack](https://www.filestack.com/) — drop-in widget similar to Uploadcare.
- [Bunny Storage](https://bunny.net/storage/) — cheap edge storage with a simple HTTP API.
- [Amazon S3 pre-signed URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) — generate an upload URL from your own backend, then submit the resulting file URL to Formspark.

---
title: File uploads
lang: en-US
---

# File uploads

::: tip
Formspark stores a link to your uploaded file, not the file itself. You upload the file to a third-party storage provider and Formspark records the resulting URL with the submission.
:::

The examples below use Uploadcare and Cloudinary. Any provider that returns a public URL after upload will work the same way.

## Uploadcare

Create an Uploadcare account at [https://uploadcare.com/](https://uploadcare.com/).

::: warning
Uploadcare's free plan is metered in operations, not uploads, and an operation covers uploading,
image transformations, video processing and document conversion alike. The allowance is small enough
that a busy form will pass it, and the cheapest paid plan is a significant step up. Check
[their pricing](https://uploadcare.com/pricing/) against your expected volume before you commit, and
see [Cloudinary](#cloudinary) below for another option.
:::

### Steps

Start with a simple Formspark form.

```html
<form action="https://submit-form.com/your-form-id" method="POST">
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
<label for="photo">Photo</label>
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
    <form action="https://submit-form.com/your-form-id" method="POST">
      <!-- Name -->
      <label for="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Name" required="" />

      <!-- Photo -->
      <label for="photo">Photo</label>
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

## Cloudinary

[Cloudinary](https://cloudinary.com/) offers an upload widget that works the same way: the visitor
uploads, and you put the resulting URL into a hidden field that Formspark records.

### Steps

Create an [unsigned upload preset](https://cloudinary.com/documentation/upload_presets) in your
Cloudinary console. Unsigned is what lets the browser upload without a server-side signature, so the
preset should restrict what it accepts.

Add the widget script to the `head` of your HTML file.

```html
<script
  src="https://upload-widget.cloudinary.com/latest/global/all.js"
  type="text/javascript"
></script>
```

Add a hidden input to hold the URL, and a button that opens the widget.

```html
<!-- Photo -->
<input type="hidden" id="photo" name="photo" />
<button type="button" id="upload-widget">Upload a photo</button>
```

Wire the widget up so a successful upload writes its URL into that input.

```html
<script type="text/javascript">
  var widget = cloudinary.createUploadWidget(
    {
      cloudName: "your-cloud-name",
      uploadPreset: "your-unsigned-upload-preset",
    },
    function (error, result) {
      if (!error && result && result.event === "success") {
        document.getElementById("photo").value = result.info.secure_url;
      }
    },
  );

  document
    .getElementById("upload-widget")
    .addEventListener("click", function () {
      widget.open();
    });
</script>
```

The submitted `photo` field now carries the uploaded file's URL.

::: tip
Give the button `type="button"`. A button inside a form defaults to `type="submit"`, so without it
opening the widget submits the form instead.
:::

## Alternatives

- [Filestack](https://www.filestack.com/): drop-in widget similar to Uploadcare.
- [Bunny Storage](https://bunny.net/storage/): cheap edge storage with a simple HTTP API.
- [Amazon S3 pre-signed URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html): generate an upload URL from your own backend, then submit the resulting file URL to Formspark.

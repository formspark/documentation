---
title: Alpine.js
lang: en-US
---

# Alpine.js

## Fetch

Featured
article: [Building an AJAX form with Alpine.js](https://technotrampoline.com/articles/building-an-ajax-form-with-alpinejs/)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | Alpine.js with Fetch</title>
    <script
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
      defer
    ></script>
  </head>
  <body>
    <form x-data="contactForm()" @submit.prevent="submit">
      <label>
        <span>Message</span>
        <textarea name="message" x-model="data.message"></textarea>
      </label>
      <button type="submit" x-text="buttonText" :disabled="loading">
        Submit
      </button>
    </form>

    <script>
      const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

      function contactForm() {
        return {
          data: {
            message: "",
          },
          buttonText: "Submit",
          loading: false,
          submit() {
            this.buttonText = "Submitting...";
            this.loading = true;
            fetch(FORMSPARK_ACTION_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(this.data),
            })
              .then(() => {
                alert("Form submitted");
              })
              .catch(() => {
                alert("Something went wrong");
              })
              .finally(() => {
                this.data.message = "";
                this.buttonText = "Submit";
                this.loading = false;
              });
          },
        };
      }
    </script>
  </body>
</html>
```

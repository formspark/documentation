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

## With success and error states

Tracks three states (`idle`, `success`, `error`) so you can show a thank-you message on success or an inline error on failure without leaving the page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | Alpine.js with states</title>
    <script
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
      defer
    ></script>
  </head>
  <body>
    <div x-data="contactForm()">
      <form x-show="state !== 'success'" @submit.prevent="submit">
        <label>
          <span>Message</span>
          <textarea name="message" x-model="data.message" required></textarea>
        </label>
        <button type="submit" :disabled="state === 'loading'">
          <span x-show="state !== 'loading'">Submit</span>
          <span x-show="state === 'loading'">Sending...</span>
        </button>
        <p x-show="state === 'error'" style="color: red">
          Something went wrong. Please try again.
        </p>
      </form>

      <p x-show="state === 'success'">Thanks! We received your message.</p>
    </div>

    <script>
      const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

      function contactForm() {
        return {
          state: "idle",
          data: {
            message: "",
          },
          async submit() {
            this.state = "loading";
            try {
              const response = await fetch(FORMSPARK_ACTION_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify(this.data),
              });
              if (!response.ok) throw new Error();
              this.state = "success";
            } catch {
              this.state = "error";
            }
          },
        };
      }
    </script>
  </body>
</html>
```

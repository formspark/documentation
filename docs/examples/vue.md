---
title: Vue
lang: en-US
---

# Vue

## vue-use-formspark

:::tip
Check out our official Vue composition API functions: [vue-use-formspark](https://github.com/formspark/vue-use-formspark).
:::

```vue
<template>
  <form @submit="onSubmit">
    <textarea v-model="message" @input="onInput" />
    <button type="submit" :disabled="submitting">Send</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useFormspark } from "@formspark/vue-use-formspark";
export default {
  setup() {
    const message = ref("");

    const [submit, submitting] = useFormspark({
      formId: "your-form-id",
    });

    const onInput = (e) => {
      message.value = e.target.value;
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      await submit({ message: message.value });
      message.value = "";
    };

    return {
      message,
      onInput,
      onSubmit,
      submitting,
    };
  },
};
</script>
```

## Fetch

```vue
<template>
  <form @submit.prevent="submitForm">
    <label>
      <span>Message</span>
      <textarea name="message" v-model="message"></textarea>
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async submitForm() {
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: this.message,
        }),
      });
      alert("Form submitted");
    },
  },
};
</script>
```

## petite-vue and Fetch

Featured article: [Building an AJAX form with petite-vue](https://technotrampoline.com/articles/building-an-ajax-form-with-petite-vue/)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Formspark | Vue with petite-vue and Fetch</title>
    <script src="https://unpkg.com/petite-vue" defer init></script>
  </head>
  <body>
    <form v-scope="ContactForm()" @submit.prevent="submit">
      <label>
        <span>Message</span>
        <textarea name="message" v-model="data.message"></textarea>
      </label>
      <button type="submit" :disabled="loading">{{ buttonText }}</button>
    </form>

    <script>
      const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

      function ContactForm() {
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

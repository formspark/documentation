---
title: Vue
lang: en-US
---

# Vue

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
      }).then(() => {
        alert("Form submitted");
      });
    },
  },
};
</script>
```

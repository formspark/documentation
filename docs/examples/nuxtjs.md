---
title: Nuxt
lang: en-US
---

# Nuxt

## Fetch

```vue
<script setup>
import { ref } from "vue";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

const message = ref("");

const submitForm = async () => {
  await $fetch(FORMSPARK_ACTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: {
      message: message.value,
    },
  });
  alert("Form submitted");
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <label>
      <span>Message</span>
      <textarea name="message" v-model="message"></textarea>
    </label>
    <button type="submit">Submit</button>
  </form>
</template>
```

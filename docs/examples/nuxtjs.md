---
title: Nuxt
lang: en-US
---

# Nuxt

## vue-use-formspark

:::tip
Check out our official Vue composition API
functions: [vue-use-formspark](https://github.com/formspark/vue-use-formspark).
:::

```vue
<script setup>
import { ref } from "vue";
import { useFormspark } from "@formspark/vue-use-formspark";

const message = ref("");

const [submit, submitting] = useFormspark({
  formId: "your-form-id",
});

const onSubmit = async () => {
  await submit({ message: message.value });
  message.value = "";
  alert("Form submitted");
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label>
      <span>Message</span>
      <textarea v-model="message" />
    </label>
    <button type="submit" :disabled="submitting">Send</button>
  </form>
</template>
```

## Fetch

`$fetch` is Nuxt's built-in HTTP client, so the body is passed as an object rather than a JSON string.

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

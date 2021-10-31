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

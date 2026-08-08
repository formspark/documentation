---
title: VitePress
lang: en-US
---

# VitePress

VitePress renders pages on the server at build time, so a form that submits
with `fetch` has to be wrapped in `<ClientOnly>` to avoid a hydration
mismatch.

## Theme component

Add `.vitepress/theme/components/ContactForm.vue`:

```vue
<script setup>
import { ref } from "vue";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

const message = ref("");
const submitting = ref(false);

const onSubmit = async () => {
  submitting.value = true;
  try {
    await fetch(FORMSPARK_ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message: message.value }),
    });
    message.value = "";
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <ClientOnly>
    <form @submit.prevent="onSubmit">
      <label>
        <span>Message</span>
        <textarea v-model="message"></textarea>
      </label>
      <button type="submit" :disabled="submitting">Send</button>
    </form>
  </ClientOnly>
</template>
```

Register it globally in `.vitepress/theme/index.js`:

```js
import DefaultTheme from "vitepress/theme";
import ContactForm from "./components/ContactForm.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ContactForm", ContactForm);
  },
};
```

Then use it in any markdown page:

```md
# Contact

<ContactForm />
```

## HTML form

A plain form needs no component and no client JavaScript, so it works in
markdown as-is.

```html
<form action="https://submit-form.com/your-form-id" method="POST">
  <label>
    <span>Message</span>
    <textarea name="message"></textarea>
  </label>
  <button type="submit">Send</button>
</form>
```

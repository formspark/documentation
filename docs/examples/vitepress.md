---
title: VitePress
lang: en-US
---

# VitePress

VitePress renders pages at build time and hydrates them in the browser. A form
whose markup does not depend on anything browser-specific renders the same in
both passes, so it needs no special handling — the `fetch` only runs once the
visitor submits.

Reach for `<ClientOnly>` only when a component reads something that exists in
the browser alone, such as `window`, `localStorage` or the current URL, while it
is setting up or rendering.

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
  <form @submit.prevent="onSubmit">
    <label>
      <span>Message</span>
      <textarea v-model="message"></textarea>
    </label>
    <button type="submit" :disabled="submitting">Send</button>
  </form>
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

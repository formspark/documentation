---
title: Gridsome
lang: en-US
---

# Gridsome

```vue
<template>
  <form method="POST" :action="formActionUrl">
    <textarea name="message" placeholder="Message" />
    <button type="submit">Send</button>
  </form>
</template>

<script>
export default {
  metaInfo: {
    title: "Contact",
  },
  data() {
    return {
      formActionUrl: "https://submit-form.com/your-form-id",
    };
  },
};
</script>
```

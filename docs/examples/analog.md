---
title: Analog
lang: en-US
---

# Analog

Analog is the full-stack meta-framework for Angular. Its pages are ordinary
standalone Angular components, so the [Angular](/examples/angular) patterns
apply here too.

## HTML form

The action URL can be used directly, so a page that only needs to collect a
submission needs no component logic.

```ts
// src/app/pages/contact.page.ts
import { Component } from "@angular/core";

@Component({
  standalone: true,
  template: `
    <form method="POST" action="https://submit-form.com/your-form-id">
      <label>
        <span>Message</span>
        <textarea name="message"></textarea>
      </label>
      <button type="submit">Send</button>
    </form>
  `,
})
export default class ContactPage {}
```

A page component is exported as `default`, which is how Analog's file-based
router picks it up.

## Fetch

Keeps the submission on the page so you can disable the form while it is in
flight and show your own confirmation.

```ts
// src/app/pages/contact.page.ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>
        <span>Message</span>
        <textarea name="message" [(ngModel)]="message"></textarea>
      </label>
      <button type="submit" [disabled]="submitting">Send</button>
    </form>
  `,
})
export default class ContactPage {
  message = "";
  submitting = false;

  async onSubmit() {
    this.submitting = true;
    try {
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ message: this.message }),
      });
      this.message = "";
    } finally {
      this.submitting = false;
    }
  }
}
```

`[(ngModel)]` requires the control to carry a `name` attribute when it sits
inside a form.

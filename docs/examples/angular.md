---
title: Angular
lang: en-US
---

# Angular

## HTML form

The action URL can be used directly, so a plain template-driven form needs no
component logic at all.

```html
<form method="POST" action="https://submit-form.com/your-form-id">
  <label>
    <span>Message</span>
    <textarea name="message"></textarea>
  </label>
  <button type="submit">Send</button>
</form>
```

## Reactive form with HttpClient

Keeps the submission on the page so you can disable the form while it is in
flight and show your own confirmation.

```ts
import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        <span>Message</span>
        <textarea formControlName="message"></textarea>
      </label>
      <button type="submit" [disabled]="form.disabled">Send</button>
    </form>
  `,
})
export class ContactFormComponent {
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);

  form = this.formBuilder.group({ message: "" });

  onSubmit() {
    this.form.disable();
    this.http.post(FORMSPARK_ACTION_URL, this.form.value).subscribe({
      complete: () => {
        this.form.enable();
        this.form.reset();
      },
    });
  }
}
```

`HttpClient` sets `Content-Type: application/json` for an object body and
Formspark replies with JSON, so nothing else needs configuring.

Remember to provide `HttpClient` in your application bootstrap:

```ts
import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
});
```

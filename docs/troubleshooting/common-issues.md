---
title: Common issues
lang: en-US
---

# Common issues

## My submissions are not showing up

- Ensure all input, select and textarea elements inside your form have a `name` attribute, otherwise you will not
  receive the data filled in these fields.
- Keep in mind that empty submissions are ignored by Formspark.
- Are you using some form of spam protection? Temporarily disable the protection, if you are able to submit without it
  then you probably need to double-check your integration.
  Step-by-step instructions can be found [here](/setup/spam-protection).

## I cannot find my forms

1. Ensure that you are signed in with the correct email address.
2. Ensure that you are connected to the right workspace: [View My Workspaces](https://dashboard.formspark.io/workspaces)
   .

## I cannot find my workspace

Ensure that you are signed in with the correct email address.

## My workspace suddenly seems to be out of submissions

Ensure that you are connected to the right workspace: [View My Workspaces](https://dashboard.formspark.io/workspaces).

Note that additional user-created workspaces start with 0 submissions. All upgrades, bundles, and deals are per
workspace.

## My AJAX request returns 200 but no submission shows up

This is almost always a `Content-Type` / `Accept` header mismatch. When submitting JSON, both headers must be set to `application/json`:

```javascript
fetch("https://submit-form.com/your-form-id", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ message: "Hello" }),
});
```

Without those headers Formspark may treat the body as something other than JSON and silently discard it.

## I'm receiving duplicate submissions

Common causes:

- The visitor pressed the back button after submitting and resubmitted the form on refresh.
- The submit button was clicked multiple times before the request completed. Disable the button while the request is in flight.
- Browser autofill / form-restore replayed the submission after a page reload.

If you submit via AJAX, disable the button until the request resolves and reset the form on success. For full-page submissions, redirect away from the form on success to avoid resubmission on refresh.

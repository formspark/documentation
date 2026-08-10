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
2. Ensure that you are connected to the right workspace:
   [View My Workspaces](https://dashboard.formspark.io/workspaces).

## I cannot find my workspace

Ensure that you are signed in with the correct email address.

## I want to delete my account

You can do this yourself, under
[Settings → Delete account](https://dashboard.formspark.io/account/delete).

It removes the workspaces you are the only member of, along with their forms
and submissions, and takes your address off every form that notifies it. Your
sign-in is kept so you can come back later, and it cannot be undone. See
[account settings](/dashboard/account-settings#deleting-your-account) for what
is removed, what is kept, and what to do if you are the only administrator of a
shared workspace.

To delete a single workspace rather than your whole account, open that
workspace's settings instead.

## My workspace suddenly seems to be out of submissions

Ensure that you are connected to the right workspace: [View My Workspaces](https://dashboard.formspark.io/workspaces).

Note that additional user-created workspaces start with 0 submissions. All upgrades, bundles, and deals are per
workspace. See [limits and plans](/troubleshooting/limits-and-plans).

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

## I'm receiving the same notification several times

Formspark sends one notification per accepted submission. Several identical
emails therefore means the form was submitted several times, not that one
notification was sent again.

Open the form in your dashboard and compare the timestamps. Duplicate
submissions appear as separate entries, often only seconds apart. Once you know
how many arrived, see
[duplicate submissions](#i-m-receiving-duplicate-submissions) for the causes.

## I'm receiving duplicate submissions

Duplicates come from one of two places, and they need different fixes. Check the
submitted content first: a real visitor sending twice looks like a genuine
enquiry, while a burst of many identical copies seconds apart is almost always a
bot.

### Duplicates from a real visitor

Common causes:

- The submit button was clicked multiple times before the request completed.
- The visitor pressed the back button after submitting and resubmitted the form on refresh.
- Browser autofill / form-restore replayed the submission after a page reload.

Guard the submit button while the request is in flight. Reset it in a `finally`
block so a failed request does not leave the form permanently disabled:

```html
<form id="form">
  <input type="email" name="email" required />
  <button id="button" type="submit">Send</button>
</form>

<script>
  const form = document.getElementById("form");
  const button = document.getElementById("button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    try {
      const response = await fetch("https://submit-form.com/your-form-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      button.disabled = false;
    }
  });
</script>
```

Most of the [framework examples](/examples/react) already wire this up through a
`submitting` flag. For full-page submissions without AJAX, redirect away from the
form on success so a refresh cannot resubmit it.

### Duplicates from a bot

A bot posts straight to your form endpoint and never loads your page, so
disabling the button, resetting the form, and redirecting on success have no
effect on it. Those guards only stop a real visitor submitting twice.

Enable [spam protection](/setup/spam-protection) instead. Every accepted copy
spends one submission from your workspace, so bot bursts eat into your allowance
as well as your inbox, and submissions rejected as spam do not count against
your total. See [limits and plans](/troubleshooting/limits-and-plans).

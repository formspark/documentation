---
title: Account settings
lang: en-US
---

# Account settings

Settings that belong to you rather than to one of your workspaces. Open them
from the avatar menu in the dashboard, or go straight to
[your settings](https://dashboard.formspark.io/account/api-tokens).

Workspace settings, including billing, team members and deleting a single
workspace, live with the workspace instead.

## API tokens

Tokens let scripts and tools use Formspark on your behalf. A token belongs to
you and reaches every workspace you are a member of, limited to the scopes you
give it. The API itself is available on paid workspaces.

A token is shown once, when you create it. If you lose it, revoke it and create
another. Revoking takes effect immediately.

See [API tokens](/api/api-tokens) for the scopes, expiry and usage.

## Deleting your account

Go to **Settings → Delete account**. You will be shown exactly what is about to
be removed and asked to type your email address to confirm.

Deletion cannot be undone. Nothing is archived and nothing can be restored
afterwards, so export anything you want to keep first. See
[exporting submissions](/dashboard/exporting-submissions).

### What is removed

- Every workspace you are the only member of, along with its forms,
  submissions, notification settings and integrations.
- Your membership of workspaces shared with other people. Those workspaces
  themselves are left alone, together with everything in them.
- Your API tokens. Anything still using one stops working immediately.
- Your email address, on every form that notifies it.

### What is kept

Your sign-in is kept, so you can come back later with the same address rather
than registering again. You will arrive with no workspaces.

The free submissions included with your original signup are not granted a
second time. Any workspace you create after deleting starts empty, and you can
add submissions to it with a bundle. See
[limits and plans](/troubleshooting/limits-and-plans).

Records we are required to retain for accounting, such as payment records for
bundles you have bought, are held by our payment provider and are unaffected.

### Your address is removed from other people's forms too

Deleting your account takes your address off every form that sends
notifications to it, not only the forms in your own workspaces. That includes
forms belonging to people you have never shared a workspace with, if someone
added you as a recipient.

Aliases of the same mailbox go with it. Deleting an account on
`you@gmail.com` also clears `you+forms@gmail.com` and `y.o.u@gmail.com`,
because they all deliver to you.

If you were the only recipient on someone else's form, that form will no longer
notify anyone until its owner adds a new recipient. Tell them before you delete
if that matters.

### If you are the only administrator of a shared workspace

Deletion is refused while you are the only administrator of a workspace that
other people are members of. Removing you would leave that workspace with
nobody able to manage it.

The dashboard lists the workspaces holding you up. For each one, either:

- Promote another member to administrator, then delete your account. The
  workspace and its data stay with them. See
  [inviting team members](/dashboard/inviting-team-members).
- Or remove the other members, which turns it into a workspace you are alone
  in, and it will then be deleted along with everything in it.

### Purchased submissions are not refunded

If a workspace being deleted still holds submissions from a bundle, those are
lost with it. Bundles belong to a workspace rather than to you, so if you want
to preserve one, hand that workspace to another administrator instead of
deleting it.

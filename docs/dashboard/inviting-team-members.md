---
title: Inviting team members
lang: en-US
---

# Inviting team members

You can invite members to your workspace to create forms and view submissions as a team. Each member has a role that decides what they can change.

When you invite team members to join your Formspark workspace, they will receive an invitation email. The link in it works once and expires after 7 days.

Free workspaces include 5 team members. Upgraded workspaces have no practical member limit. See [limits and plans](/troubleshooting/limits-and-plans).

:::tip
You can send invitations to users who still need to create a Formspark account or to those who already have one.
:::

## Steps

1. Open the `Members` screen
2. Fill in their email
3. Choose their role
4. Press `Send invitation`

![Workspace section](/invite-team-member.png)

## Pending invitations

Invitations nobody has accepted yet are listed under `Pending invitations` on the `Members` screen, with the number of days before each one expires.

- Press `Resend` to email a fresh link. The old link stops working.
- Press `Revoke` to take an invitation back. Its link stops working.

An expired invitation stays in the list, so you can resend it.

## Roles

Every member is an _admin_, an _editor_ or a _viewer_.

|                                     | Admin | Editor | Viewer |
| ----------------------------------- | ----- | ------ | ------ |
| Read submissions and analytics      | Yes   | Yes    | Yes    |
| Export submissions                  | Yes   | Yes    | Yes    |
| Create and change forms             | Yes   | Yes    | No     |
| Delete forms and submissions        | Yes   | Yes    | No     |
| Connect and disconnect integrations | Yes   | Yes    | No     |
| Change spam protection              | Yes   | Yes    | No     |
| Invite a member                     | Yes   | Yes    | No     |
| Resend or revoke an invitation      | Yes   | Yes    | No     |
| Change a member's role              | Yes   | No     | No     |
| Remove a member                     | Yes   | No     | No     |
| Leave the workspace                 | Yes   | Yes    | Yes    |
| Delete the workspace                | Yes   | No     | No     |

A _viewer_ reads and nothing else. They cannot change a setting, break an
integration or delete anything, so you can give a client access to their own
submissions without giving them the rest of the workspace.

An _editor_ builds and maintains forms.

Only an _admin_ can invite another admin, or resend and revoke an admin
invitation. A workspace always keeps at least one admin.

:::tip
Choose the role when you send the invitation. You can change it later from the
`Members` screen, next to the member's name.
:::

## Leaving a workspace

1. Open the `Members` screen
2. Press `Leave workspace`

You lose access to its forms and submissions. To come back, someone in the
workspace has to invite you again.

The last admin cannot leave. Make another member an admin first, or delete the
workspace instead.

---
title: API tokens
lang: en-US
---

# API tokens

Create one in the dashboard under
[API tokens](https://dashboard.formspark.io/account/api-tokens).

**The token is shown once, when you create it.** Nothing stores the secret, so
it cannot be shown again. If you lose it, revoke it and create another.

## What a token can reach

A token belongs to you, not to a workspace, and reaches every workspace you are
a member of. Losing membership of a workspace takes the token's access to it
away too.

Within that, the scopes you pick decide what it may do. Give a token the least
it needs: a script that reads submissions has no reason to hold
`submissions:write`.

| Scope               | Allows                                 |
| ------------------- | -------------------------------------- |
| `workspaces:read`   | List workspaces and read their details |
| `workspaces:write`  | Create and rename workspaces           |
| `forms:read`        | List forms and read their settings     |
| `forms:write`       | Create, update and delete forms        |
| `submissions:read`  | Read submissions                       |
| `submissions:write` | Delete submissions                     |

`GET /me` needs no scope at all, so a token can always describe itself.

## What a token cannot do

Some things are deliberately absent from the API rather than merely unscoped, so
no token can reach them however it was created:

- Deleting a workspace
- Inviting, promoting or removing team members
- Anything to do with billing
- Creating or revoking API tokens

Token management stays in the dashboard on purpose. A token that could mint
tokens would turn a single leak into access that renews itself.

## Expiry and revocation

Tokens default to 90 days. Pick `Never` if something unattended depends on it,
and accept that you then own rotating it.

Revoking takes effect immediately. A revoked token, an expired token and one
that never existed all fail identically, so nobody can use the API to work out
which secrets were once real.

## Keeping the secret safe

Read it from the environment:

```sh
export FORMSPARK_TOKEN="fsk_live_..."
curl https://api.formspark.io/public/v1/me \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"
```

Avoid putting it directly on a command line. Arguments are visible to other
processes on the machine and land in your shell history.

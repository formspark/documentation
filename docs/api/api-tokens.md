---
title: API tokens
lang: en-US
---

# API tokens

Create a token in the dashboard under [API tokens](https://dashboard.formspark.io/account/api-tokens).

The token is shown once, when you create it. Store it somewhere safe. If you lose it, revoke it and create another.

## Scopes

A token belongs to you and reaches every workspace you are a member of. Its scopes decide what it may do there. Give a token the least it needs.

| Scope               | Allows                                 |
| ------------------- | -------------------------------------- |
| `workspaces:read`   | List workspaces and read their details |
| `workspaces:write`  | Create and rename workspaces           |
| `forms:read`        | List forms and read their settings     |
| `forms:write`       | Create, update and delete forms        |
| `submissions:read`  | Read submissions                       |
| `submissions:write` | Delete submissions                     |

`GET /me` works with any token, so a token can always describe itself.

Billing, team management, workspace deletion and token management stay in the dashboard.

## Expiry

Tokens expire after 90 days by default. Choose `Never` for something unattended, and rotate it yourself.

## Revocation

Revoking takes effect immediately.

## Using a token

Read it from the environment:

```sh
export FORMSPARK_TOKEN="fsk_live_..."
curl https://api.formspark.io/public/v1/me \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"
```

Keep it out of command-line arguments, which are visible to other processes and stored in your shell history.

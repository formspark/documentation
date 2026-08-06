---
title: Notion
lang: en-US
---

# Notion

Formspark can send every submission from your form straight into a Notion database, created automatically inside a page you share during setup.

Notion is available on all paid workspaces.

## Connecting

1. Open your form's settings and find the `Notion` card under `Integrations`.
2. Click `Connect Notion` and sign in to the Notion workspace you want to use.
3. On Notion's own consent screen, select the page you want to share with Formspark, then confirm access.
4. Formspark creates a new database as a child of the page you shared and starts sending submissions to it.

You do not pick an existing database: Formspark always creates a new one, as a child of whichever page you shared.

Notion's consent screen lets you share more than one page. If you do, Formspark uses the one you edited most recently as the parent, so share only the page you want the database to live in.

## What gets sent

Each submission becomes a new entry in the database, with one property per field name your form submits.

## If no page is shared

::: warning
Sharing a page happens on Notion's own consent screen, not in a Formspark setting: Formspark cannot create a database anywhere you have not explicitly shared with it. If you get through the consent screen without selecting a page, the connection fails. Reconnect from your form's settings and make sure you select a page to share before confirming.
:::

## If a submission does not arrive

Submissions are never lost when Notion is unreachable. Formspark keeps the submission and retries it in the background, oldest first, so a temporary Notion outage catches up on its own once it clears.

If the retries keep failing, or if the Notion workspace has revoked access, the `Notion` card shows a sync error and stops trying. Use `Retry sync` on the card once the cause is fixed, or reconnect if access was revoked.

## Disconnecting

Click `Disconnect Notion` in the same card to stop sending submissions. Disconnecting does not delete the database or the page it lives in, they stay in your Notion workspace with whatever entries were already added; Formspark simply stops writing to it.

To send submissions to a different page, disconnect and connect again, and share a different page this time.

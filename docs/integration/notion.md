---
title: Notion
lang: en-US
---

# Notion

Formspark can send every submission from your form straight into a Notion database, created automatically inside a page you share during setup.

Notion is available on [upgraded workspaces](/troubleshooting/limits-and-plans).

## Connecting

1. Open your form's settings and find the `Notion` row under `Integrations`.
2. Click `Connect` and sign in to the Notion workspace you want to use.
3. On Notion's own consent screen, select the page you want to share with Formspark, then confirm access.
4. Formspark creates a new database named after your form, as a child of the page you shared, and starts sending submissions to it.

You do not pick an existing database: Formspark always creates a new one, as a child of whichever page you shared. Once connected, open the row with `Configure` and click `Open database` to find it.

Notion's consent screen lets you share more than one page. If you do, Formspark uses the one you edited most recently as the parent, so share only the page you want the database to live in.

## What gets sent

Each submission becomes a new entry in the database, with one property per field name your form submits. A field your form has not sent before is added to the database the first time it appears, so the database keeps up as a form changes.

Alongside your own fields, every database carries two properties Formspark fills in: `Submission`, the entry's title, and `Submitted at`, the submission time as a date you can sort and filter on.

Formspark adds each new property as text, so Notion never tries to interpret a submitted value. Very long values are truncated.

You can change a property's type in Notion afterwards. Formspark then writes each value in the shape that type expects: a number, a checkbox, a date, a select or multi-select option, a URL, an email address or a phone number. A value that is not a valid number or date leaves a number or date property empty, and a checkbox is ticked only by values such as `true`, `on` or `yes`. Properties Notion computes or links, such as formulas, rollups, people, relations and files, are left alone.

## If no page is shared

::: warning
Sharing a page happens on Notion's own consent screen, not in a Formspark setting: Formspark cannot create a database anywhere you have not explicitly shared with it. If you get through the consent screen without selecting a page, the connection fails. Reconnect from your form's settings and make sure you select a page to share before confirming.
:::

## If a submission does not arrive

Submissions are never lost when Notion is unreachable. Formspark keeps the submission and retries it in the background, oldest first, so a temporary Notion outage catches up on its own once it clears. While it catches up, the `Notion` row shows `Syncing`.

If the retries keep failing, or if the Notion workspace has revoked access, the `Notion` row shows `Sync error` and stops trying. Open the row with `Configure` and use `Retry sync` once the cause is fixed, or reconnect if access was revoked.

## If your workspace goes back to the free plan

Formspark pauses sending submissions to the database and keeps the connection as it is. Sending resumes once the workspace is upgraded again, so you do not need to reconnect.

## Disconnecting

Open the `Notion` row with `Configure`, click `Disconnect`, and confirm with `Disconnect Notion`. Disconnecting does not delete the database or the page it lives in. They stay in your Notion workspace with whatever entries were already added; Formspark simply stops writing to them.

To send submissions to a different page, disconnect and connect again, and share a different page this time.

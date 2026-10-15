---
title: Google Sheets
lang: en-US
---

# Google Sheets

Formspark can send every submission from your form straight into a Google Sheets spreadsheet, created automatically and kept up to date.

Google Sheets is available on [upgraded workspaces](/troubleshooting/limits-and-plans).

## Connecting

1. Open your form's settings and find the `Google Sheets` row under `Integrations`.
2. Click `Connect` and sign in with the Google account that should own the spreadsheet.
3. Approve the requested access. Formspark only requests permission to the spreadsheets it creates itself, not the rest of your Google Drive.
4. Formspark creates a new spreadsheet named after your form and starts sending submissions to it.

You do not pick an existing spreadsheet: Formspark always creates a new one. Once connected, open the row with `Configure` and click `Open spreadsheet` to find it.

## What gets sent

Each submission is appended as a new row. The header row starts with `Submitted at`, followed by one column per field name your form submits. If a later submission includes a field the sheet has not seen before, Formspark adds a new column for it; existing columns and rows are never reordered or rewritten.

## If a submission does not arrive

Submissions are never lost when Google Sheets is unreachable. Formspark retries every 5 minutes, in order, and the `Google Sheets` row shows `Retrying` until it catches up.

::: warning
After about a day of failures, for example because the spreadsheet was deleted or access was revoked, the row shows `Paused`, Formspark stops trying, and your workspace admins get an email. Open the row with `Configure` and use `Retry now` once the cause is fixed. Delivery resumes from the first submission that did not arrive. Reconnect instead if the spreadsheet itself is gone.
:::

## If your workspace goes back to the free plan

Formspark pauses sending submissions to the spreadsheet and keeps the connection as it is. Once the workspace is upgraded again, the submissions that arrived meanwhile are sent on their own.

## Disconnecting

Open the `Google Sheets` row with `Configure`, click `Disconnect`, and confirm with `Disconnect Google Sheets`. Disconnecting does not delete the spreadsheet. It stays in your Google Drive with whatever rows were already added; Formspark simply stops writing to it.

To send submissions to a different spreadsheet, disconnect and connect again. This creates a new spreadsheet, it does not reuse the old one. A new connection receives only submissions that arrive after it is made.

---
title: Google Sheets
lang: en-US
---

# Google Sheets

Formspark can send every submission from your form straight into a Google Sheets spreadsheet, created automatically and kept up to date.

Google Sheets is available on [upgraded workspaces](/troubleshooting/limits-and-plans).

## Connecting

1. Open your form's settings and find the `Google Sheets` card under `Integrations`.
2. Click `Connect Google Sheets` and sign in with the Google account that should own the spreadsheet.
3. Approve the requested access. Formspark only requests permission to the spreadsheets it creates itself, not the rest of your Google Drive.
4. Formspark creates a new spreadsheet named after your form and starts sending submissions to it.

You do not pick an existing spreadsheet: Formspark always creates a new one.

## What gets sent

Each submission is appended as a new row. The header row starts with `Submitted at`, followed by one column per field name your form submits. If a later submission includes a field the sheet has not seen before, Formspark adds a new column for it; existing columns and rows are never reordered or rewritten.

## If syncing pauses

::: warning
If a connection keeps failing, for example because the spreadsheet was deleted, Formspark pauses syncing for that form. Retry from the card, or reconnect if the spreadsheet itself is gone.
:::

## Disconnecting

Click `Disconnect Google Sheets` in the same card to stop sending submissions. Disconnecting does not delete the spreadsheet, it stays in your Google Drive with whatever rows were already added; Formspark simply stops writing to it.

To send submissions to a different spreadsheet, disconnect and connect again. This creates a new spreadsheet, it does not reuse the old one.

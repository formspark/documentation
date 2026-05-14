---
title: Google Sheets
lang: en-US
---

# Google Sheets

Formspark does not connect to Google Sheets directly. The recommended path is to use Zapier or Make as a bridge. For developers, a Google Apps Script webhook is also an option.

## Via Zapier

1. Set up the Formspark [Zapier integration](/integration/zapier).
2. In your Zap, select `New Submission` as the trigger.
3. Add `Google Sheets` as the action and choose `Create Spreadsheet Row`.
4. Map your form fields to the matching spreadsheet columns.

## Via Make

1. Set up the Formspark [Make integration](/integration/make).
2. In your scenario, select `Formspark` → `New Submission` as the trigger.
3. Add a `Google Sheets` → `Add a Row` module.
4. Map your form fields to the matching spreadsheet columns.

The free tier of both Zapier and Make is sufficient for typical low-volume contact forms.

## Via webhook (Google Apps Script)

If you'd rather skip a third-party automation tool, you can deploy a Google Apps Script as a web app and use its URL as your form's webhook.

1. Open your spreadsheet and go to `Extensions` → `Apps Script`.
2. Write a `doPost(e)` function that appends `e.postData.contents` to the active sheet.
3. Deploy the script as a web app with access set to `Anyone`.
4. Paste the deployment URL into your form's `Webhook URL` field.

[Check this page](/integration/webhooks) to learn more about webhooks.

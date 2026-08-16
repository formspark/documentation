---
title: Zapier
lang: en-US
---

# Zapier

Connecting Formspark and Zapier takes only seconds.

1. Copy your `Zapier key` found in your form's settings.
2. Create a Formspark connection in Zapier via [this link](https://zapier.com/apps/formspark/integrations).
3. Paste your copied key when prompted.

![Formspark with Zapier](/formspark-zapier-example.png)

## How often Zapier checks for submissions

Zapier does not wait for Formspark to push a submission. It asks Formspark for new submissions on a schedule of its own, and how often it asks depends on your Zapier plan.

On [upgraded workspaces](/troubleshooting/limits-and-plans), Formspark answers every one of those checks, so submissions reach your Zap as quickly as Zapier asks for them.

On free workspaces, Formspark answers at most one check every 15 minutes. Checks that arrive sooner are told to try again shortly, and Zapier reschedules them on its own. A submission can therefore take up to 15 minutes to reach your Zap.

## Waiting runs in Zap history

When Formspark asks Zapier to try again, the run appears in [Zap history](https://help.zapier.com/hc/en-us/articles/20505304170637-Review-Zap-run-statuses) as waiting or scheduled rather than as an error. Nothing has gone wrong and there is nothing to fix: Zapier picks the run back up once the wait is over.

::: tip
No submission is lost while a check is waiting. Submissions that arrive during the wait are still there for the next check, so the only difference on a free workspace is how soon your Zap sees them, never whether it sees them.
:::

## If your key stops working

Regenerating a form's `Zapier key` takes effect immediately, and the old key stops being accepted. If your Zap starts failing to connect after you regenerate, paste the new key into the Formspark connection in Zapier.

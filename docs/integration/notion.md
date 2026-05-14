---
title: Notion
lang: en-US
---

# Notion

Formspark does not connect to Notion directly. The recommended path is to use Zapier or Make as a bridge.

## Via Zapier

1. Set up the Formspark [Zapier integration](/integration/zapier).
2. In your Zap, select `New Submission` as the trigger.
3. Add `Notion` as the action and choose `Create Database Item`.
4. Map your form fields to the matching Notion database properties.

## Via Make

1. Set up the Formspark [Make integration](/integration/make).
2. In your scenario, select `Formspark` → `New Submission` as the trigger.
3. Add a `Notion` → `Create a Database Item` module.
4. Map your form fields to the matching Notion database properties.

## A note on direct webhooks

It is possible to point your form's `Webhook URL` directly at Notion's API, but Notion enforces a 3-requests-per-second rate limit and returns submission errors that need to be retried. Zapier and Make handle this for you, so we recommend going through one of them unless you are comfortable building your own retry layer.

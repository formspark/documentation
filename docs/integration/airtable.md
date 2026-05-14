---
title: Airtable
lang: en-US
---

# Airtable

Formspark does not connect to Airtable directly. The recommended path is to use Zapier or Make as a bridge.

## Via Zapier

1. Set up the Formspark [Zapier integration](/integration/zapier).
2. In your Zap, select `New Submission` as the trigger.
3. Add `Airtable` as the action and choose `Create Record`.
4. Map your form fields to the matching Airtable columns.

Zapier transparently handles Airtable's API rate limit (5 requests per second), so this is the safest option for higher-volume forms.

## Via Make

1. Set up the Formspark [Make integration](/integration/make).
2. In your scenario, select `Formspark` → `New Submission` as the trigger.
3. Add an `Airtable` → `Create a Record` module.
4. Map your form fields to the matching Airtable columns.

## Tips

- The names of your form's input fields should be easy to identify so you can confidently map them to Airtable columns.
- Test your form before going live to verify records are being created as expected.
